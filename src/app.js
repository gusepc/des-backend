import express from "express";
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"
import cartsManager from "./cartsManager.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.listen(8080,()=>console.log("server started"));



app.use("/", productsRouter)
app.use("/", cartsRouter)