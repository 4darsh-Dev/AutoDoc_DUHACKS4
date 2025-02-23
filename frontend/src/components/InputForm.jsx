import PropTypes from 'prop-types'

const Input = ({ type, name, placeholder, value, onChange, required }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className='w-full px-3 py-2 mt-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
    />
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
}

export default Input
