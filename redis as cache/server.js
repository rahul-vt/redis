const app = require('express')()
const axios = require('axios')
const Redis = require('ioredis')
const redisClient = new Redis()

const default_exp = 3600

app.get('/photos', async (req, res) => {
    const albumId = req.query.albumId
    const photos = await getOrSetCache(`photos?albumId=${albumId}`, async () => {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/photos",
            { params: { albumId } })
        return data
    })
    res.json(photos)
})
app.get('/photos/:id', async (req, res) => {
    const photos = await getOrSetCache(`photos:${req.params.id}`, async () => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/photos/${req.params.id}`)

        return data
    })
    res.json(photos)
})

function getOrSetCache(key, cb) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
            if (error) return reject(error)
            if (data !== null) return resolve(JSON.parse(data))
            const freshData = await cb()
            redisClient.setex(key, default_exp, JSON.stringify(freshData))
            resolve(freshData)
        })
    })
}

app.listen(8000, () => console.log('server running in port 8000'))

