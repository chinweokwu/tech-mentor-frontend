import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchManga = createAsyncThunk('anime/fetchAnimation', async () => {
  const response = await axios.get(`https://kitsu.io/api/edge/trending/manga`);
  return response.data.data;
});

const initialState = {
  mangas: [],
  loading: false,
  error: null,
};

const mangaSlice = createSlice({
  name: 'mangas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchManga.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManga.fulfilled, (state, action) => {
        state.loading = false;
        state.mangas = action.payload;
      })
      .addCase(fetchManga.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mangaSlice.reducer;