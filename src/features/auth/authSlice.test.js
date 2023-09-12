import { configureStore } from '@reduxjs/toolkit';
import api from '../../api/index';
import authReducer, { registerUser, loginUser } from './authSlice';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('../../api/index', () => ({
  post: jest.fn(),
}));

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = mockLocalStorage;

describe('authSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle user registration successfully', async () => {
    const userData = { firstName: 'test', lastName:"user", email:"test@gmail.com", password: 'testpassword' };
    api.post.mockResolvedValue({ data: {} });

    await store.dispatch(registerUser(userData));
    const state = store.getState().auth;

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(toast.success).toHaveBeenCalledWith('User registered successfully');
  });

  it('should handle user registration failure', async () => {
    const userData = { firstName: 'test', lastName:"user", email:"test@gmail.com", password: 'testpassword' };
    const errorMessage = 'Rejected';
    api.post.mockRejectedValue({ response: { data: { message: errorMessage } } });

    await store.dispatch(registerUser(userData));
    const state = store.getState().auth;

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });

  it('should handle user login successfully', async () => {
    const userData = { email:"test@gmail.com", password: 'testpassword' };
    const token = 'testToken';
    api.post.mockResolvedValue({ data: { token } });

    await store.dispatch(loginUser(userData));
    const state = store.getState().auth;

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
    expect(toast.success).toHaveBeenCalledWith('User logged in successfully');
  });

  it('should handle user login failure', async () => {
    const userData = { email:"test@gmail.com", password: 'testpassword' };
    const errorMessage = 'Rejected';
    api.post.mockRejectedValue({ response: { data: { message: errorMessage } } });

    await store.dispatch(loginUser(userData));
    const state = store.getState().auth;

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(errorMessage);
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith(errorMessage);
  });
});