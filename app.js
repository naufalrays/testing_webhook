const express = require("express");
const app = express();

// 1. Use middleware to parse the request body
app.use(express.json());

// 2. Store incoming data from the webhook
let webhookData = [];

// 3. Webhook endpoint: store data in the array & send a response
app.post('/webhook', (req, res) => {
  console.log('Received message:', req.body);
  webhookData.push(req.body); // save to memory
  res.status(200).send({ status: 'Message received successfully' });
});

// 4. Endpoint to display the received webhook data
app.get('/log', (req, res) => {
  res.send(`
    <h1>Webhook Received Data</h1>
    <ul>
      ${webhookData.map((data, index) => `<li><pre>${JSON.stringify(data, null, 2)}</pre></li>`).join('')}
    </ul>
  `);
});

app.get("/", (req, res) => res.send("Express on Vercel"));

// 5. In Vercel, we don't need to call app.listen(), just export the Express handler
module.exports = app;
