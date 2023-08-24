import express from 'express'
import bodyParser from 'body-parser'
import { publishMessage } from './publisher'
import { messageEmitter, subscribeToChannel } from './subscriber'

const app = express()
app.use(bodyParser.json())

app.get('/listen/:channel', (req, res) => {
    const { channel } = req.params
    subscribeToChannel(channel)
    
    const messageListener = ({channel: receivedChannel , message} : {channel: string, message: string}) => {
        if(receivedChannel === channel){
            res.json({channel: receivedChannel, message})
            messageEmitter.removeListener("receivedMessage", messageListener)
        }
    }
    messageEmitter.on("receivedMessage", messageListener)


})

app.post('/send/:channel', (req, res) => {
    const { channel } = req.params
    const { message } = req.body

    publishMessage(channel, message)

    res.json({ success: true, message: 'Message sent' })
})

app.listen(8000, () => {
    console.log('sever started on port 8000')
})