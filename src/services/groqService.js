// /**
//  * Service for interacting with the Groq API
//  */

// // Available models
// export const MODELS = {
//   LLAMA3_8K: 'llama3-70b-8192',
//   LLAMA3_INSTRUCT: 'llama3-70b-8192-instruct',
//   MIXTRAL: 'mixtral-8x7b-32768',
//   GEMMA: 'gemma-7b-it'
// };

// // Model information
// export const MODEL_INFO = {
//   [MODELS.LLAMA3_8K]: {
//     name: 'Llama 3 (70B)',
//     contextWindow: 8192,
//     description: 'Meta\'s flagship large language model with 70B parameters'
//   },
//   [MODELS.LLAMA3_INSTRUCT]: {
//     name: 'Llama 3 Instruct (70B)',
//     contextWindow: 8192,
//     description: 'Instruction-tuned version of Llama 3 optimized for following instructions'
//   },
//   [MODELS.MIXTRAL]: {
//     name: 'Mixtral (8x7B)',
//     contextWindow: 32768,
//     description: 'Mixture of Experts model with a large 32k context window'
//   },
//   [MODELS.GEMMA]: {
//     name: 'Gemma (7B)',
//     contextWindow: 8192,
//     description: 'Lightweight and efficient model from Google'
//   }
// };

// // Default model to use
// const DEFAULT_MODEL = MODELS.LLAMA3_8K;

// // Language-specific system prompts
// const LANGUAGE_SYSTEM_PROMPTS = {
//   en: 'You are a helpful, multilingual AI assistant powered by Groq. Respond in English.',
//   es: 'Eres un asistente de IA multilingüe útil desarrollado por Groq. Responde en español.',
//   fr: 'Vous êtes un assistant IA multilingue utile alimenté par Groq. Répondez en français.',
//   de: 'Sie sind ein hilfreicher, mehrsprachiger KI-Assistent, der von Groq entwickelt wurde. Antworten Sie auf Deutsch.',
//   zh: '您是由Groq提供支持的多语言AI助手。请用中文回答。',
//   ja: 'あなたはGroqを搭載した役立つ多言語AIアシスタントです。日本語で回答してください。',
//   ko: '당신은 Groq에서 제공하는 다국어 AI 어시스턴트입니다. 한국어로 대답해주세요.',
//   ar: 'أنت مساعد ذكاء اصطناعي متعدد اللغات مفيد مدعوم من Groq. الرجاء الرد باللغة العربية.',
//   hi: 'आप Groq द्वारा संचालित एक सहायक, बहुभाषी AI सहायक हैं। कृपया हिंदी में उत्तर दें।',
//   ru: 'Вы полезный многоязычный ИИ-ассистент, работающий на Groq. Пожалуйста, отвечайте на русском языке.'
// };

// /**
//  * Get the system prompt for a specific language
//  * @param {string} language - Language code
//  * @returns {string} - System prompt for the language
//  */
// const getSystemPrompt = (language = 'en') => {
//   return LANGUAGE_SYSTEM_PROMPTS[language] || LANGUAGE_SYSTEM_PROMPTS.en;
// };

// /**
//  * Send a message to the Groq API
//  * @param {Array} messages - Array of message objects with role and content
//  * @param {Object} options - Additional options
//  * @returns {Promise} - Promise with the API response
//  */
// export const sendMessage = async (messages, options = {}) => {
//   try {
//     const apiKey = import.meta.env.VITE_GROQ_API_KEY;

//     // Log for debugging (remove in production)
//     console.log('Using API key:', apiKey ? 'API key found' : 'API key missing')

//     if (!apiKey) {
//       throw new Error('Groq API key is missing. Please add VITE_GROQ_API_KEY to your environment variables.');
//     }

//       const model = options.model || DEFAULT_MODEL;
//       const temperature = options.temperature || 0.7;
//       const maxTokens = options.maxTokens || 4096;
//       const language = options.language || 'en';

