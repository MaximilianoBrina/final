const precioTicket = 200;
const descuentos = {
  "sin categoria": 0,
  "estudiante": 0.8,
  "trainee": 0.5,
  "junior": 0.15
};

function calcularTotal() {
  const cantidad = parseInt(document.querySelector("#cantidad").value, 10);
  const categoria = document.querySelector("#categoria").value;
  const descuentoCategoria = descuentos[categoria];
  const total = cantidad * precioTicket * (1 - descuentoCategoria);
  document.querySelector("#total").value = total;
}

function enviarDatos() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var mail = document.getElementById("mail").value;
  var cantidadTickets = document.getElementById("cantidadTickets").value;
  var categoriaSelect = document.getElementById("categoriaSelect").value;
  var totalPago = document.getElementById("totalPago").value;

  var formulario = {
    nombre: nombre,
    apellido: apellido,
    mail: mail,
    cantidadTickets: cantidadTickets,
    categoriaSelect: categoriaSelect,
    totalPago: totalPago
  };

  fetch('/insertarDatos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    alert("Hecho!");
  })
  .catch(error => {
    console.error(error);
    alert("Algo salió mal");
  });
}

fetch('/retrieveData')
  .then(response => response.json())
  .then(data => {
    var tableBody = document.querySelector('#data-table tbody');
    data.forEach(row => {
      var newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${row.nombre}</td>
        <td>${row.apellido}</td>
        <td>${row.email}</td>
        <td>${row.cantidad}</td>
        <td>${row.categoria}</td>
        <td>${row.totalapagar}</td>
      `;
      tableBody.appendChild(newRow);
    });
  })
  .catch(error => {
    console.error(error);
  });