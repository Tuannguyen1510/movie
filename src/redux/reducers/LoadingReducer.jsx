import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     isLoading : false
}

const LoadingReducer = createSlice({
  name: 'LoadingReducer',
  initialState,
  reducers: {
    displayLoading: (state, action) => {
         state.isLoading = true
    },
    hideLoading: (state, action) => 
        state.isLoading = false
  }
});

export const {displayLoading, hideLoading} = LoadingReducer.actions

export default LoadingReducer.reducer