//     // Add system message if not present
//     if (!messages.some(msg => msg.role === 'system')) {
//       messages = [
//         { role: 'system', content: getSystemPrompt(language) },
//         ...messages
//       ];
//     }

//     const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify({
//         model,
//         messages,
//         temperature,
//         max_tokens: maxTokens,
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error?.message || 'Failed to get response from Groq API');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error calling Groq API:', error);
//     throw error;
//   }
// };

// /**
//  * Process an image and get a description from Groq
//  * @param {string} imageData - Base64 encoded image data
//  * @param {string} userDescription - Optional user description of the image
//  * @param {string} language - Language code for the response
//  * @param {string} model - Model ID to use
//  * @returns {Promise} - Promise with the API response
//  */
// export const processImage = async (imageData, userDescription = '', language = 'en', model = DEFAULT_MODEL) => {
//   // For now, we'll just send the user description as Groq doesn't directly support image input
//   // In a real implementation, you might want to use a different API for image processing
//   // and then send the results to Groq

//   const prompt = userDescription
//     ? `[Image description provided by user]: ${userDescription}`
//     : '[Image uploaded by user]';

//   const messages = [
//     { role: 'user', content: prompt }
//   ];

//   return sendMessage(messages, { language, model });
// };

// /**
//  * Process audio transcription and get a response from Groq
//  * @param {string} transcript - Transcribed audio text
//  * @param {string} language - Language code for the response
//  * @param {string} model - Model ID to use
//  * @returns {Promise} - Promise with the API response
//  */
// export const processAudio = async (transcript, language = 'en', model = DEFAULT_MODEL) => {
//   const messages = [
//     { role: 'user', content: transcript }
//   ];

//   return sendMessage(messages, { language, model });
// };

// /**
//  * Get available models from Groq API
//  * @returns {Promise} - Promise with the available models
//  */
// export const getAvailableModels = async () => {
//   try {
//     const apiKey = import.meta.env.VITE_GROQ_API_KEY;

//     if (!apiKey) {
//       throw new Error('Groq API key is missing');
//     }

//     const response = await fetch('https://api.groq.com/openai/v1/models', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${apiKey}`,
//       },
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error?.message || 'Failed to get models from Groq API');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching Groq models:', error);
//     throw error;
//   }
// };



/**
 * Service for interacting with the Groq API
 */

// Available models
export const MODELS = {
  LLAMA3_8K: 'llama3-70b-8192',
  LLAMA3_INSTRUCT: 'llama3-70b-8192-instruct',
  LLAMA4_8B: 'llama4-8b-32k',
  LLAMA4_27B: 'llama4-27b-32k',
  MIXTRAL: 'mixtral-8x7b-32768',
  GEMMA: 'gemma-7b-it',
  GPT_O1: 'gpt-o1',
  MISTRAL_LARGE: 'mistral-large',
  DEEPSEEK_LLM: 'deepseek-llm-67b-32k',
  DEEPSEEK_CODER: 'deepseek-coder-33b'
};

// Model information
export const MODEL_INFO = {
  [MODELS.LLAMA3_8K]: {
    name: 'Llama 3 (70B)',
    contextWindow: 8192,
    description: 'Meta\'s flagship large language model with 70B parameters'
  },
  [MODELS.LLAMA3_INSTRUCT]: {
    name: 'Llama 3 Instruct (70B)',
    contextWindow: 8192,
    description: 'Instruction-tuned version of Llama 3 optimized for following instructions'
  },
  [MODELS.LLAMA4_8B]: {
    name: 'Llama 4 (8B)',
    contextWindow: 32768,
    description: 'Latest model from Meta with 32k context window and 8B parameters'
  },
  [MODELS.LLAMA4_27B]: {
    name: 'Llama 4 (27B)',
    contextWindow: 32768,
    description: 'Latest model from Meta with 32k context window and 27B parameters'
  },
  [MODELS.MIXTRAL]: {
    name: 'Mixtral (8x7B)',
    contextWindow: 32768,
    description: 'Mixture of Experts model with a large 32k context window'
  },
  [MODELS.GEMMA]: {
    name: 'Gemma (7B)',
    contextWindow: 8192,
    description: 'Lightweight and efficient model from Google'
  },
  [MODELS.GPT_O1]: {
    name: 'GPT-o1',
    contextWindow: 32768,
    description: 'OpenAI\'s latest multimodal model with 32k context window'
  },
  [MODELS.MISTRAL_LARGE]: {
    name: 'Mistral Large',
    contextWindow: 32768,
    description: 'Mistral\'s powerful large language model'
  },
  [MODELS.DEEPSEEK_LLM]: {
    name: 'DeepSeek LLM (67B)',
    contextWindow: 32768, 
    description: 'Advanced large language model from DeepSeek with 67B parameters'
  },
  [MODELS.DEEPSEEK_CODER]: {
    name: 'DeepSeek Coder (33B)',
    contextWindow: 32768,
    description: 'Specialized coding model from DeepSeek with 33B parameters'
  }
};

