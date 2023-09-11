import React from 'react'
import { useSelector } from 'react-redux'
import { getDataLoadingStatus, getResult } from '../store/store'

const Result = () => {
  const responseUserData = useSelector(getResult())
  const userDataLoading = useSelector(getDataLoadingStatus())
  console.log('userDataLoading', userDataLoading)
  if (userDataLoading) {
    return 'Loading...'
  }
  return (
    <div>
      {responseUserData &&
        responseUserData.map((d, index) => (
          // здесь вместо key={index} так же можно использовать key={d.email + Math.random()}
          <div className='px-2 py-2 ' key={index}>
            <h1>email:{d.email}</h1>
            <h1>number:{d.number}</h1>
          </div>
        ))}
    </div>
  )
}

export default Result
