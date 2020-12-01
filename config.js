try {
  require('dotenv').config();
} catch (e) {
  console.error('error loading dotenv', e);
}

module.exports = {
  port: process.env.PORT || 3001,
  externalUrl: 'twiml-openai.loca.lt',
  openai: {
    apiKey: process.env.OPENAI_API_SECRET
  }
}
