import fs from "fs"

export class ProductManager {
    constructor(nombreDeArchivo){
        this.path = nombreDeArchivo
        this.products 
        this.productId = 0
        if(!fs.existsSync(this.path)){
            try {
                fs.writeFileSync(this.path, "[]")
                console.log("archivo creado exitosamente");
            } catch (error) {
                console.log("no se pudo crear el archivo");
            }
        }
        else {
            console.log("el archivo que intentas crear ya existe:");
        }
    }
    //seccion fs

    convertirArchivo(){
        try {
        this.products = JSON.parse(fs.readFileSync(this.path, "utf8"))
            
        } catch (error) {
            console.log("no se pudieron obtener los datos correctamente");
            this.products = []
        }

    }
    escribirProducto(){
        try {
                    fs.writeFileSync(this.path, JSON.stringify(this.products))
        } catch (error) {
            console.log("Error al agregar productos");
        }

    }
    updateProduct(pId, actualizacion) {
        this.convertirArchivo()
        const i = this.products.findIndex(product => product.id === pId)
        if (i !== -1) {
            actualizacion.id = pId
            this.products[i] = actualizacion
            this.escribirProducto()
            console.log("Producto ha sido actualizado:", actualizacion)
            console.log("los productos ahora son", this.products);
        }
        else {
            console.log(`el producto con el ese id no existe`);
        }
           
    }
    deleteProduct(pId) {
        this.convertirArchivo()
        const i = this.products.findIndex(product => product.id === pId)
        if (i !== -1) {
            const deletedProduct = this.products.splice(i, 1)[0]
            this.escribirProducto()
            console.log("Se elimino el sguiente producto:", deletedProduct)

        } else {
            console.log("El producto no existe, no se puede eliminar.")

        }
    }


    //seccion desafio 1
    getProducts(){
        this.convertirArchivo()
        return this.products
    }
    addProduct(product){
        this.convertirArchivo()
        const {title,description,price,thumbnail,code,stock} = product
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail || 
            !product.code ||
            !product.stock)
        {return console.log("Todos los campos son obligatorios")}

        if (this.products.some(product => product.code === code)) {
            return console.log("Ya existe un producto con este codigo")
        }
        const newProduct = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: this.productId + 1,
          };
          this.products.push(newProduct)
          this.productId++
          console.log("se ha agredado un producto existosamente:", newProduct)
          this.escribirProducto()
    }
    getProductById(pId){
        this.convertirArchivo()
        const product = this.products.find(product => product.id === pId)
        if (product) {
            console.log("Producto encontrado:", product)
        } else {
            console.log("Lo sentimos, el producto no existe")
        }
    }



}


// const productManager = new ProductManager("myArchivo.json")

// for (let i = 0; i < 11; i++) {

//     productManager.addProduct({title: `Producto ${i}`,
//     description:`Este es el producto prueba ${i}`,
//     price: i * 10 ,
//     thumbnail:'Sin imagen',
//     code: i,
//     stock: i * 10
//     })
// }

