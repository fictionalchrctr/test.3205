import { configureStore, createSlice } from '@reduxjs/toolkit'
import DataService from '../service/data.service'
import generateAuthError from '../utils/generateAuthError'

const appSlice = createSlice({
  name: 'slice',
  initialState: {
    entities: [],
    error: null,
    isLoading: false
  },
  reducers: {
    entitiesRequested: (state) => {
      state.error = null
      state.isLoading = true
    },
    entitiesRequestSuccess: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    entitiesRequestFailed: (state, action) => {
      state.error = action.payload
    }
  }
})

const { reducer, actions } = appSlice
const { entitiesRequested, entitiesRequestSuccess, entitiesRequestFailed } =
  actions

export const userDataDelivery =
  ({ payload }) =>
  async (dispatch) => {
    const { email, number } = payload
    dispatch(entitiesRequested())
    try {
      const { data } = await DataService.request({ email, number })
      dispatch(entitiesRequestSuccess(data))
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(entitiesRequestFailed(errorMessage))
      } else {
        dispatch(entitiesRequestFailed(error.message))
      }
    }
  }

export const getResult = () => (state) => {
  return state.entities
}
export const getErrors = () => (state) => {
  return state.error
}

export const getDataLoadingStatus = () => (state) => {
  return state.isLoading
}

export function createStore() {
  return configureStore({
    reducer
  })
}
