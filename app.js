// constructor
class Vinos {
  constructor(nombre, cepa, precio, stock, fotoId, sub) {
    this.nombre = nombre;
    this.cepa = cepa;
    this.precio = precio;
    this.stock = stock;
    this.fotoId = fotoId ? fotoId : 0;
    this.sub = sub;
  }
}

// array de imagenes vinos

let listaImagenes = [
  "default",
  "lopez",
  "bianchi",
  "uxmal",
  "senetiner",
  "rutini",
  "trumpeter",
];

// lista prearmado de vinos
let tabla = document.getElementById("tablita");
let carrito = document.getElementById("carrito");
let listaVinos = [];
let listaCarrito = [];
let listado = document.getElementById("listadoCompleto");

// localStorage
const listaVinosStorage = window.localStorage.getItem(`listaVinos`);
const listaVinosCarrito = window.localStorage.getItem(`listaCarrito`);

// id card
let identificacion = 0;

//id btn
let idInput = 100;

// cotizacion dolar

let dolar;

// total de compra

let sumaCompra = 0;
let compraContainer = document.getElementById("sumaTotal");
let compraSuma = document.createElement("p");
compraContainer.appendChild(compraSuma);

// listaVinosStorage = null? pusheo : listaVinosStorage = string (getItem)
if (listaVinosStorage) {
  listaVinos = JSON.parse(window.localStorage.getItem(`listaVinos`));
} else {
  listaVinos.push(new Vinos(`lopez`, `malbec`, 760, 8, 1, 0));
  listaVinos.push(new Vinos(`bianchi`, `cabernet`, 450, 20, 2, 0));
  listaVinos.push(new Vinos(`uxmal`, `malbec`, 400, 15, 3, 0));
  listaVinos.push(new Vinos(`senetiner`, `cabernet`, 830, 6, 4, 0));
  listaVinos.push(new Vinos(`rutini`, `cabernet`, 1500, 10, 5, 0));
  listaVinos.push(new Vinos(`trumpeter`, `malbec`, 860, 13, 6, 0));
}

// listaVinosCarrito
if (listaVinosCarrito) {
  listaCarrito = JSON.parse(window.localStorage.getItem(`listaCarrito`));
} else {
}

// actualizado de tabla IMPORTANTISIMO
actualizarTabla();

// funcion agregado de objetos a la tabla
function nuevoRow(vino, orden) {
  let tableRow = document.createElement("tr");
  let nombre = document.createElement("td");
  nombre.innerHTML = vino.nombre;
  nombre.onclick = () => {
    eliminarVino(orden);
  };
  let cepa = document.createElement("td");
  cepa.innerHTML = vino.cepa;
  let precio = document.createElement("td");
  precio.innerHTML = `$${vino.precio}`;
  let stock = document.createElement("td");
  stock.innerHTML = vino.stock;
  tableRow.appendChild(nombre);
  tableRow.appendChild(cepa);
  tableRow.appendChild(precio);
  tableRow.appendChild(stock);
  tabla.appendChild(tableRow);
}

// eliminar elemento de tabla
function eliminarVino(indice) {
  // .splice Removes elements from an array. Remueve 1 elemento del array y reordena el array
  // (method) Array<any>.splice(start: number (posicion del elemento), deleteCount?: number (cantidad)): any[] (+1 overload)
  listaVinos.splice(indice, 1);
  actualizarTabla();
}

// actualizacion de tabla general !!!**
function actualizarTabla() {
  const tempLista = Array.from(tabla.children);
  tempLista.forEach((filaTabla) => {
    filaTabla.remove();
  });
  listaVinos.forEach((vino, indice) => {
    nuevoRow(vino, indice);
  });

  const tempListaVinos = Array.from(listado.children);
  tempListaVinos.forEach((div) => {
    div.remove();
  });
  listaVinos.forEach((vino, indice) => {
    addVinos(vino, indice);
    identificacion++;
  });

  window.localStorage.setItem(`listaVinos`, JSON.stringify(listaVinos));
}

