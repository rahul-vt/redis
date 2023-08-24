"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const publisher_1 = require("./publisher");
const subscriber_1 = require("./subscriber");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/listen/:channel', (req, res) => {
    const { channel } = req.params;
    (0, subscriber_1.subscribeToChannel)(channel);
    // messageEmitter.on("receivedMessage", ({ channel: receivedChannel, message }) => {
    //     if (receivedChannel === channel) {
    //         res.json({ channel: receivedChannel, message })
    //     }
    // })
    const messageListener = ({ channel: receivedChannel, message }) => {
        if (receivedChannel === channel) {
            res.json({ channel: receivedChannel, message });
            subscriber_1.messageEmitter.removeListener("receivedMessage", messageListener);
        }
    };
    subscriber_1.messageEmitter.on("receivedMessage", messageListener);
});
app.post('/send/:channel', (req, res) => {
    const { channel } = req.params;
    const { message } = req.body;
    (0, publisher_1.publishMessage)(channel, message);
    res.json({ success: true, message: 'Message sent' });
});
app.listen(8000, () => {
    console.log('sever started on port 8000');
});
