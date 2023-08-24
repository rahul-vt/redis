const publisher = require("./publisher")
const subscriber = require('./subscriber')

async function run () {
    try {
        const publisherPromise = publisher.publishMessage()
        const subscriberPromise = subscriber.subscribeToChannel()

        await Promise.all([publisherPromise, subscriberPromise])
    } catch (error) {
        console.error('An error occurred: ' , error)
    }
}

run()