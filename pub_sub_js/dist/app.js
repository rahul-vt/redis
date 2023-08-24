"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
const { publishMessage } = require('./publisher/publisher');
const { messageEmitter, subscribeToChannel } = require('./subscriber/subscriber');
const app = express();
app.use(bodyParser.json());
app.get('/listen/:channel', (req, res) => {
    const { channel } = req.params;
    subscribeToChannel(channel);
    messageEmitter.on("receivedMessage", ({ channel: receivedChannel, message }) => {
        if (receivedChannel === channel) {
            res.json({ channel: receivedChannel, message });
        }
    });
});
app.post('/send/:channel', (req, res) => {
    const { channel } = req.params;
    const { message } = req.body;
    subscribeToChannel(channel);
    publishMessage(channel, message);
    res.json({ success: true, message: 'Message sent' });
});
app.listen(8000, () => {
    console.log('sever started on port 8000');
});
