const axios = require('axios');

const webhookUrl = 'https://testing-webhook-r10fpirdg-naufalrays-projects.vercel.app/webhook'; // Ganti sesuai URL server kamu

const data = {
    message: 'Hello, this is a test message from sender.js!'
};
// Mengirimkan data ke endpoint webhook
axios.post(webhookUrl, data)
.then(response => {
    console.log('Message sent successfully:', response.data);
})
.catch(error => {
    console.error('Error sending message:', error);
});
