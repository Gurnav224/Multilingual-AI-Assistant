import { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';
import useChat from '../hooks/useChat';
import ChatMessage from './ChatMessage';
import AudioRecorder from './AudioRecorder';
import ImageUploader from './ImageUploader';

const ChatInterface = ({ language = 'en', model = 'llama3-70b-8192' }) => {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [showImageUploader, setShowImageUploader] = useState(false);
  const messagesEndRef = useRef(null);

  // Map language codes to speech recognition language codes
// Map language codes to speech recognition language codes
const speechLanguageMap = {
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  de: 'de-DE',
  zh: 'zh-CN',
  ja: 'ja-JP',
  ko: 'ko-KR',
  ar: 'ar-SA',
  hi: 'hi-IN',
  ru: 'ru-RU',
  pt: 'pt-PT',
  it: 'it-IT',
  nl: 'nl-NL',
  tr: 'tr-TR',
  pl: 'pl-PL',
  sv: 'sv-SE',
  no: 'nb-NO',
  da: 'da-DK',
  fi: 'fi-FI',
  cs: 'cs-CZ',
  el: 'el-GR',
  th: 'th-TH',
  vi: 'vi-VN',
  id: 'id-ID',
  he: 'he-IL',
  uk: 'uk-UA',
  ro: 'ro-RO',
  hu: 'hu-HU',
  bg: 'bg-BG',
  ms: 'ms-MY'
};


  const {
    messages,
    isLoading,
    error,
    sendTextMessage,
    sendImageMessage,
    sendAudioMessage,
    clearMessages,
    changeLanguage,
    changeModel
  } = useChat([], { language, model });

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update language when prop changes
  useEffect(() => {
    changeLanguage(language);
  }, [language, changeLanguage]);

  // Update model when prop changes
  useEffect(() => {
    if (model) {
      changeModel(model);
    }
  }, [model, changeModel]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (input.trim()) {
      sendTextMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAudioCaptured = (transcript) => {
    if (transcript.trim()) {
      sendAudioMessage(transcript);
    }
  };

  const handleImageCaptured = (imageData, description) => {
    sendImageMessage(imageData, description);
    setShowImageUploader(false);
  };

  const toggleImageUploader = () => {
    setShowImageUploader(!showImageUploader);
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden h-[80vh]">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">{t('appTitle')}</h2>
        <button
          onClick={clearMessages}
          className="text-gray-500 hover:text-red-500 transition-colors"
          title={t('clearButton')}
        >
          <FaTrash />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.length > 1 ? (
          messages.slice(1).map((msg, i) => (
            <ChatMessage
              key={i}
              message={msg}
              isUser={msg.role === "user"}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>{t('appTitle')}</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <div className="p-2 bg-red-100 text-red-800 text-sm">
          {error}
        </div>
      )}

      {/* Image uploader */}
      {showImageUploader && (
        <div className="p-4 border-t">
          <ImageUploader onImageCaptured={handleImageCaptured} />
        </div>
      )}

      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder={t('inputPlaceholder')}
              rows="3"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-2">
            <button
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              title={t('sendButton')}
            >
              <FaPaperPlane />
            </button>

            <button
              className={`p-3 ${showImageUploader ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded-full transition-colors`}
              onClick={toggleImageUploader}
              title={showImageUploader ? t('imageUpload.clearButton') : t('imageUpload.title')}
            >
              {showImageUploader ? '×' : '📷'}
            </button>

            <AudioRecorder
              onAudioCaptured={handleAudioCaptured}
              language={speechLanguageMap[language] || 'en-US'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ChatInterface.propTypes = {
  language: PropTypes.string,
  model: PropTypes.string
};

export default ChatInterface;