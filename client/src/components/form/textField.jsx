import React from 'react'
import InputMask from 'react-input-mask'
import PropTypes from 'prop-types'

const TextField = ({ label, name, value, onChange, error, type }) => {
  const handleChange = ({ target }) => {
    if (name === 'number') {
      onChange({
        name: target.name,
        value: target.value.replace(/-/g, '').trim()
      })
    } else onChange({ name: target.name, value: target.value.trim() })
  }

  const getInputClasses = () => {
    return (
      'w-full px-2 py-2 text-sm h-12 focus:outline-none ring-1 hover:ring-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm rounded-lg text-black ' +
      (error ? ' bg-red-200' : '')
    )
  }

  const numberMask = () => {
    if (name === 'number') {
      return '99-99-99'
    }
  }

  return (
    <div className='my-3  relative'>
      <label htmlFor={name}>{label}</label>
      <InputMask
        placeholder={label}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className={getInputClasses()}
        mask={numberMask()}
        maskChar=' '
      />

      {error && <div>{error}</div>}
    </div>
  )
}

TextField.defaultProps = {
  type: 'text'
}

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
}

export default TextField
