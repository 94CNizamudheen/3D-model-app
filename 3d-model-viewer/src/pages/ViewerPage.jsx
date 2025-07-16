
import '@google/model-viewer';

const ModelViewer = ({ modelUrl }) => {
  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl border border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
      <div className="aspect-[16/9] relative">
        {modelUrl ? (
          <model-viewer
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
