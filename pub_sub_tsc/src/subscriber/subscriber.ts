import { EventEmitter } from 'events'
import Redis from 'ioredis'


const redis = new Redis()
const messageEmitter = new EventEmitter()

const subscribeToChannel = (channel: string) => {
    redis.subscribe(channel, (err, count) => {
        if (err) {
            console.error("Error subscribing to channel: ", err);
        }
        else {
            console.log(`Subscribed to ${count} channel(s)`);
        }

    })
}

redis.on('message', (channel: string, message: string) => {
    console.log(`Received message from channel ${channel}: ${message}`);
    messageEmitter.emit('receivedMessage', { channel, message })
})

export { subscribeToChannel, messageEmitter }