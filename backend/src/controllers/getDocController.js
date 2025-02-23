const { pinata, auth } = require('../services/pinataService')
const prisma = require('../utils/prismaClient')
const pako = require('pako')

// Utility function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer) => {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

const getDoc = async (req, res) => {
  try {
    const { docData, docId = null } = req.body

    console.log('docData:', docData)
    if (docData) {
      //getting data from ipfs and db by iterating over the array
      const filePromises = docData.map(async (doc) => {
        let dbData = ''
        if (docId) {
          if (doc.dbId === docId) {
            console.log('docId:', docId)
            dbData = await prisma.document.findUnique({
              where: { id: parseInt(docId) }
            })
          } else {
            console.log(docId, 'docId')
            return
          }
        } else {
          console.log(doc.dbId)
          dbData =
            doc.dbId === 'undefined'
              ? ''
              : await prisma.document.findUnique({
                  where: { id: parseInt(doc.dbId) }
                })
        }
        console.log('dbData:', dbData)
        const ipfsData = await pinata.gateways.get(doc.cid)

        // Convert Blob to ArrayBuffer
        // console.log('ipfsData', ipfsData)
        const arrayBuffer = await ipfsData.data.arrayBuffer()
        // Calculate original size
        const originalSize = arrayBuffer.byteLength
        // Compress the ArrayBuffer using pako
        const compressed = pako.deflate(arrayBuffer)
        // Calculate compressed size
        const compressedSize = compressed.byteLength
        // Calculate compression ratio and percentage
        const compressionRatio = originalSize / compressedSize
        const compressionPercentage =
          ((originalSize - compressedSize) / originalSize) * 100
        // console.log(`Original Size: ${originalSize} bytes`)
        // console.log(`Compressed Size: ${compressedSize} bytes`)
        // console.log(`Compression Ratio: ${compressionRatio.toFixed(2)}`)
        // console.log(
        //   `Compression Percentage: ${compressionPercentage.toFixed(2)}%`
        // )
        // Convert the compressed data to Base64
        const base64Data = arrayBufferToBase64(compressed)
        return {
          ipfsData: { data: base64Data, contentType: ipfsData.contentType },
          dbData
        }
      })
      // Wait for all promises to resolve
      const files = await Promise.all(filePromises)
      // Filter out any null entries
      const filteredFiles = files.filter(
        (file) => file !== null && file !== undefined && file !== ''
      )
      console.log(files, 'files')
      res.status(200).json(filteredFiles)
    }
  } catch (error) {
    console.error('Error fetching documents:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
module.exports = getDoc
