import { createReadStream, fstat, readFileSync, writeFileSync } from 'fs';
import express from "express";
import Jimp from 'jimp';

const app = express();

const PORT = 1337;

app.use(express.json());

app.use(express.static('./public'));

app.post('/submit', async (req, res) => {
    const { data } = req.body;
    
    const original = await Jimp.read(readFileSync('./public/img/6.png'));
    const value = await Jimp.read(Buffer.from(data.split(',')[1], 'base64'));

    let DIFF = 0;

    for(let i = 0; i < original.bitmap.data.length; i+=1){
        DIFF += Math.abs(original.bitmap.data[i] - value.bitmap.data[i]);
    }

    const percentage = 100 - (DIFF / original.bitmap.data.length)


    console.log(percentage);
    //#51B5A9

    res.json({
        success: true,
        percentage: percentage
    });
});

app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
});

