const { json } = require('body-parser');
const {
  Router
} = require('express');

const client = require('../../koneksi.js');
const router = Router();
router.get('/queryDatabaseTransaksi', (req, res) => {
  client.query('SELECT * FROM transaksi')  // Use double quotes around "user"
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error querying the database', err);
      res.status(500).json({ error: 'Error querying the database' });
    });
});

router.post('/insertTransaksi', (req, res) => {
  const { jumlah_produk, total_harga } = req.body;

  const query = {
    text: 'INSERT INTO transaksi (jumlah_produk, total_harga) VALUES ($1, $2)', 
    values: [jumlah_produk, total_harga],
  };

  client.query(query)
    .then(() => {
      console.log('Data inserted successfully');
      res.status(201).json({ message: 'Data berhasil ditambahkan' });
    })
    .catch(err => {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
    });
});

router.put('/editTransaksi/:id', (req, res) => {
  const { jumlah_produk, total_harga } = req.body;
  const id_transaksi = req.params.id;

  const query = {
    text: 'UPDATE transaksi SET jumlah_produk = $1, total_harga = $2 WHERE id_transaksi = $3',  // Use double quotes around "user"
    values: [jumlah_produk, total_harga, id_transaksi],
  };

  client.query(query)
    .then(() => {
      res.json({ message: 'Data berhasil diubah' });
    })
    .catch(err => {
      console.error('Error editing data', err);
      res.status(500).json({ error: 'Error editing data' });
    });
});

 // Rute untuk menghapus produk berdasarkan ID
router.delete('/deleteTransaksi/:id', (req, res) => {
    const id_transaksi = req.params.id; 
  
    const query = {
      text: 'DELETE FROM transaksi WHERE id_transaksi = $1',
      values: [id_transaksi],
    };
  
    client.query(query)
      .then(() => {
        res.json({ message: 'Data berhasil dihapus' });
      })
      .catch(err => {
        console.error('Kesalahan saat menghapus data', err);
        res.status(500).json({ error: 'Kesalahan saat menghapus data' });
      });
  });

  module.exports = router;
