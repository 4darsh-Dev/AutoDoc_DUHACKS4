import { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

const QRCodeComponent = ({ proofData }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Convert the data to a JSON string
    const dataString = JSON.stringify(proofData)

    // Generate the QR code
    QRCode.toCanvas(canvasRef.current, dataString, (error) => {
      if (error) console.error(error)
      console.log('QR code generated successfully!')
    })
  }, [proofData])

  return <canvas ref={canvasRef} />
}

export default QRCodeComponent
