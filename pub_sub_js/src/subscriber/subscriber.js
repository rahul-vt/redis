const { EventEmitter } = require('events')
const Redis = require('ioredis')


const redis = new Redis()
const messageEmitter = new EventEmitter()

const subscribeToChannel = (channel) => {
    redis.subscribe(channel, (err, count) => {
        if (err) {
            console.error("Error subscribing to channel: ", err);
        }
        else {
            console.log(`Subscribed to ${count} channel(s)`);
        }

    })
}

redis.on('message', (channel, message) => {
    console.log(`Received message from channel ${channel}: ${message}`);
    messageEmitter.emit('receivedMessage', { channel, message })
})

module.exports = { subscribeToChannel, messageEmitter }