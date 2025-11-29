let idioma;

function actualizarHTML(id, contenido){
    const elemento = document.getElementById(id);
    if(elemento){
        elemento.textContent = contenido;
        return true;
    }
    return false;
}

function configuracionIndex(){
    const sitio = config.sitio;
    let titulo = sitio[0] + sitio[1] + sitio[2];
    actualizarHTML('titulo', titulo);
    actualizarHTML('logo', sitio[0]);
    actualizarHTML('uni', sitio[1]);
    actualizarHTML('periodo', sitio[2]);
    actualizarHTML('saludo', config.saludo);
    actualizarHTML('copyright',  config.copyRight);
    actualizarHTML('boton', config.buscar);
    let busqueda = document.getElementById('busqueda');
    busqueda.placeholder = config.nombre;
}

function cargarPersonas(datos){
    const listaPerfiles = datos || perfiles;

    const personas = document.getElementById('lista-personas');

    if(personas){
        personas.innerHTML = '';
        listaPerfiles.forEach(persona => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            const p = document.createElement('p');
            p.classList.add('personaNombre')
            li.classList.add('persona');
            li.id = persona.ci;
            li.appendChild(img);
            li.appendChild(p);
            img.src = persona.imagen;
            p.textContent = persona.nombre;
            li.addEventListener('click', function(event) {
                const personaSeleccionada = event.currentTarget;
                const idSeleccionado = personaSeleccionada.id;
                const urlRedireccion = `perfil.html?lang=${idioma}#${idSeleccionado}`;
                window.location.href = urlRedireccion;
            });
            personas.appendChild(li);
        });
        return true;
    }
    return false;
}

function cargarIdioma(){
    const idiomas = ['ES', 'EN', 'PT'];
    const idiomaPorDefecto = 'ES';

    const infoURL = new URLSearchParams(window.location.search);
    const idiomaParametro = infoURL.get('lang');
    console.log(idiomaParametro);
    let rutaArchivo;

    let urlNecesitaActualizacion = false;

    if (idiomaParametro && idiomas.includes(idiomaParametro.toUpperCase())) {
        idioma = idiomaParametro
    }else{
        idioma = idiomaPorDefecto
        urlNecesitaActualizacion = true;
    }

    if (urlNecesitaActualizacion) {
        infoURL.set('lang', idioma);
        
        // Ahora se usa el replaceState para actualizar la URL en la barra de direcciones sin tener que recargar
        this.history.replaceState(null, '', '?' + infoURL.toString() + window.location.hash);
        //Este this hace referencia al ámbito local, al window
    }

    
    console.log(`Ámbito global ${this}`);

    rutaArchivo = 'conf/config'+idioma+'.json';

    const script = document.createElement('script');
    script.src = rutaArchivo;
    script.type = 'text/javascript';

    script.onload = function() {
        configuracionIndex();
        cargarPersonas();
        inicializarBusqueda();
    }

    document.head.appendChild(script);
}

cargarIdioma();

function filtrarPersonas(query) {
    const listaPersonas = document.getElementById('lista-personas');
    const mensajeBusqueda = config.mensaje_no_encontrado || "No hay alumnos que tengan en su nombre: [query]";
    const queryLimpia = query.trim().toLowerCase();
    if (queryLimpia === '') {
        listaPersonas.innerHTML = '';
        cargarPersonas(perfiles);
        return;
    }

    const resultados = perfiles.filter(persona => {
        const nombreLimpio = persona.nombre.toLowerCase();
        return nombreLimpio.includes(queryLimpia);
    });
    listaPersonas.innerHTML = '';
    
    if (resultados.length > 0) {
        cargarPersonas(resultados); 
    } else {
        const mensajeFinal = mensajeBusqueda.replace('[query]', `"${query}"`);
        listaPersonas.innerHTML = `<p class="mensaje-no-alumnos">${mensajeFinal}</p>`;
    }
}

function inicializarBusqueda() {
    const boton = document.getElementById('busqueda');
    const formulario = boton.closest('form');

    boton.addEventListener('input', function() {
        filtrarPersonas(this.value);
        //Este this hace referencia al boton declarado dentro de esta función, el cual corresponde al input de la barra de busqueda de la página.
        console.log(`Ámbito local a un objeto ${this}`);
    });

    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
}
