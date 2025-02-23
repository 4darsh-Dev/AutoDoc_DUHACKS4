const express = require('express')
const checkPermissions = require('../middlewares/checkPermissions')
const { uploadDoc } = require('../controllers/uploadDocController')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const router = express.Router()

const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

// route for issuer to upload document and then uploading it to pinata
router.post('/upload-doc', upload.single('file'), uploadDoc)
module.exports = router
