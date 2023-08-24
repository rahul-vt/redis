"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Redis = require("ioredis");
const redis = new Redis();
const publishMessage = (channel, message) => {
    redis.publish(channel, message);
};
module.exports = { publishMessage };