/*
// funcion de agregado a la lista de vinos por prompt
function agregarVinos() {
  let nombre = prompt(`Ingrese nombre/bodega del vino`);

  let cepa = prompt(`Ingrese cepa del vino`);

  let precio = Number(prompt(`Ingrese precio del vino`));
  while (precio <= 0 || isNaN(precio)) {
    // if corto, falta agregar a los demas prompts
    precio = Number(
      prompt(
        isNaN(precio) ? `Ingrese un NUMERO` : `Ingrese un numero mayor a 0`
      )
    );
  }

  let stock = Number(prompt(`Ingrese stock`));
  while (stock < 0) {
    stock = Number(prompt(`Ingrese valor mayor o igual a 0`));
  }

  let vino = new Vinos(nombre, cepa, precio, stock);
  listaVinos.push(vino);
  actualizarTabla();
  console.log(listaVinos);
}

*/

// funcion de agregado a la lista de vinos por form/inputs
function guardarVinos() {
  const nombre = document.getElementById("nombreVino").value.toLowerCase();
  const idFoto = listaImagenes.findIndex((imgFoto) => imgFoto == nombre);
  const vinoNuevo = new Vinos(
    nombre,
    document.getElementById("cepaVino").value.toLowerCase(),
    Number(document.getElementById("precioVino").value),
    Number(document.getElementById("stockVino").value),
    idFoto == -1 ? 0 : idFoto,
    0
  );
  listaVinos.push(vinoNuevo);
  actualizarTabla();
  console.log(listaVinos);
}

// funcion muestra de lista
function mostrarVinos() {
  console.log(listaVinos);
}

// funcion ordenar lista de menor a mayor precio
function ordenarPrecioMenor() {
  listaVinos.sort((a, b) => {
    if (a.precio > b.precio) {
      return 1;
    }
    if (a.precio < b.precio) {
      return -1;
    }
    return 0;
  });
  actualizarTabla();
  console.log(listaVinos);
}

// funcion ordenar lista de mayor a menor
function ordenarPrecioMayor() {
  listaVinos.sort((a, b) => {
    if (a.precio > b.precio) {
      return -1;
    }
    if (a.precio < b.precio) {
      return 1;
    }
    return 0;
  });
  actualizarTabla();
  console.log(listaVinos);
}

// funcion suma total de stock
function sumaStock() {
  let suma = 0;
  for (let i = 0; i < listaVinos.length; i++) {
    suma = suma + listaVinos[i].stock;
  }
  console.log(`El stock total es de ${suma} vinos`);
}

// funcion de filtrado de cepa
function buscarCepa() {
  let search = prompt(`Ingrese cepa que desea buscar`);
  let filtroCepa = listaVinos.filter((obj) => obj.cepa === search);
  console.log(filtroCepa);

  const tempLista = Array.from(tabla.children);
  tempLista.forEach((filaTabla) => {
    filaTabla.remove();
  });
  filtroCepa.forEach((vino, indice) => {
    nuevoRow(vino, indice);
  });

  const tempListaVinos = Array.from(listado.children);
  tempListaVinos.forEach((div) => {
    div.remove();
  });
  filtroCepa.forEach((vino, indice) => {
    addVinos(vino, indice);
  });
}

// filtro por cepa

function filtrado(e) {
  console.log(e);
  if (e.keyCode === 13) {
    let search = document.getElementById("filtroCepa").value.toLowerCase();
    let filtroCepa = listaVinos.filter((obj) => obj.cepa === search);
    console.log(filtroCepa);
    if (filtroCepa.length > 0) {
      const tempLista = Array.from(tabla.children);
      tempLista.forEach((filaTabla) => {
        filaTabla.remove();
      });
      filtroCepa.forEach((vino, indice) => {
        nuevoRow(vino, indice);
      });

      const tempListaVinos = Array.from(listado.children);
      tempListaVinos.forEach((div) => {
        div.remove();
      });
      filtroCepa.forEach((vino, indice) => {
        addVinos(vino, indice);
      });
    }
  }
}

