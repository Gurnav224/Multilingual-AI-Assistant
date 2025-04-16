import { useState, useRef, useCallback, useEffect } from 'react';
import { FaImage, FaCamera, FaTrash, FaSpinner, FaRobot, FaChevronDown } from 'react-icons/fa';
import PropTypes from 'prop-types';
import axios from 'axios';
import ImageModelSelector from './ImageModelSelector';

// Define image analysis models - moved outside component for reusability
export const IMAGE_ANALYSIS_MODELS = [
  { id: 'llama-4', name: 'Llama 4', description: 'Meta\'s versatile language model' },
  { id: 'mistral', name: 'Mistral', description: 'Powerful open-source model' },
  { id: 'gpt-o1', name: 'GPT-o1', description: 'OpenAI\'s high-performance model' },
  { id: 'claude-3', name: 'Claude 3', description: 'Anthropic\'s multimodal model' },
  { id: 'gemini-pro', name: 'Gemini Pro', description: 'Google\'s advanced vision-language model' }
];

const ImageUploader = ({ onImageCaptured }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-o1'); // Default model changed to GPT-o1
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Process image with selected AI model when an image is uploaded or captured
  useEffect(() => {
    if (image) {
      processImageWithAI(image);
    }
  }, [image]);

  const processImageWithAI = async (imageData) => {
    setIsProcessing(true);
    try {
      // Config for AI API
      const response = await axios.post('/api/analyze-image', {
        image: imageData,
        model: selectedModel
      });
      
      setAiAnalysis(response.data.analysis);
      // Auto-fill the description with AI analysis
      setDescription(response.data.analysis);
    } catch (error) {
      console.error(`Error analyzing image with ${getModelName(selectedModel)}:`, error);
      setAiAnalysis(`Failed to analyze image with ${getModelName(selectedModel)}. Please add a description manually.`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getModelName = (modelId) => {
    const model = IMAGE_ANALYSIS_MODELS.find(m => m.id === modelId);
    return model ? model.name : modelId;
  };

  // Handle model change and reprocess image if needed
  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
    
    // If there's already an image, reprocess it with the new model
    if (image) {
      setAiAnalysis('');
      processImageWithAI(image);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        // AI processing will be triggered by the useEffect
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    setShowCamera(!showCamera);
    if (!showCamera) {
      setTimeout(() => {
        if (videoRef.current) {
          navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
              videoRef.current.srcObject = stream;
              videoRef.current.play();
            })
            .catch(err => {
              console.error("Error accessing camera:", err);
              setShowCamera(false);
            });
        }
      }, 100);
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      const imageDataUrl = canvasRef.current.toDataURL('image/png');
      setImage(imageDataUrl);
      // AI processing will be triggered by the useEffect

      // Stop the camera stream
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }

      setShowCamera(false);
    }
  };

  const clearImage = () => {
    setImage(null);
    setDescription('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = () => {
    // Only proceed if we have both an image and a description
    if (image && description.trim()) {
      onImageCaptured(image, description);
      clearImage();
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        // AI processing will be triggered by the useEffect
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-lg p-4 bg-white shadow-sm transition-all duration-300 ${image ? 'border-green-500' : 'border-blue-300 hover:border-blue-500'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ minHeight: "200px" }}
    >
      {!image && !showCamera && (
        <div className="flex flex-col items-center justify-center h-32 text-gray-500">
          <FaImage className="text-3xl mb-2 text-blue-400" />
          <p>Drag & drop an image here, or click upload</p>
        </div>
      )}

      <div className="flex justify-between mb-3">
        <h3 className="text-lg font-medium text-gray-700">Image Input</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => fileInputRef.current.click()}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            title="Upload image"
          >
            <FaImage />
          </button>
          <button
            onClick={handleCameraCapture}
            className={`p-2 ${showCamera ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white rounded transition-colors`}
            title={showCamera ? 'Close camera' : 'Take photo'}
          >
            <FaCamera />
          </button>
          {image && (
            <button
              onClick={clearImage}
              className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
              title="Clear image"
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>

      {/* AI Model Selector */}
      <div className="mb-3">
        <ImageModelSelector 
          currentModel={selectedModel}
          onModelChange={handleModelChange}
        />
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />

      {showCamera && (
        <div className="relative mb-3">
          <video
            ref={videoRef}
            className="w-full h-auto rounded border"
            autoPlay
            playsInline
            muted
          ></video>
          <button
            onClick={captureImage}
            className="absolute bottom-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            Capture
          </button>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      )}

      {image && (
        <div className="mb-3">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-auto max-h-48 object-contain rounded border"
          />
          <div className="flex justify-center mt-2">
            <button className="button mr-2">Zoom In</button>
            <button className="button">Rotate</button>
          </div>
          {isProcessing && (
            <div className="flex items-center justify-center my-2 text-blue-600">
              <FaSpinner className="animate-spin mr-2" />
              <span>Analyzing with {getModelName(selectedModel)}...</span>
            </div>
          )}
          {aiAnalysis && !isProcessing && (
            <div className="mt-2 p-2 bg-gray-100 rounded text-sm">
              <div className="text-xs text-blue-600 mb-1">Analyzed by {getModelName(selectedModel)}</div>
              <div>{aiAnalysis}</div>
            </div>
          )}
        </div>
      )}

      <textarea
        className={`w-full p-2 border rounded mb-3 ${!description && image && !isProcessing ? 'border-red-400' : 'border-gray-300'}`}
        rows="2"
        placeholder={isProcessing ? `${getModelName(selectedModel)} is analyzing your image...` : "Describe your image (required)..."}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isProcessing}
        required
      ></textarea>

      {image && !description && !isProcessing && (
        <div className="text-red-500 text-sm mb-2">
          Please provide a description for your image before sending.
        </div>
      )}

      <button
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        onClick={handleSubmit}
        disabled={!image || isProcessing || !description}
      >
        {isProcessing ? 'Processing...' : (description ? 'Send Image' : 'Add Description to Send')}
      </button>
    </div>
  );
};

ImageUploader.propTypes = {
  onImageCaptured: PropTypes.func.isRequired
};

export default ImageUploader;
