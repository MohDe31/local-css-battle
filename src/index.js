import express from "express";
import { createServer } from "http";
import prettier from "prettier";
import fs from "fs";
import { exec } from "child_process";
import { Server } from "socket.io";
import Jimp from "jimp";
import { CURRENT_CHALLENGE, TIME } from "./config.js";

const app = express();

const server = createServer(app);

const io = new Server(server);

const PORT = 1337;

app.use(express.json());

app.use(express.static("./public"));

const users_submitted = [];

let startTime = null;
let endTime = null;

app.get("/challenge", (req, res) => {
    startTime =
        startTime ??
        (io.sockets.emit("refreshed", new Date().getTime()) &&
            new Date().getTime());
    endTime = endTime ?? startTime + TIME * 6e4;

    res.json({
        data: `data:image/png;base64,${CURRENT_CHALLENGE}`,
    });
});

app.get("/codeTime", (req, res) => {
    startTime = startTime ?? new Date().getTime();
    endTime = endTime ?? startTime + TIME * 6e4;

    res.json({
        time: endTime,
    });
});

app.get("/submited", (req, res) => {
    return res.json({ users_submitted, time: endTime });
});

app.post("/submitCode", async (req, res) => {
    let { code, lang, uname } = req.body;

    code = code.replaceAll(/\n+/g, "\n");

    let codeLines;
    try {
        if (lang === "py") {
            codeLines = [...code.matchAll(/\n /g)].length + 1;
        } else {
            codeLines = prettier
                .format(code, {
                    semi: true,
                    parser: "babel",
                })
                .replaceAll("{", "")
                .replaceAll("}", "")
                .trim()
                .split("\n").length;
        }
    } catch (err) {
        console.log(`${uname}'s code errored`);
        return res.status(400).json("code error");
    }

    fs.writeFile(`code/${uname}.${lang}`, code, () => {
        console.log(`${uname} submited`);
    });

    // exec(`time -f python ./code/${uname}.${lang}`, (err, stdout, stderr) => {
    //     console.log(stdout);
    // });
    users_submitted.push({
        uname,
        codeLines,
        lang,
        time: new Date().getTime() - startTime,
    });

    io.sockets.emit("codeSubmit", users_submitted);

    return res.status(200).json("recived");
});

app.post("/submit", async (req, res) => {
    const { data, uname } = req.body;

    if (users_submitted.some((user) => user.uname === uname)) {
        return res.json({
            success: false,
            reason: "Already submitted please wait for the result",
        });
    }

    const original = await Jimp.read(Buffer.from(CURRENT_CHALLENGE, "base64"));
    const value = await Jimp.read(Buffer.from(data.split(",")[1], "base64"));

    let DIFF = 0;

    for (let i = 0; i < original.bitmap.data.length; i += 1) {
        const e = Math.abs(original.bitmap.data[i] - value.bitmap.data[i]);
        DIFF += e < 1 ? 0 : 255;
    }

    const error =
        (100 * (DIFF / (original.bitmap.data.length - 400 * 300))) / 255;

    const percentage = 100 - error;

    users_submitted.push({
        uname,
        percentage,
        time: new Date().getTime() - startTime,
    });

    io.sockets.emit("submit", users_submitted);

    //#51B5A9

    res.json({
        success: true,
        percentage: percentage,
    });
});

server.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});
