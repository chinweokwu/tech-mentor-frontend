import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import mangaReducer, { fetchManga } from './mangaSlice';

const mockAxios = new MockAdapter(axios);

describe('mangaSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        manga: mangaReducer,
      },
    });
  });

  it('should handle fetching manga successfully', async () => {
    const mockMangas = [
      { id: 1, title: 'Manga 1' },
      { id: 2, title: 'Manga 2' },
    ];

    mockAxios.onGet('https://kitsu.io/api/edge/trending/manga').reply(200, { data: mockMangas });

    await store.dispatch(fetchManga());
    const state = store.getState().manga;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.mangas).toEqual(mockMangas);
  });

  it('should handle pending state when fetching manga', () => {
    store.dispatch(fetchManga());
    const state = store.getState().manga;

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle error state when fetching manga', async () => {
    mockAxios.onGet('https://kitsu.io/api/edge/trending/manga').reply(500, { error: 'Server Error' });

    await store.dispatch(fetchManga());
    const state = store.getState().manga;

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Request failed with status code 500');
  });
});