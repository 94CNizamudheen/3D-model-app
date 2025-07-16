import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchModels = createAsyncThunk('models/fetch', async () => {
  const response = await axios.get(`${BASE_URL}/models`);
  console.log(response)
  return response.data;
});

export const uploadModel = createAsyncThunk('models/upload', async ({ name, file }, { dispatch }) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('model', file);
  await axios.post(`${BASE_URL}/models/upload`, formData);
  dispatch(fetchModels());
});


export const fetchModelBlob = createAsyncThunk(
  'models/fetchBlob',
  async (id) => {
    const res = await axios.get(`${BASE_URL}/models/${id}`, {
      responseType: 'blob',
    });
    return URL.createObjectURL(res.data); 
  }
);

export const fetchModelUrl = createAsyncThunk(
  'models/fetchById',
  async (id) => {
    const response = await axios.get(`${BASE_URL}/models/${id}`, {
      responseType: 'blob',
    });
    const blobUrl = URL.createObjectURL(response.data);
    return blobUrl;
  }
);