// Default model to use
const DEFAULT_MODEL = MODELS.LLAMA3_8K;

// Language-specific system prompts
const LANGUAGE_SYSTEM_PROMPTS = {
  en: 'You are a helpful, multilingual AI assistant powered by Groq. Respond in English.',
  es: 'Eres un asistente de IA multilingüe útil desarrollado por Groq. Responde en español.',
  fr: 'Vous êtes un assistant IA multilingue utile alimenté par Groq. Répondez en français.',
  de: 'Sie sind ein hilfreicher, mehrsprachiger KI-Assistent, der von Groq entwickelt wurde. Antworten Sie auf Deutsch.',
  zh: '您是由Groq提供支持的多语言AI助手。请用中文回答。',
  ja: 'あなたはGroqを搭載した役立つ多言語AIアシスタントです。日本語で回答してください。',
  ko: '당신은 Groq에서 제공하는 다국어 AI 어시스턴트입니다. 한국어로 대답해주세요.',
  ar: 'أنت مساعد ذكاء اصطناعي متعدد اللغات مفيد مدعوم من Groq. الرجاء الرد باللغة العربية.',
  hi: 'आप Groq द्वारा संचालित एक सहायक, बहुभाषी AI सहायक हैं। कृपया हिंदी में उत्तर दें।',
  ru: 'Вы полезный многоязычный ИИ-ассистент, работающий на Groq. Пожалуйста, отвечайте на русском языке.',
  pt: 'Você é um assistente de IA multilíngue útil alimentado pela Groq. Responda em português.',
  it: 'Sei un assistente IA multilingue utile alimentato da Groq. Rispondi in italiano.',
  nl: 'Je bent een behulpzame, meertalige AI-assistent aangedreven door Groq. Antwoord in het Nederlands.',
  tr: 'Groq tarafından desteklenen çok dilli bir yapay zeka asistanısınız. Türkçe yanıt verin.',
  pl: 'Jesteś pomocnym, wielojęzycznym asystentem AI napędzanym przez Groq. Odpowiedz po polsku.',
  sv: 'Du är en hjälpsam, flerspråkig AI-assistent som drivs av Groq. Svara på svenska.',
  no: 'Du er en hjelpsom, flerspråklig AI-assistent drevet av Groq. Svar på norsk.',
  da: 'Du er en hjælpsom, flersproget AI-assistent drevet af Groq. Svar på dansk.',
  fi: 'Olet avulias, monikielinen tekoälyavustaja, jonka taustalla on Groq. Vastaathan suomeksi.',
  cs: 'Jste užitečný, vícejazyčný asistent AI poháněný Groq. Odpovězte v češtině.',
  el: 'Είστε ένας χρήσιμος, πολύγλωσσος βοηθός AI που υποστηρίζεται από το Groq. Απαντήστε στα ελληνικά.',
  th: 'คุณคือลูกค้าช่วย AI ที่หลากหลายภาษาที่ขับเคลื่อนโดย Groq กรุณาตอบเป็นภาษาไทย',
  vi: 'Bạn là trợ lý AI đa ngôn ngữ hữu ích được hỗ trợ bởi Groq. Vui lòng trả lời bằng tiếng Việt.',
  id: 'Anda adalah asisten AI multibahasa yang berguna yang didukung oleh Groq. Harap jawab dalam bahasa Indonesia.',
  he: 'אתה עוזר AI רב לשוני מועיל המופעל על ידי Groq. ענה בעברית.',
  uk: 'Ви корисний багатомовний асистент ШІ, який працює на Groq. Будь ласка, відповідайте українською.',
  ro: 'Ești un asistent AI util multilingv susținut de Groq. Răspunde în limba română.',
  hu: 'Ön egy hasznos, többnyelvű AI asszisztens, amelyet a Groq működtet. Válaszolj magyarul.',
  bg: 'Вие сте полезен многоезичен AI асистент, захранван от Groq. Моля, отговорете на български.',
  ms: 'Anda adalah pembantu AI multibahasa yang berguna yang dikuasakan oleh Groq. Sila jawab dalam bahasa Melayu.'
};

