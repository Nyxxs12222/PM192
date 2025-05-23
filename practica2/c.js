const personas = [
    { nombre: "Ana", edad: 22 },
    { nombre: "Luis", edad: 35 },
    { nombre: "Maria", edad: 28 }
];

const luis = personas.find(p => p.nombre === "Luis");

personas.forEach(p => {
    console.log(`${p.nombre} tiene ${p.edad} años`);
});

const totalEdades = personas.reduce((acum, p) => acum + p.edad, 0);

console.log("Persona a encontrar:", luis);
console.log("Suma total de edades:", totalEdades);