import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchModelUrl } from '../features/models/modelThunks';
import { setSelectedModel } from '../features/models/modelSlice';
import ModelViewer from '../pages/ViewerPage';
import ModelCard from '../components/ModelCard';

const Viewer = () => {
  const dispatch = useAppDispatch();

const { models, selectedModel, selectedModelUrl, loading } = useAppSelector((state) => state.models);


  useEffect(() => {
    if (selectedModel?._id) {
      dispatch(fetchModelUrl(selectedModel._id));
    }
  }, [selectedModel, dispatch]);

  const handleSelect = (model) => {
    dispatch(setSelectedModel(model));
  };
  

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
        Model Viewer
      </h1>
      {/* Model Viewer */}
      <ModelViewer modelUrl={selectedModelUrl} loading={loading} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 p-5">
        {models.map((model) => (
          <ModelCard
            key={model._id}
            model={model}
            isSelected={selectedModel?._id === model._id}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Viewer;
