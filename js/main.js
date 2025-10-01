let usuarioActual = null;
let esInvitado = false;

document.getElementById("loginBtn").addEventListener("click", function (e) {
  const username = document.getElementById("username").value.trim();
  if (username) {
    // Persistir usuario real
    localStorage.setItem("username", username);
    usuarioActual = username;
    esInvitado = false;
    // Mostrar vista productos
    document.getElementsByClassName("login")[0].style.display = "none";
    document.getElementsByClassName("productos")[0].style.display = "flex";
    // Cargar carrito del usuario si existe
    cargarCarritoUsuario();
    renderizarCarritoUI();
  }
});

// Modo invitado: no persistir nada
const btnInvitado = document.getElementById("guestBtn");
if (btnInvitado) {
  btnInvitado.addEventListener("click", function () {
    usuarioActual = null;
    esInvitado = true;
    // Resetear contadores en memoria
    totalLatas = 0;
    totalBotellas = 0;
    totalPack6 = 0;
    totalPack12 = 0;
    totalCajas = 0;
    // Mostrar vista productos
    document.getElementsByClassName("login")[0].style.display = "none";
    document.getElementsByClassName("productos")[0].style.display = "flex";
    renderizarCarritoUI();
  });
}

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
// variables para el carrito
let totalLatas = 0;
let totalBotellas = 0;
let totalPack6 = 0;
let totalPack12 = 0;
let totalCajas = 0;

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

    //primero se verifica estar dentro del monto maximo, luego se agrega el producto correspondiente.
  if (precioFinal <= 300000) {
    switch (event.target.id) {
      case "agregarLata": {
        if (consultarMaximo(precioFinal, cervezas[0].precio)) {
          totalLatas++;
          document.getElementById("ContLatas").innerText = totalLatas.toString();
          document.getElementById("montoTotal").innerText = formatearMoneda(calcularTotal());
          mostrarNotificacion(`Se agregó ${cervezas[0].nombre} (${cervezas[0].medida})`);
          guardarCarritoUsuario();
        }
        break;
      }
      case "agregarBotella": {
        if (consultarMaximo(precioFinal, cervezas[1].precio)) {
          totalBotellas++;
          document.getElementById("ContBotellas").innerText = totalBotellas.toString();
          document.getElementById("montoTotal").innerText = formatearMoneda(calcularTotal());
          mostrarNotificacion(`Se agregó ${cervezas[1].nombre} (${cervezas[1].medida})`);
          guardarCarritoUsuario();
        } 
        break;
      }
      case "agregarPack6": {
        if (consultarMaximo(precioFinal, cervezas[2].precio)) {
          totalPack6++;
          document.getElementById("ContPack6").innerText = totalPack6.toString();
          document.getElementById("montoTotal").innerText = formatearMoneda(calcularTotal());
          mostrarNotificacion(`Se agregó ${cervezas[2].nombre} (${cervezas[2].medida})`);
          guardarCarritoUsuario();
        }
        break;
      }
      case "agregarPack12": {
        if (consultarMaximo(precioFinal, cervezas[3].precio)) {
          totalPack12++;
          document.getElementById("ContPack12").innerText = totalPack12.toString();
          document.getElementById("montoTotal").innerText = formatearMoneda(calcularTotal());
          mostrarNotificacion(`Se agregó ${cervezas[3].nombre} (${cervezas[3].medida})`);
          guardarCarritoUsuario();
        } 
        break;
      }
      case "agregarCaja": {
        if (consultarMaximo(precioFinal, cervezas[4].precio)) {
          totalCajas++;
          document.getElementById("ContCajas").innerText = totalCajas.toString();
          document.getElementById("montoTotal").innerText = formatearMoneda(calcularTotal());
          mostrarNotificacion(`Se agregó ${cervezas[4].nombre} (${cervezas[4].medida})`);
          guardarCarritoUsuario();
        }
        break;
      }
    }
  }
  // actualizar estado de botones después de cualquier clic relevante
  actualizarEstadoBotones();
});

// calculo el total del carrito
function calcularTotal() {
  return totalLatas * cervezas[0].precio +
         totalBotellas * cervezas[1].precio +
         totalPack6 * cervezas[2].precio +
         totalPack12 * cervezas[3].precio +
         totalCajas * cervezas[4].precio;
}

