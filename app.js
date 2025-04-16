const express = require("express");
const app = express();

// 1. Simpan data masuk dari webhook
let webhookData = [];

// 2. Endpoint webhook: simpan ke array & kirim respon
app.post('/webhook', (req, res) => {
  console.log('Received message:', req.body);
  webhookData.push(req.body); // simpan ke memori
  res.status(200).send({ status: 'Message received successfully' });
});

// 3. Endpoint untuk menampilkan data webhook yang sudah masuk
app.get('/log', (req, res) => {
  res.send(`
    <h1>Webhook Received Data</h1>
    <ul>
      ${webhookData.map((data, index) => `<li><pre>${JSON.stringify(data, null, 2)}</pre></li>`).join('')}
    </ul>
  `);
});


app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3001, () => console.log("Server ready on port 3000."));

module.exports = app;