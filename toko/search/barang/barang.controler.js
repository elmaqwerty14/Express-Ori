const { json } = require('body-parser');
const {
    getBarang,
    postBarang,
    deleteBarang,
    updateBarang,
    getBarangByID
} = require('./barang.service');

const {
    Router
} = require('express');

const router = Router();

router.get('/', (req, res) => {
    const queryParams = req.query;
  
    // Memanggil getBarang dengan objek query sebagai parameter
    const allItems = getBarang(queryParams);
  
    // Filter pencarian berdasarkan parameter query
    if (queryParams.nama) {
      const filteredItems = allItems.filter((item) =>
        item.nama.toLowerCase().includes(queryParams.nama.toLowerCase()) //LOWER CASE HURUF KECIL 
        // UPPERCASE HURUF BESAR
      );
      return res.status(200).json({
        data: filteredItems,
        statusCode: 200,
      });
    }

    //KEYS PROPERTI OBJECT ITU SAMA SAJA DI JS
    /*Metode Object.keys () dalam JavaScript mengembalikan array yang elemennya berupa string yang sesuai 
    dengan properti enumerable
    PENGGUNAANNYA : 
    let userDetails = {
      name: "John Doe",
      username: "jonnydoe",
      age: 14
    };

    let myEmptyObj = {};

    console.log(Object.keys(userDetails).length); // 3
    console.log(Object.keys(myEmptyObj).length); // 0
    
    */

  
    // Jika tidak ada filter, kirim semua data
    return res.status(200).json({
      data: allItems,
      statusCode: 200,
    });
  });

router.get('/:id', (req, res) => {
    const id = req.params.id;
    return res
       .status(200)
       .json({
        data: getBarangByID(id),
        statusCode: 200
    })
});
router.post('/', (req, res) => {
    const input = req.body;
    return res
       .status(201)
       .json({
        massage: "Berhasil input data",
        data: postBarang(input),
        statusCode: 201
    })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const input = req.body;
    
    return res
       .status(200)
       .json({
        data: updateBarang(id, input),
        statusCode: 200
       }
    );
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    return res
       .status(200)
       .json({
        data: deleteBarang(id),
        statusCode: 200
    })
});

module.exports = router;
