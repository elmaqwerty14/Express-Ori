const client = require('../../koneksiClient.js');
const express = require("express");
const port = 3001;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
  
client.connect(handleError);

function handleError(error) {
  if (error) {
    console.error('Error connecting to database: ' + error);
  }
}

// Rute untuk menjalankan kueri ke database
app.get('/queryDatabase', (req, res) => {
    client.query('SELECT * FROM produk', (err, result) => {
      if (err) {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      } else {
        res.json(result.rows);
      }
    });
  });

/* Disini callback function digunakan untuk menangani hasil atau kesalahan yang mungkin terjadi saat 
menjalankan query database dan untuk mengirimkan respons HTTP yang sesuai. 
Jika query database berhasil tanpa kesalahan, maka callback function yang menggunakan (err) => { ... } akan 
mengeksekusi kode dalam blok else { ... }. Dalam kasus ini, kode tersebut mengirimkan respons JSON yang 
berisi pesan "Data berhasil ditambahkan" yang menunjukkan bahwa operasi penambahan data berhasil. 
Jika gagal maka sebaliknya.
*/

// Rute untuk menjalankan neambah data produk ke database
app.post('/insertProduct', (req, res) => {
    const { nama_produk, harga_produk, stok_produk } = req.body;

    const query = {
      text: 'INSERT INTO produk (nama_produk, harga_produk, stok_produk) VALUES ($1, $2, $3)',
      values: [nama_produk, harga_produk, stok_produk],
    };
  
    client.query(query, (err) => {
      if (err) {
        console.error('Kesalahan saat mengimput data', err);
        res.status(500).json({ error: 'Kesalahan saat mengimput data' });
      } else {
        res.status(201).json({ message: 'Data berhasil ditambahkan' });
      }
    });
  });
  
// Rute untuk mengedit data produk berdasarkan id produk
app.put('/editProduct/:id', (req, res) => {
  const { nama_produk, harga_produk, stok_produk } = req.body;
  const id_produk = req.params.id; // Ambil ID produk dari parameter URL

  const query = {
    text: 'UPDATE produk SET nama_produk = $1, harga_produk = $2, stok_produk = $3 WHERE id_produk = $4',
    values: [nama_produk, harga_produk, stok_produk, id_produk],
  };

  client.query(query, (err) => {
    if (err) {
      console.error('Kesalahan saat mengedit data', err);
      res.status(500).json({ error: 'Kesalahan saat mengedit data' });
    } else {
      res.json({ message: 'Data berhasil diubah' });
    }
  });
});

  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

