import React from 'react'
import { useNavigate } from 'react-router-dom'

const VerifierDashboard = () => {
  const navigate = useNavigate()
  const zkpBtnClick = () => {
    navigate('/verify-proof')
  }
  return (
    <div className='flex flex-col items-center py-5 h-[70vh]'>
      <h1 className='text-4xl'>Verifier Dashboard</h1>
      <span className='btn self-center flex mt-[30vh]' onClick={zkpBtnClick}>
        Verify ZKP
      </span>
    </div>
  )
}

export default VerifierDashboard
