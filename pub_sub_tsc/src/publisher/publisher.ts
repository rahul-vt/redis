import Redis from "ioredis"
const redis = new Redis()

export const publishMessage = (channel:string, message:string) => {
    redis.publish(channel, message)
}

