const express = require('express');
const bodyParser = require('body-parser');
const { handleRequest } = require('./models');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/', async (req, res) => {
  const message = await handleRequest(req.body.Body)
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(message.toString());
});

app.listen(3000, () => console.log('server started'));