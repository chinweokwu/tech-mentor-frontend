import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from "../../api/index"

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  token: null
};


export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/register', userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await api.post('/login', userData);
    const token = response.data.token;
    localStorage.setItem("token", token)
    console.log(localStorage.getItem("token"))
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const logOut = () => ({
  type: 'auth/logout',
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = true;
        if (state.isAuthenticated === true) {
          toast.success("User registered successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        if (state.error) {
          toast.error(action.error.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        if (state.isAuthenticated === true) {
          toast.success("User logged in successfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        if (state.error) {
          toast.error(action.error.message);
        }
      })
      .addCase(logOut, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      });
  },
});

export default authSlice.reducer;