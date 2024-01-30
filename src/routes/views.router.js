import express from "express";
import fsPromises from "fs"

const router = express.Router()
router.use(express.json())

const products = JSON.parse(fsPromises.readFileSync("src/data/products.json"))



router.get('/', (req, res) => {
    res.render("index", {
        layout: "home",
        product: products,
        title: "realtimeproducts"
    })
})

router.get('/realtimeproducts', (req, res)=>{
        res.render("index", {
            layout: "realTimeProducts",
            product: products,
            title: "realtimeproducts"
        })
})
router.post('/realtimeproducts', (req, res)=>{
    let products = JSON.parse(fsPromises.readFileSync("src/data/products.json"))
    res.render("index", {
        layout: "realTimeProducts",
        product: products,
        title: "realtimeproducts"
    })
})

export default router