function simularPeticionAPI() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Datos recibidos correctamente");
    }, 5000);
  });
}

async function obtenerDatos() {
  try {
    const resultado = await simularPeticionAPI();
    console.log(resultado);
  } catch (error) {
    console.error("Ocurrió un error:", error);
  }
}

obtenerDatos();