// Función para verificar si se puede agregar un producto sin exceder el límite
function consultarMaximo(precioActual, precioProducto) {
  return (precioActual + precioProducto) <= 300000;
}

// formateo local
function formatearMoneda(valor) {
  try {
    return Number(valor).toLocaleString("es-AR");
  } catch {
    return String(valor);
  }
}

// deshabilitar botones cuando no se puede agregar sin pasarse del límite
function actualizarEstadoBotones() {
  const precioActual = calcularTotal();
  const buttons = [
    { id: "agregarLata", precio: cervezas[0].precio },
    { id: "agregarBotella", precio: cervezas[1].precio },
    { id: "agregarPack6", precio: cervezas[2].precio },
    { id: "agregarPack12", precio: cervezas[3].precio },
    { id: "agregarCaja", precio: cervezas[4].precio },
  ];
  buttons.forEach(({ id, precio }) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    const canAdd = consultarMaximo(precioActual, precio);
    btn.disabled = !canAdd;
    btn.setAttribute("aria-disabled", String(!canAdd));
    btn.style.opacity = canAdd ? "" : "0.6";
    btn.style.cursor = canAdd ? "" : "not-allowed";
    btn.title = canAdd ? "" : "Has alcanzado el monto máximo ($300.000)";
  });
}

// estado inicial al cargar
document.addEventListener("DOMContentLoaded", () => {
  // mostrar el total inicial formateado
  const totalEl = document.getElementById("montoTotal");
  if (totalEl) totalEl.innerText = formatearMoneda(calcularTotal());
  actualizarEstadoBotones();
});

// --- Persistencia por usuario ---
function claveCarritoUsuario() {
  return usuarioActual ? `carrito:${usuarioActual}` : null;
}

function guardarCarritoUsuario() {
  if (esInvitado || !usuarioActual) return; // no persistir en modo invitado
  const clave = claveCarritoUsuario();
  if (!clave) return;
  const data = {
    totalLatas,
    totalBotellas,
    totalPack6,
    totalPack12,
    totalCajas,
  };
  try {
    localStorage.setItem(clave, JSON.stringify(data));
  } catch {}
}

function cargarCarritoUsuario() {
  if (!usuarioActual) return false;
  const clave = claveCarritoUsuario();
  if (!clave) return false;
  const raw = localStorage.getItem(clave);
  if (!raw) return false;
  try {
    const data = JSON.parse(raw);
    totalLatas = Number(data.totalLatas) || 0;
    totalBotellas = Number(data.totalBotellas) || 0;
    totalPack6 = Number(data.totalPack6) || 0;
    totalPack12 = Number(data.totalPack12) || 0;
    totalCajas = Number(data.totalCajas) || 0;
    return true;
  } catch {
    return false;
  }
}

function renderizarCarritoUI() {
  // reflejar contadores y total en el DOM
  const map = [
    ["ContLatas", totalLatas],
    ["ContBotellas", totalBotellas],
    ["ContPack6", totalPack6],
    ["ContPack12", totalPack12],
    ["ContCajas", totalCajas],
  ];
  map.forEach(([id, valor]) => {
    const el = document.getElementById(id);
    if (el) el.innerText = String(valor);
  });
  const totalEl = document.getElementById("montoTotal");
  if (totalEl) totalEl.innerText = formatearMoneda(calcularTotal());
  actualizarEstadoBotones();
}

// --- Notificaciones (toast) ---

//esto lo cree con el chat porque no supe implementarlo yo 
function notificaciones() {
  const id = "toastContainer";
  let container = document.getElementById(id);
  if (!container) {
    container = document.createElement("div");
    container.id = id;
    container.className = "toast-container";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }
  return container;
}

function mostrarNotificacion(mensaje, tipo = "success") {
  const container = notificaciones();
  const toast = document.createElement("div");
  toast.className = `toast ${tipo === "warn" ? "toast--warn" : "toast--success"}`;
  toast.textContent = mensaje;
  container.appendChild(toast);
  void toast.offsetHeight;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
