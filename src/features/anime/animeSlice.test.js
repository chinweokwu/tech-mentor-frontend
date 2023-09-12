import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import animeReducer, { fetchAnimes } from './animeSlice';

const mockAxios = new MockAdapter(axios);

describe('animeSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        anime: animeReducer,
      },
    });
  });

  it('should handle fetching animes successfully', async () => {
    const mockAnimes = [{ id: 1, title: 'Anime 1' }, { id: 2, title: 'Anime 2' }];
    mockAxios.onGet(/kitsu.io/).reply(200, { data: { data: mockAnimes } });

    await store.dispatch(fetchAnimes({ page: 1, perPage: 10 }));
    const state = store.getState().anime;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.animes.data).toEqual(mockAnimes);
  });

  it('should handle pending state when fetching animes', () => {
    store.dispatch(fetchAnimes({ page: 1, perPage: 10 }));
    const state = store.getState().anime;

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle error state when fetching animes', async () => {
    mockAxios.onGet(/kitsu.io/).reply(500, { error: 'Server Error' });

    await store.dispatch(fetchAnimes({ page: 1, perPage: 10 }));
    const state = store.getState().anime;

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Request failed with status code 500');
  });
});