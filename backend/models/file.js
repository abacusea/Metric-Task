var mongoose = require('mongoose')


const fileSchema = new mongoose.Schema({
	username: String,
    pdf: String
})

module.exports = mongoose.model("File",fileSchema)