const { json } = require('body-parser');
const {
  Router
} = require('express');

const client = require('../../koneksi.js');
const { Client } = require('pg');
const router = Router();

async function authenticate(req, res, next) {
  const token = req.header('Authorization'); // Mengambil token dari header Authorization

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Anda belum terautentikasi.' });
  }

  try {
    // Cek token di database
    const query = 'SELECT * FROM admin WHERE token = $1';
    const result = await client.query(query, [token]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Token tidak valid.' });
    }

    // Jika token valid, izinkan akses
    next();
  } catch (error) {
    console.error('Kesalahan saat memeriksa token:', error);
    res.status(500).json({ message: 'Kesalahan server.' });
  }
}

// Rute untuk menjalankan kueri ke database
router.get('/queryDatabase', (req, res) => {
    client.query('SELECT * FROM produk')
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.error('Kesalahan saat menjalankan kueri', err);
        res.status(500).json({ error: 'Kesalahan saat menjalankan kueri' });
      });
  });

  router.post('/insertProduct', authenticate, (req, res) => {
    const { nama_produk, harga_produk, stok_produk } = req.body;

  
    const query = {
      text: 'INSERT INTO produk (nama_produk, harga_produk, stok_produk) VALUES ($1, $2, $3)',
      values: [nama_produk, harga_produk, stok_produk],
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
router.put('/editProduct/:id', authenticate, (req, res) => {
  const { nama_produk, harga_produk, stok_produk } = req.body;
  const id_produk = req.params.id; // Ambil ID produk dari parameter URL

  const query = {
    text: 'UPDATE produk SET nama_produk = $1, harga_produk = $2, stok_produk = $3 WHERE id_produk = $4',
    values: [nama_produk, harga_produk, stok_produk, id_produk],
  };

  client.query(query, (err) => {
    if (err) {
      console.error('Kesalahan saat mengubah data', err);
      res.status(500).json({ error: 'Kesalahan saat mengubah data' });
    } else {
      res.json({ message: 'Data berhasil diubah' });
    }
  });
});


// Rute untuk menghapus produk berdasarkan ID
router.delete('/deleteProduct/:id', authenticate, (req, res) => {
  const id_produk = req.params.id; // Ambil ID produk dari parameter URL

  Product.findById(id_produk, (err, findData) => {
    if (err) {
      console.error('Kesalahan saat mencari produk', err);
      return res.status(500).json({ error: 'Kesalahan saat mencari produk' });
    }

    if (!findData) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    findData.remove((err) => {
      if (err) {
        console.error('Kesalahan saat menghapus produk', err);
        return res.status(500).json({ error: 'Kesalahan saat menghapus produk' });
      }
      res.json({ message: 'Data berhasil dihapus' });
    });
  });
});

module.exports = router;
