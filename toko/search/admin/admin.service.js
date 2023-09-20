const { json } = require('body-parser');
const {
  Router
} = require('express');

const client = require('../../koneksi.js');
const router = Router();

// Rute untuk menjalankan kueri ke database
router.get('/queryDatabase', (req, res) => {
    client.query('SELECT * FROM admin')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  router.post('/insertAdmin', (req, res) => {
    const { ussername, password } = req.body;

  
    const query = {
      text: 'INSERT INTO produk (ussername, password) VALUES ($1, $2)',
      values: [ussername, password],
    };
  
    client.query(query)
      .then(() => {
        res.status(201).json({ message: 'Data berhasil ditambahkan' });
      })
      .catch(err => {
        console.error('Kesalahan saat mengimput data', err);
        res.status(500).json({ error: 'Kesalahan saat mengimput data' });
      });
  });

// Rute untuk mengedit data dalam tabel barang
router.put('/editAdmin/:id', (req, res) => {
    const { ussername, password } = req.body;
    const id_admin = req.params.id; // Ambil ID produk dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE produk SET ussername = $1, password = $2 WHERE id_admin = $3',
      values: [ussername, password, id_admin],
    };
  
    client.query(query)
      .then(() => {
        res.json({ message: 'Data berhasil diubah' });
      })
      .catch(err => {
        console.error('Kesalahan saat mengedit data', err);
        res.status(500).json({ error: 'Kesalahan saat mengedit data' });
      });
  });
  
 // Rute untuk menghapus produk berdasarkan ID
 router.delete('/deleteAdmin/:id', (req, res) => {
  const id_admin = req.params.id; // Ambil ID produk dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM admin WHERE id_admin = $1',
    values: [id_admin],
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
