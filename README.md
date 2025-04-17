# Multilingual AI Assistant

## Description
This is a React-based frontend application for a multilingual AI assistant. It leverages the Groq API to handle AI interactions, supports multiple languages (e.g., English, Spanish, French, and more), and includes features like text chat, audio input via speech recognition, image processing and the abality to choose from multiple LLM like (Lamma 3,Gemma and more). The app is designed for real-time user interactions in various languages.

## Features
- **Multilingual Support**: Integrated with i18next for seamless language switching across 20+ languages.
- **AI Chat Interface**: Allows users to send text, audio, or image inputs and receive responses from Groq models.
- **Model Selection**: Users can choose from various AI models like Llama 3, Mixtral, and Gemma.
- **Audio and Image Handling**: Supports speech recognition and image uploads for enhanced interaction.
- **API Integration**: Uses environment variables ( VITE_GROQ_API_KEY) for secure API calls.
- **Responsive Design**: Built with Tailwind CSS for a modern, mobile-friendly interface.

## Installation
1. Clone the repository:
   ```bash
   git clone git@github.com:Gurnav224/Multilingual-AI-Assistant.git
   ```
2. Navigate to the project directory:
   ```bash
   cd multilingual-ai-assistant
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables: Copy `.env.example` to `.env` and add your Groq API key:
   ```plaintext
   VITE_GROQ_API_KEY=your_api_key
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
- Run the app locally with:
   ```bash
   npm run dev
   ```
- Interact with the chat interface: Select a language and model, then send messages or use audio/image features.
- For production, build the app with:
   ```bash
   npm run build
   ```
   and preview with:
   ```bash
   npm run preview
   ```

## Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure to follow the ESLint rules in the project.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
