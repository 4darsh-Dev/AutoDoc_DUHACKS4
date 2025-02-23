import PropTypes from 'prop-types'

const PasswordInput = ({
  placeholder,
  name,
  value,
  onChange,
  required,
  error
}) => {
  return (
    <div className='relative'>
      <input
        type={Text}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-3 py-2 mt-6 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10`}
      />
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
