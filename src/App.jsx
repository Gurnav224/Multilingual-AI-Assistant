import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ChatInterface from './components/ChatInterface';
import LanguageSelector from './components/LanguageSelector';
import ModelSelector from './components/ModelSelector';
import ApiKeyStatus from './components/ApiKeyStatus';
import { MODELS } from './services/groqService';
import './App.css';

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
    <div className="min-h-screen p-4 pt-8">
      <div className="max-w-6xl mx-auto">
        <div className="header flex flex-col md:flex-row justify-between items-center mb-6 p-6">
          <h1 className="text-3xl font-bold text-indigo-800 mb-4 md:mb-0">{t('appTitle')}</h1>
          <div className="flex flex-row space-x-6 w-full md:w-auto">
            <div className="w-48">
              <ModelSelector
                onModelChange={handleModelChange}
                currentModel={currentModel}
              />
            </div>
            <div className="w-48">
              <LanguageSelector
                onLanguageChange={handleLanguageChange}
                currentLanguage={currentLanguage}
              />
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
          <div className="card hover:shadow-xl transition-all duration-300">
            <ChatInterface language={currentLanguage} model={currentModel} />
          </div>
        ) : (
          <div className="card bg-white p-8 text-center border-red-200 border-2">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-red-100">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-600 mb-4">API Key Error</h2>
            <p className="mb-4">Please check your Groq API key in the .env file.</p>
            <p className="text-sm text-gray-600">
              Make sure you have added a valid API key to the VITE_GROQ_API_KEY variable in your .env file.
            </p>
            <button 
              className="button button-danger mt-4"
              onClick={() => setShowApiStatus(true)}
            >
              Check Again
            </button>
          </div>
        )}
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Multilingual AI Assistant. Powered by Groq API.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;