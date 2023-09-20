const client = require('../../koneksiClient.js');
const express = require("express");
const port = 3003;
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

app.get('/queryDatabaseTransaksi', (req, res) => {
  client.query('SELECT * FROM transaksi', (err, result) => {
    if (err) {
      handleDatabaseQueryError(err, res);
    } else {
      res.json(result.rows);
    }
  });
});

app.post('/insertTransaksi', (req, res) => {
  const { jumlah_produk, total_harga } = req.body;

  const query = {
    text: 'INSERT INTO transaksi (jumlah_produk, total_harga) VALUES ($1, $2)',
    values: [jumlah_produk, total_harga],
  };

  client.query(query, (err) => {
    if (err) {
      handleDatabaseQueryError(err, res);
    } else {
      console.log('Data inserted successfully');
      res.status(201).json({ message: 'Data berhasil ditambahkan' });
    }
  });
});

app.put('/editTransaksi/:id', (req, res) => {
  const { jumlah_produk, total_harga } = req.body;
  const id_transaksi = req.params.id;

  const query = {
    text: 'UPDATE transaksi SET jumlah_produk = $1, total_harga = $2 WHERE id_transaksi = $3',
    values: [jumlah_produk, total_harga, id_transaksi],
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
