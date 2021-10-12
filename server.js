const express = require('express');
const path = require('path');

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
    accessToken: '38a11775a02f489abf5624dd43a94cf5',
    captureUncaught: true,
    captureUnhandledRejections: true,
})


rollbar.log('Hello world!')

const app = express();


app.use(express.json());

app.use('/styles', express.static(path.join(__dirname, './public/styles.css')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

try {
    nonExistentFunction();
} catch (error) {
    console.error(error);
}

// app.use(rollbar.errorHandler())

const port = process.env.PORT || 4400;

app.listen(port, () => {
    console.log(`Server is servin at ${port}`)
})