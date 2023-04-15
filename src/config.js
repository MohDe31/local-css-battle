import * as fs from "fs";

function getB64(fn) {
    const buffer = fs.readFileSync(`src/content/${fn}`);
    const b64 = buffer.toString("base64");
    return b64;
}

// In minutes

const C1 = getB64("1.png");
const C2 = getB64("2.png");
const C3 = getB64("3.png");
const C4 = getB64("4.png");
const C5 = getB64("5.png");

export const CURRENT_CHALLENGE = C5;
export const TIME = 5;
