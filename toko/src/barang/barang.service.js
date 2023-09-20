const { Barang } = require('./barang.enttity');

const getBarang = (query) => {
    const data = Barang;
  
    // Inisialisasi filterData dengan semua data
    let filterData = data;
  
    if (query.hasOwnProperty('stok')) {
      const { stok } = query;
      
      // Filter data berdasarkan stok jika query 'stok' ada
      filterData = filterData.filter((item) => item.stok == stok);
    }
  
    if (query.hasOwnProperty('nama')) {
      const { nama } = query;
  
      // Filter data berdasarkan nama jika query 'nama' ada
      filterData = filterData.filter((item) => item.nama.toLowerCase().includes(nama.toLowerCase()));
    }
  
    return filterData;
}

const getBarangByID = (id) => {
    const data = Barang;
    const findData = data.find((item) => {
        if (item.id == id) {
            return item;
        }
    });
    if (!findData) {
        return null;
    }
    return findData;
}

const postBarang = (input) => {
    const data = Barang;
    data.push({
        id: input.id,
        nama: input.nama,
        stok: input.stok
    });
    return data;
}

const updateBarang = (id, input) => {
    const { 
        nama,
        stok
    } = input;

    const data = Barang;

    const indexData = data.findIndex((item) => item.id == id);

    if (indexData < 0) {
        return null;
    }

    data[indexData].nama = nama;
    data[indexData].stok = stok;

    return data;
}

const deleteBarang = (id) => {
    const data = Barang;
    const indexData = data.findIndex((item) => item.id == id);
    if (indexData < 0) {
        return null;
    }

    // Menghapus satu elemen dari array menggunakan splice
    data.splice(indexData, 1);
    return data;
}

module.exports = {
    getBarang,
    getBarangByID,
    postBarang,
    deleteBarang,
    updateBarang
};
