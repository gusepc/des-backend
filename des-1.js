  import * as fs from "fs"
 

class ProductManager {

  constructor(nombreDeArchivo){
        this.path = nombreDeArchivo
        this.products = []
        this.productId = 0

    
     if (!fs.existsSync(this.path)) {
        try {
              fs.writeFileSync(this.path, "[]")
        } catch (error) {
            console.log("no se puedo crear el directorio" );
        }
    }  
    else {
            console.log("tu directorio ya existe");
        }
}   

    addToDB() {
      try {
          const db = JSON.stringify(this.products);
        fs.writeFileSync(this.path, db);
          } catch (error) {
             console.log("No se pudieron agregar tus productos");
        }
    }
   

    getProducts(){
        return this.products
    }
    addProduct(product){
        const {title,description,price,thumbnail,code,stock} = product
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail || 
            !product.code ||
            !product.stock)
        {return console.log("Todos los campos son obligatorios");   }
        
        if (this.products.some(product => product.code === code)) {
            return console.log("Ya existe un producto con este codigo");
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
          console.log("se ha agredado un producto existosamente:", newProduct);

          this.addToDB()
     
    }
    updateProduct(pId, actualizacion) {
        const i = this.products.findIndex(product => product.id === pId);
            actualizacion.id = pId;
            this.products[i] = actualizacion;
            this.addToDB();
            console.log("Producto ha sido actualizado:", actualizacion);
    }

    getProductById(pId){
        const product = this.products.find(product => product.id === pId);
        if (product) {
            console.log("Producto encontrado:", product);
        } else {
            console.log("Lo sentimos, el producto no existe")
        }
    }
    deleteProduct(pId) {
        let rango = this.products.length
        const i = this.products.findIndex(p => p.id === pId);
        if (i !== -1) {
            const deletedProduct = this.products.splice(i, 1)[0];
            this.addToDB();
            console.log("Producto eliminado:", deletedProduct);

        } else {
            console.log("El producto no existe. No se puede eliminar.");
        }
    }
}

//testing


// const productManager = new ProductManager("productos.json")

// console.log(productManager.getProducts());
// productManager.addProduct({title: 'producto prueba',
//     description:'Este es un producto prueba',
//     price:200,
//     thumbnail:'Sin imagen',
//     code:'abc123',
//     stock:25
//     })
//     productManager.addProduct({title: 'producto prueba',
//     description:'Este es un producto prueba',
//     price:200,
//     thumbnail:'Sin imagen',
//     code:'abc123',
//     stock:25
//     })
//     productManager.addProduct({title: 'producto prueba',
//     description:'Este es un producto prueba',
//     price:200,
//     thumbnail:'Sin imagen',
//     code:'abc1234',
//     stock:25
//     })

// console.log("productos existentes:", productManager.getProducts());


// productManager.getProductById(2);
// productManager.getProductById(5);

// const productoActualizado =
// {title: 'producto actualizado',
//     description:'Este es un producto actualizado',
//     price:200,
//     thumbnail:'Sin imagen',
//     code:'abc1234',
//     stock:25
//     }

// productManager.updateProduct(1, productoActualizado)

// productManager.deleteProduct(2)
// productManager.deleteProduct(3)
