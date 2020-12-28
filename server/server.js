const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {readdirSync} = require('fs');
const cors = require('cors')
require('dotenv').config();
const path = require('path');


const app = express()

mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
	.then(() => console.log('DB CONNECTED'))
	.catch(err => console.log(`DB CONNECTION ERR ${err}`))

app.use(express.static(path.resolve('../client/build')))
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '2mb'}))



readdirSync('./routes').map((r) => 
app.use('/api', require('./routes/' + r)))

app.get('*', (req, res) => {
	res.sendFile(path.resolve('../client/build/index.html'))
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Serever runnung in port ${port}`);
})
