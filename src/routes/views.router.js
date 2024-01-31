import express from "express";
import fsPromises from "fs"

const router = express.Router()
router.use(express.json())

const products = JSON.parse(fsPromises.readFileSync("src/data/products.json"))



router.get('/', (req, res) => {
    res.render("home", {
        layout: "main",
        product: products,
        title: "home"
    })
})

router.get('/realtimeproducts', (req, res)=>{
        res.render("realTimeProducts", {
            layout: "main",
            title: "realtimeproducts"
        })
})


export default router