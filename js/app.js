document.getElementById('generar-nombre').addEventListener('submit', cargarNombres);

// Llamando a Ajax e imprimir resultados
function cargarNombres(e) {
  
  e.preventDefault();

  // Leer las variables
  let origen = document.getElementById('origen');
  let origenSelect = origen.options[origen.options.selectedIndex].value;

  let genero = document.getElementById('genero');
  let generoSelect = genero.options[genero.options.selectedIndex].value;

  let cantidad = document.getElementById('numero').value;

  let url = 'http://uinames.com/api/?';
  // Si hay Origen entonces agregarlo a la URL.
  if (origenSelect !== '') {

    url += `region=${origenSelect}&`;
  }
  // Si hay un genero entonces agregarlo a la URL.
  if (generoSelect !== '') {

    url += `gender=${generoSelect}& `;
  }
  //Si hay una cantidad entonces agregala al URL
  if (Number(cantidad) > 0) {

    url += `amount=${cantidad}&`;
  }

  // Connectar con Ajax
  const XHR = new XMLHttpRequest();

  XHR.open('GET', url, true);

  XHR.onload = function() {

    if (this.status === 200) {

      let nombres = JSON.parse(this.responseText);
      // Generar HTML
      let templateNames = '<h2>Nombres Generados</h2>';
      templateNames += '<ul class="lista">';
      nombres.forEach(function(nombre) {

        templateNames += `
          <li>${nombre.name}</li>
        `;
      });
      templateNames += '</ul>';
      // Inyectar en HTML
      document.getElementById('resultado').innerHTML = templateNames;
    }
  };

  XHR.send();
}
