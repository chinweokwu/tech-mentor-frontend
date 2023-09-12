import { configureStore } from "@reduxjs/toolkit";
import jokesReducer from "./features/jokes/jokesSlice";
import authReducer from "./features/auth/authSlice";
import animeReducer from "./features/anime/animeSlice";
import mangaReducer from "./features/manga/mangaSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    jokes: jokesReducer,
    animes: animeReducer,
    mangas: mangaReducer,
  },
});

export default store;
