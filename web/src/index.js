
function buttonClick(event ) {
  event.preventDefault();

  var id =  parseInt(document.querySelector('#Id').value);
  var nombre = document.querySelector('#Nombre').value;
  var edad =  parseInt(document.querySelector('#edad').value);
  var gmail = document.querySelector('#gmail').value;
  
  if (id != "" && nombre != "" && edad != "" && gmail != "") {
    

    fetch('http://localhost:3080/api/datos/new', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      
          Id: id,
          Name: nombre,
          Age:edad,
          Gmail: gmail,
      })
    })

    Correcto();

  }else {
    Error();
  }

}



function Error() {
  var contenedor = document.getElementById('contenedor');
  contenedor.style.cssText = 'background-color: red; color: white; font-size: 20px;';
  contenedor.innerHTML = 'LLene todos los datos :)';

}

function Correcto(){
  var contenedor = document.getElementById('contenedor');
  contenedor.style.cssText = 'background-color: green; color: white; font-size: 20px;';
  contenedor.innerHTML = 'Datos Enviados con exito:)';

}
