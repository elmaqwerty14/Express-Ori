const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/barang', async (req, res) => {

//   const barang = await prisma.barang.findMany({
//     select: {
//       id: true,
//       nama: true,
//       harga: true,
//       stok: true
//     },
//     orderBy: {
//       id: 'asc'
//     }
//   });
//   const data = barang.map((item) => {
//     return {
//       id: Number(item.id),
//       nama: item.nama,
//       harga: Number(item.harga),
//       stok: Number(item.stok),
//     }
//   });
//   return res.status(200).json({
//     data
//   });
// });

router.get('/barang', async (req, res) => {
  const {
    search
  } = req.query

  if(search){
  barang = await prisma.barang.findMany({
    select: {
      id: true,
      nama: true,
      harga: true,
      stok: true
    },
    where : {
      nama:{
        startsWith: `${search}`,
        mode: 'insensitive'
      }
    },
    orderBy: {
      id: 'asc'
    }
  });
}else{
    barang = await prisma.barang.findMany({
      select: {
        id: true,
        nama: true,
        harga: true,
        stok: true,
      },
      orderBy: {
        id: 'asc'
      }
    });
  }

const data = barang.map((item) => {
      return {
        id: Number(item.id),
        nama: item.nama,
        harga: Number(item.harga),
        stok: Number(item.stok),
      }
    });
    return res.status(200).json({
      data
    });
  });





router.get('/barang/:id', async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  const barangById = await prisma.barang.findUnique({
    where: { id: parseInt(id) }, // Menggunakan parseInt karena ID biasanya berupa angka
    select: {
      id: true,
      nama: true,
      harga: true,
      stok: true,
    },
  });

  // if (!barangById) {
  //   return res.status(404).json({
  //     message: "Barang tidak ditemukan",
  //   });
  // }

  return res.status(200).json({
    message: "Data barang berdasarkan id",
    data: barangById ? {
      id: Number(barangById.id),
      nama: barangById.nama,
      harga: Number(barangById.harga),
      stok: Number(barangById.stok),
    } : {}
  });
});


router.post('/tambahBarang', async (req, res) => {
  const {
    nama,
    harga,
    stok
  } = req.body;

  await prisma.barang.create({
    data: {
      nama: nama,
      harga: harga,
      stok: stok
    }
  });

  return res.status(200).json({
    message: "Data barang berhasil ditambahkan"
  });
});

// Route untuk mengedit data barang berdasarkan ID
router.put('/updateBarang/:id', async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL
  const { nama, harga, stok } = req.body; // Mengambil data yang akan diubah dari permintaan

  const updatedBarang = await prisma.barang.update({
    where: { id: parseInt(id) }, // Menggunakan parseInt karena ID biasanya berupa angka
    data: {
      nama,
      harga,
      stok,
    },
  });

  return res.status(200).json({
    message: "Data barang berhasil diubah",
    data: {
      id: Number(updatedBarang.id), 
      nama: updatedBarang.nama,
      harga: Number(updatedBarang.harga), 
      stok: Number(updatedBarang.stok), 
    },
  });
});

// Route untuk mengedit data barang berdasarkan ID
router.delete('/hapusBarang/:id', async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  await prisma.barang.delete({
    where: { id: parseInt(id) }, // Menggunakan parseInt karena ID biasanya berupa angka
  });

  return res.status(200).json({
    message: "Data barang berhasil dihapus",
  });
});

module.exports = router;
