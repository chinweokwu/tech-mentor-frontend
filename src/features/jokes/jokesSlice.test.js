import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import jokesReducer, { fetchJokes } from './jokesSlice';

const mockAxios = new MockAdapter(axios);

describe('jokesSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        jokes: jokesReducer,
      },
    });
  });

  it('should handle fetching jokes successfully', async () => {
    const mockJokes = [
      { id: 1, joke: 'Joke 1' },
      { id: 2, joke: 'Joke 2' },
      { id: 3, joke: 'Joke 3' },
    ];

    mockAxios.onGet('https://official-joke-api.appspot.com/jokes/ten').reply(200, mockJokes);

    await store.dispatch(fetchJokes('someRoute'));
    const state = store.getState().jokes;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(state.jokes).toEqual(mockJokes);
  });

  it('should handle pending state when fetching jokes', () => {
    store.dispatch(fetchJokes('someRoute')); 
    const state = store.getState().jokes;

    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle error state when fetching jokes', async () => {
    mockAxios.onGet('https://official-joke-api.appspot.com/jokes/ten').reply(500, { error: 'Server Error' });

    await store.dispatch(fetchJokes('someRoute'));
    const state = store.getState().jokes;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });
});