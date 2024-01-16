import express from "express";
import {ProductManager} from "./productManager.js"
import fsPromises from "fs"

const productManager = new ProductManager("myArchivo.json")
const app = express()
app.listen(8080,()=>console.log("server started"));



app.get('/products',(req, res)=>{
    try {
        let limit = parseInt(req.query.limit)
        let limitedProducts = JSON.parse(fsPromises.readFileSync("./myArchivo.json"))
        if (!req.query.limit) {
            res.send(productManager.getProducts())
        }
        else if (!isNaN(limit) && 0 < limit && limit < limitedProducts.length) {
            limitedProducts = limitedProducts.slice(0, limit) 
            res.send(limitedProducts)
        }else{
            res.send(`Lo sentimos, "${req.query.limit}" no es un argumento valido`)
        }
    } catch (error) {
        console.log("no se pudo completar tu peticion");
    }

})

app.get('/products/:id',(req, res)=>{
    try {
        let id = parseInt(req.params.id)
        let products = JSON.parse(fsPromises.readFileSync("./myArchivo.json"))
        if (!isNaN(id) && 0 < id && id < products.length) {
            let productById = products.find(p=> p.id == id)
            res.send(productById)
        }
        else if (isNaN(id)) {
            res.send(`Lo sentimos, "${req.params.id}" no es un argumento valido`)
        }
        else{
            res.send(`Lo sentimos, el producto con id:"${req.params.id}" no existe`)
        }
    } catch (error) {
        console.log("no se pudo completar tu peticion");
    }

})

