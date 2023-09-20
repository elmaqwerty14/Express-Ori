const { json } = require('body-parser');
const {
  Router
} = require('express');

const client = require('../../koneksi.js');
const router = Router();
// Rute untuk menjalankan kueri ke database
router.get('/queryDatabaseCart', (req, res) => {
    client.query('SELECT * FROM keranjang')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  router.post('/insertCart', (req, res) => {
    const { nama_produk, jumlah_produk, harga_produk } = req.body;

  
    const query = {
      text: 'INSERT INTO keranjang (nama_produk, jumlah_produk, harga_produk) VALUES ($1, $2, $3)',
      values: [nama_produk, jumlah_produk, harga_produk],
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
router.put('/editCart/:id', (req, res) => {
    const { nama_produk, jumlah_produk, harga_produk } = req.body;
    const id_keranjang = req.params.id; // Ambil ID keranjang dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'UPDATE keranjang SET nama_produk = $1, jumlah_produk = $2, harga_produk = $3 WHERE id_keranjang = $4',
      values: [nama_produk, jumlah_produk, harga_produk, id_keranjang],
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
 router.delete('/deleteCart/:id', (req, res) => {
    const id_keranjang = req.params.id; // Ambil ID produk dari parameter URL
  
    // Lakukan validasi data jika diperlukan
  
    const query = {
      text: 'DELETE FROM keranjang WHERE id_keranjang = $1',
      values: [id_keranjang],
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

