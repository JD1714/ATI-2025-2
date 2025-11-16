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
}

configuracionIndex();

function cargarPersonas(){
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
                const urlRedireccion = `perfil.html#${idSeleccionado}`;
                window.location.href = urlRedireccion;
            });
            personas.appendChild(li);
        });
        return true;
    }
    return false;
}

cargarPersonas();
