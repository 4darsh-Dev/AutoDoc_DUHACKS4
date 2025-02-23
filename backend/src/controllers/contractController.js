//no work of this module for now as contract interactions are done from frontend
const fs = require('fs')
const path = require('path')
const { ethers } = require('ethers')
// Read the contractInfo.json file
const contractInfoPath = path.join(__dirname, '../../config/contractInfo.json')
const contractInfo = JSON.parse(fs.readFileSync(contractInfoPath, 'utf8'))

const getContract = async (signer) => {
  try {
    const contract = new ethers.Contract(contractInfo.address, contractInfo.abi)
    return contract
  } catch (e) {
    console.error(e)
  }
}
const callIssueDocument = async (signer, cid, ownerAddress, dbId) => {
  const contract = await getContract(signer)
  const tx = await contract.issueDocument(cid, ownerAddress, dbId)
}
module.exports = { callIssueDocument }
