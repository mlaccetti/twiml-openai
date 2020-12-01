const config = require('./config');

const OpenAI = require('openai-api');
const openai = new OpenAI(config.openai.apiKey);

module.exports = {
  query: async function (question) {
    console.log(`Received a message (${question}), sending to OpenAI.`);

    const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: ${question}\nAI: `;
    console.log(`OpenAI prompt: ${prompt}`);

    const gptResponse = await openai.complete({
      engine: 'davinci',
      prompt: prompt,
      maxTokens: 250,
      temperature: 0.9,
      topP: 1,
      presence_penalty: 0.6,
      frequency_penalty: 0,
      best_of: 1,
      n: 1,
      stream: false,
      stop: ['\n', 'Human:', 'AI:']
    });

    return gptResponse.data.choices[0].text;
  }
}
