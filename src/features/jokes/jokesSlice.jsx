import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const routeDataCache = {};

export const fetchJokes = createAsyncThunk('jokes/fetchJokes', async (route) => {
  if (routeDataCache[route]) {
    return routeDataCache[route];
  }
  const response = await axios.get('https://official-joke-api.appspot.com/jokes/ten');
  const data = response.data;

  routeDataCache[route] = data;

  return data;
});

const initialState = {
  jokes: [],
  loading: false,
  error: null,
};

const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJokes.fulfilled, (state, action) => {
        state.loading = false;
        state.jokes = action.payload;
      })
      .addCase(fetchJokes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default jokesSlice.reducer;