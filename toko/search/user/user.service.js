const { json } = require('body-parser');
const {
  Router
} = require('express');

const client = require('../../koneksi.js');
const router = Router();

async function authenticate(req, res, next) {
  const token_user = req.header('Authorization'); // Mengambil token dari header Authorization

  if (!token_user) {
    return res.status(401).json({ message: 'Akses ditolak. Anda belum terautentikasi.' });
  }

  try {
    // Cek token di database
    const query = 'SELECT * FROM "user" WHERE token_user = $1';
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

router.get('/queryDatabaseUser', (req, res) => {
  client.query('SELECT * FROM "user"')  
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error('Error querying the database', err);
      res.status(500).json({ error: 'Error querying the database' });
    });
});

router.post('/insertUser', (req, res) => {
  const { nama_pembeli, token_user } = req.body;

  const query = {
    text: 'INSERT INTO "user" (nama_pembeli, token_user) VALUES ($1, $2)', 
    values: [nama_pembeli, token_user],
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

router.put('/editUser/:id', (req, res) => {
  const { nama_pembeli, token_user } = req.body;
  const id_pembeli = req.params.id;

  const query = {
    text: 'UPDATE "user" SET nama_pembeli = $1, token_user = $2 WHERE id_pembeli = $3', 
    values: [nama_pembeli, token_user, id_pembeli],
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
router.delete('/deleteUser/:id', (req, res) => {
  const id_pembeli = req.params.id; // Ambil ID produk dari parameter URL

  // Lakukan validasi data jika diperlukan

  const query = {
    text: 'DELETE FROM "user" WHERE id_pembeli = $1',
    values: [id_pembeli],
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

router.post('/registerUser', (req, res) => {
  const { nama_pembeli, token_user } = req.body;

  // Periksa apakah nama_pembeli atau token_user sudah terdaftar sebelumnya
  const checkQuery = {
    text: 'SELECT * FROM "user" WHERE nama_pembeli = $1 OR token_user = $2',
    values: [nama_pembeli, token_user],
  };

  client.query(checkQuery)
    .then(result => {
      if (result.rows.length > 0) {
        // Jika nama_pembeli atau token_user sudah terdaftar, kirim respons error
        res.status(400).json({ error: 'Nama pengguna atau token sudah terdaftar' });
      } else {
        // Jika tidak ada nama_pembeli atau token_user yang sama, maka proses dilanjutkan
        const insertQuery = {
          text: 'INSERT INTO "user" (nama_pembeli, token_user) VALUES ($1, $2)',
          values: [nama_pembeli, token_user],
        };

        client.query(insertQuery)
          .then(() => {
            console.log('Pendaftaran akun sukses silahkan login kembali');
            res.status(201).json({ message: 'Pendaftaran akun sukses silahkan login kembali' });
          })
          .catch(err => {
            console.error('Kesalahan saat mendaftarkan pengguna:', err);
            res.status(500).json({ error: 'Kesalahan saat mendaftarkan pengguna' });
          });
      }
    })
    .catch(err => {
      console.error('Kesalahan saat memeriksa pengguna yang sudah terdaftar:', err);
      res.status(500).json({ error: 'Kesalahan saat memeriksa pengguna yang sudah terdaftar' });
    });
});

// Route login user
router.post('/loginUser', (req, res) => {
  const { nama_pembeli, token_user } = req.body;

  // Periksa apakah nama_pembeli atau token_user sudah terdaftar sebelumnya
  const loginQuery = {
    text: 'SELECT * FROM "user" WHERE nama_pembeli = $1 AND token_user = $2',
    values: [nama_pembeli, token_user],
  };

  client.query(loginQuery)
    .then(result => {
      if (result.rows.length === 1) {
        // Login Berhasil
        res.status(200).json({ message: 'Anda berhasil Login'});
        //  // Login Berhasil
        //  const user = result.rows[0]; 
        //  res.status(200).json({ message: 'Anda berhasil Login', user });
      } else {
        // User authentication failed
        res.status(401).json({ error: 'Proses Login Gagal, silahkan login kembali.' });
      }
    })
    .catch(err => {
      console.error('Error saat Login:', err);
      res.status(500).json({ error: 'Error saat Login' });
    });
}); 


module.exports = router;