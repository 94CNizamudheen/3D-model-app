


import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './hooks';
import { fetchModels, uploadModel } from './features/models/modelThunks';
import { setSelectedModel } from './features/models/modelSlice';
import { fetchModelUrl } from './features/models/modelThunks';

import Sidebar from './components/Sidebar';
import UploadForm from './components/UploadForm';
import ModelCard from './components/ModelCard';
import Viewer from './components/Viewer';


const App = () => {
  const dispatch = useAppDispatch();
  const { models, selectedModel,  loading, error } = useAppSelector((state) => state.models);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (selectedModel?._id) {
      dispatch(fetchModelUrl(selectedModel._id));
    }
  }, [selectedModel, dispatch]);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white flex flex-col md:flex-row">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-6">
        {activeTab === 'dashboard' && (

          <>
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">Dashboard</h1>
            <UploadForm onUpload={(data) => dispatch(uploadModel(data))} loading={loading} error={error} />
            <div className="mt-8 grid gap-3">
              {models.map((model) => (
                <ModelCard
                  key={model._id}
                  model={model}
                  isSelected={selectedModel?._id === model._id}
                  onSelect={(m) => dispatch(setSelectedModel(m))}
                />
              ))}
            </div>
          </>
        )}

        {activeTab === 'viewer' && <Viewer/>}
      </main>
    </div>
  );
};

export default App;
