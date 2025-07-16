import React, { useState } from 'react';
import { Upload, AlertCircle, Loader } from 'lucide-react';

const UploadForm = ({ onUpload, loading, error }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = () => {
    if (name && file) {
      onUpload({ name, file });
      setName('');
      setFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith('.glb')) {
      setFile(droppedFile);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-2xl p-6 border border-purple-500/10 shadow-inner backdrop-blur-md space-y-6">
      <h2 className="text-xl font-semibold text-purple-200">Upload New Model</h2>

      {/* Name input */}
      <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">Model Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter model name..."
          className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-500/20 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </div>

      {/* File dropzone */}
      <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">GLB File</label>
        <div
          className={`relative border-2 border-dashed rounded-lg px-6 py-12 text-center transition-all duration-200 cursor-pointer ${
            isDragging
              ? 'border-purple-400 bg-purple-800/20'
              : 'border-purple-500/20 hover:border-purple-400 hover:bg-purple-800/10'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto mb-4 text-purple-400" size={40} />
          <p className="text-purple-300">
            {file ? file.name : 'Drop your GLB file here or click to browse'}
          </p>
          <input
            type="file"
            accept=".glb"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>

      {/* Upload button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !name || !file}
        className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-indigo-700 transition transform hover:scale-[1.01] active:scale-[0.98]"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader size={18} className="animate-spin" />
            Uploading...
          </span>
        ) : (
          'Upload Model'
        )}
      </button>

      {/* Error display */}
      {error && (
        <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} className="text-red-400" />
          <p className="text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
