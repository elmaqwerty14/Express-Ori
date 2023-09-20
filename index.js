const express = require('express');
const pool = require('./connection.js');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

// app.get('/', (req, res) => {
//   // query database
//   pool.query('SELECT * FROM tabelpertama', (error, results) => {
//     if (error) {
//       throw error;un
//     }
//     res.send(results.rows);
//   });
// })

// // app.get ('/', function (req, res) {
// //    res.send('Hello World!')
// // })

// // app.listen(port, () => {
// //   console.log(`Example app listening on port ${port}`)
// // })

// app.listen(port, function()  {
//   console.log(`Example app listening on port ${port}`)
// })

// const express = require("express");
// import express from 'express';
// // const {} = require('express'); // Cara lain import,  kalau mau tau file apa saja yang bisa di 
//                               //  --- import pake CTRL + SPASI

// // const pool = require("./connection.js"); // require berarti pake comen js
// import pool from './connection.js';

// const app = express();
// const port = 3000;
//  console.log(pool);

// import { hi } from  "./latihan.mjs"
// console.log(hi())
// import { hello } from  "./latihan.mjs"
// console.log(hello())

app.get("/", (req, res) => {
    // query database
    let id = 5;
    pool.query('SELECT * FROM produk', (error, results) => {
      if (error) {
        throw error;
      }
      console.log(results);
  
      const dataIni = [];
      results.rows.forEach((item) => {
        dataIni.push({
            nama_produk: item.nama_produk,
            harga_produk: Number(item.harga_produk * 2)
        });
      });
  
      res.send(dataIni);
    });
  });

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

// NOTE : how to run file
// npm run start : menjalankan key start -> node index.mjs
// node index.mjs
