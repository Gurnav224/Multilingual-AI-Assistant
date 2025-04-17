import { useState, useRef } from 'react';
import { FaImage, FaCamera, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ImageUploader = ({ onImageCaptured }) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
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
    if (image) {
      onImageCaptured(image, description);
      clearImage();
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
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
        </div>
      )}

      <textarea
        className="w-full p-2 border rounded mb-3"
        rows="2"
        placeholder="Describe your image..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button
        className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        onClick={handleSubmit}
        disabled={!description}
      >
        Send Image
      </button>
    </div>
  );
};

ImageUploader.propTypes = {
  onImageCaptured: PropTypes.func.isRequired
};

export default ImageUploader;
