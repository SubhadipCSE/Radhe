const express = require('express');
const app = express();
require('dotenv').config();
const twilio = require('twilio');

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.use(express.json());
app.use(express.static('public'));

app.post('/call', async (req, res) => {
  const { to } = req.body;

  try {
    const call = await client.calls.create({
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER,
      url: 'http://demo.twilio.com/docs/voice.xml' // TwiML for call audio
    });
//  The App
    res.status(200).json({ success: true, sid: call.sid });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
