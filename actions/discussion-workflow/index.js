//const axios = require('axios');
//const fetch = require('node-fetch');
import fetch from "node-fetch";
//const fetch = fetch(import.meta.url);
import * as core from "@actions/core";
global.require = fetch; //this will make require at the global scobe and treat it like the original require

// const apiKey = core.getInput("openai-api-key");
const API_KEY = core.getInput("api_key");
const prompt = core.getInput("prompt");
const API_URL = "https://api.openai.com/v1/chat/completions";
// const API_KEY = "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";

// const discussionBody = "\"What is Github?\""; 
const generate = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ API_KEY,
      },
      body: JSON.stringify({
        messages: [{ role: "system", content: prompt }],
        max_tokens: 100,
        model: "gpt-3.5-turbo"
      })
  
    });
    const responseData = await response.json();
    if (Array.isArray(responseData.choices) && responseData.choices.length > 0) {
      const assistantReply = responseData.choices[0].message.content;
      console.log("Assistant:", assistantReply);
  } else {
      console.log("No valid response from the assistant.");
  }
    console.log('API_URL:', API_URL);
    const generatedResponse = responseData;
  } catch (error) {
    console.error('Error:', error);
  }
};

generate();

