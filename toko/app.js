const express = require("express");
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const barangRouter = require("./src/barang/barang.controler");
const transaksiRouter = require("./src/transaksi/transaksi.controler");
const userRouter = require("./src/user/user.controler");
const cartRouter = require("./src/cart/cart.controler");
const barangNewRouter = require("./search/barang/barang.service");
const barangNewRouterCB = require("./search/barang/barang.serviceCallback");
const transaksiNewRouter = require("./search/transaksi/transaksi.service");
const userNewRouter = require("./search/user/user.service");
const adminNewRouter = require("./search/admin/admin.service");
const cartNewRouter = require("./search/cart/cart.service");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// function penambahanDuaAngka(angka1, angka2) {
//   return angka1 + angka2;
// }

// function pengkuadratanAngka1DenganAngka2(angka1, angka2) {
//   return angka1 ** angka2;
// }

// function operasiDuaAngka(angka1, angka2, fungsiOperasiAngka) {
//   const pi = 3.14;
//   return fungsiOperasiAngka(angka1, pi);
// }


// app.post("/kuadrat", (req, res) => {
//   const { angka1, angka2 } = req.body;
//   const hasilKuadrat = angka1 ** angka2;
//   res.json({ result: hasilKuadrat });
// });

// // Fungsi untuk menggabungkan dua string
// function gabungString(string1, string2, callback) {
//   const hasil = string1 + " " + string2;
//   callback(hasil); 
// }

// // Fungsi untuk menampilkan hasil
// function tampilkanHasil(hasil) {
//   console.log("Hasil: " + hasil);
// }

// app.post("/gabung", (req, res) => {
//   const { string1, string2 } = req.body;
//   gabungString(string1, string2, (hasil) => {
//     res.json({ result: hasil }); 
//   });
// });

// function doSomethingAsync(callback) {
//   setTimeout(function() {
//     const hasil = "Tugas selesai.";
//     callback(hasil);
//   }, 1000);
// }

// app.post("/sesuatu", (req, res) => {
//   doSomethingAsync((hasil) => {
//     res.json({ result: hasil }); 
//   });
// });


app.use("/", indexRouter);
app.use("/barang", barangRouter);
app.use("/transaksi", transaksiRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/barangNew", barangNewRouter);
app.use("/barangNewCB", barangNewRouterCB);
app.use("/transaksiNew", transaksiNewRouter);
app.use("/userNew", userNewRouter);
app.use("/adminNew", adminNewRouter);
app.use("/cartNew", cartNewRouter);
// app.get("/calback")
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
