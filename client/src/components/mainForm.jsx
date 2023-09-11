import React, { useState, useEffect } from 'react'
import TextField from './form/textField'
import validationSchema from '../utils/validationSchema'
import { useDispatch, useSelector } from 'react-redux'
import { getErrors, userDataDelivery } from '../store/store'

const MainForm = () => {
  const dispatch = useDispatch()
  const responseUserError = useSelector(getErrors())

  const [user, setUser] = useState({ email: '', number: '' })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    function validate() {
      validationSchema
        .validate(user)
        .then(() => {
          setErrors({})
        })
        .catch((error) => setErrors({ [error.path]: error.message }))
    }
    validate()
  }, [user])

  const handleChange = (target) => {
    setUser((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }))
  }

  const isValid = Object.keys(errors).length === 0

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isValid) return
    dispatch(userDataDelivery({ payload: user, setErrors }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label='Email'
          name='email'
          type='text'
          onChange={handleChange}
          value={user.email}
          error={errors.email}
        />

        <TextField
          label='Number'
          name='number'
          type='text'
          onChange={handleChange}
          value={user.number}
          error={errors.number}
        />
        <button
          type='submit'
          disabled={!isValid}
          className='  bg-gray-50 text-black m-auto mb-6 mt-10 block px-5 py-3 rounded-[30px] font-bold cursor-pointer transition hover:text-white hover:bg-[#FF7373] hover:shadow-sm hover:duration-200'
        >
          Submit
        </button>
      </form>

      {responseUserError !== null && (
        <div className='bg-red-200 m-auto mb-6 mt-10 block px-5 py-3'>
          {responseUserError}
        </div>
      )}
    </div>
  )
}

export default MainForm
