import express from "express";

const app = express();

const PORT = 1337;

app.use(express.static('./public'))


app.listen(PORT, function(){
    console.log(`Listening on port ${PORT}`);
});