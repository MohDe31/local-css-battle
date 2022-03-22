import { readFileSync } from 'fs';
import express from "express";
import Jimp from 'jimp';
import { CURRENT_CHALLENGE } from './image.js';

const app = express();

const PORT = 1337;

app.use(express.json());

app.use(express.static('./public'));


app.get('/challenge', (req, res) => {
    res.json({
        data: CURRENT_CHALLENGE
    })
});

app.post('/submit', async (req, res) => {
    const { data } = req.body;
    
    const original = await Jimp.read(readFileSync('./public/img/6.png'));
    const value = await Jimp.read(Buffer.from(data.split(',')[1], 'base64'));

    let DIFF = 0;

    for(let i = 0; i < original.bitmap.data.length; i+=1){
        const e = Math.abs(original.bitmap.data[i] - value.bitmap.data[i]);
        DIFF += e < 1? 0: 255;
        
    }

    const error = 100 * (DIFF / (original.bitmap.data.length - (400*300))) / 255;

    const percentage = 100 - error;


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

