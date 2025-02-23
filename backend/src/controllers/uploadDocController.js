const { pinata, auth } = require('../services/pinataService')
const fs = require('fs')
const { Blob, File } = require('blob-polyfill')
const path = require('path')
const prisma = require('../utils/prismaClient')

// Read the contractInfo.json file
const contractInfoPath = path.join(__dirname, '../../config/contractInfo.json')
const contractInfo = JSON.parse(fs.readFileSync(contractInfoPath, 'utf8'))

const uploadToIPFS = async (fileBuffer, fileName) => {
  try {
    const auth = await pinata.testAuthentication()
    const fileBlob = new Blob([fileBuffer], { type: 'application/pdf' })
    const file = new File([fileBlob], fileName, { type: 'application/pdf' })
    const options = {
      pinataMetadata: {
        name: fileName
      }
    }
    const upload = await pinata.upload.file(file, options)
    return upload
  } catch (err) {
    console.log(err)
    return err
  }
}
const uploadToDb = async (issuerAddr, ownerAddr, type) => {
  try {
    console.log(issuerAddr)
    if (issuerAddr) {
      const doc = await prisma.document.create({
        data: {
          ownerAddress: ownerAddr,
          issuerAddress: issuerAddr,
          type: type,
          expiryAt: new Date()
        }
      })
      return doc
    }
  } catch (err) {
    console.log(err)
    return err
  }
}
const uploadDoc = async (req, res) => {
  console.log('request received')
  const { issuerAddress, issuedTo: ownerAddr, docType: type, name } = req.body

  console.log(issuerAddress, ownerAddr, type)
  // Verify the signature
  // const message = JSON.stringify(data);
  // const recoveredAddress = ethers.utils.verifyMessage(message, signature);

  // if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
  //   return res.status(400).json({ error: 'Invalid signature' });
  // }

  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }

  const fileName = req.file.originalname
  const fileBuffer = req.file.buffer
  try {
    console.log('inside try')
    //uploading doc to ipfs and pinning
    const upload = await uploadToIPFS(fileBuffer, fileName)
    console.log(upload, 'doc successfully uploaded to ipfs')
    const cid = upload.IpfsHash

    //uploading doc to db
    const doc = await uploadToDb(issuerAddress, ownerAddr, type)
    const dbId = doc.id
    console.log(doc, 'doc successfully uploaded to db')

    //updating blockchain
    // const tx = await callIssueDocument(signer, cid, ownerAddr, doc.id)
    // console.log(tx, 'doc successfully uploaded to blockchain')
    const resData = {
      cid: cid,
      dbId: dbId,
      contractInfo: contractInfo
    }
    res.status(200).json(resData)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}
module.exports = {
  uploadDoc
}
