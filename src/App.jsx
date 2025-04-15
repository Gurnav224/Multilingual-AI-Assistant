import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChatInterface from './components/ChatInterface';
import LanguageSelector from './components/LanguageSelector';
import ModelSelector from './components/ModelSelector';
import ApiKeyStatus from './components/ApiKeyStatus';
import { MODELS } from './services/groqService';

function App() {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [currentModel, setCurrentModel] = useState(MODELS.LLAMA3_8K);
  const [apiKeyValid, setApiKeyValid] = useState(true);
  const [showApiStatus, setShowApiStatus] = useState(true);

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    setCurrentLanguage(langCode);
  };

  const handleModelChange = (modelId) => {
    setCurrentModel(modelId);
  };

  const handleApiStatusChange = (isValid) => {
    setApiKeyValid(isValid);
    // Hide the status after 10 seconds if it's valid
    if (isValid) {
      setTimeout(() => setShowApiStatus(false), 10000);
    }
  }; 

  return (
    <div className="min-h-screen bg-gray-100 p-4 top-0">
      <div className="max-w-6xl mx-auto">

        <div className="flex gap-10 items-center mb-12 lg:mb-20 top-0 sticky bg-white shadow-md rounded-lg pr-4 sm:py-2 lg:py-1">
          <img src="logo.png" alt="logo" className='w-40 h-20 pl-4 py-2' />
          <div className='flex flex-col sm:flex-row lg:flex-row justify-around w-full gap-5 lg:gap-10'>
            <h1 className="text-3xl sm:w-full font-bold text-gray-800 text-center">{t('appTitle')}</h1>
            <div className="hidden sm:flex sm:flex-col gap-2 lg:flex-row space-x-4">
              <div className="w-40">
                <ModelSelector
                  onModelChange={handleModelChange}
                  currentModel={currentModel}
                />
              </div>
              <div className="w-40">
                <LanguageSelector
                  onLanguageChange={handleLanguageChange}
                  currentLanguage={currentLanguage}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 space-x-4 mb-10 sm:hidden justify-center items-center w-full">
          <div className="w-40">
            <ModelSelector
              onModelChange={handleModelChange}
              currentModel={currentModel}
            />
          </div>
          <div className="w-40">
            <LanguageSelector
              onLanguageChange={handleLanguageChange}
              currentLanguage={currentLanguage}
            />
          </div>
        </div>

        {/* API Key Status */}
        {showApiStatus && (
          <div className="mb-6">
            <ApiKeyStatus onStatusChange={handleApiStatusChange} />
          </div>
        )}

        {/* Chat Interface */}
        {apiKeyValid ? (
          <ChatInterface language={currentLanguage} model={currentModel} />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">API Key Error</h2>
            <p className="mb-4">Please check your Groq API key in the .env file.</p>
            <p className="text-sm text-gray-600">
              Make sure you have added a valid API key to the VITE_GROQ_API_KEY variable in your .env file.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;