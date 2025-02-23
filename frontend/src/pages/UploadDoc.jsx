import { useState } from 'react'
import { ethers } from 'ethers'

// const API_URL = "http://localhost:5000"

// PRODUCTION ONLY
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const IssueDocumentForm = ({ showAlert }) => {
  const [issuedTo, setIssuedTo] = useState('')
  const [docType, setDocType] = useState('')
  const [signer, setSigner] = useState(null)
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [issuerAddress, setIssuerAddress] = useState('')
  const docTypes = ['Certificate', 'License', 'Contract', 'Report']

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const IssuerAddr = await signer.getAddress()
        console.log('Signer address:', IssuerAddr)
        setSigner(signer)
        setIssuerAddress(IssuerAddr)
      } catch (error) {
        'error'('Failed to connect wallet!', 'error')
        console.error('Failed to connect wallet:', error)
      }
    } else {
      'error'('Please install MetaMask!', 'error')
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      setFileName(e.target.files[0].name)
    }
  }

  // const signData = async (data) => {
  //   // Convert the data object to a JSON string
  //   const message = JSON.stringify(data)

  //   // Sign the JSON string
  //   const signature = await signer.signMessage(message)
  //   return signature
  // }

  const getContract = async (signer, contractInfo) => {
    try {
      if (signer && contractInfo) {
        const { address, abi } = contractInfo
        console.log(address, abi)
        const contract = new ethers.Contract(address, abi, signer)
        console.log('contract fetch successfully')
        return contract
      }
    } catch (e) {
      console.error(e)
    }
  }
  const handleTxn = async (signer, cid, ownerAddress, dbId, contractInfo) => {
    try {
      const contract = await getContract(signer, contractInfo)
      if (contract) {
        const tx = await contract.issueDocument(ownerAddress, cid, String(dbId))
        return tx
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      showAlert('Please select a file first!', 'error')
      return
    }
    if (!issuedTo || !docType) {
      showAlert('Please fill in all fields!', 'error')
      return
    }
    if (!signer || !issuerAddress) {
      showAlert('Please connect wallet first!', 'error')
      return
    }

    // const signature = await signData(data)
    const formData = new FormData()
    formData.append('issuedTo', issuedTo)
    formData.append('docType', docType)
    // formData.append(signature)
    formData.append('issuerAddress', issuerAddress)
    formData.append('file', file)
    formData.append('fileName', fileName)
    console.log(formData)
    try {
      const response = await fetch(API_URL + '/api/upload-doc', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        const { cid, dbId, contractInfo } = data
        if (cid || dbId || contractInfo) {
          const txn = await handleTxn(signer, cid, issuedTo, dbId, contractInfo)
          console.log('Transaction:', txn)
          console.log('File uploaded successfully:', data)
        } else {
          console.error('missing cid, dbId or contractInfo')
        }
      } else {
        console.error('File upload failed:', response.statusText)
      }
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  }

  return (
    <div className='w-[30vw] mx-auto my-10 p-6 bg-white rounded-lg shadow-xl'>
      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
        Issue Document
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4 flex flex-col gap-5'>
        <div>
          <label
            htmlFor='issuedTo'
            className='block text-sm font-medium text-gray-700'
          >
            Issued To
          </label>
          <input
            type='text'
            id='issuedTo'
            value={issuedTo}
            onChange={(e) => setIssuedTo(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border'
            required
          />
        </div>
        <div>
          <label
            htmlFor='docType'
            className='block text-sm font-medium text-gray-700'
          >
            Type of Document
          </label>
          <select
            id='docType'
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 border '
            required
          >
            <option value=''>Select a document type</option>
            {docTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor='file'
            className='block text-sm font-medium text-gray-700'
          >
            Upload File
          </label>
          <input
            type='file'
            id='file'
            onChange={handleFileChange}
            className='mt-1 block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-50 file:text-blue-700
      hover:file:bg-blue-100 '
          />
        </div>
        <div className='flex space-x-4'>
          <button
            type='button'
            onClick={connectWallet}
            className='flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
          >
            Connect Wallet
          </button>
          <button
            type='submit'
            disabled={!signer}
            className='flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
          >
            Issue
          </button>
        </div>
      </form>
      {signer && (
        <p className='mt-4 text-sm text-gray-600'>
          Wallet Connected Successfully
        </p>
      )}
    </div>
  )
}

export default IssueDocumentForm
