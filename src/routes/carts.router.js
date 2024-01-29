import express from "express";
import fsPromises from "fs"
import CartManager from "../controller/cartsManager.js"

const router = express.Router()
router.use(express.json())

const cartManager = new CartManager("carts.json")
const carts = JSON.parse(fsPromises.readFileSync("src/data/carts.json"))
const products = JSON.parse(fsPromises.readFileSync("src/data/products.json"))


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

        if (isNaN(cId)) {
            res.send(`Lo sentimos, "${req.params.cid}" no es un argumento valido`)
        }

        if (carts.find( c => c.cartId == cId)) {
            let cartById = carts.find(c=> c.cartId == cId)
            let cartProducts = cartById.products
            console.log(cartProducts);
            res.json(cartProducts)
        }
        else{
            res.send(`Lo sentimos, el carrito con id:"${req.params.cid}" no existe`)
        }
    } catch (error) {
        res.send("no se pudo completar tu peticiooooon");
    }
})

//update
router.put("/api/carts/:cid/product/:id", (req, res)=>{
        try {
            const cartId = parseInt(req.params.cid)
            const productId = parseInt(req.params.id)

            if (isNaN(cartId) || isNaN(productId)) {
                res.send(`Lo sentimos, alguno de tus argumentos no es valido`)
            }
            if (carts.find( c => c.cartId == cartId) && products.find( p => p.id == productId)) {
                let cartById =   carts.find( carts => carts.cartId == cartId)
                let product = products.find( p => p.id == productId)
                cartManager.updateCart( cartById.cartId, product.id )
                res.send("se agregro un producto a tu carrito")
            }
            else if (!carts.find( c => c.cartId == cartId) || !products.find( p => p.id == productId)) {
                res.send(`Lo sentimos, alguno de tus id no exite`)
            }
        }
        catch (error) {
            res.send("no se pudo completar tu petición"); 
        }
})

export default router