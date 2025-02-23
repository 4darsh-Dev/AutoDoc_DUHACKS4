const express = require('express')
const { generateProof, verifyProof } = require('../controllers/proofController')
generateProof

const router = express.Router()

// route for issuer to upload document and then uploading it to pinata
router.post('/generate-proof', generateProof)
router.post('/verify-proof', verifyProof)
module.exports = router
