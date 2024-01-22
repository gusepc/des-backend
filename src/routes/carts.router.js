import express from "express";
import fsPromises from "fs"
import CartManager from "../cartsManager.js"
import ProductManager from "../productManager.js";

const router = express.Router()
router.use(express.json())

const cartManager = new CartManager("carts.json")
const productManager = new ProductManager("products.json")

//create
router.post("/api/carts",(req, res)=>{
    try {
        cartManager.addCart({})
        res.send("se creo correctamente el carrito")
        
        
    } catch (error) {
        res.send("no se pudo completar tu peticion")
    }

})
//read
router.get("/api/carts/:cid",(req, res)=>{
    try {
        const cId = parseInt(req.params.cid)
        let carts = JSON.parse(fsPromises.readFileSync("./carts.json"))
        if (carts.find( c => c.cartId == cId)) {
            let cartById = carts.find(c=> c.cartId == cId)
            let cartProducts = cartById.products
            console.log(cartProducts);
            res.json(cartProducts)
        }
        else if (isNaN(cId)) {
            res.send(`Lo sentimos, "${req.params.cid}" no es un argumento valido`)
        }
        else{
            res.send(`Lo sentimos, el carrito con id:"${req.params.cid}" no existe`)
        }
    } catch (error) {
        res.send("no se pudo completar tu peticion");
    }
})

//update
router.put("/api/carts/:cid/product/:id", (req, res)=>{
        try {
            const cartId = parseInt(req.params.cid)
            const productId = parseInt(req.params.id)

            let carts = JSON.parse(fsPromises.readFileSync("./carts.json"))
            let products = JSON.parse(fsPromises.readFileSync("./products.json"))
            

            if (carts.find( c => c.cartId == cartId) && products.find( p => p.id == productId)) {
                let cartById =   carts.find( carts => carts.cartId == cartId)
                let idToCart = cartById.cartId
                let product = products.find( p => p.id == productId)
                let pushId = product.id 
                cartManager.updateCart(idToCart, pushId)
                res.send("se agregro un producto a tu carrito")
            }
            else if (isNaN(cartId) || isNaN(productId)) {
                res.send(`Lo sentimos, alguno de tus argumentos no es valido`)
            }
            else if (!carts.find( c => c.cartId == cartId) || !products.find( p => p.id == productId)) {
                res.send(`Lo sentimos, alguno de tus id no exite`)
            }



        } catch (error) {
            res.send("no se pudo completar tu peticion"); 
        }




})

export default router