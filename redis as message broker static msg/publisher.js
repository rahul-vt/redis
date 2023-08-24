const Redis = require('ioredis')
const redis = new Redis()

const channel = 'my-channel'

async function publishMessage () {
    let counter = 1
    while(true) {
        const message = `Message: ${counter}`
        await redis.publish(channel,message)
        console.log(`Published ${message}`)
        counter++
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
}

module.exports = {
    publishMessage
}