import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../../api/authApi'

export const getUser = createAsyncThunk('user/getUser', async () => {
  const response = await authApi.getUserData()
  return response.data
})
