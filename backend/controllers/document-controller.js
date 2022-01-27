const Document = require('../models/documentSchema')
const getDocumet = async (id) => {
    if(!id)return
    try {
        const document = await Document.findById(id)
        if(document)return document
        return await Document.create({_id: id,data: ""})
    } catch (error) {
        console.log(error)
        return
    }
}

const updateDocument = async (id,data)=> {
    try {
        return await Document.findByIdAndUpdate(id,{data})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getDocumet,
    updateDocument
}