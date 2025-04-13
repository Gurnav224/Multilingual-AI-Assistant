import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaRobot, FaChevronDown } from 'react-icons/fa';
import { IMAGE_ANALYSIS_MODELS } from './ImageUploader';

const ImageModelSelector = ({ currentModel, onModelChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelSelect = (modelId) => {
    onModelChange(modelId);
    setIsOpen(false);
  };

  const getModelName = (modelId) => {
    const model = IMAGE_ANALYSIS_MODELS.find(m => m.id === modelId);
    return model ? model.name : modelId;
  };

  const models = [
    'GPT-4',  // Keeping other models as is
    'DeepSeek',  // Example of retained models; adjust based on actual list
    // ... existing code in the array ...
  ];

  return (
    <div className="relative">
      <div className="flex items-center mb-1">
        <FaRobot className="text-blue-500 mr-2" />
        <span className="text-sm font-medium">AI Model:</span>
      </div>
      
      <div 
        className="p-2 border rounded flex justify-between items-center cursor-pointer hover:bg-blue-50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{getModelName(currentModel)}</span>
        <FaChevronDown className={`text-blue-500 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow-lg z-10 max-h-60 overflow-auto">
          {IMAGE_ANALYSIS_MODELS.filter(model => !['Mistral', 'Claude 3', 'Llama 4'].includes(model.name)).map(model => (
            <div 
              key={model.id}
              className={`p-2 hover:bg-blue-50 cursor-pointer transition-colors ${currentModel === model.id ? 'bg-blue-100' : ''}`}
              onClick={() => handleModelSelect(model.id)}
            >
              <div className="font-medium">{model.name}</div>
              <div className="text-xs text-gray-500">{model.description}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ImageModelSelector.propTypes = {
  currentModel: PropTypes.string.isRequired,
  onModelChange: PropTypes.func.isRequired
};

export default ImageModelSelector; 