// funcion de compra y actualizacion de stock
function compra() {
  let vinoCompra = prompt(`Ingrese nombre del vino a comprar`);
  let stockActual = 0;
  for (let i = 0; i < listaVinos.length; i++) {
    if (vinoCompra === listaVinos[i].nombre) {
      stockActual = listaVinos[i].stock;
      precioVino = listaVinos[i].precio;
      if (stockActual > 0) {
        let stockCompra = Number(
          prompt(`Ingrese la cantidad que desea llevar`)
        );
        if (stockCompra > stockActual) {
          console.log(`No hay tanto stock`);
        } else {
          let stockFinal = 0;
          stockFinal = stockActual - stockCompra;
          listaVinos[i].stock = stockFinal;
          let costo = 0;
          costo = precioVino * stockCompra;
          console.log(
            `Lleva ${stockCompra} unidades del vino ${vinoCompra} y le cuesta ${costo}`
          );
        }
      } else {
        console.log(`No hay stock`);
      }
    }
  }
  actualizarTabla();
}

// creado de cards de vinos

function addVinos(vino) {
  // contenedores
  let card = document.createElement("div");
  card.setAttribute("class", "vinos__cardContainer");
  let fotoContainer = document.createElement("div");
  fotoContainer.setAttribute("class", "vinos__fotoContainer");
  let nombreContainer = document.createElement("div");
  nombreContainer.setAttribute("class", "vinos__nombreContainer");
  let cepaPrecioContainer = document.createElement("div");
  cepaPrecioContainer.setAttribute("class", "vinos__cepaPrecioContainer");
  let stockContainer = document.createElement("div");
  stockContainer.setAttribute("class", "vinos__stockContainer");

  // boton de compra
  let buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("class", "vinos__bottonContainer");
  let btnCard = document.createElement("button");
  btnCard.setAttribute("class", "vinos__bottonCompra");
  btnCard.setAttribute("placeholder", "COMPRA");
  btnCard.setAttribute("id", identificacion);
  btnCard.addEventListener("click", carritos);
  // btnCard.addEventListener("click", getId());

  card.appendChild(buttonContainer);
  buttonContainer.appendChild(btnCard);

  // contenido
  let imagen = document.createElement("img");
  imagen.src = `./vinos/${listaImagenes[vino.fotoId]}.png`;
  let cepaContainer = document.createElement("div");
  cepaContainer.setAttribute("class", "vinos__cepaContainer");
  let cepa = document.createElement("p");
  cepa.innerText = "Cepa:";
  let cepaVino = document.createElement("p");
  cepaVino.innerHTML = `\u00a0${vino.cepa}`;
  let precioContainer = document.createElement("div");
  precioContainer.setAttribute("class", "vinos__precioContainer");
  let precio = document.createElement("p");
  precio.innerText = "Precio:";
  let precioVino = document.createElement("p");
  precioVino.innerHTML = `\u00a0$${vino.precio}`;
  let stock = document.createElement("p");
  stock.innerText = "Stock:";
  let stockNumber = document.createElement("p");
  stockNumber.innerHTML = `\u00a0${vino.stock}`;
  let nombreVino = document.createElement("p");
  nombreVino.innerHTML = vino.nombre;
  // asignacion hijos
  fotoContainer.appendChild(imagen);
  cepaPrecioContainer.appendChild(precioContainer);
  cepaPrecioContainer.appendChild(cepaContainer);
  cepaContainer.appendChild(cepa);
  cepaContainer.appendChild(cepaVino);
  precioContainer.appendChild(precio);
  precioContainer.appendChild(precioVino);
  stockContainer.appendChild(stock);
  stockContainer.appendChild(stockNumber);
  nombreContainer.appendChild(nombreVino);
  card.appendChild(fotoContainer);
  card.appendChild(nombreContainer);
  card.appendChild(cepaPrecioContainer);
  card.appendChild(stockContainer);
  listado.appendChild(card);
}

// slide del panel de agregado de vinos

$(function () {
  $("#panelAgregado").click(function () {
    $(".form__mainContainer").slideToggle({ duration: 1100 });
  });
});

// slide de la lista de vinos

$(function () {
  $("#showLista").click(function () {
    $(".table__tableMainContainer").slideToggle({ duration: 1000 });
  });
});

// carrito

function carritos(e) {
  $(".carrito__sectionContainer").show({ duration: 1100 });
  let clickCard = e.target.id;
  listaCarrito.push(listaVinos[clickCard]);
  console.log(listaCarrito);
  actualizarTablaCarrito();
}

