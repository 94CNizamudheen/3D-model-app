import { createSlice } from '@reduxjs/toolkit';
import { fetchModels, uploadModel, fetchModelUrl,  } from './modelThunks';

const initialState = {
  models: [],
  modelBlobs: {},
  selectedModel: null,
  selectedModelUrl: null,
  loading: false,
  error: null,
};

const modelSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    setSelectedModel: (state, action) => {
      state.selectedModel = action.payload;
      const id = action.payload?._id;
      state.selectedModelUrl = id ? state.modelBlobs[id] : null;
    },
    clearSelectedModel: (state) => {
      state.selectedModel = null;
      state.selectedModelUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchModels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModels.fulfilled, (state, action) => {
        state.loading = false;
        state.models = action.payload;
      })
      .addCase(fetchModels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Fetch failed';
      })
      .addCase(uploadModel.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadModel.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadModel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Upload failed';
      })
      .addCase(fetchModelUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModelUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedModelUrl = action.payload;
      })
      .addCase(fetchModelUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Model load failed';
      })


  },
});

export const { setSelectedModel, clearSelectedModel } = modelSlice.actions;
export default modelSlice.reducer;
