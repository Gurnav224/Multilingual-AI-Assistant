import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { MODEL_INFO } from '../services/groqService';

const models = [
  { id: 'llama3-70b-8192', name: 'Llama 3 (70B)' },
  { id: 'llama3-70b-8192-instruct', name: 'Llama 3 Instruct (70B)' },
  { id: 'llama4-8b-32k', name: 'Llama 4 (8B)' },
  { id: 'llama4-27b-32k', name: 'Llama 4 (27B)' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral (8x7B)' },
  { id: 'gemma-7b-it', name: 'Gemma (7B)' },
  { id: 'gpt-o1', name: 'GPT-o1' },
  { id: 'mistral-large', name: 'Mistral Large' },
  { id: 'deepseek-llm-67b-32k', name: 'DeepSeek LLM (67B)' },
  { id: 'deepseek-coder-33b', name: 'DeepSeek Coder (33B)' }
];

const ModelSelector = ({ onModelChange, currentModel = 'llama3-70b-8192' }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleModelSelect = (modelId) => {
    onModelChange(modelId);
    setIsOpen(false);
  };

  const currentModelName = models.find(model => model.id === currentModel)?.name || models[0].name;
  
  // Get model description from MODEL_INFO if available
  const getModelDescription = (modelId) => {
    const modelKey = Object.keys(MODEL_INFO).find(key => MODEL_INFO[key].name.includes(modelId.split('-')[0].toUpperCase()));
    return modelKey ? MODEL_INFO[modelKey].description : '';
  };

  return (
    <div className="relative model-selector">
      <div className="flex items-center mb-1">
        <svg className="w-5 h-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M13 7H7v6h6V7z" />
          <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium">{t('modelSelector.label', 'Model:')}</span>
      </div>
      <button
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="block truncate">{currentModelName}</span>
        <svg className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
          <div className="py-1 max-h-60 overflow-auto">
            {models.map((model) => {
              const description = getModelDescription(model.id);
              
              return (
                <button
                  key={model.id}
                  className={`block w-full px-4 py-2 text-sm text-left transition-colors duration-150 ${
                    model.id === currentModel
                      ? 'bg-indigo-50 text-indigo-900 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => handleModelSelect(model.id)}
                  title={description}
                >
                  <div className="font-medium">{model.name}</div>
                  {description && (
                    <div className="text-xs text-gray-500 mt-1 truncate">{description}</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

ModelSelector.propTypes = {
  onModelChange: PropTypes.func.isRequired,
  currentModel: PropTypes.string
};

export default ModelSelector;
