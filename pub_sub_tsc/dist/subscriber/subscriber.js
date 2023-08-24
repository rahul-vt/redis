"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageEmitter = exports.subscribeToChannel = void 0;
const events_1 = require("events");
const ioredis_1 = __importDefault(require("ioredis"));
const redis = new ioredis_1.default();
const messageEmitter = new events_1.EventEmitter();
exports.messageEmitter = messageEmitter;
const subscribeToChannel = (channel) => {
    redis.subscribe(channel, (err, count) => {
        if (err) {
            console.error("Error subscribing to channel: ", err);
        }
        else {
            console.log(`Subscribed to ${count} channel(s)`);
        }
    });
};
exports.subscribeToChannel = subscribeToChannel;
redis.on('message', (channel, message) => {
    console.log(`Received message from channel ${channel}: ${message}`);
    messageEmitter.emit('receivedMessage', { channel, message });
});
