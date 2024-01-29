const socket = io()
socket.emit("message", "cliente conectado")

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
console.log(newProduct);
