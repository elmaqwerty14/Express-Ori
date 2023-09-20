const pool = require("./koneksi.js");
const express = require("express");
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
  
function handleError(error){
    if(error) {
      console.error("Error connecting to database: "+ error)
    }
   }
   pool.connect(handleError);
  
//   pool.query('SELECT * FROM produk')
//     .then(result => {
//       // Lakukan sesuatu dengan hasil kueri di sini
//       console.log(result.rows);
//     })
//     .catch(err => {
//       console.error('Kesalahan saat menjalankan kueri', err);
//     });


// Rute untuk menjalankan kueri ke database
app.get('/queryDatabase', (req, res) => {
    pool.query('SELECT * FROM produk')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  app.post('/insertProduct', (req, res) => {
    const { nama_produk, harga_produk, stok_produk } = req.body;
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'INSERT INTO produk (nama_produk, harga_produk, stok_produk) VALUES ($1, $2, $3)',
      values: [nama_produk, harga_produk, stok_produk],
    };
  
    pool.query(query)
      .then(() => {
        res.status(201).json({ message: 'Data berhasil ditambahkan' });
      })
      .catch(err => {
        console.error('Kesalahan saat mengimput data', err);
        res.status(500).json({ error: 'Kesalahan saat mengimput data' });
      });
  });

// Rute untuk mengedit data dalam tabel barang
app.put('/editProduct/:id', (req, res) => {
    const { nama_produk, harga_produk, stok_produk } = req.body;
    const id_produk = req.params.id; // Ambil ID produk dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE produk SET nama_produk = $1, harga_produk = $2, stok_produk = $3 WHERE id_produk = $4',
      values: [nama_produk, harga_produk, stok_produk, id_produk],
    };
  
    pool.query(query)
      .then(() => {
        res.json({ message: 'Data berhasil diubah' });
      })
      .catch(err => {
        console.error('Kesalahan saat mengedit data', err);
        res.status(500).json({ error: 'Kesalahan saat mengedit data' });
      });
  });
  
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

