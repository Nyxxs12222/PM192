const productos = [
    { nombre: "Laptop", precio: 12000 },
    { nombre: "Mouse", precio: 250 },
    { nombre: "Teclado", precio: 750 },
    { nombre: "MOnitor", precio: 3000 }
];

const productosCaros = productos.filter(producto => producto.precio > 1000);
const nombres = productosCaros.map(producto => producto.nombre);

console.log(nombres); // ["Laptop", "Monitor"]