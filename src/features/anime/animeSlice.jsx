import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAnimes = createAsyncThunk(
  "anime/fetchAnimation",
  async ({ page, perPage, category }) => {
    console.log(category);
    console.log(page);

    const apiUrl = `https://kitsu.io/api/edge/anime?page[limit]=${perPage}&page[offset]=${
      (page - 1) * perPage
    }`;

    const queryParams = category ? { filter: { categories: category } } : {};

    const response = await axios.get(apiUrl, { params: queryParams });
    return response.data.data;
  }
);

const initialState = {
  animes: [],
  loading: false,
  error: null,
};

const animeSlice = createSlice({
  name: "animes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimes.fulfilled, (state, action) => {
        state.loading = false;
        state.animes = action.payload;
      })
      .addCase(fetchAnimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default animeSlice.reducer;
