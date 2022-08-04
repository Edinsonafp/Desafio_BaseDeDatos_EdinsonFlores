import express from 'express'
import http from 'http'
import { Server  } from 'socket.io'
import fs from 'fs'
import Productos from './Productos.js'
import {options} from './options/mariaDB.js'
import Mensajes from './Mensajes.js'
import {optionsSqlite} from './options/SQLite3.js'

const app = express()
const server = http.Server(app);
const io = new Server(server);
const productos = new Productos(options, "productos")
const mensajes = new Mensajes(optionsSqlite, "mensajes")

app.use(express.static('public'));


let prods = await productos.getAll().then(productos => {
    return productos
})
let msgs = await mensajes.listarMensajes().then(msj => {
    return msj
})


//let mensajes = JSON.parse(fs.readFileSync('mensajes.txt','utf-8'))

io.on('connection', function(socket){
    //parte de productos
    socket.emit('productos', prods)
    socket.on('newProduct', function(data){
        prods.push(data)
        productos.create(data)
        io.sockets.emit('productos', prods)
    })
    //parte de mensajes
    socket.emit('mensajes', msgs)
    socket.on('newMensaje', function(data){
        msgs.push(data)
        mensajes.insertarMensaje(data)
        //fs.writeFileSync('mensajes.txt', JSON.stringify(mensajes))
        io.sockets.emit('mensajes', msgs)
    })

})

const PORT = 8080
const srv = server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${srv.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))

