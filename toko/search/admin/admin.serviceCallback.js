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
  console.error('Kesalahan saat menjalankan kueri', err);
  res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
}

// Rute untuk menjalankan kueri ke database
app.get('/queryDatabase', (req, res) => {
  client.query('SELECT * FROM admin', (err, result) => {
    if (err) {
      handleDatabaseQueryError(err, res);
    } else {
      res.json(result.rows);
    }
  });
});

app.post('/insertAdmin', (req, res) => {
  const { ussername, password } = req.body;

  const query = {
    text: 'INSERT INTO produk (ussername, password) VALUES ($1, $2)',
    values: [ussername, password],
  };

  client.query(query, (err) => {
    if (err) {
      handleDatabaseQueryError(err, res);
    } else {
      res.status(201).json({ message: 'Data berhasil ditambahkan' });
    }
  });
});

// Rute untuk mengedit data dalam tabel barang
app.put('/editProduct/:id', (req, res) => {
  const { ussername, password } = req.body;
  const id_admin = req.params.id; // Ambil ID produk dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'UPDATE produk SET ussername = $1, password = $2 WHERE id_admin = $3',
    values: [ussername, password, id_admin],
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
