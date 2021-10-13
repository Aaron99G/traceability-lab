const express = require('express');
const path = require('path');

const app = express();

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
    accessToken: '38a11775a02f489abf5624dd43a94cf5',
    captureUncaught: true,
    captureUnhandledRejections: true,
})


rollbar.log('Hello world!')

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})


app.use('/styles', express.static(path.join(__dirname, './public/styles.css')))

// try {
//     nonExistentFunction();
// } catch (error) {
//     console.error('Somthing went wrong!');
// }

// app.post('')

let gtr = document.getElementById('vehicle1')
let rx7 = document.getElementById('vehicle2')
let nsx = document.getElementById('vehicle3')

gtr.addEventListener('change', () => {
    if (gtr.checked) {
        Rollbar.info("User has good taste in cars");
    }
})

// Rollbar.critical("Connection error from remote Payments API");
// Rollbar.error("Some unexpected condition");
// Rollbar.warning("Connection error from Twitter API");
// Rollbar.debug("Purchase dialog finished rendering");

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4400;

app.listen(port, () => {
    console.log(`Server is servin at ${port}`)
})