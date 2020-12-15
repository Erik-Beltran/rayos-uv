const express = require("express")
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const { mongoose } = require('./database');

//conexion con arduino atraves del serialport
const SerialPort = require('serialport')
const readLine = SerialPort.parsers.Readline;
const port = new SerialPort("COM3", {
    baudRate: 9600
});

const parser = port.pipe(new readLine({ delimeter: "\r\n" }))
parser.on('open', function () {
    console.log("conexion serial con arduino correcta")
})

parser.on('data', function (data) {
    console.log(data)
    io.emit('indice', data)
})

port.on('error', function () {
    console.log(err)
})

//SETTINGS
app.set('port', process.env.PORT || 3000);
//MIDDLEWARES
app.use(express.json());
//ROUTES
app.use('/registros', require('./routes/routes'))
//STATIC FILES
app.use(express.static(path.join(__dirname, "../frontend/build")))
io.on('connect', socket => {
    console.log('Server is conect');
    socket.on('calcular', data => {
        console.log('client is ready', data);
    });
});
server.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})

