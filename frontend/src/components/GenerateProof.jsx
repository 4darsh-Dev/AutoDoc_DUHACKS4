import { useState } from 'react'
import { generateProof } from '../api'
import QRCodeComponent from './QRCodeComponent'

const GenerateProof = ({ showAlert }) => {
  const [proofData, setProofData] = useState(null)
  const rand = Math.floor(100000 + Math.random() * 900000)
  const handleSubmit = async (age) => {
    try {
      const res = await generateProof(JSON.stringify({ age, rand }))
      if (res.ok) {
        const data = await res.json()
        showAlert('Proof generated successfully', 'success')
        console.log(data)
        setProofData(data)
      }
    } catch (err) {
      showAlert('Something went wrong', 'error')
      console.error(err)
    }
  }
  return (
    <div className='flex justify-center flex-col items-center'>
      <span
        onClick={() => {
          handleSubmit(30)
        }}
        className='bg-blue-500 p-4 rounded-lg m-4 text-white cursor-pointer'
      >
        Generate Proof
      </span>
      {proofData && <QRCodeComponent proofData={proofData} />}
    </div>
  )
}

export default GenerateProof
