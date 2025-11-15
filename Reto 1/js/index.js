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

function configuracionPerfil(){
    actualizarHTML('email', config.email);
    actualizarHTML('color', config.color);
    actualizarHTML('libro', config.libro);
    actualizarHTML('musica', config.musica);
    actualizarHTML('video_juego', config.video_juego);
    actualizarHTML('lenguajes', config.lenguajes);
}

configuracionPerfil();
configuracionIndex();

function cargarPersonas(){
    const personas = document.getElementById('lista-personas');

    perfiles.forEach(persona => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        const p = document.createElement('p');
        li.classList.add('persona');
        li.appendChild(img);
        li.appendChild(p);
        img.src = persona.imagen;
        p.textContent = persona.nombre;
        personas.appendChild(li);
    });
}

cargarPersonas();
