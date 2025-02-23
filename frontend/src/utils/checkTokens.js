const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

export const checkToken = async () => {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    return
  }

  try {
    const response = await fetch(API_BASE_URL + '/auth/check-token', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Data:', data)
      return data.user
    } else if (response.status === 403) {
      // Token is expired, try to refresh it
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        return
      }

      const refreshResponse = await fetch(API_BASE_URL + '/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: refreshToken })
      })

      if (refreshResponse.ok) {
        const data = await refreshResponse.json()
        localStorage.setItem('accessToken', data.accessToken)
        return data.user
      } else {
        return null
      }
    }
  } catch (error) {
    console.error('Error checking token:', error)
    return null
  }
}
