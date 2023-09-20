const { json } = require('body-parser');
const {
    getTransaksi,
    postTransaksi,
    deleteTransaksi,
    updateTransaksi,
    getTransaksiByID
} = require('./transaksi.service');

const {
    Router
} = require('express');

const router = Router();

// router.get('/', (req, res) => {
//     return res.json({
//         data: getTransaksi(),
//         statusCode: 200
//     }, 200)
// });

router.get('/', (req, res) => {
    const queryParams = req.query;
    return res
       .status(200)
       .json({
        data: getTransaksi(queryParams),
        statusCode: 200
    })
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    return res
       .status(200)
       .json({
        data: getTransaksiByID(id),
        statusCode: 200
    })
});
router.post('/', (req, res) => {
    const input = req.body;
    return res
       .status(201)
       .json({
        massage: "Berhasil input data",
        data: postTransaksi(input),
        statusCode: 201
    })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const input = req.body;
    
    return res
       .status(200)
       .json({
        data: updateTransaksi(id, input),
        statusCode: 200
       }
    );
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    return res
       .status(200)
       .json({
        data: deleteTransaksi(id),
        statusCode: 200
    })
});




module.exports = router;