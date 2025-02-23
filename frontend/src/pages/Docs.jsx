import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import contractInfo from '../../config/contractInfo.json'
import DocCard from '../components/DocCard'
import pako from 'pako'
import { HashLoader } from 'react-spinners'
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173'
const SECRET_KEY = import.meta.env.VITE_SECRET_KEY
import CryptoJS from 'crypto-js'

const Docs = ({ showAlert }) => {
  const [signer, setSigner] = useState(null)
  const [signerAddress, setSignerAddress] = useState('')
  const [docData, setDocData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const addr = await signer.getAddress()
        console.log('Signer address:', addr)
        console.log('wallet connected')
        setSigner(signer)
        setSignerAddress(addr)
      } catch (error) {
        console.error('Failed to connect wallet:', error)
      }
    } else {
      alert('Please install MetaMask!')
    }
  }
  const getContract = async (signer, contractInfo) => {
    try {
      const { address, abi } = contractInfo
      console.log('Address:', address)
      console.log('ABI:', contractInfo.abi)
      const contract = new ethers.Contract(address, abi, signer)
      console.log('contract fetch successfully')
      return contract
    } catch (e) {
      console.error(e)
    }
  }
  const getDocFromBackend = async (docData) => {
    const response = await fetch(`${API_BASE_URL}/protected/get-docs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ docData })
    })
    const result = await response.json()
    console.log('result', result)
    //inflating the document blob data
    result.forEach((doc) => {
      // Convert Base64 to ArrayBuffer
      const arrayBuffer = base64ToArrayBuffer(doc.ipfsData.data)
      // Decompress the ArrayBuffer using pako
      const decompressed = pako.inflate(arrayBuffer)

      // Create a Blob from the decompressed ArrayBuffer
      const blob = new Blob([decompressed], { type: 'application/pdf' })

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob)
      doc.ipfsData.url = url
    })
    return result
  }
  const generateDocUrl = (id) => {
    if (id) {
      console.log('id:', id)
      const idString = id.toString()
      // Encrypt the user address and document name
      const encryptedUserAddress = CryptoJS.AES.encrypt(
        signerAddress,
        SECRET_KEY
      ).toString()
      const encryptedDocId = CryptoJS.AES.encrypt(
        idString,
        SECRET_KEY
      ).toString()
      // Generate the shareable link with encrypted query parameters
      const shareableLink = `${API_URL}/shared-doc?userAddress=${encodeURIComponent(
        encryptedUserAddress
      )}&id=${encodeURIComponent(encryptedDocId)}`
      return shareableLink
    }
    return null
  }
  // Utility function to convert Base64 to ArrayBuffer
  const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64)
    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  }

  const handleTxn = async (signer, contractInfo, signerAddr) => {
    try {
      if (signer && contractInfo && signerAddr) {
        console.log('signer:', signer)
        console.log('signerAddr:', signerAddr)
        const contract = await getContract(signer, contractInfo)
        if (contract) {
          const tx = await contract.getUserDocuments(signerAddr)
          return tx
        }
      } else {
        console.log('signer or contractInfo not found')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const fetchDocs = async (signer, contractInfo, signerAddr) => {
    try {
      const txn = await handleTxn(signer, contractInfo, signerAddr)
      if (txn && txn.length) {
        const docData = []
        txn.forEach((result) => {
          console.log(result)
          const doc = {
            cid: result[0] || null,
            dbId: result[1] || null
          }
          docData.push(doc)
        })
        console.log(docData)
        const result = await getDocFromBackend(docData)
        console.log(result)
        setDocData(result)
        setLoading(false)
      }
    } catch (e) {
      console.error(e)
      setLoading(false)
      setError('No Documents found')
    }
  }

  useEffect(() => {
    connectWallet()
  }, [])

  useEffect(() => {
    fetchDocs(signer, contractInfo, signerAddress)
  }, [signer])
  return docData.length > 0 ? (
    <div className='flex flex-col items-center justify-center p-5 min-h-[80vh] flex-wrap gap-5 '>
      <h1 className='text-5xl font-sans'>Your Documents</h1>
      <div className='flex gap-5'>
        {docData.map((doc, index) => {
          return (
            <DocCard
              key={index}
              docUrl={doc.ipfsData.url}
              docName={doc.dbData.type}
              generateDocUrl={generateDocUrl}
              showAlert={showAlert}
              dbId={doc.dbData.id}
            />
          )
        })}
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-center w-[95vw] h-[80vh]'>
      {loading && <HashLoader color='#358fc3' />}
      {error && <h1 className='text-5xl'>{error}</h1>}
    </div>
  )
}

export default Docs
