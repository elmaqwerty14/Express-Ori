const { query } = require('express');
const {
    User
} = require('./user.enttity');

const getUser = (query) => {
    const data = User;
    if(!query.hasOwnProperty("password_user")){
    // console.log("test");
        return data;
    }
    console.log(data);
    console.log(query);

    const {
        password_user
    } = query;

    const filterData= data.filter((item) => item.password_user == password_user);
    return filterData;
}
const getUserByID = (id) => {
    const data = User;
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


const postUser = (input) => {
    const data = User;
    data.push({
        id: input.id,
        email_user: input.email_user,
        password_user: input.password_user
    });
    return data;
}



const updateUser = (id, input) => {
    const { 
        email_user,
        password_user
    } = input;

    const data = User;

    const indexData = data.findIndex((item) => item.id == id);

    if(indexData < 0){
        return null;
    }

    data[indexData].email_user = email_user;
    data[indexData].password_user = password_user;

    return data;
}

const deleteUser = (id) => {
    const data = User;
    const indexData = data.findIndex((item) => item.id == id);
    if(indexData < 0){
        return null;
    }

    // [1,2,3,4] splice jumlah data yang mau dihapus dari index
    data.splice(indexData, 1);
    return data;
}

module.exports = {
    getUser,
    getUserByID,
    postUser,
    deleteUser,
    updateUser
};