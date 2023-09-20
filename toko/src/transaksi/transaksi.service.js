const { query } = require('express');
const {
    Transaksi
} = require('./transaksi.enttity');

const getTransaksi = (query) => {
    const data = Transaksi;
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
const getTransaksiByID = (id) => {
    const data = Transaksi;
    const findData = data.find((item) => {
        if(item.id == id){
            return item;
        }
    });
    console.log(findData)
    if(!findData){
        return null;
    }
    return findData;
}


const postTransaksi = (input) => {
    const data = Transaksi;
    data.push({
        id: input.id,
        nama_produk: input.nama_produk,
        jmlh_produk: input.jmlh_produk
    });
    return data;
}



const updateTransaksi = (id, input) => {
    const { 
        nama_produk,
        jmlh_produk
    } = input;

    const data = Transaksi;

    const indexData = data.findIndex((item) => item.id == id);

    if(indexData < 0){
        return null;
    }

    data[indexData].nama_produk = nama_produk;
    data[indexData].jmlh_produk = jmlh_produk;

    return data;
}

const deleteTransaksi = (id) => {
    const data = Transaksi;
    const indexData = data.findIndex((item) => item.id == id);
    if(indexData < 0){
        return null;
    }

    // [1,2,3,4] splice jumlah data yang mau dihapus dari index
    data.splice(indexData, 1);
    return data;
}

module.exports = {
    getTransaksi,
    getTransaksiByID,
    postTransaksi,
    deleteTransaksi,
    updateTransaksi
};