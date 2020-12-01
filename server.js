const config = require('./config');

const express = require('express');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const openai = require('./openai');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  // Create TwiML response
  const response = new VoiceResponse();
  const gather = response.gather({
    language: 'en-CA',
    voice: 'woman',
    input: 'speech',
    action: `https://${config.externalUrl}/completed'`
  });
  gather.say('Welcome to our AI demo, ask us a question.');

  response.redirect({
    method: 'POST'
  }, '/timeout');

  const responseText = response.toString();
  console.log(`TwiML initial response: ${responseText}`);

  res.type('application/xml');
  res.send(responseText);
});

app.post('/timeout', (req, res) => {
  console.log(req.body);

  const response = new VoiceResponse();
  response.say({
    voice: 'woman',
    language: 'en-CA'
  }, 'Sorry, we didn\'t get that. Please call back and try again.');

  response.hangup();

  const responseText = response.toString();
  console.log(`TwiML timeout response: ${responseText}`);

  res.type('application/xml');
  res.send(responseText);
});


app.post('/completed', async (req, res) => {
  console.log(`Voice input from user: ${req.body.SpeechResult}`);

  const openApiResult = await openai.query(req.body.SpeechResult);

  const response = new VoiceResponse();
  response.say({
    voice: 'woman',
    language: 'en-CA'
  }, `The AI response was: ${openApiResult}`);

  response.hangup();

  const responseText = response.toString();
  console.log(`TwiML AI response: ${responseText}`);

  res.type('application/xml');
  res.send(responseText);
});

app.listen(config.port, () => {
  console.log(`TwiML OpenAI app listening at http://localhost:${config.port}`);
});
