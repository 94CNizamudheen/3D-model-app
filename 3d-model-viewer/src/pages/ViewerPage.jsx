import '@google/model-viewer';

const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center text-purple-300 flex-col bg-gradient-to-br from-purple-900/10 to-indigo-900/10">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 bg-purple-500/20 rounded-full animate-pulse"></div>
      </div>
    </div>
    <p className="mt-4 text-sm animate-pulse">Loading 3D model...</p>
    <div className="mt-2 flex space-x-1">
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  </div>
);

const ModelViewer = ({ modelUrl, loading }) => {
  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
      <div className="aspect-[16/9] relative">
        {loading ? (
          <LoadingSpinner />
        ) : modelUrl ? (
          <model-viewer
            key={modelUrl} // force re-render
            src={modelUrl}
            alt="3D model"
            auto-rotate
            camera-controls
            style={{ width: '100%', height: '100%' }}
            exposure="1"
            shadow-intensity="1"
            ar
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-purple-300 flex-col">
            <svg className="w-12 h-12 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M12 4.5c-7.5 0-11.5 7.5-11.5 7.5s4 7.5 11.5 7.5 11.5-7.5 11.5-7.5-4-7.5-11.5-7.5zm0 11a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
            </svg>
            <p>No model selected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelViewer;
