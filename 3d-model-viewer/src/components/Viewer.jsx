
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchModelUrl } from '../features/models/modelThunks';
import { setSelectedModel } from '../features/models/modelSlice';
import ModelViewer from '../pages/ViewerPage';

const Viewer = () => {
  const dispatch = useAppDispatch();
  const { models, selectedModel } = useAppSelector((state) => state.models);

  useEffect(() => {
    if (selectedModel?._id) {
      dispatch(fetchModelUrl(selectedModel._id));
    }
  }, [selectedModel, dispatch]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
        Model Viewer
      </h1>

      <div className="mb-4">
        <label className="block text-sm mb-2 text-purple-300">Choose a model:</label>
        <select
          onChange={(e) => {
            const selected = models.find((m) => m._id === e.target.value);
            dispatch(setSelectedModel(selected));
          }}
          className="w-[40%] p-2  bg-purple-950 border rounded-2xl border-purple-500/20 text-white"
          value={selectedModel?._id || ''}
        >
          <option className='bg-purple-500 border rounded-2xl' value="">Select Model</option>
          {models.map((model) => (
            <option key={model._id} value={model._id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>

      <ModelViewer
        modelUrl={selectedModel ? `${import.meta.env.VITE_BACKEND_URL}/models/${selectedModel._id}` : null}
      />
    </div>
  );
};

export default Viewer;
