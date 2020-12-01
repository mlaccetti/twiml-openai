# TwiML OpenAI Demo App

This is a very simple REST API to demonstrate how we can build an IVR that integrates with OpenAI.

## Configuring and Getting Started

You'll need an OpenAI API key for this to work. Copy the `.env.example` file to `.env`, update the values, and run `node server.js`.

You will also have to use ngrok/Localtunnel or some other mechanism to expose the server to the outside world. Once exposed, configure your Twilio Phone Number's Webhook field to point to the URL that the outside world can access.

![Twilio Phone Number Configuration](twilio_config.jpg?raw=true "Twilio Voice Webhook Configuration Sample")
