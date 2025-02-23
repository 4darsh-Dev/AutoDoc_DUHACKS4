import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const PasswordInput = ({
  placeholder,
  name,
  value,
  onChange,
  required,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative flex items-center'>
      <input
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 my-6 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
      />
      <button
        type='button'
        className='absolute inset-y-0 right-0 pr-3 flex items-center'
        onClick={() => setShowPassword(!showPassword)}
      >
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </button>
      {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
    </div>
  )
}

PasswordInput.propTypes = {
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string
}

export default PasswordInput
