function actualizarHTML(id, contenido){
    const elemento = document.getElementById(id);
    if(elemento){
        elemento.textContent = contenido;
        return true;
    }
    return false;
}

function configuracionPerfil(){
    actualizarHTML('email', config.email);
    actualizarHTML('color', config.color);
    actualizarHTML('libro', config.libro);
    actualizarHTML('musica', config.musica);
    actualizarHTML('video_juego', config.video_juego);
    actualizarHTML('lenguajes', config.lenguajes);
}

function extraerCI(){
    const idSeleccionado = window.location.hash;
    console.log(idSeleccionado);
    if(idSeleccionado){
        const ci = idSeleccionado.substring(1);
        return ci;
    }
    return null;
}

function rellenarPerfil(){
    const CI = extraerCI();

    const script = document.createElement('script');
    script.src = CI+'/perfil.json';
    script.type = 'text/javascript';

    script.onload = function() {
        const imagen = document.getElementById('imagen');
        const perfilIndex = perfiles.find(usuario => {
            return usuario.ci === CI;
        });
        imagen.src = perfilIndex.imagen;
        actualizarHTML('nombre', perfil.nombre);
        actualizarHTML('titulo', perfil.nombre)
        let email = document.getElementById('email');
        let emailRemplazo = email.textContent;
        emailRemplazo = emailRemplazo.replace('[email]', ' ')
        email.textContent = emailRemplazo;
        let emailLink = document.getElementById('emailLink');
        emailLink.href = 'mailto:'+perfil.email;
        emailLink.textContent = perfil.email;
        actualizarHTML('descripcion', perfil.descripcion);
        actualizarHTML('colorRes', perfil.color);
        actualizarHTML('libroRes', perfil.libro);
        actualizarHTML('musicaRes', perfil.musica);
        actualizarHTML('video_juegoRes', perfil.video_juego);
        actualizarHTML('lenguajesRes', perfil.lenguajes);
    }
    document.head.appendChild(script);
}
function extraerIdioma(){
    const infoURL = new URLSearchParams(window.location.search);
    const idiomaParametro = infoURL.get('lang');
    
    const idiomas = ['ES', 'EN', 'PT'];
    const idiomaPorDefecto = 'ES';

    if (idiomaParametro && idiomas.includes(idiomaParametro.toUpperCase())) {
        return idiomaParametro.toUpperCase();
    }
    return idiomaPorDefecto;
}

function cargarPerfil(){
    const idiomaSeleccionado = extraerIdioma();
    const rutaConfig = `conf/config${idiomaSeleccionado}.json`;
    const scriptConfig = document.createElement('script');
    scriptConfig.src = rutaConfig;
    scriptConfig.type = 'text/javascript';

    scriptConfig.onload = function() {
        configuracionPerfil();
        rellenarPerfil();
    }
    document.head.appendChild(scriptConfig);
}

cargarPerfil();