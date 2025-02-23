import { ethers, JsonRpcProvider } from 'ethers'
import pako from 'pako'
import { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js'
import contractInfo from '../../config/contractInfo.json'
import { useLocation, useSearchParams } from 'react-router-dom'
import { use } from 'react'

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
const INFURA_URL = import.meta.env.VITE_INFURA_URL

const VerifierViewDoc = () => {
  const [docData, setDocData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const getContract = async (contractInfo) => {
    try {
      const { address, abi } = contractInfo
      console.log('Address:', address)
      console.log('ABI:', contractInfo.abi)
      const provider = new JsonRpcProvider(INFURA_URL)
      console.log('contract fetch successfully')
      return new ethers.Contract(address, abi, provider)
    } catch (e) {
      console.error(e)
    }
  }
  const getDocFromBackend = async (docData, docId) => {
    const response = await fetch(`${API_BASE_URL}/protected/get-docs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ docData, docId })
    })
    const result = await response.json()
    console.log('result', result)
    //inflating the document blob data
    result.forEach((doc) => {
      if (doc) {
        // Convert Base64 to ArrayBuffer
        const arrayBuffer = base64ToArrayBuffer(doc.ipfsData.data)
        // Decompress the ArrayBuffer using pako
        const decompressed = pako.inflate(arrayBuffer)

        // Create a Blob from the decompressed ArrayBuffer
        const blob = new Blob([decompressed], { type: 'application/pdf' })

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob)
        doc.ipfsData.url = url
      }
    })
    console.log(result)
    return result
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

  const handleTxn = async (contractInfo, signerAddr) => {
    try {
      if (contractInfo && signerAddr) {
        console.log('signerAddr:', signerAddr)
        const contract = await getContract(contractInfo)
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

  const fetchDocs = async (contractInfo, signerAddr, docId) => {
    try {
      const txn = await handleTxn(contractInfo, signerAddr)
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
        const result = await getDocFromBackend(docData, docId)
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
    let userAddress = searchParams.get('userAddress')
    let docId = searchParams.get('id')

    if (userAddress && docId) {
      userAddress = CryptoJS.AES.decrypt(userAddress, SECRET_KEY).toString(
        CryptoJS.enc.Utf8
      )
      docId = CryptoJS.AES.decrypt(docId, SECRET_KEY).toString(
        CryptoJS.enc.Utf8
      )
      console.log('userAddress:', userAddress, 'docId:', docId)
      fetchDocs(contractInfo, userAddress, docId)
    } else {
      setLoading(false)
      setError('Invalid query parameters')
    }
  }, [location.search])
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && docData.length > 0 && (
        <div className='flex items-center justify-center'>
          {docData.map((doc, index) => (
            <div key={index}>
              <iframe
                src={doc.ipfsData.url}
                className='h-[100vh] w-[90vw] rounded-xl m-2'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VerifierViewDoc
