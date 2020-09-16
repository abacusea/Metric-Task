const multer = require("multer")
const path = require('path')

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
	  cb(null, './backend/uploads/')
	},
   filename: function(req, file, cb){
   		console.log(file)
      cb(null, (file.originalname));
   }
})

const upload = multer({
   storage: storage
})


module.exports = upload.single('pdf')