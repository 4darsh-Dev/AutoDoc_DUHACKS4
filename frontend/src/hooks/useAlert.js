import { useState, useEffect } from 'react'

const useAlert = () => {
  return {
    alertState,
    showAlert,
    hideAlert
  }
}

export default useAlert
