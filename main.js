if(confirm("¿Desea ingresar a la tienda?")){
const cliente = prompt("Ingrese su nombre:");
alert("Bienvenido " + cliente + " a la tienda de cervezas PicoSur!");
}else{
  alert("Gracias por su visita, vuelva pronto!");
  window.close();
}

//declaro los productos

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

//declaro array con los productos

const cervezas = [lata, botella, pack6, pack12, caja];

//muestro los productos disponibles

console.log("Productos disponibles:");

cervezas.forEach((producto) => {
  console.log({
    nombre: producto.nombre,
    precio: producto.precio,
    medida: producto.medida
  });
});

//declaro variables para el carrito, para luego calcular el precio final

var totalLatas = 0;
var totalBotellas = 0;
var totalPack6 = 0;
var totalPack12 = 0;
var totalCajas = 0;

document.addEventListener("click", function (event) {

//Carrito acumulador y calculo de precio final
  let carrito = [
    totalLatas,
    totalBotellas,
    totalPack6,
    totalPack12,
    totalCajas,
  ];
  let precioFinal =
    carrito[0] * cervezas[0].precio +
    carrito[1] * cervezas[1].precio +
    carrito[2] * cervezas[2].precio +
    carrito[3] * cervezas[3].precio +
    carrito[4] * cervezas[4].precio;

    //logica para agregar productos al carrito

    //primero se verifica estar dentro del monto maximo, luego se agrega el producto correspondiente.
  if (precioFinal <= 300000) {
    if (event.target.matches("#agregarLata")) {
      if (consultarMaximo(precioFinal, cervezas[0].precio)) {
        totalLatas++;
      } else {
        alert("El monto máximo de compra es $300.000");
      }
      console.log(totalLatas);
    } else if (event.target.matches("#agregarBotella")) {
      if (consultarMaximo(precioFinal, cervezas[1].precio)) {
        totalBotellas++;
      } else {
        alert("El monto máximo de compra es $300.000");
      }
      console.log(totalBotellas);
    } else if (event.target.matches("#agregarPack6")) {
      if (consultarMaximo(precioFinal, cervezas[2].precio)) {
        totalPack6++;
      } else {
        alert("El monto máximo de compra es $300.000");
      }
      console.log(totalPack6);
    } else if (event.target.matches("#agregarPack12")) {
      if (consultarMaximo(precioFinal, cervezas[3].precio)) {
        totalPack12++;
      } else {
        alert("El monto máximo de compra es $300.000");
      }
      console.log(totalPack12);
    } else if (event.target.matches("#agregarCaja")) {
      if (consultarMaximo(precioFinal, cervezas[4].precio)) {
        totalCajas++;
      } else {
        alert("El monto máximo de compra es $300.000");
      }
      console.log(totalCajas);
    }
  } else {
    alert("El monto máximo de compra es $300.000");
  }

  console.log(
    "su carrito contiene: " +
      carrito[0] +
      " latas, " +
      carrito[1] +
      " botellas, " +
      carrito[2] +
      " pack6, " +
      carrito[3] +
      " pack12 y " +
      carrito[4] +
      " cajas."
  );
  console.log("el precio final es: " + precioFinal);
});

function consultarMaximo(total, precioAgregado) {
  if (total + precioAgregado <= 300000) {
    return true;
  } else {
    return false;
  }
}
