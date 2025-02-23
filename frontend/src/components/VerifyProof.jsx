import { useState } from 'react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { verifyProof } from '../api'

const VerifyProof = ({ showAlert }) => {
  const [error, setError] = useState(null)
  const [qrData, setQrData] = useState(null)
  const [isScanning, setIsScanning] = useState(null)
  const handleScan = async (data) => {
    console.log(data, 'data')
    if (data) {
      try {
        const { proof, publicSignals } = JSON.parse(data[0].rawValue)
        // setQrData({ proof, publicSignals })
        console.log(proof, publicSignals, 'proof, publicSignals')
        console.log('sending request')
        const res = await verifyProof({ proof, publicSignals })
        if (res.ok) {
          showAlert('Vola! Proof verified', 'success')
        } else {
          showAlert('Proof verification failed', 'error')
        }
        const Resdata = await res.json()
        console.log(Resdata, 'data')
      } catch (err) {
        showAlert('Proof verification failed', 'error')
        console.error(err)
      }
    }
  }

  const handleError = (err) => {
    setError('Failed to scan QR code')
    console.error(err)
  }

  return (
    <div className='flex flex-col items-center my-5 gap-5'>
      {isScanning ? (
        <span
          className='btn'
          onClick={() => {
            setIsScanning(false)
            setError(null)
          }}
        >
          Stop Scanning
        </span>
      ) : (
        <span
          className='btn '
          onClick={() => {
            setIsScanning(true)
            setError(null)
          }}
        >
          Start Scanning
        </span>
      )}
      {isScanning && (
        <div className='h-[300px] w-[300px]'>
          <Scanner
            scanDelay={300}
            onScan={handleScan}
            onError={handleError}
            paused={!isScanning}
            constraints={{ facingMode: 'environment' }} // Use the rear camera
          />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default VerifyProof
