import express from "express";
import fsPromises from "fs"
import ProductManager from "../productManager.js"






const router = express.Router()
router.use(express.json())

const productManager = new ProductManager("products.json")

//Create

router.post("/api/products",(req, res)=>{
    try {
        const newProduct = req.body
        let products = JSON.parse(fsPromises.readFileSync("./products.json"))
        let numProducts = (products.length)
        productManager.addProduct(newProduct)
        let productList = JSON.parse(fsPromises.readFileSync("./products.json"))
        let aumento = productList.length
        console.log(aumento);
        if (numProducts < aumento) {
            res.send("se creo tu producto")
            
        }
        else{
            res.send("no se pudo crear tu producto")
        }
        
    } catch (error) {
        res.send("no se pudo completar tu peticion")
    }

})

//read

router.get("/api/products",(req, res)=>{
    try {
        let limit = parseInt(req.query.limit)
        let limitedProducts = JSON.parse(fsPromises.readFileSync("./products.json"))
        if (!req.query.limit) {
            res.send(productManager.getProducts())
        }
        else if (!isNaN(limit) && 0 < limit && limit <= limitedProducts.length) {
            limitedProducts = limitedProducts.slice(0, limit) 
            res.send(limitedProducts)
        }else{
            console.log(limitedProducts.length,"aaaaa");
            res.send(`Lo sentimos, "${req.query.limit}" no es un argumento valido`)
        }
    } catch (error) {
        res.send("no se pudo completar tu peticion")
    }

})

router.get('/api/products/:id',(req, res)=>{
    try {
        let id = parseInt(req.params.id)
        let products = JSON.parse(fsPromises.readFileSync("./products.json"))
        if (products.find( p => p.id == id)) {
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
        res.send("no se pudo completar tu peticion");
    }
})
//update
router.put('/api/products/:id',(req, res)=>{
    try {
        let id = parseInt(req.params.id)
        const updatedProdduct = req.body
        let products = JSON.parse(fsPromises.readFileSync("./products.json"))
        if (products.find( p => p.id == id)) {
            productManager.updateProduct(id, updatedProdduct)
            res.send("se actualizo tu producto")
        }
        else if (isNaN(id)) {
            res.send(`Lo sentimos, "${req.params.id}" no es un argumento valido`)
        }
        else{
            res.send(`Lo sentimos, el producto con id:"${req.params.id}" no existe`)
        }
    } catch (error) {
        res.send("no se pudo completar tu peticion");
    }
})





//delete
router.delete('/api/products/:id',(req, res)=>{
    try {
        let id = parseInt(req.params.id)
        let products = JSON.parse(fsPromises.readFileSync("./products.json"))

        if (products.find( p => p.id == id)) {
            const pId = products.find( p => p.id == id)
            let realId = pId.id
            productManager.deleteProduct(realId)
            res.send(`se elimino el producto`)
        }
        else if (isNaN(id)) {
            res.send(`Lo sentimos, "${req.params.id}" no es un argumento valido`)
        }
        else{
            res.send(`Lo sentimos, el producto con id:"${req.params.id}" no existe`)
        }
    }
    catch (error) {
        res.send("no se pudo completar tu peticion")
 
    }

})






export default router