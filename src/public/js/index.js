const socket = io()




socket.emit("message", "cliente conectado")


document.getElementById("button").addEventListener("click", (e) => {

const title = document.getElementById("title").value
const description = document.getElementById("description").value
const price = document.getElementById("price").value
const stock = document.getElementById("stock").value
const status = document.getElementById("status").value
const category = document.getElementById("category").value
const code = document.getElementById("code").value

const newProduct  = {
    title,
    description,
    price,
    stock,
    status, 
    category,
    code,
}
socket.emit("nuevoProducto", newProduct, (response) => {
    console.log("Respuesta del servidor:", response);
    productManager.addProduct(newProduct)
});

})

socket.on("nuevoProducto", (newProduct) => {
    console.log("Nuevo producto recibido desde el servidor:", newProduct);
});

