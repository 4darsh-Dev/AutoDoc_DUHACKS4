import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { createGlobalStyle } from 'styled-components'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { updateAbilityFor } from './utils/defineAbility'
import { checkToken } from './utils/checkTokens'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ContactPage from './pages/ContactPage'
import ScrollToTop from './components/ScrollToTop'
import Chatbot from './components/Chatbot'
import { PacmanLoader } from 'react-spinners'
import AdminDashboard from './components/AdminDashboard'
import AlertExample from './components/Alert'
import GenerateProof from './components/GenerateProof'
import VerifyProof from './components/VerifyProof'
import IssueDoc from './pages/IssueDoc'
import VerifierViewDoc from './components/VerifierViewDoc'

const GlobalStyle = createGlobalStyle`
  :root {
    --font-size-default: ${({ defaultSize }) => defaultSize}px;
    --font-ex-large: ${({ defaultSize }) => defaultSize * 2.25}px; /* 36px */
    --font-large: ${({ defaultSize }) => defaultSize * 2}px; /* 32px */
    --font-medium: ${({ defaultSize }) => defaultSize * 1.5}px; /* 24px */
    --font-mid-medium: ${({ defaultSize }) =>
      defaultSize * 1.15}px; /* 18.4px */
    --font-small: ${({ defaultSize }) => defaultSize * 0.85}px; /* 13.6px */
    --font-ex-small: ${({ defaultSize }) => defaultSize * 0.7}px; /* 11.2px */
  }
`

function App() {
  const [ability, setAbility] = useState({ undefined })
  const [defaultSize, setDefaultSize] = useState(16)
  const [lang, setLang] = useState('en')
  const [user, setUser] = useState({ role: null }) // Replace with actual user data
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [alertState, setAlertState] = useState({
    message: '',
    type: 'success',
    isVisible: false
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await checkToken()
        if (userData) {
          setUser(userData)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error('Error checking token:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  useEffect(() => {
    setAbility(updateAbilityFor(user))
  }, [user])
  if (loading) {
    return (
      <div className='fixed inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm'>
        <div className='flex flex-col items-center gap-6'>
          <PacmanLoader
            color='#4F46E5'
            size={30}
            margin={2}
            speedMultiplier={1}
          />
        </div>
      </div>
    )
  }
  const showAlert = (message, type) => {
    setAlertState({
      message,
      type,
      isVisible: true
    })
  }
  return (
    <BrowserRouter>
      <GlobalStyle defaultSize={defaultSize} />
      <Navbar
        lang={lang}
        setLang={setLang}
        setDefaultSize={setDefaultSize}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <AlertExample alertState={alertState} setAlertState={setAlertState} />
      <div
        className='absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg text-sm z-[999]'
        id='credentials-box'
      >
        <button
          className='absolute font-medium top-2 right-2 text-gray-500 hover:text-gray-700'
          onClick={() =>
            (document.getElementById('credentials-box').style.display = 'none')
          }
        >
          &times;
        </button>
        <h2 className='text-lg font-bold'>Test Credentials</h2>
        <h3 className='text-base font-semibold'>Issuing Authority</h3>
        <p>Email: avengerstonystark419@gmail.com</p>
        <p>Password: #BallIsLife1</p>
        <h3 className='text-base font-semibold'>Individual User</h3>
        <p>Email: amanforwork1@gmail.com</p>
        <p>Password:#BallIsLife1 </p>
      </div>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          path='/about'
          element={
            <>
              <AboutPage />
            </>
          }
        />
        <Route
          path='/services'
          element={
            <>
              <ServicesPage />
            </>
          }
        />
        <Route
          path='/contact'
          element={
            <>
              <ContactPage />
            </>
          }
        />
        <Route
          path='/dashboard'
          element={
            isAuthenticated ? (
              <Dashboard
                user={user}
                setUser={setUser}
                ability={ability}
                setAbility={setAbility}
                showAlert={showAlert}
              />
            ) : (
              <Navigate to='/login' />
            )
          }
        />
        <Route
          path='/login'
          element={
            <>
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                showAlert={showAlert}
              />
            </>
          }
        />
        <Route
          path='/register'
          element={
            <>
              <Register
                setUser={setUser}
                setIsAuthenticated={setIsAuthenticated}
                showAlert={showAlert}
              />
            </>
          }
        />
        <Route
          path='/generate-proof'
          element={
            <>
              <GenerateProof showAlert={showAlert} />
            </>
          }
        />
        <Route
          path='/verify-proof'
          element={
            <>
              <VerifyProof showAlert={showAlert} />
            </>
          }
        />
        <Route
          path='/issue-doc'
          element={
            <>
              <IssueDoc />
            </>
          }
        />
        <Route
          path='/shared-doc'
          element={
            <>
              <VerifierViewDoc />
            </>
          }
        />
      </Routes>
      <Footer />
      <Chatbot />
      <ScrollToTop />
    </BrowserRouter>
  )
}

export default App
