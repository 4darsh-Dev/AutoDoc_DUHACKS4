const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const register = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/auth/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Registration failed')
  }
  return response
}

export const login = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Login failed')
  }
  return response
}

// You can also add a function to refresh the JWT token, not being used rn
export const refreshToken = async (refreshToken) => {
  const response = await fetch(`${API_BASE_URL}/login/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh: refreshToken })
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.detail || 'Token refresh failed')
  }
  return response.json()
}

// Function to get chatbot response from server
export const getChatbotResponse = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chatbot/respond/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || 'Failed to get chatbot response')
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching chatbot response:', error)
    throw error
  }
}
export const logout = async () => {
  // Optionally notify the server to invalidate the tokens
  // const refreshToken = localStorage.getItem('refreshToken')
  // if (refreshToken) {
  //   await fetch('/api/logout', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ token: refreshToken })
  //   });
  // }

  // Clear tokens from local storage
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}
export const generateProof = async (data) => {
  const response = await fetch(`${API_BASE_URL}/protected/generate-proof`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })
  return response
}
export const verifyProof = async (data) => {
  console.log(data)
  const response = await fetch(`${API_BASE_URL}/protected/verify-proof`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response
}
