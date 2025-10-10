import { Client } from "@gradio/client";

// Hugging Face Space URL
const HF_SPACE_URL = 'Abdul8008/abdul-portfolio-chatbot-app';

// Global client variable
let gradioClient = null;

// Initialize the Gradio client
const initClient = async () => {
  if (!gradioClient) {
    console.log('Initializing Gradio client...');
    gradioClient = await Client.connect(HF_SPACE_URL);
    console.log('Gradio client connected successfully');
  }
  return gradioClient;
};

// Test the API endpoint
export const testAPIConnection = async () => {
  try {
    await initClient();
    return true;
  } catch (error) {
    console.error('API Test failed:', error);
    return false;
  }
};

// Send message to chatbot using official Gradio JS client
export const sendMessageToBot = async (message, conversationHistory = []) => {
  try {
    console.log('Sending message:', message);
    console.log('Conversation history:', conversationHistory);
    
    // Get or initialize the client
    const client = await initClient();
    
    // Make prediction using the official API
    const result = await client.predict("/respond", {
      message: message,
      history: conversationHistory
    });
    
    console.log('Raw result from API:', result);
    
    // The result should contain the updated history
    if (result && result.data) {
      const [_, updatedHistory] = result.data;
      
      if (updatedHistory && updatedHistory.length > 0) {
        const lastExchange = updatedHistory[updatedHistory.length - 1];
        const botResponse = lastExchange[1];
        console.log('Bot response:', botResponse);
        return botResponse;
      }
    }
    
    throw new Error('Invalid response format from API');
    
  } catch (error) {
    console.error('Chat API Error:', error);
    throw error; // Re-throw to let the component handle it
  }
};