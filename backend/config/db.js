const mongoose = require('mongoose')

const configureDB = async () => {
    try{
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/nkc')
        console.log('connecting to db')
    }catch(e){
        alert(e.message)
    }
}
module.exports = configureDB