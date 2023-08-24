const Redis = require('ioredis')
const redis = new Redis()

const channel = 'my-channel'

async function subscribeToChannel() {
    await redis.subscribe(channel, (err,count) =>{
        if(err) {
            console.error("Error subscribing", err)
            return
        }
        console.log(`Subscribed to ${count} channels`);
    })

    redis.on('message', (ch, message) => {
        console.log(`Received from ${ch} : ${message} `);
    })
}

module.exports = {
    subscribeToChannel
}