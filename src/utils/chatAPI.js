import { Client } from "@gradio/client";

const HF_SPACE_URL = 'Abdul8008/abdul-portfolio-chatbot-app';

let gradioClient = null;

const initClient = async () => {
  if (!gradioClient) {
    console.log('Initializing Gradio client...');
    gradioClient = await Client.connect(HF_SPACE_URL);
    console.log('Gradio client connected');
  }
  return gradioClient;
};

export const testAPIConnection = async () => {
  try {
    await initClient();
    return true;
  } catch (error) {
    console.error('API Test failed:', error);
    return false;
  }
};

export const sendMessageToBot = async (message, conversationHistory = []) => {
  try {
    console.log('Sending:', message);

    const client = await initClient();

    // ChatInterface uses /chat endpoint with array params
    const result = await client.predict("/chat", [message, conversationHistory]);

    console.log('Result:', result);

    if (result && result.data) {
      // ChatInterface returns the response directly
      return result.data[0] || result.data;
    }

    throw new Error('Invalid response');

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};