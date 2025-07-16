import { createSlice } from '@reduxjs/toolkit';
import { fetchModels, uploadModel ,fetchModelUrl} from './modelThunks';

const initialState = {
  models: [],
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
      state.selectedModelUrl = null;
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
      .addCase(fetchModelUrl.fulfilled, (state, action) => {
        state.selectedModelUrl = action.payload;
      })
  },
});

export const { setSelectedModel, clearSelectedModel } = modelSlice.actions;
export default modelSlice.reducer;
