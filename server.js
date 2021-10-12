const express = require('express');
const path = require('path');
const Rollbar = require('rollbar');
const rollbar = new Rollbar({
    accessToken: '',
    captureUncaught: true,
    captureUnhandledRejections: true,

})

const app = express();


app.use(express.json());

app.use('/styles', express.static(path.join(__dirname, './public/styles.css')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

let students = []

app.post(('/api/student'), (req, res) => {

})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4400;

app.listen(port, () => {
    console.log(`Server is servin at ${port}`)
})