// funcion agregado de objetos a la tabla
function nuevoRowCarrito(vino) {
  let tableRow = document.createElement("tr");

  let nombre = document.createElement("td");
  nombre.innerHTML = vino.nombre;

  let cepa = document.createElement("td");
  cepa.innerHTML = vino.cepa;

  let precio = document.createElement("td");
  precio.setAttribute("class", `precio`);
  precio.innerHTML = vino.precio;

  let cantidad = document.createElement("td");
  cantidad.setAttribute("class", "carrito__cantidad");
  let cantidadInput = document.createElement("input");
  cantidadInput.setAttribute("class", "carrito__input");
  // cantidadInput.addEventListener("keyup", subtotalx);
  cantidadInput.setAttribute("id", idInput);

  let subtotal = document.createElement("td");
  subtotal.setAttribute("class", "carrito__subtotal");
  let subTotalNumero = document.createElement("p");
  subTotalNumero.setAttribute("class", "carrito__numero");
  subTotalNumero.innerHTML = vino.sub;
  // cantidadInput.addEventListener("keyup",(e) => subtotalx(e, subTotalNumero));
  cantidadInput.addEventListener("keyup", (e) => {
    subtotalx(e, subTotalNumero, vino, cantidadInput.value);
    // AGREGAR FUNCION DE SUMA TOTAL
  });

  tableRow.appendChild(nombre);
  tableRow.appendChild(cepa);
  tableRow.appendChild(precio);
  tableRow.appendChild(cantidad);
  tableRow.appendChild(subtotal);
  subtotal.appendChild(subTotalNumero);
  cantidad.appendChild(cantidadInput);
  carrito.appendChild(tableRow);
}

// actualizacion de tabla general !!!**
function actualizarTablaCarrito() {
  const tempLista = Array.from(carrito.children);
  tempLista.forEach((filaTabla) => {
    filaTabla.remove();
    idInput = 100;
  });
  listaCarrito.forEach((vino, indice) => {
    nuevoRowCarrito(vino, indice);
    idInput++;
  });
  window.localStorage.setItem(`listaCarrito`, JSON.stringify(listaCarrito));
}


// funcion subtotal

function subtotalx(e, resultado, vino, cantidad) {
  if (e.keyCode === 13) {
    // let clickBtn = e.target.id - 100;
    let subTotalPrecio = cantidad * vino.precio;
    console.log(subTotalPrecio);
    console.log(e);
    // listaCarrito[clickBtn].sub = subTotalPrecio;
    // actualizarTablaCarrito()
    resultado.innerText = subTotalPrecio;
    vino.sub = subTotalPrecio;
    sumaCompra = sumaCompra + subTotalPrecio;
    compraSuma.innerText = sumaCompra;
    console.log(sumaCompra);
    actualizarTablaCarrito()
  }
}

// funcion de gasto total de compra

// AJAX cotizacion dolar

// subir declaracion de variable
const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

$.get(url, (data, est) => {
  if (est == "success") {
    dolar = data[1].casa.venta;
    console.log(dolar);
  }
});

// boton de agregado de vinos por inputs
const button7 = document.querySelector(`#submitVinos`);
button7.addEventListener(`click`, guardarVinos);

// boton panel de agregado de vinos
const button8 = document.querySelector(`#panelAgregado`);

// boton panel de muestra de lista
const button9 = document.querySelector(`#showLista`);

// boton de mostrado de lista
const button1 = document.querySelector(`#mostrarVinos`);
button1.addEventListener(`click`, mostrarVinos);

// boton de ordenamiento de menor a mayor precio
const button2 = document.querySelector(`#ordenarListaMenor`);
button2.addEventListener(`click`, ordenarPrecioMenor);

// boton de ordenamiento de mayor a menor precio
const button3 = document.querySelector(`#ordenarListaMayor`);
button3.addEventListener(`click`, ordenarPrecioMayor);

// boton de suma de stock
const button4 = document.querySelector(`#sumaStock`);
button4.addEventListener(`click`, sumaStock);

// boton de compra y actualizacion de stock
const button6 = document.querySelector(`#compra`);
button6.addEventListener(`click`, compra);

// boton de borrado de filtros
const button10 = document.querySelector(`#borrarFiltro`);
button10.addEventListener(`click`, actualizarTabla);
