const express = require('express');
// const pool = require('./connection.js');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());


app.get('/',(req,res,next) =>{ // tanda / fungsi untuk mengdifine rooting default
    return res.send(`<h>Hello world</h>`);
});

app.get('/tambah', (req,res) => {
    const input = {
        nama,
        stok
    } = req.body;
    console.log(req.headers);
    console.log(req.headers['token']);
    return res.json({
        message: "Berhasil menambahkan",
        data: input
    });
})

app.listen(port, () => {
    console.log(`App running at ${port}`);
});