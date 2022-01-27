const mongoose = require('mongoose')

const Connection = async ()=> {
    const url = process.env.MONGODB_URI || 'mongodb+srv://anubhav:E6b7Y3YsfH2oJzf9@cluster0.o4jbs.mongodb.net/DOCS-APP?retryWrites=true&w=majority'
    try {
        await mongoose.connect(url,{useUnifiedTopology:true, useNewUrlParser:true})
        console.log('connect success')
    } catch (error) {
        console.log(error)
    }
}
module.exports = Connection