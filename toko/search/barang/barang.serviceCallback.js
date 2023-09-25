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
    // Cek token di tabel admin
    const adminQuery = 'SELECT * FROM admin WHERE token = $1';
    const adminResult = await client.query(adminQuery, [token]);

    // Cek token di tabel pengguna (user)
    const userQuery = 'SELECT * FROM "user" WHERE token_user = $1';
    const userResult = await client.query(userQuery, [token]);

    if (adminResult.rows.length === 0 && userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Token tidak valid.' });
    }

    // Mendapatkan peran pengguna dari hasil query (misalnya, dari kolom 'role')
    const sesiRole = adminResult.rows.length > 0 ? 'admin' : 'user';

    // Menyimpan peran pengguna dalam objek req untuk digunakan di rute lainnya
    req.sesiRole = sesiRole;

    // Jika token valid, izinkan akses
    next();
  } catch (error) {
    console.error('Kesalahan saat memeriksa token:', error);
    res.status(500).json({ message: 'Kesalahan server.' });
  }
}

// Rute untuk menjalankan kueri ke database
router.get('/queryDatabase', (req, res) => {
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
router.post('/insertProduct', authenticate, (req, res) => {
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
  
  router.put('/editProduct/:id', authenticate, (req, res) => {
    const { nama_produk, harga_produk, stok_produk } = req.body;
    const id_produk = req.params.id; // Ambil ID produk dari parameter URL
  
    // Cek peran pengguna
    if (req.sesiRole !== 'admin') {
      return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengedit produk.' });
    }
  
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
  

// Rute untuk menghapus data produk berdasarkan id produk
router.delete('/deleteProduct/:id', authenticate, function (req, res) {
  const id_produk = req.params.id; // Ambil ID produk dari parameter URL

  const query = {
    text: 'DELETE FROM produk WHERE id_produk = $1',
    values: [id_produk],
  };

  client.query(query, (err) => {
    if (err) {
      console.error('Kesalahan saat menghapus data', err);
      res.status(500).json({ error: 'Kesalahan saat menghapus data' });
    } else {
      res.json({ message: 'Data berhasil dihapus' });
    }
  });
});

module.exports = router;
