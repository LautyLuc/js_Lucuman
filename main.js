// verifico si el usuario quiere ingresar a la tienda
if(confirm("¿Desea ingresar a la tienda?")){
const cliente = prompt("Ingrese su nombre:");
alert("Bienvenido " + cliente + " a la tienda de cervezas PicoSur!");
}else{
  alert("Gracias por su visita, vuelva pronto!");
  window.close();
}

// creo los objetos de cada producto

const lata = {
    nombre: "Lata",
  precio: 2100,
  medida: "473ml",
};

const botella = {
  nombre: "Botella",
  precio: 4150,
  medida: "473ml",
};

const pack6 = {
    nombre: "Pack de 6",
  precio: 7800,
  medida: "6x473ml",
};

const pack12 = {
  nombre: "Pack de 12",
  precio: 13900,
  medida: "12x473ml",
};

const caja = {
  nombre: "Caja",
  precio: 21500,
  medida: "24x473ml",
};

// guardo todos los productos en un array

const cervezas = [lata, botella, pack6, pack12, caja];

// muestro la lista de productos en consola

console.log("Productos disponibles:");

cervezas.forEach((producto) => {
  console.log({
    nombre: producto.nombre,
    precio: producto.precio,
    medida: producto.medida
  });
});

// variables para contar las cantidades de cada producto
let totalLatas = 0;
let totalBotellas = 0;
let totalPack6 = 0;
let totalPack12 = 0;
let totalCajas = 0;

//esta funcion muestra el menu principal
function menu() {
  console.log("\n=== MENU DE PRODUCTOS ===");
  console.log("Seleccione una opcion:");
  console.log("1. Agregar Lata - $2.100 (473ml)");
  console.log("2. Agregar Botella - $4.150 (473ml)"); 
  console.log("3. Agregar Pack 6 - $7.800 (6x473ml)");
  console.log("4. Agregar Pack 12 - $13.900 (12x473ml)");
  console.log("5. Agregar Caja - $21.500 (24x473ml)");
  console.log("6. Ver carrito actual");
  console.log("7. Finalizar compra");
  console.log("==============================");
}

// calculo el total del carrito
function calcularTotal() {
  return totalLatas * cervezas[0].precio +
         totalBotellas * cervezas[1].precio +
         totalPack6 * cervezas[2].precio +
         totalPack12 * cervezas[3].precio +
         totalCajas * cervezas[4].precio;
}

// muestro lo que hay en el carrito
function verCarrito() {
  console.log("\n=== TU CARRITO ===");
  console.log("Latas: " + totalLatas);
  console.log("Botellas: " + totalBotellas);
  console.log("Pack 6: " + totalPack6);
  console.log("Pack 12: " + totalPack12);
  console.log("Cajas: " + totalCajas);
  console.log("TOTAL: $" + calcularTotal());
  console.log("==================");
}

// esta funcion recibe la opcion que eligio el usuario
function procesarOpcion(numero) {
  switch(numero) {
    case 1:
      sumarLata();
      break;
    case 2:
      sumarBotella();
      break;
    case 3:
      sumarPack6();
      break;
    case 4:
      sumarPack12();
      break;
    case 5:
      sumarCaja();
      break;
    case 6:
      verCarrito();
      break;
    case 7:
      terminarCompra();
      return false; // salgo del bucle
    default:
      console.log("Opcion no valida. Por favor, seleccione una opcion del 1 al 7.");
  }
  return true; // sigo en el bucle
}

// bucle principal que mantiene el programa funcionando
function empezar() {
  let continuar = true;
  
  while (continuar) {
    menu();
    let opcion = parseInt(prompt("Seleccione una opcion (1-7):"));
    
    if (isNaN(opcion)) {
      console.log("Por favor, ingrese un numero valido.");
      continue;
    }
    
    continuar = procesarOpcion(opcion);
  }
}

// funciones para agregar cada producto al carrito
function sumarLata() {
  const precioActual = calcularTotal();
  if (verificarLimite(precioActual, cervezas[0].precio)) {
    totalLatas++;
    console.log("Lata agregada al carrito. Total latas: " + totalLatas);
  } else {
    console.log("El monto maximo de compra es $300.000");
  }
}

function sumarBotella() {
  const precioActual = calcularTotal();
  if (verificarLimite(precioActual, cervezas[1].precio)) {
    totalBotellas++;
    console.log("Botella agregada al carrito. Total botellas: " + totalBotellas);
  } else {
    console.log("El monto maximo de compra es $300.000");
  }
}

function sumarPack6() {
  const precioActual = calcularTotal();
  if (verificarLimite(precioActual, cervezas[2].precio)) {
    totalPack6++;
    console.log("Pack 6 agregado al carrito. Total pack 6: " + totalPack6);
  } else {
    console.log("El monto maximo de compra es $300.000");
  }
}

function sumarPack12() {
  const precioActual = calcularTotal();
  if (verificarLimite(precioActual, cervezas[3].precio)) {
    totalPack12++;
    console.log("Pack 12 agregado al carrito. Total pack 12: " + totalPack12);
  } else {
    console.log("El monto maximo de compra es $300.000");
  }
}

function sumarCaja() {
  const precioActual = calcularTotal();
  if (verificarLimite(precioActual, cervezas[4].precio)) {
    totalCajas++;
    console.log("Caja agregada al carrito. Total cajas: " + totalCajas);
  } else {
    console.log("El monto maximo de compra es $300.000");
  }
}

function terminarCompra() {
  if (calcularTotal() > 0) {
    console.log("\nCOMPRA FINALIZADA");
    verCarrito();
    console.log("Gracias por su compra en PicoSur!");
    console.log("Para realizar una nueva compra, recarga la pagina.");
  } else {
    console.log("Su carrito esta vacio");
  }
}

// inicio el programa
empezar();

// chequeo si se puede agregar el producto sin superar el limite
function verificarLimite(total, precioAgregado) {
  if (total + precioAgregado <= 300000) {
    return true;
  } else {
    return false;
  }
}
