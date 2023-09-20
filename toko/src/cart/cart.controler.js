const { json } = require('body-parser');
const {
    getCart,
    postCart,
    deleteCart,
    updateCart,
    getCartByID
} = require('./cart.service');

const {
    Router
} = require('express');

const router = Router();

// router.get('/', (req, res) => {
//     return res.json({
//         data: getCart(),
//         statusCode: 200
//     }, 200)
// });

router.get('/', (req, res) => {
    const queryParams = req.query;
    return res
       .status(200)
       .json({
        data: getCart(queryParams),
        statusCode: 200
    })
});
router.get('/:id', (req, res) => {
    const id = req.params.id;
    return res
       .status(200)
       .json({
        data: getCartByID(id),
        statusCode: 200
    })
});
router.post('/', (req, res) => {
    const input = req.body;
    return res
       .status(201)
       .json({
        massage: "Berhasil input data",
        data: postCart(input),
        statusCode: 201
    })
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;
    const input = req.body;
    
    return res
       .status(200)
       .json({
        data: updateCart(id, input),
        statusCode: 200
       }
    );
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    return res
       .status(200)
       .json({
        data: deleteCart(id),
        statusCode: 200
    })
});




module.exports = router;