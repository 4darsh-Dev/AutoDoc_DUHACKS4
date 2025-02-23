import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../api.js'
import Button from '../components/Button.jsx'
import Input from '../components/RegisterInput.jsx'
import PasswordInput from '../components/PasswordInput.jsx'
import avatartIcon from '../assets/img/avatar_icon.png'
import verifyingAuthority from '../assets/img/verifying_authority.png'
import metamaskIcon from '../assets/img//metamask-icon.svg'

import PropTypes from 'prop-types'
import { ethers } from 'ethers'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

const Register = ({ setUser, showAlert }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    verifyWith: 'email',
    otp: '',
    address: '',
    image: '',
    role: 'user',
    gender: '',
    day: '',
    month: '',
    year: '',
    phone: '',
    walletAddr: ''
  })
  const [codeSent, setCodeSent] = useState(false)
  const [errors, setErrors] = useState({})
  const [currentStep, setCurrentStep] = useState(1)
  //flag for slide animation other things were not working
  const [flag, setFlag] = useState(true)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }))
    }
  }

  const handleStepInc = () => {
    setCurrentStep((prev) => prev + 1)
    setFlag(false)
    setTimeout(() => {
      setFlag(true)
    }, 50)
  }
  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.username) newErrors.username = 'Username is required'
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (!formData.address) newErrors.address = 'Address is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    if (validateForm()) {
      try {
        console.log('validation successful')
        const { verifyWith, otp, ...registrationData } = formData
        registrationData.dob = `${formData.day} ${formData.month} ${formData.year}`
        console.log('Registration data:', registrationData)
        const response = await register(registrationData)
        if (response.ok) {
          console.log(response, 'response')
          const res = await response.json()
          const { accessToken, refreshToken } = res.tokens
          console.log('Access token:', accessToken)
          localStorage.setItem('accessToken', accessToken)
          localStorage.setItem('refreshToken', refreshToken)
          handleStepInc()
          setUser((prev) => ({
            ...prev,
            role: formData.role
          }))
          setTimeout(() => {
            navigate('/dashboard')
          }, 5000)
        } else {
          console.log('request was not successfull', response.status)
        }
      } catch (error) {
        setErrors({ general: error.message })
      }
    }
  }
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        const addr = await signer.getAddress()
        console.log('Signer address:', addr)
        setFormData((prev) => ({
          ...prev,
          walletAddr: addr
        }))
      } catch (error) {
        showAlert('Failed to connect wallet:', 'error')
        console.error('Failed to connect wallet:', error)
      }
    } else {
      showAlert('Please install MetaMask!', 'error')
    }
  }

  const sendOtp = async () => {
    try {
      const optedMethod = formData.verifyWith
      const data = {
        optedMethod,
        [optedMethod]: formData[optedMethod]
      }
      const response = await fetch(API_BASE_URL + '/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (response.ok) {
        setCodeSent(true)
        showAlert('OTP sent successfully', 'success')
      } else {
        showAlert('Failed to send OTP', 'error')
      }
    } catch (error) {
      showAlert('Failed to send OTP:', 'error')
      console.error('Failed to send OTP:', error)
    }
  }
  const verifyOtp = async (e) => {
    try {
      const response = await fetch(API_BASE_URL + '/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          otp: formData.verificationCode,
          [formData.verifyWith]: formData[formData.verifyWith]
        })
      })
      if (response.ok) {
        showAlert('OTP verified successfully', 'success')
        handleSubmit(e)
      } else {
        showAlert('Failed to verify OTP', 'error')
      }
    } catch (error) {
      showAlert('Failed to verify OTP:', 'error')
      console.error('Failed to verify OTP:', error)
    }
  }
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  )

  return (
    <div className='flex-grow flex items-center py-8'>
      <div className='flex flex-col md:flex-row gap-10 items-center'>
        {/* Left side */}
        <div className='bg-blue-500 text-white w-[45vw] h-[30vw] p-8 py-12 flex flex-col justify-center items-center rounded-r-2xl'>
          <h2 className='text-3xl font-bold mb-4'>
            Hi {`${formData.firstName ? formData.firstName : 'User'}`}
          </h2>
          <p className='mb-8 text-center'>
            Sign Up for better and complete access
          </p>
          <div className='relative w-48 h-48 rounded-full bg-[#e9e9e9] flex items-center justify-center'>
            {formData.image ? (
              <img
                src={URL.createObjectURL(formData.image)}
                alt='User Avatar'
                className='rounded-full object-cover w-full h-full'
              />
            ) : (
              <span className='material-symbols-outlined rounded-full object-cover text-[8rem] text-black font-light'>
                person
              </span>
            )}
            <ImageInput setFormData={setFormData} />
          </div>
        </div>

        {/* Right side */}
        <div className='px-10 overflow-hidden relative w-[45vw]'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {currentStep === 1 && (
              <div
                className={`h-[420px] flex flex-col justify-center transition-transform duration-500 ${
                  currentStep === 1 ? 'translate-x-0' : '-translate-x-full'
                }`}
              >
                <h2 className='text-5xl font-bold mb-8'>
                  Welcome to <span className='text-blue-500'>DockChecker</span>
                </h2>
                <Input
                  type='text'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={errors.email}
                />
                <PasswordInput
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={errors.password}
                />
                <Button
                  onClick={() => {
                    handleStepInc()
                  }}
                  className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                >
                  Next
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div
                style={{
                  transitionDuration: '300ms',
                  opacity: currentStep === 2 && flag ? 1 : 0,
                  transform:
                    currentStep === 2 && flag
                      ? 'translateX(0)'
                      : 'translateX(50%)'
                }}
                className='h-[420px] flex flex-col'
              >
                <h2 className='text-5xl mb-8'>Choose a Role</h2>
                <div className='flex gap-y-5 gap-x-10 flex-wrap justify-evenly'>
                  <div
                    className={`rounded-md overflow-hidden shadow-lg bg-white p-4 flex flex-col items-center border border-black h-[19vh] w-[12vw] justify-center hover:scale-[1.1] transition-transform duration-300 ${
                      formData.role === 'issuer'
                        ? 'border border-blue-400 border-[2px]'
                        : ''
                    }`}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        role: 'issuer'
                      }))
                    }}
                  >
                    <span className='material-symbols-outlined text-5xl'>
                      apartment
                    </span>
                    <div className='text-sm mb-2'>Issuing Authority</div>
                  </div>
                  <div
                    className={`rounded overflow-hidden shadow-lg bg-white p-4 flex flex-col items-center border border-black h-[19vh] w-[12vw] justify-center hover:scale-[1.1] transition-transform duration-300 ${
                      formData.role === 'verifier'
                        ? 'border border-blue-400 border-[2px]'
                        : ''
                    }`}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        role: 'verifier'
                      }))
                    }}
                  >
                    <img
                      src={verifyingAuthority}
                      alt='verifyingAuthority'
                      className='h-[50px] p-1 pt-2'
                    />
                    <div className='text-sm mb-2'>Verifying Authority</div>
                  </div>
                  <div
                    className={`rounded overflow-hidden shadow-lg bg-white p-4 flex flex-col items-center border border-black h-[19vh] w-[12vw] justify-center hover:scale-[1.1] transition-transform duration-300 ${
                      formData.role === 'user'
                        ? 'border border-blue-500 border-[2px]'
                        : ''
                    }`}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        role: 'user'
                      }))
                    }}
                  >
                    <span className='material-symbols-outlined text-6xl'>
                      person
                    </span>
                    <div className='text-sm mb-2'> User</div>
                  </div>
                </div>
                <span className='text-sm py-2 flex items-center gap-1'>
                  <span className='material-symbols-outlined'>info</span>
                  The role would be assigned after approval from Admin
                </span>
                <div className='pt-4 flex items-center gap-5'>
                  <PrevBtn setStep={setCurrentStep} setFlag={setFlag} />
                  <Button
                    onClick={() => {
                      handleStepInc()
                    }}
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Create
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && formData.role === 'user' && (
              <div
                style={{
                  transitionDuration: '300ms',
                  opacity: currentStep === 3 && flag ? 1 : 0,
                  transform:
                    currentStep === 3 && flag
                      ? 'translateX(0)'
                      : 'translateX(50%)'
                }}
                className='flex flex-col h-[420px]'
              >
                <h2 className='text-5xl mb-4'>Personal Details</h2>
                <div className='h-[50vh] overflow-y-scroll scrollbar-thin scrollbar scrollbar-thumb-rounded scrollbar-thumb-blue px-2'>
                  <Input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                    error={errors.username}
                  />
                  <Input
                    type='text'
                    name='firstName'
                    placeholder='First name'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    error={errors.firstName}
                  />
                  <Input
                    type='text'
                    name='lastName'
                    placeholder='Last name'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    error={errors.lastName}
                  />
                  <Input
                    type='text'
                    name='address'
                    placeholder='Your current address'
                    value={formData.address}
                    onChange={handleChange}
                    required
                    error={errors.address}
                  />
                  {/* Dob input */}
                  <div className='flex flex-col gap-4 mt-4'>
                    <label className='text-[1rem] font-medium text-gray-700 font-normal'>
                      Date of Birth
                    </label>
                    <div className='flex gap-4'>
                      <select
                        name='day'
                        value={formData.day}
                        onChange={handleChange}
                        className='p-2 border border-gray-300 rounded w-full custom-select'
                        required
                      >
                        <option value=''>Day</option>
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                      <select
                        name='month'
                        value={formData.month}
                        onChange={handleChange}
                        className='p-2 border border-gray-300 rounded w-full custom-select'
                        required
                      >
                        <option value=''>Month</option>
                        {months.map((month, index) => (
                          <option key={index} value={month}>
                            {month}
                          </option>
                        ))}
                      </select>
                      <select
                        name='year'
                        value={formData.year}
                        onChange={handleChange}
                        className='p-2 border border-gray-300 rounded w-full custom-select'
                        required
                      >
                        <option value=''>Year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* Gender Input */}
                  <div className='mt-4'>
                    <label className='font-normal text-[1rem] font-medium text-gray-700'>
                      Gender
                    </label>
                    <div className='flex items-center gap-4 mt-2'>
                      <label className='inline-flex items-center'>
                        <input
                          type='radio'
                          name='gender'
                          value='male'
                          checked={formData.gender === 'male'}
                          onChange={handleChange}
                          className='form-radio h-4 w-4 text-blue-600'
                        />
                        <span className='ml-2'>Male</span>
                      </label>
                      <label className='inline-flex items-center'>
                        <input
                          type='radio'
                          name='gender'
                          value='female'
                          checked={formData.gender === 'female'}
                          onChange={handleChange}
                          className='form-radio h-4 w-4 text-blue-600'
                        />
                        <span className='ml-2'>Female</span>
                      </label>
                      <label className='inline-flex items-center'>
                        <input
                          type='radio'
                          name='gender'
                          value='other'
                          checked={formData.gender === 'other'}
                          onChange={handleChange}
                          className='form-radio h-4 w-4 text-blue-600'
                        />
                        <span className='ml-2'>Other</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className='pt-4 flex items-center gap-5'>
                  <PrevBtn setStep={setCurrentStep} setFlag={setFlag} />
                  <Button
                    onClick={() => {
                      handleStepInc()
                    }}
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {currentStep === 4 && formData.role === 'user' && (
              <div
                style={{
                  transitionDuration: '300ms',
                  opacity: currentStep === 4 && flag ? 1 : 0,
                  transform:
                    currentStep === 4 && flag
                      ? 'translateX(0)'
                      : 'translateX(50%)'
                }}
                className='flex flex-col h-[420px] justify-center'
              >
                <h2 className='text-5xl mb-4'>Verify Yourself</h2>
                <div className='mt-4'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Verify With
                  </label>
                  <select
                    name='verifyWith'
                    value={formData.verifyWith}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        verifyWith: e.target.value
                      }))
                    }}
                    className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none sm:text-sm rounded-md'
                    required
                  >
                    <option value=''>Select an option</option>
                    <option value='aadhar'>Aadhar</option>
                    <option value='phone'>Phone</option>
                    <option value='email'>Email</option>
                  </select>
                  {formData.verifyWith === 'aadhar' && (
                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Aadhar Number
                      </label>
                      <input
                        type='text'
                        name='aadhar'
                        value={formData.aadhar}
                        onChange={handleChange}
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none sm:text-sm rounded-md'
                        placeholder='XXXX-XXXX-XXXX'
                        required
                      />
                    </div>
                  )}
                  {formData.verifyWith === 'phone' && (
                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Phone Number
                      </label>
                      <input
                        type='tel'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none sm:text-sm rounded-md'
                        placeholder='Enter your phone number'
                        required
                      />
                    </div>
                  )}
                  {formData.verifyWith === 'email' && (
                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none sm:text-sm rounded-md'
                        placeholder='Enter your email address'
                        required
                      />
                    </div>
                  )}
                  {codeSent && (
                    <div className='mt-4'>
                      <div className='flex items-center'>
                        <label className='block text-sm font-medium text-gray-700'>
                          Verification Code
                        </label>
                        <span
                          className='text-sm text-blue-500 ml-2 cursor-pointer hover:text-[#1d00fc]'
                          onClick={() => {
                            sendOtp()
                          }}
                        >
                          Resend
                        </span>
                      </div>
                      <input
                        type='text'
                        name='verificationCode'
                        value={formData.verificationCode}
                        onChange={handleChange}
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none sm:text-sm rounded-md'
                        placeholder='Enter the verification code'
                        required
                      />
                    </div>
                  )}
                </div>
                <div className='pt-4 flex items-center gap-5'>
                  <PrevBtn setStep={setCurrentStep} setFlag={setFlag} />

                  {codeSent ? (
                    <Button
                      onClick={(e) => {
                        verifyOtp(e)
                      }}
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                      Verify
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        sendOtp()
                      }}
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                      Send Code
                    </Button>
                  )}
                </div>
              </div>
            )}
            {currentStep === 3 && formData.role === 'issuer' && (
              <div
                style={{
                  transitionDuration: '300ms',
                  opacity: currentStep === 3 && flag ? 1 : 0,
                  transform:
                    currentStep === 3 && flag
                      ? 'translateX(0)'
                      : 'translateX(50%)'
                }}
                className='flex flex-col h-[420px]'
              >
                <h2 className='text-5xl mb-4'>Organisation Details</h2>
                <div className='h-[50vh] overflow-y-scroll scrollbar-thin scrollbar scrollbar-thumb-rounded scrollbar-thumb-blue px-2'>
                  <Input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                    error={errors.username}
                  />
                  <Input
                    type='text'
                    name='firstName'
                    placeholder='Name'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    error={errors.firstName}
                  />
                  <Input
                    type='text'
                    name='lastName'
                    placeholder='Parent Organsiation'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    error={errors.lastName}
                  />
                  <Input
                    type='text'
                    name='address'
                    placeholder='Current address'
                    value={formData.address}
                    onChange={handleChange}
                    required
                    error={errors.address}
                  />
                  <Input
                    type='text'
                    name='phone'
                    placeholder='Phone no.'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    error={errors.address}
                  />
                </div>

                <div className='pt-4 flex items-center gap-5'>
                  <PrevBtn setStep={setCurrentStep} setFlag={setFlag} />
                  <Button
                    onClick={() => {
                      handleStepInc()
                    }}
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {currentStep === 4 && formData.role === 'issuer' && (
              <div
                style={{
                  transitionDuration: '300ms',
                  opacity: currentStep === 4 && flag ? 1 : 0,
                  transform:
                    currentStep === 4 && flag
                      ? 'translateX(0)'
                      : 'translateX(50%)'
                }}
                className='flex flex-col h-[420px] justify-center'
              >
                <h2 className='text-5xl mb-4'>Verify Yourself</h2>
                <div className='mt-4 flex flex-col overflow-y-scroll scrollbar-thin scrollbar scrollbar-thumb-rounded scrollbar-thumb-blue px-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Verify With
                  </label>
                  <select
                    name='verifyWith'
                    value={formData.verifyWith}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        verifyWith: e.target.value
                      }))
                    }}
                    className='mt-1 block w-full px-2  py-2 text-base border-gray-400 border rounded-md'
                    required
                  >
                    <option value=''>Select an option</option>
                    <option value='phone'>Phone</option>
                    <option value='email'>Email</option>
                  </select>
                  {formData.verifyWith === 'phone' && (
                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Phone Number
                      </label>
                      <input
                        type='tel'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-400 focus:outline-none border sm:text-sm rounded-md'
                        placeholder='Enter your phone number'
                        required
                      />
                    </div>
                  )}
                  {formData.verifyWith === 'email' && (
                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-400 border focus:outline-none sm:text-sm rounded-md'
                        placeholder='Enter your email address'
                        required
                      />
                    </div>
                  )}
                  {codeSent && (
                    <div className='mt-4'>
                      <div className='flex items-center'>
                        <label className='block text-sm font-medium text-gray-700'>
                          Verification Code
                        </label>
                        <span
                          className='text-sm text-blue-500 ml-2 cursor-pointer hover:text-[#1d00fc]'
                          onClick={() => {
                            sendOtp()
                          }}
                        >
                          Resend
                        </span>
                      </div>
                      <input
                        type='text'
                        name='verificationCode'
                        value={formData.verificationCode}
                        onChange={handleChange}
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none sm:text-sm rounded-md'
                        placeholder='Enter the verification code'
                        required
                      />
                    </div>
                  )}
                  <div className='relative flex items-center justify-center my-6'>
                    <span className='absolute px-2 bg-white'>AND</span>
                    <div className='bg-black h-[1px] w-full'></div>
                  </div>
                  {formData.walletAddr === null ? (
                    <Button
                      onClick={() => {
                        connectWallet()
                      }}
                      className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-black rounded-md shadow-sm font-medium text-black hover:bg-gray-200 '
                    >
                      <span className='text-[16px]'>Connect Metamask</span>
                      <img src={metamaskIcon} alt='metamask' className='h-8' />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        connectWallet()
                      }}
                      className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-black rounded-md shadow-sm font-medium text-black hover:bg-gray-200 '
                    >
                      <span className='text-[16px]'>Connected</span>
                      <img src={metamaskIcon} alt='metamask' className='h-8' />
                    </Button>
                  )}

                  <span className='text-sm py-2 flex items-center gap-1'>
                    <span className='material-symbols-outlined'>info</span>
                    It is necessary for Issuing Authority to connect Metamask
                  </span>
                </div>
                <div className='pt-4 flex items-center gap-5'>
                  <PrevBtn setStep={setCurrentStep} setFlag={setFlag} />

                  {codeSent ? (
                    <Button
                      onClick={(e) => {
                        verifyOtp(e)
                      }}
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                      Verify
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        sendOtp()
                      }}
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                      Send Code
                    </Button>
                  )}
                </div>
              </div>
            )}
            {currentStep === 3 && formData.role === 'verifier' && (
              <div
                style={{
                  transitionDuration: '300ms',
                  opacity: currentStep === 3 && flag ? 1 : 0,
                  transform:
                    currentStep === 3 && flag
                      ? 'translateX(0)'
                      : 'translateX(50%)'
                }}
                className='flex flex-col h-[420px]'
              >
                <h2 className='text-5xl mb-4'>Organisation Details</h2>
                <div className='h-[50vh] overflow-y-scroll scrollbar-thin scrollbar scrollbar-thumb-rounded scrollbar-thumb-blue px-2'>
                  <Input
                    type='text'
                    name='username'
                    placeholder='Username'
                    value={formData.username}
                    onChange={handleChange}
                    required
                    error={errors.username}
                  />
                  <Input
                    type='text'
                    name='firstName'
                    placeholder='Name'
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    error={errors.firstName}
                  />
                  <Input
                    type='text'
                    name='lastName'
                    placeholder='Parent Organsiation (optional)'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    error={errors.lastName}
                  />
                  <Input
                    type='text'
                    name='address'
                    placeholder='Current address'
                    value={formData.address}
                    onChange={handleChange}
                    required
                    error={errors.address}
                  />
                  <Input
                    type='text'
                    name='phone'
                    placeholder='Phone no.'
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    error={errors.phone}
                  />
                </div>

                <div className='pt-4 flex items-center gap-5'>
                  <PrevBtn setStep={setCurrentStep} setFlag={setFlag} />
                  <Button
                    onClick={() => {
                      handleStepInc()
                    }}
                    className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {currentStep === 4 && formData.role === 'verifier' && (
              <div
                style={{
                  transitionDuration: '300ms',
                  opacity: currentStep === 4 && flag ? 1 : 0,
                  transform:
                    currentStep === 4 && flag
                      ? 'translateX(0)'
                      : 'translateX(50%)'
                }}
                className='flex flex-col h-[420px] justify-center'
              >
                <h2 className='text-5xl mb-4'>Verify Yourself</h2>
                <div className='mt-4 flex flex-col gap-2'>
                  <label className='block text-sm font-medium text-gray-700'>
                    Verify With
                  </label>
                  <select
                    name='verifyWith'
                    value={formData.verifyWith}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        verifyWith: e.target.value
                      }))
                    }}
                    className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none sm:text-sm rounded-md'
                    required
                  >
                    <option value=''>Select an option</option>
                    <option value='phone'>Phone</option>
                    <option value='email'>Email</option>
                  </select>
                  {formData.verifyWith === 'phone' && (
                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Phone Number
                      </label>
                      <input
                        type='tel'
                        name='phone'
                        value={formData.phone}
                        onChange={handleChange}
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none sm:text-sm rounded-md'
                        placeholder='Enter your phone number'
                        required
                      />
                    </div>
                  )}
                  {formData.verifyWith === 'email' && (
                    <div className='mt-4'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 focus:outline-none sm:text-sm rounded-md'
                        placeholder='Enter your email address'
                        required
                      />
                    </div>
                  )}
                  {codeSent && (
                    <div className='mt-4'>
                      <div className='flex items-center'>
                        <label className='block text-sm font-medium text-gray-700'>
                          Verification Code
                        </label>
                        <span
                          className='text-sm text-blue-500 ml-2 cursor-pointer hover:text-[#1d00fc]'
                          onClick={() => {
                            sendOtp()
                          }}
                        >
                          Resend
                        </span>
                      </div>
                      <input
                        type='text'
                        name='verificationCode'
                        value={formData.verificationCode}
                        onChange={handleChange}
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none sm:text-sm rounded-md'
                        placeholder='Enter the verification code'
                        required
                      />
                    </div>
                  )}
                </div>
                <div className='pt-4 flex items-center gap-5'>
                  <PrevBtn setStep={setCurrentStep} setFlag={setFlag} />

                  {codeSent ? (
                    <Button
                      onClick={(e) => {
                        verifyOtp(e)
                      }}
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                      Verify
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        sendOtp()
                      }}
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                    >
                      Send Code
                    </Button>
                  )}
                </div>
              </div>
            )}
            {currentStep === 5 && (
              <div
                style={{
                  transitionDuration: '300ms',
                  opacity: currentStep === 5 && flag ? 1 : 0,
                  transform:
                    currentStep === 5 && flag
                      ? 'translateX(0)'
                      : 'translateX(50%)'
                }}
                className='flex flex-col h-[420px] justify-center'
              >
                <h2 className='text-5xl mb-4 font-mid-bold'>
                  You are all set up
                </h2>
                <h3>Getting redirected to your dashboard</h3>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

const PrevBtn = ({ setStep, setFlag }) => {
  return (
    <Button
      onClick={() => {
        setFlag(false)
        setTimeout(() => {
          setStep((prev) => prev - 1)
          setFlag(true)
        }, 200)
      }}
      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
    >
      Prev
    </Button>
  )
}

const ImageInput = ({ setFormData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [flag, setFlag] = useState(false)
  const menuRef = useRef(null)
  const menuBtnRef = useRef(null)
  const inputRef = useRef(null)
  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !menuBtnRef.current.contains(event.target)
    ) {
      handleMenuClose()
    }
  }
  const handleMenuClose = () => {
    setFlag(false)
    setTimeout(() => {
      setIsOpen(false)
    }, 50)
  }
  const handleMenuOpen = () => {
    setIsOpen(true)
    setTimeout(() => {
      setFlag(true)
    }, 50)
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file
      }))
      inputRef.current.value = null // Reset the input value
    }
  }
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', handleClickOutside)
    } else {
      window.removeEventListener('click', handleClickOutside)
    }

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className='absolute bottom-2 right-0'>
      <div className='bg-white rounded-full p-2 shadow-lg flex flex-col items-center justify-center'>
        <button
          ref={menuBtnRef}
          className='text-blue-500 hover:text-blue-700'
          onClick={() => {
            handleMenuOpen()
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
            />
          </svg>
        </button>
      </div>
      <div
        ref={menuRef}
        className={`${
          isOpen ? 'flex' : 'hidden'
        } flex-col bg-white text-black rounded-md absolute top-0 w-[14vw] border border-black overflow-hidden`}
        style={{
          transition: 'all 300ms',
          height: isOpen && flag ? '360%' : '100%',
          opacity: isOpen && flag ? 1 : 0.1,
          transform: isOpen && flag ? 'translateY(0)' : 'translateY(-10%)'
        }}
      >
        <span className='flex items-center gap-2 relative p-3 hover:bg-blue-200'>
          <span className='material-symbols-outlined'>image</span>
          <p>Upload image</p>
          <input
            ref={inputRef}
            type='file'
            className='absolute top-0 left-0 height-[100%] opacity-[0]'
            onChange={(e) => {
              handleImageChange(e)
            }}
          />
        </span>
        <span
          className='flex items-center gap-2 p-3 hover:bg-blue-200'
          onClick={() => {
            setFormData((prevData) => {
              return {
                ...prevData,
                image: null
              }
            })
          }}
        >
          <span className='material-symbols-outlined'>delete</span>
          <p>Delete</p>
        </span>
        <span className='flex items-center gap-2 p-3 hover:bg-blue-200'>
          <img src={avatartIcon} alt='avatar' className='h-[25px]' />
          <p>Choose Avatar</p>
        </span>
      </div>
    </div>
  )
}

export default Register

ImageInput.propTypes = {
  setFormData: PropTypes.func.isRequired
}
PrevBtn.propTypes = {
  setStep: PropTypes.func.isRequired,
  setFlag: PropTypes.func.isRequired
}