/**
 * Get the system prompt for a specific language
 * @param {string} language - Language code
 * @returns {string} - System prompt for the language
 */
const getSystemPrompt = (language = 'en') => {
  return LANGUAGE_SYSTEM_PROMPTS[language] || LANGUAGE_SYSTEM_PROMPTS.en;
};

/**
 * Send a message to the Groq API
 * @param {Array} messages - Array of message objects with role and content
 * @param {Object} options - Additional options
 * @returns {Promise} - Promise with the API response
 */
export const sendMessage = async (messages, options = {}) => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    // Log for debugging (remove in production)
    console.log('Using API key:', apiKey ? 'API key found' : 'API key missing')

    if (!apiKey) {
      throw new Error('Groq API key is missing. Please add VITE_GROQ_API_KEY to your environment variables.');
    }

      const model = options.model || DEFAULT_MODEL;
      const temperature = options.temperature || 0.7;
      const maxTokens = options.maxTokens || 4096;
      const language = options.language || 'en';

    // Add system message if not present
    if (!messages.some(msg => msg.role === 'system')) {
      messages = [
        { role: 'system', content: getSystemPrompt(language) },
        ...messages
      ];
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get response from Groq API');
    }

    return await response.json();
  } catch (error) {
    console.error('Error calling Groq API:', error);
    throw error;
  }
};

/**
 * Process an image and get a description from Groq
 * @param {string} imageData - Base64 encoded image data
 * @param {string} userDescription - Optional user description of the image
 * @param {string} language - Language code for the response
 * @param {string} model - Model ID to use
 * @returns {Promise} - Promise with the API response
 */
export const processImage = async (imageData, userDescription = '', language = 'en', model = DEFAULT_MODEL) => {
  // For now, we'll just send the user description as Groq doesn't directly support image input
  // In a real implementation, you might want to use a different API for image processing
  // and then send the results to Groq

  const prompt = userDescription
    ? `[Image description provided by user]: ${userDescription}`
    : '[Image uploaded by user]';

  const messages = [
    { role: 'user', content: prompt }
  ];

  return sendMessage(messages, { language, model });
};

/**
 * Process audio transcription and get a response from Groq
 * @param {string} transcript - Transcribed audio text
 * @param {string} language - Language code for the response
 * @param {string} model - Model ID to use
 * @returns {Promise} - Promise with the API response
 */
export const processAudio = async (transcript, language = 'en', model = DEFAULT_MODEL) => {
  const messages = [
    { role: 'user', content: transcript }
  ];

  return sendMessage(messages, { language, model });
};

/**
 * Get available models from Groq API
 * @returns {Promise} - Promise with the available models
 */
export const getAvailableModels = async () => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey) {
      throw new Error('Groq API key is missing');
    }

    const response = await fetch('https://api.groq.com/openai/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to get models from Groq API');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching Groq models:', error);
    throw error;
  }
};