const { query } = require('express');
const {
    Cart
} = require('./cart.enttity');

const getCart = (query) => {
    const data = Cart;
    if(!query.hasOwnProperty("jmlh_produk")){
    // console.log("test");
        return data;
    }
    console.log(data);
    console.log(query);

    const {
        jmlh_produk
    } = query;

    const filterData= data.filter((item) => item.jmlh_produk == jmlh_produk);
    return filterData;
}
const getCartByID = (id) => {
    const data = Cart;
    const findData = data.find((item) => {
        if(item.id == id){
            return item;
        }
    });
    // console.log(findData)
    if(!findData){
        return null;
    }
    return findData;
}


const postCart = (input) => {
    const data = Cart;
    data.push({
        id: input.id,
        nama_produk: input.nama_produk,
        jmlh_produk: input.jmlh_produk
    });
    return data;
}



const updateCart = (id, input) => {
    const { 
        nama_produk,
        jmlh_produk
    } = input;

    const data = Cart;

    const indexData = data.findIndex((item) => item.id == id);

    if(indexData < 0){
        return null;
    }

    data[indexData].nama_produk = nama_produk;
    data[indexData].jmlh_produk = jmlh_produk;

    return data;
}

const deleteCart = (id) => {
    const data = Cart;
    const indexData = data.findIndex((item) => item.id == id);
    if(indexData < 0){
        return null;
    }

    // [1,2,3,4] splice jumlah data yang mau dihapus dari index
    data.splice(indexData, 1);
    return data;
}

module.exports = {
    getCart,
    getCartByID,
    postCart,
    deleteCart,
    updateCart
};