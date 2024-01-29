import express from "express";
import productsRouter from "./src/routes/products.router.js"
import cartsRouter from "./src/routes/carts.router.js"
import viewsRouter from "./src/routes/views.router.js"
import {engine} from "express-handlebars"
import { Server } from "socket.io";
import path from "path"


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join("src/public")))

app.use("/", productsRouter)
app.use("/", cartsRouter)
app.use("/", viewsRouter)
app.engine("handlebars", engine())
app.set('view engine', 'handlebars')
app.set('views', 'src/views')



const httpServer = app.listen(8080,()=>console.log("server started"));

const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
console.log('usuario conectado')
socket.on('message', data =>{
console.log(data);
})
})