const File = require('../models/file')
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    let username = req.body.username

    const file = new File({
        username: username,
        pdf: req.file.path
    })
    file.save((err, file) => {
        console.log(file)
        if (err) {
            console.log(err)
            return res.status(400).json({
                errors: err.meesage
            })
        }
        return res.json({
            message: "Created file successfully",
            file
        })
        
    })

}

exports.list = (req,res) => {
    File.find()
        .exec((err, files) => {
            if(err) {
                return res.status(400).json({
                    error: errorHandler(error)
                })
            }
            res.json(files)
        })
}

