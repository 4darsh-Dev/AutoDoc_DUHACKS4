import React, { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const Alert = ({ message, type, isVisible, onClose }) => {
  const baseStyles =
    'fixed top-4 right-4 p-4 rounded-lg shadow-lg flex items-center justify-between min-w-[320px] transform transition-all duration-300 ease-in-out'

  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white'
  }

  return (
    <div
      className={`${baseStyles} ${typeStyles[type]} ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className='flex items-center gap-2'>
        {type === 'success' && (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M5 13l4 4L19 7'
            />
          </svg>
        )}
        {type === 'error' && (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
            />
          </svg>
        )}
        {type === 'info' && (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        )}
        <span>{message}</span>
      </div>
      <button
        onClick={onClose}
        className='ml-4 text-white hover:text-gray-200 focus:outline-none'
      >
        <X size={20} />
      </button>
    </div>
  )
}

const AlertExample = ({ alertState, setAlertState }) => {
  useEffect(() => {
    let timer
    if (alertState.isVisible) {
      timer = setTimeout(() => {
        setAlertState((prev) => ({
          ...prev,
          isVisible: false
        }))
      }, 5000)
    }
    return () => clearTimeout(timer)
  }, [alertState.isVisible])

  const hideAlert = () => {
    setAlertState((prev) => ({
      ...prev,
      isVisible: false
    }))
  }
  return (
    <div>
      <Alert
        message={alertState.message}
        type={alertState.type}
        isVisible={alertState.isVisible}
        onClose={hideAlert}
      />
    </div>
  )
}

export default AlertExample
