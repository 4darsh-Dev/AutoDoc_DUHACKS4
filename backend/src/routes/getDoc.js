const express = require('express')
const getDoc = require('../controllers/getDocController')

const router = express.Router()

// route for issuer to upload document and then uploading it to pinata
router.post('/get-docs', getDoc)
module.exports = router
