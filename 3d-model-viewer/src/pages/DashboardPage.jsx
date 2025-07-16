

import React, { useEffect, useState } from 'react';
import UploadForm from '../components/UploadForm';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchModels } from '../features/models/modelThunks';
import { File, Loader, AlertCircle,  } from 'lucide-react';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { models, loading, error } = useAppSelector((state) => state.models);
  const [selectedModel, setSelectedModel] = useState(null);

  useEffect(() => {
    dispatch(fetchModels());
  }, [dispatch]);

  const handleModelSelect = (model) => {
    setSelectedModel(selectedModel === model._id ? null : model._id);
   
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <File className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-white">Model Dashboard</h1>
      </div>
      
      <UploadForm />
      
      <div className="glass-card p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Available Models</h2>
        
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-8 h-8 animate-spin text-purple-400" />
          </div>
        )}
        
        {error && (
          <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.length === 0 && !loading ? (
            <div className="col-span-full text-center py-8">
              <File className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <p className="text-purple-300 text-lg">No models uploaded yet</p>
              <p className="text-purple-400">Upload your first GLB model to get started</p>
            </div>
          ) : (
            models.map((model) => (
              <div 
                key={model._id} 
                className={`glass-card p-4 cursor-pointer transition-all transform hover:scale-[1.02] ${
                  selectedModel === model._id ? 'ring-2 ring-purple-500' : ''
                }`}
                onClick={() => handleModelSelect(model)}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <File className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{model.name}</h3>
                    <p className="text-sm text-purple-300">GLB Model</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};


export default DashboardPage;
