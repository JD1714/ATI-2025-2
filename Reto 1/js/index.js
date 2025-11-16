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
    actualizarHTML('logo', sitio[0]);
    actualizarHTML('uni', sitio[1]);
    actualizarHTML('periodo', sitio[2]);
    actualizarHTML('saludo', config.saludo);
    actualizarHTML('copyright',  config.copyRight);
    actualizarHTML('boton', config.buscar);
    let busqueda = document.getElementById('busqueda');
    busqueda.placeholder = config.nombre;
}

function cargarPersonas(idioma){
    const personas = document.getElementById('lista-personas');
    if(personas){
        perfiles.forEach(persona => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            const p = document.createElement('p');
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

    const hash = window.location.hash.substring(1).toUpperCase();
    const idiomaSeleccionado = idiomas.includes(hash) ? hash : idiomaPorDefecto;
    const rutaArchivo = 'conf/config'+idiomaSeleccionado+'.json';

    const script = document.createElement('script');
    script.src = rutaArchivo;
    script.type = 'text/javascript';

    script.onload = function() {
        // if (typeof window.config !== 'undefined') {
        //     config = window.config;
        // }
        // if (typeof window.perfiles !== 'undefined') {
        //     perfiles = window.perfiles;
        // }
        configuracionIndex();
        cargarPersonas(idiomaSeleccionado);
    }

    document.head.appendChild(script);
}

cargarIdioma();
