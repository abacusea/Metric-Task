const express = require("express")
const router = express.Router()
var fs = require('fs')
const File = require('../models/file')


const uploadMulter = require('./upload')

//Controller
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth")
const { userById } = require("../controllers/user")
const {
	create,
	list
} = require('../controllers/file')

router.post('/file/create/:userId', requireSignin, isAuth, uploadMulter, create)
router.get("/file/list/:userId", requireSignin, isAuth, list)

router.get('/download/:id', (req, res) =>{
	File.find({_id:req.params.id},(err,data) => {
		if(err) {
			console.log(err)
		}else {
			res.download(data[0].pdf)
		}
	})
})
  

router.param("userId", userById)

module.exports = router