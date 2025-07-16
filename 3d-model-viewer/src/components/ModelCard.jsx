

import { Grid } from 'lucide-react';

const ModelCard = ({ model, isSelected, onSelect }) => (
  <div
    onClick={() => onSelect(model)}
    className={`group relative p-4 rounded-xl border cursor-pointer transition-all duration-200 transform hover:scale-[1.02] ${isSelected
        ? 'border-purple-500 bg-purple-900/20 shadow-lg shadow-purple-500/20'
        : 'border-purple-500/20 bg-black/20 hover:border-purple-400 hover:bg-purple-900/10'
      }`}
  >
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
        <Grid className="text-white" size={24} />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-white group-hover:text-purple-300 transition-colors">
          {model.name}
        </h3>
        <p className="text-sm text-purple-400">
          Uploaded: {model.createdAt ? new Date(model.createdAt).toLocaleDateString() : 'Unknown'}
        </p>
      </div>
      {isSelected && <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>}
    </div>
  </div>
);

export default ModelCard;
