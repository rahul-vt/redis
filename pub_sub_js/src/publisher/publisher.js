const Redis = require("ioredis")
const redis = new Redis()

const publishMessage = (channel, message) => {
    redis.publish(channel, message)
}

module.exports = {publishMessage}
