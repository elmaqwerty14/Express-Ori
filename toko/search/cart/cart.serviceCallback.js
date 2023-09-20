const client = require('../../koneksiClient.js');
const express = require("express");
const port = 3000;
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

client.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ' + error);
  }
});

// Handle database query errors
function handleDatabaseQueryError(err, res) {
  console.error('Error querying the database', err);
  res.status(500).json({ error: 'Error querying the database' });
}

app.get('/queryDatabaseCart', (req, res) => {
  client.query('SELECT * FROM keranjang', (err, result) => {
    if (err) {
      handleDatabaseQueryError(err, res);
    } else {
      res.json(result.rows);
    }
  });
});

app.post('/insertCart', (req, res) => {
  const { nama_produk, jumlah_produk, harga_produk } = req.body;

  const query = {
    text: 'INSERT INTO keranjang (nama_produk, jumlah_produk, harga_produk) VALUES ($1, $2, $3)',
    values: [nama_produk, jumlah_produk, harga_produk],
  };

  client.query(query, (err) => {
    if (err) {
      handleDatabaseQueryError(err, res);
    } else {
      res.status(201).json({ message: 'Data berhasil ditambahkan' });
    }
  });
});

app.put('/editCart/:id', (req, res) => {
  const { nama_produk, jumlah_produk, harga_produk } = req.body;
  const id_keranjang = req.params.id;

  const query = {
    text: 'UPDATE keranjang SET nama_produk = $1, jumlah_produk = $2, harga_produk = $3 WHERE id_keranjang = $4',
    values: [nama_produk, jumlah_produk, harga_produk, id_keranjang],
  };

  client.query(query, (err) => {
    if (err) {
      handleDatabaseQueryError(err, res);
    } else {
      res.json({ message: 'Data berhasil diubah' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
