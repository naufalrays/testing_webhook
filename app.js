const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.route("/webhook")
    .get((req, res) => {
        const hub_mode = req.query['hub.mode'];
        const hub_challenge = req.query['hub.challenge'];
        const hub_verify_token = req.query['hub.verify_token'];

        if (hub_challenge) {
            res.send(hub_challenge);
        } else {
            res.send("<p>This is GET Request, Hello Webhook!</p>");
        }
    })
    .post((req, res) => {
        try {
            console.log(JSON.stringify(req.body, null, 2));
        } catch (error) {
            console.log("Error:", error);
        }
        res.send("<p>This is POST Request, Hello Webhook!</p>");
    });

app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'privacy_policy.html'));
});

app.get("/", (req, res) => res.send("Express on Vercel"));


module.exports = app;
