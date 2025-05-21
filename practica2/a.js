const persona = {
    nombre : "Ivan Isay",
    edad: 37,
    direccion: {
        ciudad: "Qro",
        pais: "MX"
    }
}

//desestructuración
const { nombre, edad, direccion: { ciudad } } = persona;

//mensaje 
console.log("Me llamo ${nombre}, tengo ${edad} años y vivo en ${ciudad}.");