class ProductManager {
    constructor(){
        this.products = []
        this.productId = 0
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
     
    }
        getProductById(pId){
            const product = this.products.find(product => product.id === pId);
            if (product) {
                console.log("Producto encontrado:", product);
            } else {
                console.log("Lo sentimos, el producto no existe")
            }
        }
}

//testing



const productManager = new ProductManager()
console.log(productManager.getProducts());
productManager.addProduct({title: 'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
    })
    productManager.addProduct({title: 'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc123',
    stock:25
    })
    productManager.addProduct({title: 'producto prueba',
    description:'Este es un producto prueba',
    price:200,
    thumbnail:'Sin imagen',
    code:'abc1234',
    stock:25
    })

console.log("productos existentes:", productManager.getProducts());


productManager.getProductById(2);
productManager.getProductById(5);

