import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Jimp from "jimp";
import { CURRENT_CHALLENGE } from "./image.js";

const app = express();

const server = createServer(app);

const io = new Server(server);

const PORT = 1337;

app.use(express.json());

app.use(express.static("./public"));

io.on("connection", (socket) => {
  const users_submitted = [];

  app.get("/challenge", (req, res) => {
    res.json({
      data: `data:image/png;base64,${CURRENT_CHALLENGE}`,
    });
  });

  app.get("/submited", (req, res) => {
    return res.json({ users_submitted });
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

    users_submitted.push({ uname, percentage });

    socket.broadcast.emit("submit", { uname, percentage });

    //#51B5A9

    res.json({
      success: true,
      percentage: percentage,
    });
  });
});

server.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
