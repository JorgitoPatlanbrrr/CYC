/* ============================================================
   UTILITIES
============================================================ */
const $=id=>document.getElementById(id);
const CV=$('cv');
const MV=$('main-view');

/* ============================================================
   SCROLL PROGRESS + NAV HIGHLIGHT
============================================================ */
const sects=document.querySelectorAll('section[id],footer[id]');
const navAs=document.querySelectorAll('nav.main-nav a');

window.addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  if(h>0)$('sp').style.width=(window.scrollY/h*100)+'%';
  let cur='';
  sects.forEach(s=>{if(window.scrollY>=s.offsetTop-80)cur=s.id;});
  navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

/* ============================================================
   NAV BUG FIX — make nav links work even when career panel is open
   If panel is open: close it first, then navigate after animation.
   Also closes mobile menu if open.
============================================================ */
function navTo(href){
  const target=document.querySelector(href);
  if(!target)return;
  if(CV.classList.contains('open')){
    closeCareer();
    setTimeout(()=>target.scrollIntoView({behavior:'smooth'}),460);
  }else{
    target.scrollIntoView({behavior:'smooth'});
  }
}

// Intercept all main-nav clicks
navAs.forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    if(menuOpen)closeMenu();
    navTo(a.getAttribute('href'));
  });
});

/* ============================================================
   HAMBURGER MENU — global state
============================================================ */
let menuOpen=false;

function toggleMenu(){
  menuOpen=!menuOpen;
  $('ham-btn').classList.toggle('open',menuOpen);
  $('mob-menu').classList.toggle('open',menuOpen);
  $('mob-overlay').classList.toggle('open',menuOpen);
  // lock body scroll
  const panelOpen=CV.classList.contains('open');
  document.body.classList.toggle('locked',menuOpen||panelOpen);
  $('ham-btn').setAttribute('aria-expanded',menuOpen);
}

function closeMenu(){
  menuOpen=false;
  $('ham-btn').classList.remove('open');
  $('mob-menu').classList.remove('open');
  $('mob-overlay').classList.remove('open');
  $('ham-btn').setAttribute('aria-expanded','false');
  if(!CV.classList.contains('open'))document.body.classList.remove('locked');
}

function menuNav(e,link){
  e.preventDefault();
  closeMenu();
  navTo(link.getAttribute('href'));
}

/* ============================================================
   CARD TOGGLE
============================================================ */
let aC=null;
function toggleCard(id){
  const all=document.querySelectorAll('.article');
  const el=$('card-'+id);
  if(aC===id){all.forEach(c=>c.classList.remove('active','shrunk'));aC=null;return;}
  all.forEach(c=>{c.classList.remove('active','shrunk');if(c.id!=='card-'+id)c.classList.add('shrunk');});
  el.classList.add('active');aC=id;
}

/* ============================================================
   CAREER DATA — local "database"
   Add videoSrc / videoEmbed (YouTube URL) and gallery[] when ready.
   Set videoSrc: 'path/to/file.mp4' for local video.
   Set videoEmbed: 'https://www.youtube.com/embed/VIDEO_ID' for YouTube.
============================================================ */
const CD={
  produccion:{
    id:'produccion',title:'Producción Industrial',icon:'⚙️',cc:'#f97316',cardKey:'prod',
    tagline:'Donde las ideas se convierten en productos reales.',
    heroText:'Guanajuato es el corazón industrial de México. Domina los procesos que mueven la economía del Bajío.',
    about:'El Técnico en Producción Industrial planifica, supervisa y optimiza los procesos de manufactura. Desde el diseño de la línea de producción hasta el control de calidad final, eres quien garantiza que el producto llegue perfecto al cliente.',
    learn:['Control estadístico de calidad (SPC)','Programación de maquinaria CNC','Logística y cadena de suministro','Seguridad e higiene industrial (NOM-STPS)','Lean Manufacturing, 5S y Kaizen'],
    profile:['Pensamiento analítico y metódico','Gusto por la maquinaria y herramientas','Capacidad de liderazgo operativo','Alta tolerancia a entornos industriales','Trabajo en equipo multidisciplinario'],
    companies:['General Motors (Silao)','Volkswagen de México','Hella (Celaya)','ZF Friedrichshafen','Toyota Tsusho'],
    areas:['Control y aseguramiento de calidad','Planeación y control de producción','Mantenimiento industrial preventivo','Seguridad e higiene en planta','Logística y gestión de almacén'],
    stats:[{l:'Demanda laboral en Bajío',v:94},{l:'Salario potencial',v:78},{l:'Crecimiento del sector',v:87},{l:'Dificultad académica',v:58}],
    quote:'Cada automóvil que sale de Guanajuato lleva el trabajo de técnicos como tú.',
    cta:'Estoy listo para producir',game:'qc',
    gameDesc:'🏭 Organiza la fábrica',
    // Video: archivo real del taller de producción
    videoSrc:'proyecto budeos/produccion industrial/Taller_produccion.mp4',
    videoEmbed:null,
    videoCaption:'Taller de Producción Industrial — Plantel San Juan De la Vega',
    // ── Videos de prácticas en galería ──────────────────────────
    // Pon la ruta de tus videos aquí (misma carpeta o subcarpeta)
    galleryVideos:[
      {label:'Práctica en taller',   src:'proyecto budeos/produccion industrial/practica1.mp4',  caption:'Práctica 1 — Producción Industrial'},
      {label:'Control de máquinas',  src:'proyecto budeos/produccion industrial/practica2.mp4',  caption:'Práctica 2 — Producción Industrial'},
    ],
    // ── Imágenes de galería ──────────────────────────────────────
    // Pon la ruta de tu imagen en imgSrc (ej: 'img/prod/ensamble.jpg')
    // Si dejas imgSrc:'' se muestra el placeholder de emoji
    gallery:[
      {label:'Revisión de piezas en taller', icon:'⚙️', imgSrc:'proyecto budeos/produccion industrial/Revisión de piezas grabadas en taller.jpeg', color:['rgba(249,115,22,.3)','rgba(234,88,12,.6)']},
      {label:'Perforación con taladro de columna de banco',icon:'', imgSrc:'proyecto budeos/produccion industrial/Perforación con taladro de columna de banco.jpg', color:['rgba(249,115,22,.2)','rgba(11,22,41,.9)']},
      {label:'Demostración de sierra',    icon:'🔩', imgSrc:'proyecto budeos/produccion industrial/Demostración de sierra de inglete.png', color:['rgba(251,191,36,.2)','rgba(11,22,41,.9)']},
      {label:'Equipo de proteccion',  icon:'👷', imgSrc:'proyecto budeos/produccion industrial/Equipo de Proteccion.png', color:['rgba(249,115,22,.25)','rgba(22,40,72,.9)']},
      {label:'Prototipos de sistemas neumáticos', icon:'📦', imgSrc:'proyecto budeos/produccion industrial/Prototipos de sistemas neumáticos.jpeg', color:['rgba(249,115,22,.15)','rgba(11,22,41,.95)']},
      {label:'Laboratorio QA',    icon:'🔬', imgSrc:'proyecto budeos/produccion industrial/laboratorioqa.jpeg', color:['rgba(234,88,12,.2)','rgba(11,22,41,.9)']},
    ],
  },
  quimica:{
    id:'quimica',title:'Química Industrial',icon:'⚗️',cc:'#22c55e',cardKey:'quim',
    tagline:'La ciencia que transforma la materia.',
    heroText:'Desde los alimentos que consumes hasta los medicamentos que salvan vidas. La química industrial está en todo lo que te rodea.',
    about:'El Técnico en Química Industrial analiza, controla y optimiza procesos químicos en laboratorios, plantas de tratamiento y líneas de manufactura. Su trabajo garantiza calidad, seguridad y cumplimiento normativo en toda la cadena productiva.',
    learn:['Análisis químico cuantitativo y cualitativo','Control de procesos industriales','Manejo de reactivos y normas de seguridad','Cromatografía y espectroscopía básica','Gestión ambiental y tratamiento de residuos'],
    profile:['Curiosidad científica profunda','Meticulosidad extrema en mediciones','Disciplina y orden en laboratorio','Razonamiento analítico e hipotético','Tolerancia a entornos controlados'],
    companies:['LALA (región Bajío)','Sabritas — PepsiCo','Laboratorios Pisa','Liomont Laboratorios','JUMEX (planta Guanajuato)'],
    areas:['Control de calidad alimentaria','Laboratorio farmacéutico','Tratamiento de agua y efluentes','Análisis de materiales industriales','Industria petroquímica'],
    stats:[{l:'Demanda en salud y alimentos',v:88},{l:'Salario potencial',v:82},{l:'Crecimiento del sector',v:79},{l:'Dificultad académica',v:72}],
    quote:'Los alimentos que millones de mexicanos consumen pasan primero por las manos de un químico industrial.',
    cta:'Quiero analizar el mundo',game:'chemquiz',
    gameDesc:'🧪 Experimentos Sorprendentes',
    videoSrc:'proyecto budeos/quimica/Laboratorio_Quimica.mp4',videoEmbed:null,
    videoCaption:'Laboratorio de Química Analítica — Plantel San Juan De la Vega',
    // ── Videos de prácticas en galería ──────────────────────────
    galleryVideos:[
      {label:'Práctica de laboratorio', src:'proyecto budeos/quimica/practica1.mp4', caption:'Práctica 1 — Química Industrial'},
      {label:'Análisis de muestras',    src:'proyecto budeos/quimica/practica2 (1).mp4', caption:'Práctica 2 — Química Industrial'},
    ],
    // ── Imágenes de galería ──────────────────────────────────────
    gallery:[
      {label:'Laboratorio analítico', icon:'🔬', imgSrc:'proyecto budeos/quimica/lab.jpeg', color:['rgba(34,197,94,.3)','rgba(22,101,52,.6)']},
      {label:'Reacciones en vitrina', icon:'⚗️', imgSrc:'proyecto budeos/quimica/reacciones.jpeg', color:['rgba(34,197,94,.2)','rgba(11,22,41,.9)']},
      {label:'Espectrómetro',         icon:'🌈', imgSrc:'proyecto budeos/quimica/espectometro.jpeg', color:['rgba(16,185,129,.2)','rgba(11,22,41,.9)']},
      {label:'Equipo de seguridad',   icon:'🥽', imgSrc:'proyecto budeos/quimica/equipodeproteccion.png', color:['rgba(34,197,94,.15)','rgba(11,22,41,.95)']},
      {label:'Microscopio',    icon:'📋', imgSrc:'proyecto budeos/quimica/microscopio (2).jpeg', color:['rgba(34,197,94,.25)','rgba(22,40,72,.9)']},
      {label:'Sala de reactivos', icon:'💧', imgSrc:'proyecto budeos/quimica/sala de reactios.jpeg', color:['rgba(6,182,212,.2)','rgba(11,22,41,.9)']},
    ],
  },
  programacion:{
    id:'programacion',title:'Programación',icon:'💻',cc:'#8b5cf6',cardKey:'prog',
    tagline:'Tú decides qué construye el futuro.',
    heroText:'El código es el nuevo lenguaje universal. Con una laptop y conexión a internet, puedes trabajar para cualquier empresa del mundo.',
    about:'El Técnico en Programación diseña, desarrolla y mantiene software, aplicaciones web y móviles. Es una de las profesiones con mayor demanda global, mejores salarios y mayores oportunidades de trabajo remoto.',
    learn:['HTML, CSS y JavaScript moderno','Python y lógica de programación','Bases de datos SQL y NoSQL','APIs REST y arquitecturas web','Control de versiones con Git'],
    profile:['Pensamiento lógico y abstracto','Paciencia ante errores (debugging)','Creatividad para resolver problemas','Autodidacta y curioso por la tecnología','Gusto por construir cosas desde cero'],
    companies:['Kio Networks (León)','Cognizant México','Tata Consultancy Services','Startups del Bajío','Trabajo remoto global (cualquier empresa)'],
    areas:['Desarrollo web frontend y backend','Aplicaciones móviles iOS/Android','Automatización de procesos','Análisis de datos e inteligencia artificial','Ciberseguridad y redes'],
    stats:[{l:'Demanda global de programadores',v:96},{l:'Salario potencial',v:90},{l:'Crecimiento del sector',v:95},{l:'Dificultad académica',v:70}],
    quote:'No necesitas estar en Silicon Valley. Con disciplina y código, el mundo es tu oficina.',
    cta:'Quiero escribir el futuro',game:'bughunter',
    gameDesc:'💻 Piensa como programador',
    videoSrc:'proyecto budeos/programacion/Sala de Audio visual.mp4',videoEmbed:null,
    videoSrc2:'proyecto budeos/programacion/Centro de computo.mp4',
    videoCaption:'Sala Audiovisual — Plantel San Juan De la Vega',
    videoCaption2:'Centro de Cómputo — Plantel San Juan De la Vega',
    // ── Videos de prácticas en galería ──────────────────────────
    galleryVideos:[
      {label:'Ejecutando codigo', src:'proyecto budeos/programacion/practica1.mp4', caption:'Práctica 1 — Programación'},
      {label:'Un momazo',        src:'proyecto budeos/programacion/videoplayback.mp4', caption:'Práctica 2 — Programación'},
    ],
    // ── Imágenes de galería ──────────────────────────────────────
    gallery:[
      {label:'Arduino', icon:'🖥️', imgSrc:'proyecto budeos/programacion/arduino.jpeg', color:['rgba(139,92,246,.3)','rgba(76,29,149,.6)']},
      {label:'Proyecto web',   icon:'🌐', imgSrc:'proyecto budeos/programacion/creacionweb.jpeg', color:['rgba(139,92,246,.2)','rgba(11,22,41,.9)']},
      {label:'Creaccion de Apps',  icon:'⚡', imgSrc:'proyecto budeos/programacion/creacion apps.jpeg', color:['rgba(167,139,250,.2)','rgba(11,22,41,.9)']},
      {label:'Carro Autonomo', icon:'📱', imgSrc:'proyecto budeos/programacion/Carro Autonomo.jpg', color:['rgba(139,92,246,.15)','rgba(11,22,41,.95)']},
      {label:'Bases de datos',      icon:'🤝', imgSrc:'proyecto budeos/programacion/mysql.jpg', color:['rgba(139,92,246,.25)','rgba(22,40,72,.9)']},
      {label:'Programacion web(detras de todo esto)',     icon:'🏅', imgSrc:'proyecto budeos/programacion/programacion.jpeg', color:['rgba(192,132,252,.2)','rgba(11,22,41,.9)']},
    ],
  },
};

/* ============================================================
   SPA OPEN / CLOSE
============================================================ */
function openCareer(id,e){
  if(e)e.stopPropagation();
  const d=CD[id];
  if(!d)return;
  CV.style.setProperty('--cc',d.cc);
  CV.innerHTML=buildCV(d);
  CV.scrollTop=0;
  requestAnimationFrame(()=>{
    CV.classList.add('open');
    document.body.classList.add('locked');
    MV.classList.add('blurred');
  });
  setTimeout(()=>animStats(d),600);
  setTimeout(()=>initGame(d),700);
}

function closeCareer(){
  /* BUG FIX: era prodTimer (undefined) → plantTimer; también cerramos cualquier modal abierto */
  CV.classList.remove('open');
  document.body.classList.remove('locked');
  MV.classList.remove('blurred');
  clearInterval(plantTimer);   // ← corrección: timer real de Producción
  closeGameModal();             // ← cierra modal de ayuda/saltar/revelación si estaba abierto
  closeGameModal('revelation-modal');
  window._gModalCb = null;      // ← limpia callback pendiente
  setTimeout(()=>{CV.innerHTML='';},460);
}

/* ============================================================
   BUILD CAREER VIEW HTML
   Includes: hero, about, field, stats, game, VIDEO (facade), gallery, close
============================================================ */
function buildCV(d){
  const li=arr=>arr.map(x=>`<li>${x}</li>`).join('');
  const statsH=d.stats.map(s=>`
    <div class="cvstat">
      <div class="cvsth"><span class="cvstl">${s.l}</span><span class="cvstv" id="sv${s.l.replace(/\W/g,'')}">${s.v}%</span></div>
      <div class="cvstt"><div class="cvstf" id="sf${s.l.replace(/\W/g,'')}"></div></div>
    </div>`).join('');

  // Gallery cards HTML — soporta imgSrc real o placeholder de emoji
  const galleryH=d.gallery.map((g,i)=>`
    <div class="cv-gallery-card" onclick="openLightbox(${i},'${d.id}')"
      style="--gph-a:${g.color[0]};--gph-b:${g.color[1]};">
      ${g.imgSrc
        ?`<img class="cv-gallery-img" src="${g.imgSrc}" alt="${g.label}" loading="lazy">`
        :`<div class="cv-gallery-ph">
            <div class="cv-gallery-ph-icon">${g.icon}</div>
            <div class="cv-gallery-ph-label">${g.label}</div>
          </div>`
      }
      <div class="cv-gallery-overlay"><span class="cv-gallery-lbl">${g.label}</span></div>
    </div>`).join('');

  // Videos de práctica en galería (máx 2 por carrera)
  const practiceVideosH=(d.galleryVideos||[]).map((v,i)=>`
    <div class="cv-gallery-video-card" id="gv-${d.id}-${i}">
      <div class="cv-gallery-video-ph" id="gvph-${d.id}-${i}" onclick="loadGalleryVideo('${d.id}',${i})">
        <div class="cv-gallery-video-icon">▶</div>
        <div class="cv-gallery-video-label">${v.label}</div>
        <div class="cv-gallery-video-hint">${v.src?v.src:'Ruta de video no configurada'}</div>
      </div>
    </div>`).join('');

  // Video player HTML (Facade — thumbnail shown; video injected on click)
  // Si la carrera tiene videoSrc2, renderiza dos reproductores (Programación)
  const singlePlayer=(id,src,caption)=>`
    <div class="cv-video-player" id="cvvp-${id}" onclick="loadVideo('${id}')" role="button" aria-label="Reproducir video de instalaciones">
      <div class="cv-video-placeholder" id="cvvph-${id}">
        <div class="cv-video-ph-icon">🎬</div>
        <div class="cv-video-ph-text">Video de instalaciones</div>
        <div class="cv-video-ph-code">${src||'Próximamente disponible'}</div>
      </div>
      <div class="cv-video-overlay" id="cvvo-${id}">
        <div class="cv-play-btn"><div class="cv-play-icon"></div></div>
        <div class="cv-video-caption">${caption}</div>
      </div>
      <div class="cv-video-glow"></div>
    </div>`;

  let videoPlayer;
  if(d.videoSrc2){
    // Dual video layout para Programación (2 videos lado a lado)
    videoPlayer=`
    <div class="cv-dual-video">
      <div>
        <p class="cv-video-label">📺 Sala Audiovisual</p>
        ${singlePlayer(d.id,d.videoSrc,d.videoCaption)}
      </div>
      <div>
        <p class="cv-video-label">💻 Centro de Cómputo</p>
        ${singlePlayer(d.id+'-2',d.videoSrc2,d.videoCaption2)}
      </div>
    </div>
    <p class="cv-video-tagline">Haz clic para reproducir &mdash; <strong>cero carga automática</strong>, solo cuando tú quieras.</p>`;
  }else{
    videoPlayer=`
    ${singlePlayer(d.id,d.videoSrc||d.videoEmbed,d.videoCaption)}
    <p class="cv-video-tagline">Haz clic para reproducir &mdash; <strong>cero carga automática</strong>, solo cuando tú quieras.</p>`;
  }

  return`
  <div class="cvnav">
    <button class="cvback" onclick="closeCareer()">← Volver</button>
    <span class="cvnav-title">${d.title}</span>
    <div class="cvnav-links">
      <a onclick="navFromPanel('#INICIO')">Inicio</a>
      <a onclick="navFromPanel('#TEST')">Test</a>
      <a onclick="navFromPanel('#CARRERAS')">Carreras</a>
      <a onclick="navFromPanel('#CONTACTO')">Contacto</a>
    </div>
  </div>

  <div class="cvhero">
    <div class="cvhbg"></div><div class="cvhgrid"></div>
    <div class="cvhicon">${d.icon}</div>
    <h1>${d.title}</h1>
    <p class="cvtag">${d.tagline}</p>
    <p class="cvhtxt">${d.heroText}</p>
  </div>

  <div style="max-width:960px;margin:0 auto">
    <div class="cvs">
      <h2 class="cvh2">¿De qué <span>trata?</span></h2>
      <p class="cvabout">${d.about}</p>
      <div class="cv2">
        <div class="cvcc"><h3>Lo que aprenderás</h3><ul>${li(d.learn)}</ul></div>
        <div class="cvcc"><h3>Perfil ideal</h3><ul>${li(d.profile)}</ul></div>
      </div>
    </div>
  </div>

  <div class="cvalt"><div class="cvs">
    <h2 class="cvh2">Campo <span>laboral</span></h2>
    <div class="cv2">
      <div class="cvcc"><h3>Empresas en el Bajío</h3><ul>${li(d.companies)}</ul></div>
      <div class="cvcc"><h3>Áreas de especialidad</h3><ul>${li(d.areas)}</ul></div>
    </div>
  </div></div>

  <div style="max-width:960px;margin:0 auto">
    <div class="cvs">
      <h2 class="cvh2">Estadísticas <span>del sector</span></h2>
      ${statsH}
    </div>
  </div>

  <div class="cvalt"><div class="cvs">
    <h2 class="cvh2">Experiencia <span>interactiva</span></h2>
    <p style="font-size:14px;opacity:.5;margin-bottom:24px;">${d.gameDesc} — Juega y descubre de qué trata esta carrera.</p>
    <div class="cvgame" id="gamebox"></div>
  </div></div>

  <div style="max-width:960px;margin:0 auto">
    <div class="cv-video-section">
      <div class="cv-video-wrap">
        <div class="cv-video-badge">🎥 Conoce las instalaciones</div>
        <h2 class="cvh2">Visita <span>nuestras aulas</span></h2>
        ${videoPlayer}
      </div>
    </div>
  </div>

  <div class="cvalt">
    <div class="cv-gallery-section">
      <div class="cv-gallery-wrap">
        <h2 class="cvh2">Galería de <span>prácticas</span></h2>
        <p style="font-size:14px;opacity:.45;margin-bottom:4px;">Toca una imagen para verla en detalle${window.innerWidth<=768?' · Desliza →':' · Hover para info'}.</p>
        <div class="cv-gallery-track" id="cv-gallery-${d.id}">${galleryH}</div>
        ${practiceVideosH?`<div class="cv-gallery-videos-label">🎬 Videos de prácticas</div><div class="cv-gallery-videos-row">${practiceVideosH}</div>`:""} 
      </div>
    </div>
  </div>

  <div class="cvclose">
    <p class="cvquote">${d.quote}</p>
    <button class="cvcta" onclick="closeCareer()">${d.cta} →</button>
    <span class="cvblink" onclick="closeCareer()">← Explorar otras carreras</span>
  </div>`;
}

/* Helper to navigate from inside career panel */
function navFromPanel(href){
  closeCareer();
  setTimeout(()=>{
    const el=document.querySelector(href);
    if(el)el.scrollIntoView({behavior:'smooth'});
  },480);
}

/* ============================================================
   VIDEO FACADE — inject video only on user click (zero blocking load)
============================================================ */
function loadVideo(rawId){
  // rawId puede ser "prog" o "prog-2" (segundo video de programación)
  const isSecond=rawId.endsWith('-2');
  const careerId=isSecond?rawId.slice(0,-2):rawId;
  const d=CD[careerId];
  const player=$('cvvp-'+rawId);
  const overlay=$('cvvo-'+rawId);
  const placeholder=$('cvvph-'+rawId);
  if(!player||!d)return;

  // Determinar fuente según si es el segundo video o no
  const src=isSecond?(d.videoSrc2||null):(d.videoEmbed||d.videoSrc||null);
  const isEmbed=!isSecond&&!!d.videoEmbed;

  // Prevent multiple clicks
  player.onclick=null;
  player.style.cursor='default';

  if(isEmbed){
    // YouTube / iframe embed
    if(overlay)overlay.classList.add('hidden');
    if(placeholder)placeholder.style.display='none';
    const iframe=document.createElement('iframe');
    iframe.src=d.videoEmbed+'?autoplay=1&rel=0&modestbranding=1';
    iframe.allow='autoplay; encrypted-media; fullscreen';
    iframe.allowFullscreen=true;
    // MEDIA: loading="lazy" en iframes generados dinámicamente
    iframe.loading='lazy';
    iframe.style.cssText='position:absolute;inset:0;width:100%;height:100%;border:none;';
    player.style.position='relative';
    player.insertBefore(iframe,player.firstChild);
  }else if(src){
    // Local video file
    if(overlay)overlay.classList.add('hidden');
    if(placeholder)placeholder.style.display='none';
    const video=document.createElement('video');
    video.src=src;
    video.controls=true;
    video.autoplay=true;
    video.playsInline=true;
    // MEDIA: preload="metadata" para reducir carga inicial
    video.preload='metadata';
    video.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
    player.style.position='relative';
    player.insertBefore(video,player.firstChild);
    video.play().catch(()=>{});
  }else{
    // No video configurado — mensaje amigable
    if(overlay)overlay.classList.add('hidden');
    if(placeholder){
      placeholder.innerHTML=`
        <div class="cv-video-ph-icon">🎬</div>
        <div class="cv-video-ph-text">Video próximamente disponible</div>
        <div class="cv-video-ph-code">Agrega la ruta en careerData.videoSrc</div>`;
    }
    if(overlay){
      overlay.style.pointerEvents='none';
      setTimeout(()=>overlay.classList.remove('hidden'),100);
    }
    player.onclick=loadVideo.bind(null,rawId);
    player.style.cursor='pointer';
  }
}

/* ============================================================
   GALLERY LIGHTBOX
============================================================ */
function openLightbox(idx,careerId){
  const d=CD[careerId];
  if(!d||!d.gallery[idx])return;
  const g=d.gallery[idx];
  const lb=$('cv-lightbox');
  const content=$('cv-lightbox-content');
  const caption=$('cv-lightbox-caption');
  content.innerHTML= g.imgSrc
    ?`<img src="${g.imgSrc}" alt="${g.label}" style="width:100%;border-radius:12px;display:block;max-height:70vh;object-fit:contain;">`
    :`<div class="cv-lightbox-ph" style="background:linear-gradient(135deg,${g.color[0]},${g.color[1]});border-radius:16px;padding:80px 40px;">
        <div class="cv-lightbox-ph-icon">${g.icon}</div>
        <div class="cv-lightbox-ph-label">${g.label}</div>
      </div>`;
  caption.textContent=g.label+' — '+d.title;
  lb.classList.add('open');
  document.body.classList.add('locked');
}

function closeLightbox(e){
  if(e&&e.target!==$('cv-lightbox')&&e.target!==$('cv-lightbox-inner')&&!e.target.classList.contains('cv-lightbox-close'))return;
  $('cv-lightbox').classList.remove('open');
  if(!CV.classList.contains('open'))document.body.classList.remove('locked');
}

/* ============================================================
   STATS ANIMATION
============================================================ */
function animStats(d){
  d.stats.forEach((s,i)=>{
    setTimeout(()=>{
      const el=document.getElementById('sf'+s.l.replace(/\W/g,''));
      if(el)el.style.width=s.v+'%';
    },i*220);
  });
}

/* ============================================================
   SHARED GAME FEEDBACK
============================================================ */
function spawnParticles(el,emojis,count=6){
  const wrap=el.closest('.particle-wrap')||el;
  const wRect=wrap.getBoundingClientRect();
  const cx=wRect.width/2,cy=wRect.height/2;
  for(let i=0;i<count;i++){
    const p=document.createElement('div');
    p.className='g-particle';
    p.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    const angle=Math.random()*Math.PI*2;
    const dist=50+Math.random()*60;
    p.style.setProperty('--dx',Math.cos(angle)*dist+'px');
    p.style.setProperty('--dy',(Math.sin(angle)*dist-30)+'px');
    p.style.left=cx+'px';p.style.top=cy+'px';
    p.style.animationDelay=(i*0.05)+'s';
    wrap.appendChild(p);
    setTimeout(()=>p.remove(),800);
  }
}

function showGameToast(box,msg){
  let t=box?box.querySelector('.game-toast'):null;
  if(!t){
    t=document.createElement('div');
    t.className='game-toast';
    if(box)box.appendChild(t);
    else return;
  }
  t.textContent=msg;t.classList.add('show');
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove('show'),2400);
}

function vibrate(ms=40){if(navigator.vibrate)navigator.vibrate(ms);}

/* initGame is defined in new_game_js section below */

/* ============================================================
   SHARED ASYNC HELPER
============================================================ */
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

/* ============================================================
   GAME ROUTER
============================================================ */
function initGame(d){
  setTimeout(()=>{
    try{
      if(d.game==='qc')showPRODIntro();
      else if(d.game==='chemquiz')showCHEMIntro();
      else if(d.game==='bughunter')showAUTOIntro();
    }catch(err){
      const box=$('gamebox');
      if(box)box.innerHTML=`<div style="text-align:center;padding:30px">
        <div style="font-size:48px;margin-bottom:12px">🔄</div>
        <p style="color:rgba(255,255,255,.5);margin-bottom:16px;">Hubo un problema al cargar el juego</p>
        <button class="greset" onclick="initGame(CD['${d.id}'])">↺ Intentar de nuevo</button>
      </div>`;
    }
  },300);
}

/* ============================================================
   ███████████████████████████████████████████████████████████
   GAME: PRODUCCIÓN — "Planta en Acción"
   Inspirado en Overcooked / Good Pizza Great Pizza
   ███████████████████████████████████████████████████████████
============================================================ */
let plantTimer,plantTime,plantScore,plantOrders,plantSelectedItem,plantDone,plantEvents,plantItemsDone;

const PLANT_ITEMS_DEF=[
  {id:'gear',icon:'⚙️',name:'Pieza'},{id:'bolt',icon:'🔩',name:'Tornillo'},
  {id:'hammer',icon:'🔨',name:'Ensamble'},{id:'paint',icon:'🎨',name:'Pintura'},
  {id:'beaker',icon:'🧪',name:'Reactivo'},{id:'chip',icon:'💡',name:'Circuito'},
  {id:'box',icon:'📦',name:'Caja'},{id:'check',icon:'✅',name:'QC'},
];
const PLANT_ORDERS_DEF=[
  {id:'A',label:'Pedido A',icon:'🚗',steps:['⚙️','🔩','🔨','✅'],urgency:false},
  {id:'B',label:'Pedido B',icon:'💊',steps:['🧪','🧪','📦','✅'],urgency:false},
  {id:'C',label:'🚨 URGENTE',icon:'📱',steps:['💡','🔨','🎨','✅'],urgency:true},
];
const PLANT_EVENTS_DEF=[
  {id:'machine',icon:'🏭',name:'Máquina detenida',action:'¡TAP para reiniciar!',alert:'⚠️'},
  {id:'belt',icon:'🔄',name:'Cinta saturada',action:'¡Liberar espacio!',alert:'🚨'},
  {id:'error',icon:'❌',name:'Error de calidad',action:'¡Corregir proceso!',alert:'⛔'},
  {id:'priority',icon:'🚀',name:'Pedido prioritario',action:'¡Activar línea rápida!',alert:'💥'},
];

function showPRODIntro(){
  const box=$('gamebox');if(!box)return;
  box.innerHTML=`
  <div class="game-intro">
    <div class="game-intro-icon">🏭</div>
    <div class="game-intro-title">Planta en Acción</div>
    <div class="game-intro-desc">Mantén la línea de producción funcionando. Toma piezas de la banda, resuelve eventos y entrega pedidos antes de que se acabe el tiempo.</div>
    <div class="game-intro-meta">
      <div class="game-intro-pill">⏱️ 60 segundos</div>
      <div class="game-intro-pill">👆 Solo taps</div>
      <div class="game-intro-pill">📦 3 pedidos</div>
    </div>
    <button class="game-start-btn" onclick="initPROD()">⚙️ INICIAR EXPERIENCIA</button>
  </div>`;
}

function initPROD(){
  clearInterval(plantTimer);
  plantTime=60;plantScore=0;plantDone=0;plantSelectedItem=null;plantItemsDone=0;
  plantOrders=PLANT_ORDERS_DEF.map(o=>({...o,steps:[...o.steps],progress:0,done:false}));
  plantEvents=PLANT_EVENTS_DEF.map(e=>({...e,active:false,solved:false}));
  // Randomly activate 1 event at start
  plantEvents[0].active=true;
  plantTimer=setInterval(plantTick,1000);
  renderPROD();
}

function plantTick(){
  plantTime--;
  const te=$('plant-timer');
  if(te){te.textContent=formatTime(plantTime);te.className='plant-timer'+(plantTime<=12?' warn':'');}
  // Randomly trigger events
  if(plantTime>5&&Math.random()<0.18){
    const inactive=plantEvents.filter(e=>!e.active&&!e.solved);
    if(inactive.length>0){
      const ev=inactive[Math.floor(Math.random()*inactive.length)];
      ev.active=true;
      renderPlantEvents();
      showGameToast($('gamebox'),'¡Nuevo evento en la planta! '+ev.icon);
    }
  }
  if(plantTime<=0){clearInterval(plantTimer);showPRODEnd();}
}
function formatTime(s){return s<10?'0:0'+s:(s<60?'0:'+s:'1:00');}

function renderPROD(){
  const box=$('gamebox');if(!box)return;
  const pct=Math.round((plantDone/plantOrders.length)*100);
  const items=shuffleItems();
  box.innerHTML=`
  <div class="plant-game particle-wrap">
    <div class="game-hud">
      <span class="plant-timer" id="plant-timer">${formatTime(plantTime)}</span>
      <div class="game-hud-bar"><div class="game-hud-fill" style="width:${pct}%"></div></div>
      <span class="plant-score">PUNTOS: <strong>${plantScore}</strong></span>
    </div>
    <div style="font-size:11px;color:rgba(255,255,255,.35);margin-bottom:10px;letter-spacing:.5px;">
      Tap en un evento para resolverlo · Toma piezas de la cinta · Entrega pedidos completos
    </div>
    <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:6px;">📋 Pedidos activos</div>
    <div class="plant-orders" id="plant-orders-wrap"></div>
    <div class="plant-belt-wrap">
      <div class="plant-belt-label">🔄 Banda transportadora <span id="plant-sel-hint">— toca una pieza para tomarla</span></div>
      <div class="plant-belt-stripe" id="plant-belt-track"></div>
    </div>
    <div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.25);margin:10px 0 6px;">⚡ Estado de la planta</div>
    <div class="plant-events" id="plant-events-wrap"></div>
    <div class="plant-action-row">
      <button class="plant-deliver-btn" id="plant-deliver-btn" onclick="plantDeliver()" disabled>📦 Entregar pedido</button>
    </div>
    <div class="game-toast"></div>
  </div>`;
  renderPlantOrders();
  renderPlantBelt(items);
  renderPlantEvents();
}

function shuffleItems(){
  return [...PLANT_ITEMS_DEF].sort(()=>Math.random()-.5).slice(0,6).map((i,idx)=>({...i,idx,used:false}));
}

function renderPlantBelt(items){
  const track=$('plant-belt-track');if(!track)return;
  if(!window._plantBeltItems||window._plantBeltItems.length===0){
    window._plantBeltItems=items||shuffleItems();
  }
  track.innerHTML='';
  window._plantBeltItems.forEach((item,i)=>{
    const div=document.createElement('div');
    div.className='plant-item'+(item.used?' used':'')+(plantSelectedItem===i?' selected':'');
    div.innerHTML=`${item.icon}<span class="plant-item-name">${item.name}</span>`;
    div.onclick=()=>plantPickItem(i);
    track.appendChild(div);
  });
  const hint=$('plant-sel-hint');
  if(hint&&plantSelectedItem!==null){
    const itm=window._plantBeltItems[plantSelectedItem];
    hint.textContent=`— ${itm.icon} ${itm.name} seleccionada · Toca un pedido para asignar`;
    hint.style.color='rgba(249,115,22,.8)';
  }
}

function plantPickItem(i){
  const items=window._plantBeltItems;if(!items)return;
  const item=items[i];if(item.used)return;
  if(plantSelectedItem===i){plantSelectedItem=null;}
  else{plantSelectedItem=i;vibrate(15);}
  renderPlantBelt();
  renderPlantOrders();
}

function renderPlantOrders(){
  const wrap=$('plant-orders-wrap');if(!wrap)return;
  wrap.innerHTML='';
  plantOrders.forEach((ord,oi)=>{
    const div=document.createElement('div');
    div.className='plant-order'+(ord.done?' done-ord':ord.urgency?' urgent-ord':'');
    const stepsHtml=ord.steps.map((s,si)=>`<span class="plant-step${si<ord.progress?' done-step':si===ord.progress?' ':''}">${s}</span>`).join('');
    div.innerHTML=`<div class="plant-order-head">${ord.icon} ${ord.label}</div>
      <div class="plant-order-steps">${stepsHtml}</div>`;
    if(!ord.done){
      div.onclick=()=>plantAssignItem(oi);
      if(plantSelectedItem!==null) div.style.cursor='pointer';
    }
    wrap.appendChild(div);
  });
  // Update deliver button
  const btn=$('plant-deliver-btn');
  if(btn) btn.disabled=!plantOrders.some(o=>!o.done&&o.progress>=o.steps.length);
}

function plantAssignItem(orderIdx){
  if(plantSelectedItem===null)return;
  const items=window._plantBeltItems;
  const item=items[plantSelectedItem];
  const ord=plantOrders[orderIdx];
  if(!ord||ord.done)return;
  const needed=ord.steps[ord.progress];
  const box=$('gamebox');
  if(item.icon===needed){
    ord.progress++;
    item.used=true;
    plantSelectedItem=null;
    plantScore+=15;
    vibrate(30);
    spawnParticles(box,['✅','⭐','⚙️'],4);
    showGameToast(box,'¡Paso correcto! +15 pts 🎯');
    if(ord.progress>=ord.steps.length){
      showGameToast(box,'¡Pedido listo para entregar! 📦');
      vibrate([20,10,40]);
    }
    const btn=$('plant-deliver-btn');
    if(btn) btn.disabled=!plantOrders.some(o=>!o.done&&o.progress>=o.steps.length);
  }else{
    showGameToast(box,'Ese no es el siguiente paso 👀 — revisa el pedido');
    plantSelectedItem=null;
    item.used=false;
  }
  renderPlantBelt();
  renderPlantOrders();
}

function renderPlantEvents(){
  const wrap=$('plant-events-wrap');if(!wrap)return;
  wrap.innerHTML='';
  plantEvents.forEach((ev,i)=>{
    const div=document.createElement('div');
    div.className='plant-event'+(ev.active?' active-event':ev.solved?' solved':' blocked');
    div.innerHTML=`
      ${ev.active?`<div class="plant-event-alert">${ev.alert}</div>`:''}
      <div class="plant-event-icon">${ev.solved?'✅':ev.icon}</div>
      <div class="plant-event-name">${ev.solved?'Resuelto':ev.name}</div>
      <div class="plant-event-action">${ev.action}</div>
    `;
    if(ev.active) div.onclick=()=>plantResolveEvent(i);
    wrap.appendChild(div);
  });
}

function plantResolveEvent(i){
  const ev=plantEvents[i];if(!ev||!ev.active)return;
  ev.active=false;ev.solved=true;
  plantScore+=25;
  vibrate([40,15,60]);
  const box=$('gamebox');
  spawnParticles(box,['⭐','🚀','💡','✅'],6);
  const msgs=['¡Producción optimizada! ⚙️','¡Buen trabajo coordinando procesos!','¡La línea sigue funcionando! 🚀','¡Resolviste el problema rápidamente!'];
  showGameToast(box,msgs[i%msgs.length]+' +25 pts');
  renderPlantEvents();
  // Animate score
  const sp=$('plant-timer');
  if(sp){sp.style.transform='scale(1.15)';setTimeout(()=>sp.style.transform='',300);}
}

function plantDeliver(){
  const readyOrd=plantOrders.find(o=>!o.done&&o.progress>=o.steps.length);
  if(!readyOrd)return;
  readyOrd.done=true;plantDone++;
  plantScore+=50;
  const box=$('gamebox');
  spawnParticles(box,['📦','🚀','⭐','🏆','🎉'],10);
  vibrate([60,20,60]);
  const urgBonus=readyOrd.urgency?20:0;
  if(urgBonus)plantScore+=urgBonus;
  showGameToast(box,'¡Pedido entregado! +50 pts'+(urgBonus?' +20 urgencia bonus 🔥':''));
  const btn=$('plant-deliver-btn');
  if(btn) btn.disabled=!plantOrders.some(o=>!o.done&&o.progress>=o.steps.length);
  renderPlantOrders();
  if(plantDone>=plantOrders.length){clearInterval(plantTimer);setTimeout(showPRODEnd,800);}
}

function showPRODEnd(){
  clearInterval(plantTimer);
  const box=$('gamebox');if(!box)return;
  const allDone=plantDone>=plantOrders.length;
  const msg=plantScore<60?'¡Sigue practicando! Cada turno eres más eficiente 💪'
    :plantScore<120?'¡Buen flujo de producción! Tienes potencial industrial 👏'
    :'¡Fábrica súper eficiente! Naciste para optimizar procesos 🏭🚀';
  box.innerHTML=`<div style="text-align:center;padding:24px 16px" class="particle-wrap">
    <div style="font-size:64px;margin-bottom:12px;animation:float 3s ease-in-out infinite">${allDone?'🏆':'🏭'}</div>
    <h3 style="font-family:'Bebas Neue';font-size:32px;letter-spacing:3px;color:var(--cc);margin-bottom:8px">TURNO TERMINADO</h3>
    <div class="gfinal"><div class="gfscore">${plantScore}</div>
    <p style="font-size:15px;color:var(--lt);margin:8px 0 4px">${msg}</p>
    <p style="font-size:13px;opacity:.5;margin-bottom:20px">${allDone?'🏆 ¡Completaste todos los pedidos!':'¡'+plantDone+' de '+plantOrders.length+' pedidos entregados!'}</p>
    <button class="greset" onclick="showPRODIntro()">↺ Jugar de nuevo</button></div>
  </div>`;
  spawnParticles(box,['🏭','⚙️','📦'],8);
}

/* ============================================================
   ███████████████████████████████████████████████████████████
   GAME: PROGRAMACIÓN — "Automatiza el Sistema"
   Inspirado en Human Resource Machine / Mini Metro
   ███████████████████████████████████████████████████████████
============================================================ */
const AUTO_LEVELS=[
  {
    id:1,title:'Nivel 1 — Clasifica colores',
    desc:'Llegan paquetes de colores. Crea una regla: si el paquete es de ese color, envíalo a la ruta correcta.',
    packets:[
      {icon:'📦',color:'🔴',label:'Rojo',id:'p1'},{icon:'📦',color:'🔵',label:'Azul',id:'p2'},
      {icon:'📦',color:'🔴',label:'Rojo',id:'p3'},{icon:'📦',color:'🔵',label:'Azul',id:'p4'},
    ],
    conditions:[{id:'rojo',icon:'🔴',label:'Rojo'},{id:'azul',icon:'🔵',label:'Azul'}],
    routes:[
      {id:'izq',icon:'⬅️',label:'Izquierda',emoji:'🏭'},
      {id:'der',icon:'➡️',label:'Derecha',emoji:'📦'},
    ],
    correctRules:[{cond:'rojo',route:'izq'},{cond:'azul',route:'der'}],
    successMsg:'¡Sistema clasificado! 🎯 Así funciona el código condicional: SI → ENTONCES.',
    hint:'Crea dos reglas: una para rojo → izquierda, otra para azul → derecha.',
  },
  {
    id:2,title:'Nivel 2 — Formas y rutas',
    desc:'Ahora los paquetes tienen formas. ¡El sistema necesita más reglas!',
    packets:[
      {icon:'⭐',color:'⭐',label:'Estrella',id:'p1'},{icon:'🔺',color:'🔺',label:'Triángulo',id:'p2'},
      {icon:'⭐',color:'⭐',label:'Estrella',id:'p3'},{icon:'⬜',color:'⬜',label:'Cuadrado',id:'p4'},
      {icon:'🔺',color:'🔺',label:'Triángulo',id:'p5'},
    ],
    conditions:[{id:'estrella',icon:'⭐',label:'Estrella'},{id:'triangulo',icon:'🔺',label:'Triángulo'},{id:'cuadrado',icon:'⬜',label:'Cuadrado'}],
    routes:[
      {id:'arriba',icon:'⬆️',label:'Arriba',emoji:'🚀'},
      {id:'abajo',icon:'⬇️',label:'Abajo',emoji:'📥'},
      {id:'reciclaje',icon:'♻️',label:'Reciclaje',emoji:'♻️'},
    ],
    correctRules:[{cond:'estrella',route:'arriba'},{cond:'triangulo',route:'abajo'},{cond:'cuadrado',route:'reciclaje'}],
    successMsg:'¡Clasificación múltiple completada! 🧠 Programar es eso: crear lógica para cada caso.',
    hint:'Crea una regla para cada forma. Estrella → Arriba, Triángulo → Abajo, Cuadrado → Reciclaje.',
  },
  {
    id:3,title:'Nivel 3 — Prioridad y velocidad',
    desc:'Algunos paquetes son urgentes 🚨. Haz que vayan al carril rápido automáticamente.',
    packets:[
      {icon:'📦',color:'normal',label:'Normal',id:'p1'},{icon:'🚨',color:'urgente',label:'Urgente',id:'p2'},
      {icon:'📦',color:'normal',label:'Normal',id:'p3'},{icon:'🚨',color:'urgente',label:'Urgente',id:'p4'},
      {icon:'📦',color:'normal',label:'Normal',id:'p5'},{icon:'🚨',color:'urgente',label:'Urgente',id:'p6'},
    ],
    conditions:[{id:'urgente',icon:'🚨',label:'Urgente'},{id:'normal',icon:'📦',label:'Normal'}],
    routes:[
      {id:'rapido',icon:'⚡',label:'Carril rápido',emoji:'🚀'},
      {id:'estandar',icon:'🚛',label:'Estándar',emoji:'📦'},
    ],
    correctRules:[{cond:'urgente',route:'rapido'},{cond:'normal',route:'estandar'}],
    successMsg:'¡Automatización completada! ⚡ Pensaste como un programador que optimiza procesos.',
    hint:'Crea dos reglas: urgente → carril rápido, normal → estándar.',
  },
];

let autoLvl=0,autoRules=[],autoPickedCond=null,autoPickedRoute=null,autoScore=0;

function showAUTOIntro(){
  const box=$('gamebox');if(!box)return;
  box.innerHTML=`
  <div class="game-intro">
    <div class="game-intro-icon">🤖</div>
    <div class="game-intro-title">Automatiza el Sistema</div>
    <div class="game-intro-desc">Crea reglas visuales para que el sistema clasifique paquetes automáticamente. Sin escribir código — solo lógica visual.</div>
    <div class="game-intro-meta">
      <div class="game-intro-pill">🧠 3 niveles</div>
      <div class="game-intro-pill">👆 Sin código</div>
      <div class="game-intro-pill">⚡ Lógica pura</div>
    </div>
    <button class="game-start-btn" onclick="initAUTO()">💻 INICIAR EXPERIENCIA</button>
  </div>`;
}

function initAUTO(){
  autoLvl=0;autoScore=0;startAutoLevel();
}

function startAutoLevel(){
  autoRules=[];autoPickedCond=null;autoPickedRoute=null;
  renderAUTO();
}

function renderAUTO(){
  /* NOTE: Esta función es sobreescrita más abajo por la versión con globalBtnsHTML.
     Se mantiene como fallback por si el override no se carga. */
  const box=$('gamebox');if(!box)return;
  gCurrentGame='prog';
  const lvl=AUTO_LEVELS[autoLvl];
  const pct=Math.round((autoLvl/AUTO_LEVELS.length)*100);
  const stars='⭐'.repeat(autoLvl)+'☆'.repeat(AUTO_LEVELS.length-autoLvl);
  box.innerHTML=`
  <div class="auto-game particle-wrap">
    ${globalBtnsHTML('prog')}
    <div class="game-hud">
      <span class="game-hud-level">NV ${lvl.id}</span>
      <div class="game-hud-bar"><div class="game-hud-fill" style="width:${pct}%"></div></div>
      <span class="game-hud-stars">${stars}</span>
    </div>
    <div style="font-size:13px;color:rgba(255,255,255,.5);margin-bottom:12px;">${lvl.desc}</div>

    <div class="auto-conveyor">
      <div class="auto-conv-label">📥 Paquetes entrantes <span>Tap para inspeccionar</span></div>
      <div class="auto-queue" id="auto-queue"></div>
    </div>

    <div class="auto-conditions">
      <div class="auto-cond-label">1 · Selecciona la CONDICIÓN (SI…)</div>
      <div class="auto-cond-row" id="auto-conds"></div>
    </div>

    <div class="auto-conditions" style="margin-bottom:12px;">
      <div class="auto-cond-label">2 · Selecciona la RUTA (…ENTONCES enviar a)</div>
      <div class="auto-routes" id="auto-routes"></div>
    </div>

    <button class="auto-add-btn" id="auto-add-btn" onclick="autoAddRule()" disabled>➕ Agregar esta regla al sistema</button>

    <div class="auto-rule-builder">
      <div class="auto-rule-title">📋 Reglas del sistema — ${autoRules.length} regla(s) creadas</div>
      <div class="auto-rule-list" id="auto-rule-list"></div>
    </div>

    <button class="auto-run-btn" id="auto-run-btn" onclick="autoExecute()" ${autoRules.length===0?'disabled':''}>▶ Ejecutar sistema</button>

    <div class="auto-result" id="auto-result">
      <div class="auto-result-icon" id="auto-res-icon"></div>
      <div class="auto-result-text" id="auto-res-text"></div>
    </div>

    <div class="game-toast"></div>
  </div>`;
  renderAutoQueue();
  renderAutoConds();
  renderAutoRoutes();
  renderAutoRules();
}

function renderAutoQueue(){
  const wrap=$('auto-queue');if(!wrap)return;
  const lvl=AUTO_LEVELS[autoLvl];
  wrap.innerHTML='<div class="auto-queue-label">COLA:</div>';
  lvl.packets.forEach((pkt,i)=>{
    const div=document.createElement('div');
    // Pick border color based on condition color
    const colors={'🔴':'rgba(239,68,68,.6)','🔵':'rgba(59,130,246,.6)',
      '⭐':'rgba(251,191,36,.6)','🔺':'rgba(249,115,22,.6)',
      '⬜':'rgba(255,255,255,.3)','urgente':'rgba(239,68,68,.6)','normal':'rgba(99,102,241,.4)'};
    const bc=colors[pkt.color]||'rgba(139,92,246,.4)';
    div.className='auto-packet';
    div.style.borderColor=bc;
    div.style.background=bc.replace('.6)','.08)').replace('.4)','.06)');
    div.innerHTML=`<span style="font-size:22px">${pkt.icon}</span>
      <span class="auto-packet-tag">${pkt.label}</span>`;
    div.title=pkt.label;
    wrap.appendChild(div);
  });
}

function renderAutoConds(){
  const wrap=$('auto-conds');if(!wrap)return;
  const lvl=AUTO_LEVELS[autoLvl];
  wrap.innerHTML='';
  lvl.conditions.forEach(c=>{
    const btn=document.createElement('button');
    btn.className='auto-cond-btn'+(autoPickedCond===c.id?' picked':'');
    btn.innerHTML=`${c.icon} <span>${c.label}</span>`;
    btn.onclick=()=>{autoPickedCond=autoPickedCond===c.id?null:c.id;vibrate(10);renderAutoConds();updateAutoAddBtn();};
    wrap.appendChild(btn);
  });
}

function renderAutoRoutes(){
  const wrap=$('auto-routes');if(!wrap)return;
  const lvl=AUTO_LEVELS[autoLvl];
  wrap.innerHTML='';
  lvl.routes.forEach(r=>{
    const btn=document.createElement('div');
    btn.className='auto-route-btn'+(autoPickedRoute===r.id?' picked':'');
    btn.innerHTML=`<div class="auto-route-icon">${r.icon}</div><div class="auto-route-label">${r.label}</div>`;
    btn.onclick=()=>{autoPickedRoute=autoPickedRoute===r.id?null:r.id;vibrate(10);renderAutoRoutes();updateAutoAddBtn();};
    wrap.appendChild(btn);
  });
}

function updateAutoAddBtn(){
  const btn=$('auto-add-btn');if(!btn)return;
  btn.disabled=!(autoPickedCond&&autoPickedRoute);
}

function autoAddRule(){
  if(!autoPickedCond||!autoPickedRoute)return;
  const lvl=AUTO_LEVELS[autoLvl];
  // Check if rule for this cond already exists
  const exists=autoRules.find(r=>r.cond===autoPickedCond);
  if(exists){
    showGameToast($('gamebox'),'Ya tienes una regla para esa condición — bórrala primero 👆');
    return;
  }
  const cond=lvl.conditions.find(c=>c.id===autoPickedCond);
  const route=lvl.routes.find(r=>r.id===autoPickedRoute);
  autoRules.push({cond:autoPickedCond,route:autoPickedRoute,condLabel:cond.label,condIcon:cond.icon,routeLabel:route.label,routeIcon:route.icon});
  autoPickedCond=null;autoPickedRoute=null;
  vibrate(20);
  showGameToast($('gamebox'),'¡Regla creada! '+cond.icon+' → '+route.icon);
  renderAutoConds();renderAutoRoutes();renderAutoRules();
  updateAutoAddBtn();
  const runBtn=$('auto-run-btn');if(runBtn)runBtn.disabled=false;
}

function autoRemoveRule(idx){
  autoRules.splice(idx,1);
  renderAutoRules();
  const runBtn=$('auto-run-btn');if(runBtn)runBtn.disabled=autoRules.length===0;
}

function renderAutoRules(){
  const wrap=$('auto-rule-list');if(!wrap)return;
  if(autoRules.length===0){
    wrap.innerHTML='<div class="auto-empty-rules">Aún no hay reglas — crea la primera arriba ↑</div>';
    return;
  }
  wrap.innerHTML='';
  autoRules.forEach((rule,i)=>{
    const div=document.createElement('div');
    div.className='auto-rule';
    div.innerHTML=`
      <span class="auto-rule-if">SI</span>
      <div class="auto-rule-cond">${rule.condIcon} <span>${rule.condLabel}</span></div>
      <span class="auto-rule-arrow">→</span>
      <span class="auto-rule-then">ENVIAR A</span>
      <button class="auto-rule-action" onclick="autoRouteFlash(${i})">${rule.routeIcon} ${rule.routeLabel}</button>
      <button class="auto-rule-del" onclick="autoRemoveRule(${i})" title="Eliminar regla">✕</button>
    `;
    wrap.appendChild(div);
  });
  // Update title
  const rb=document.querySelector('.auto-rule-builder .auto-rule-title');
  if(rb)rb.textContent=`📋 Reglas del sistema — ${autoRules.length} regla(s) creadas`;
}

function autoRouteFlash(i){vibrate(10);}

async function autoExecute(){
  const lvl=AUTO_LEVELS[autoLvl];
  const box=$('gamebox');
  const runBtn=$('auto-run-btn');
  if(runBtn){runBtn.disabled=true;runBtn.textContent='⏳ Procesando...';}

  // Simulate packets being processed
  const queue=document.querySelectorAll('.auto-packet');
  let correct=0,total=lvl.packets.length;

  for(let i=0;i<lvl.packets.length;i++){
    const pkt=lvl.packets[i];
    const rule=autoRules.find(r=>r.cond===pkt.color||r.cond===pkt.label.toLowerCase()||
      (r.cond==='urgente'&&pkt.color==='urgente')||(r.cond==='normal'&&pkt.color==='normal'));
    await sleep(180);
    if(queue[i]){
      queue[i].classList.add('processed');
      // Check correctness
      const correctRule=lvl.correctRules.find(cr=>cr.cond===pkt.color||cr.cond===pkt.label.toLowerCase()||
        (cr.cond==='urgente'&&pkt.color==='urgente')||(cr.cond==='normal'&&pkt.color==='normal'));
      if(rule&&correctRule&&rule.route===correctRule.route) correct++;
    }
  }

  const pct=Math.round((correct/total)*100);
  const isWin=pct>=100||autoRules.length>=lvl.correctRules.length&&
    lvl.correctRules.every(cr=>autoRules.find(r=>r.cond===cr.cond&&r.route===cr.route));

  const res=$('auto-result');
  if(res){
    res.style.display='block';
    if(isWin){
      res.className='auto-result';
      res.innerHTML=`<div class="auto-result-icon">✅</div>
        <div class="auto-result-text">${lvl.successMsg}</div>`;
      spawnParticles(box,['⭐','💡','🚀','🔥'],10);
      vibrate([60,20,80]);
      setTimeout(()=>{
        autoLvl++;autoScore+=100;
        if(autoLvl>=AUTO_LEVELS.length) showAUTOEnd();
        else startAutoLevel();
      },2000);
    }else{
      res.className='auto-result err';
      res.innerHTML=`<div class="auto-result-icon">💡</div>
        <div class="auto-result-text">¡Casi! Revisa tus reglas — pista: "${lvl.hint}"</div>`;
      if(runBtn){runBtn.disabled=false;runBtn.textContent='▶ Ejecutar sistema';}
    }
  }
}

function showAUTOEnd(){
  const box=$('gamebox');if(!box)return;
  box.innerHTML=`<div style="text-align:center;padding:24px 16px" class="particle-wrap">
    <div style="font-size:64px;margin-bottom:12px;animation:float 3s ease-in-out infinite">🤖</div>
    <h3 style="font-family:'Bebas Neue';font-size:32px;letter-spacing:3px;color:var(--cc);margin-bottom:8px">¡SISTEMA AUTOMATIZADO!</h3>
    <div class="game-hud-stars" style="font-size:28px;letter-spacing:4px;margin-bottom:12px;">⭐⭐⭐</div>
    <div class="gfinal">
      <div class="gfscore">${autoScore}</div>
      <p style="font-size:15px;color:var(--lt);margin:8px 0 4px">Creaste reglas lógicas, automatizaste rutas y optimizaste el sistema.</p>
      <p style="font-size:13px;opacity:.45;margin-bottom:20px">Eso mismo hacen los desarrolladores todos los días — sin escribir código, solo con lógica.</p>
      <button class="greset" onclick="showAUTOIntro()">↺ Jugar de nuevo</button>
    </div>
  </div>`;
  spawnParticles(box,['💻','⭐','🚀','🤖'],10);
  vibrate([60,30,60,30,80]);
}

/* ============================================================
   ███████████████████████████████████████████████████████████
   GAME: QUÍMICA — "Laboratorio de Reacciones"
   Reactivos REALES con fórmulas químicas
   ███████████████████████████████████████████████████████████
============================================================ */
const LAB_REACTIVES=[
  {id:'vinagre',icon:'🍶',name:'Vinagre',formula:'CH₃COOH',color:'rgba(251,191,36,.25)',
   desc:'Ácido acético. Usado en cocina y experimentos ácido-base.'},
  {id:'bicarb',icon:'🧂',name:'Bicarbonato',formula:'NaHCO₃',color:'rgba(255,255,255,.15)',
   desc:'Base suave. Reacciona efervescentemente con ácidos.'},
  {id:'h2o2',icon:'💧',name:'Agua oxigenada',formula:'H₂O₂',color:'rgba(6,182,212,.25)',
   desc:'Oxidante potente. Usada como antiséptico y blanqueador.'},
  {id:'sal',icon:'🧂',name:'Sal',formula:'NaCl',color:'rgba(255,255,255,.2)',
   desc:'Cloruro de sodio. El electrolito más común en la naturaleza.'},
  {id:'aceite',icon:'🫙',name:'Aceite',formula:'C₁₈H₃₄O₂',color:'rgba(251,191,36,.2)',
   desc:'Lípido no polar. Inmiscible con agua — demuestra polaridad.'},
  {id:'limon',icon:'🍋',name:'Jugo de limón',formula:'C₆H₈O₇',color:'rgba(234,179,8,.25)',
   desc:'Ácido cítrico. pH≈2, excelente indicador natural.'},
];
const LAB_REACTIONS=[
  {
    a:'vinagre',b:'bicarb',
    name:'¡Efervescencia!',emoji:'🫧',rare:false,
    desc:'El ácido acético reacciona con el bicarbonato liberando CO₂. ¡Eso es una reacción ácido-base!',
    formula:'CH₃COOH + NaHCO₃ → CO₂ + H₂O',
    visual:'bubbles',color:'rgba(34,197,94,.35)',
    toast:'¡Se liberó dióxido de carbono! 🚀',
  },
  {
    a:'vinagre',b:'aceite',
    name:'¡Separación de fases!',emoji:'🫥',rare:false,
    desc:'El vinagre (polar) y el aceite (no polar) no se mezclan. ¡Así funciona una centrífuga!',
    formula:'CH₃COOH + C₁₈H₃₄O₂ → 2 fases separadas',
    visual:'layers',color:'rgba(251,191,36,.3)',
    toast:'No todas las sustancias se mezclan 😮',
  },
  {
    a:'bicarb',b:'limon',
    name:'¡Reacción ácido fuerte!',emoji:'💥',rare:true,
    desc:'El ácido cítrico y el bicarbonato producen efervescencia intensa. ¡Igual que las pastillas efervescentes!',
    formula:'NaHCO₃ + C₆H₈O₇ → CO₂ + H₂O + sales',
    visual:'bubbles_intense',color:'rgba(239,68,68,.35)',
    toast:'¡Reacción efervescente intensa detectada! 🔥',
  },
  {
    a:'aceite',b:'limon',
    name:'¡Emulsión temporal!',emoji:'🌀',rare:false,
    desc:'Al agitar, el jugo de limón emulsiona brevemente el aceite. ¡Así se hace la mayonesa!',
    formula:'Emulsificación temporal → vinagreta',
    visual:'swirl',color:'rgba(6,182,212,.3)',
    toast:'¡Se formó una emulsión momentánea! 🌀',
  },
  {
    a:'sal',b:'agua',
    name:'¡Solución salina!',emoji:'💧',rare:false,
    desc:'La sal se disuelve en agua formando iones Na⁺ y Cl⁻. ¡Así funciona el suero fisiológico!',
    formula:'NaCl → Na⁺ + Cl⁻ (en solución)',
    visual:'dissolve',color:'rgba(6,182,212,.25)',
    toast:'¡Disolución iónica completa! 💧',
  },
  {
    a:'h2o2',b:'sal',
    name:'¡Oxidación lenta!',emoji:'⚗️',rare:false,
    desc:'El agua oxigenada con sal ionizada crea una solución oxidante usada en laboratorios.',
    formula:'H₂O₂ + NaCl → solución oxidante',
    visual:'glow',color:'rgba(139,92,246,.3)',
    toast:'¡Reacción de oxidación lenta! ⚗️',
  },
  {
    a:'limon',b:'sal',
    name:'¡Ácido salino!',emoji:'🧪',rare:false,
    desc:'La combinación del ácido cítrico con la sal crea un limpiador natural efectivo.',
    formula:'C₆H₈O₇ + NaCl → limpiador natural',
    visual:'fizz',color:'rgba(34,197,94,.2)',
    toast:'¡Mezcla limpiadora natural creada! 🧪',
  },
  {
    a:'vinagre',b:'limon',
    name:'¡Mezcla ácida!',emoji:'⚡',rare:false,
    desc:'Dos ácidos juntos no reaccionan entre sí pero crean una solución muy ácida. pH < 2.',
    formula:'CH₃COOH + C₆H₈O₇ → solución pH<2',
    visual:'acid',color:'rgba(251,191,36,.3)',
    toast:'¡Solución ácida concentrada! Mucho pH bajo ⚡',
  },
  {
    a:'h2o2',b:'bicarb',
    name:'¡Reacción rara!',emoji:'🌟',rare:true,
    desc:'El agua oxigenada con bicarbonato libera oxígeno y crea una solución limpiadora potente.',
    formula:'H₂O₂ + NaHCO₃ → O₂ + H₂O + Na⁺',
    visual:'bubbles_intense',color:'rgba(251,191,36,.4)',
    toast:'🌟 ¡Reacción rara descubierta! O₂ liberado',
  },
  {
    a:'h2o2',b:'limon',
    name:'¡Blanqueador natural!',emoji:'✨',rare:false,
    desc:'El agua oxigenada activada con ácido cítrico es el blanqueador ecológico que usan los laboratorios.',
    formula:'H₂O₂ + C₆H₈O₇ → blanqueador activado',
    visual:'glow',color:'rgba(255,255,255,.3)',
    toast:'¡Blanqueador natural activado! ✨',
  },
];
// Add virtual 'agua' reactive for some reactions
const LAB_ALL=[...LAB_REACTIVES,{id:'agua',icon:'💧',name:'Agua',formula:'H₂O',color:'rgba(6,182,212,.2)',desc:'El disolvente universal. Polar, actúa como ácido o base.'}];

let labSel=[null,null],labFound=new Set();

function showCHEMIntro(){
  const box=$('gamebox');if(!box)return;
  box.innerHTML=`
  <div class="game-intro">
    <div class="game-intro-icon">🧪</div>
    <div class="game-intro-title">Laboratorio de Reacciones</div>
    <div class="game-intro-desc">Mezcla reactivos reales y descubre qué ocurre. Vinagre, bicarbonato, agua oxigenada y más. ¿Cuántas reacciones puedes descubrir?</div>
    <div class="game-intro-meta">
      <div class="game-intro-pill">🔬 6 reactivos</div>
      <div class="game-intro-pill">💥 10 reacciones</div>
      <div class="game-intro-pill">🌟 2 raras</div>
    </div>
    <button class="game-start-btn" onclick="initCHEM()">🧪 INICIAR EXPERIENCIA</button>
  </div>`;
}

function initCHEM(){
  labSel=[null,null];labFound=new Set();renderCHEM();
}

function renderCHEM(){
  const box=$('gamebox');if(!box)return;
  const pct=Math.round((labFound.size/LAB_REACTIONS.length)*100);
  box.innerHTML=`
  <div class="lab-game particle-wrap">
    <div class="game-hud">
      <span class="game-hud-level">🧪 LAB</span>
      <div class="game-hud-bar"><div class="game-hud-fill" style="width:${pct}%"></div></div>
      <span style="font-size:13px;color:rgba(255,255,255,.4)">${labFound.size}/${LAB_REACTIONS.length} reacciones</span>
    </div>

    <div class="lab-shelf">
      <div class="lab-shelf-label">🔬 Reactivos disponibles — toca para seleccionar (máx. 2)</div>
      <div class="lab-reactives" id="lab-reactives"></div>
    </div>

    <div class="lab-mixer">
      <div class="lab-mixer-top">
        <div class="lab-flask" id="lab-flask">
          <div class="lab-liquid" id="lab-liquid"></div>
          <span class="lab-flask-icon" id="lab-flask-icon">⚗️</span>
        </div>
        <div class="lab-mix-info">
          <div class="lab-mix-label" id="lab-mix-label">Selecciona 2 reactivos para mezclar</div>
          <div class="lab-mix-slots">
            <div class="lab-slot" id="lab-slot0"></div>
            <div class="lab-slot-plus">+</div>
            <div class="lab-slot" id="lab-slot1"></div>
          </div>
        </div>
      </div>
      <button class="lab-mix-btn" id="lab-mix-btn" onclick="labMix()" disabled>🔬 Mezclar y observar</button>
      <button class="lab-clear-btn" onclick="labClear()">✕ Limpiar selección</button>
    </div>

    <div class="lab-reaction" id="lab-reaction"></div>

    <div class="lab-discoveries">
      <div class="lab-disc-label">Descubrimientos <span>${labFound.size}/${LAB_REACTIONS.length}</span></div>
      <div class="lab-disc-grid" id="lab-disc-grid"></div>
    </div>

    <div class="game-toast"></div>
  </div>`;
  renderLabReactives();
  renderLabDiscoveries();
}

function renderLabReactives(){
  const wrap=$('lab-reactives');if(!wrap)return;
  wrap.innerHTML='';
  LAB_REACTIVES.forEach(r=>{
    const div=document.createElement('div');
    const selIdx=labSel.indexOf(r.id);
    div.className='lab-reactive'+(selIdx===0?' sel1':selIdx===1?' sel2':'');
    div.innerHTML=`
      <div class="lab-tooltip">
        <strong>${r.icon} ${r.name}</strong>
        <small>${r.formula}</small>
        <span>${r.desc}</span>
      </div>
      <div class="lab-reactive-icon">${r.icon}</div>
      <div class="lab-reactive-name">${r.name}</div>
      <div class="lab-reactive-formula">${r.formula}</div>
    `;
    div.onclick=()=>labSelect(r.id);
    wrap.appendChild(div);
  });
}

function labSelect(id){
  if(labSel[0]===id){labSel[0]=null;}
  else if(labSel[1]===id){labSel[1]=null;}
  else if(!labSel[0]){labSel[0]=id;vibrate(10);}
  else if(!labSel[1]){labSel[1]=id;vibrate(10);}
  else{labSel=[id,null];}
  updateLabSlots();
  renderLabReactives();
}

function updateLabSlots(){
  const r0=LAB_REACTIVES.find(r=>r.id===labSel[0]);
  const r1=LAB_REACTIVES.find(r=>r.id===labSel[1]);
  const s0=$('lab-slot0'),s1=$('lab-slot1'),btn=$('lab-mix-btn');
  const lbl=$('lab-mix-label'),flask=$('lab-flask'),fi=$('lab-flask-icon');
  if(s0){s0.innerHTML=r0?r0.icon:'';s0.className='lab-slot'+(r0?' filled-a':'');}
  if(s1){s1.innerHTML=r1?r1.icon:'';s1.className='lab-slot'+(r1?' filled-b':'');}
  if(btn)btn.disabled=!(r0&&r1);
  if(lbl){
    if(r0&&r1){lbl.textContent=r0.name+' + '+r1.name;}
    else if(r0){lbl.textContent=r0.name+' + ?';}
    else{lbl.textContent='Selecciona 2 reactivos para mezclar';}
  }
  if(flask&&fi){
    if(r0&&r1){flask.classList.add('mixing');fi.textContent='🔬';}
    else{flask.classList.remove('mixing');fi.textContent='⚗️';}
  }
  // Change liquid color
  const liq=$('lab-liquid');
  if(liq&&r0){liq.style.background=r0.color||'rgba(34,197,94,.25)';}
}

function labClear(){labSel=[null,null];updateLabSlots();renderLabReactives();}

async function labMix(){
  if(!labSel[0]||!labSel[1])return;
  const flask=$('lab-flask'),fi=$('lab-flask-icon');
  if(flask){flask.classList.add('result-anim');fi.textContent='💫';}
  await sleep(300);
  if(flask){flask.classList.remove('mixing','result-anim');}

  const rx=LAB_REACTIONS.find(r=>
    (r.a===labSel[0]&&r.b===labSel[1])||(r.a===labSel[1]&&r.b===labSel[0])
  );
  const reactionDiv=$('lab-reaction');
  const box=$('gamebox');

  if(rx){
    const isNew=!labFound.has(rx.a+'_'+rx.b);
    labFound.add(rx.a+'_'+rx.b);labFound.add(rx.b+'_'+rx.a);
    // Normalize count
    const foundNorm=Math.min(labFound.size/2|0,LAB_REACTIONS.length);

    if(fi)fi.textContent=rx.emoji;
    if(flask){
      flask.style.borderColor=rx.color.replace('.','1.');
      flask.style.boxShadow=`0 0 24px ${rx.color}`;
      setTimeout(()=>{
        flask.style.borderColor='';flask.style.boxShadow='';
        if(fi)fi.textContent='⚗️';
      },1200);
    }

    // Trigger bubble animation
    if(rx.visual==='bubbles'||rx.visual==='bubbles_intense'){
      triggerBubbles(flask,rx.visual==='bubbles_intense'?8:4);
    }

    if(reactionDiv){
      reactionDiv.className='lab-reaction visible '+(rx.rare?'rare':'positive');
      reactionDiv.innerHTML=`
        <span class="lab-reaction-emoji">${rx.emoji}</span>
        <div class="lab-reaction-name">${isNew?'🆕 ':''}${rx.name}</div>
        <div class="lab-reaction-desc">${rx.desc}</div>
        <div class="lab-reaction-formula">${rx.formula}</div>
      `;
    }
    spawnParticles(box,[rx.emoji,'✨','⭐','💫'],isNew?8:4);
    if(isNew){vibrate([40,20,80]);}
    else{vibrate(20);}
    showGameToast(box,rx.rare?'🌟 '+rx.toast:rx.toast);
    renderLabDiscoveries();
    if(labFound.size/2>=LAB_REACTIONS.length) setTimeout(showCHEMEnd,1500);
  }else{
    if(fi)fi.textContent='💨';
    if(flask){
      flask.style.borderColor='rgba(255,255,255,.1)';
      setTimeout(()=>{flask.style.borderColor='';if(fi)fi.textContent='⚗️';},600);
    }
    if(reactionDiv){
      reactionDiv.className='lab-reaction visible neutral';
      reactionDiv.innerHTML=`
        <span class="lab-reaction-emoji">🤔</span>
        <div class="lab-reaction-name">Sin reacción visible</div>
        <div class="lab-reaction-desc">Estas sustancias no reaccionan de manera visible. ¡Prueba otra combinación!</div>
      `;
    }
    showGameToast(box,'Hmm… no reaccionaron. ¡Prueba otra combinación! 🧐');
    vibrate(10);
  }
  labSel=[null,null];updateLabSlots();renderLabReactives();
}

function triggerBubbles(parent,count=5){
  if(!parent)return;
  for(let i=0;i<count;i++){
    const b=document.createElement('div');
    b.className='lab-bubble';
    const size=4+Math.random()*8;
    b.style.cssText=`width:${size}px;height:${size}px;
      left:${20+Math.random()*60}%;bottom:20%;
      animation-delay:${i*0.1}s;animation-duration:${0.6+Math.random()*0.4}s;`;
    parent.appendChild(b);
    setTimeout(()=>b.remove(),1200);
  }
}

function renderLabDiscoveries(){
  const grid=$('lab-disc-grid');if(!grid)return;
  const found=[...labFound];
  const unique=[];
  LAB_REACTIONS.forEach(rx=>{
    if(labFound.has(rx.a+'_'+rx.b)||labFound.has(rx.b+'_'+rx.a)){
      if(!unique.find(u=>u.name===rx.name)) unique.push(rx);
    }
  });
  if(unique.length===0){
    grid.innerHTML='<div class="lab-disc-empty">Aún no hay descubrimientos — ¡experimenta!</div>';
    return;
  }
  grid.innerHTML='';
  unique.forEach(rx=>{
    const div=document.createElement('div');
    div.className='lab-disc-item'+(rx.rare?' rare':'');
    div.innerHTML=`${rx.emoji} ${rx.name.replace('!','').trim()}`;
    grid.appendChild(div);
  });
  // Update counter in HUD
  const pct=Math.round((unique.length/LAB_REACTIONS.length)*100);
  const hbar=document.querySelector('.game-hud-fill');
  if(hbar)hbar.style.width=pct+'%';
  const hcount=document.querySelector('.game-hud span:last-child');
  if(hcount)hcount.textContent=unique.length+'/'+LAB_REACTIONS.length+' reacciones';
  // Update disc label count
  const dlbl=document.querySelector('.lab-disc-label span');
  if(dlbl)dlbl.textContent=unique.length+'/'+LAB_REACTIONS.length;
}

function showCHEMEnd(){
  const box=$('gamebox');if(!box)return;
  box.innerHTML=`<div style="text-align:center;padding:24px 16px" class="particle-wrap">
    <div style="font-size:64px;margin-bottom:12px;animation:float 3s ease-in-out infinite">🏆</div>
    <h3 style="font-family:'Bebas Neue';font-size:32px;letter-spacing:3px;color:var(--cc);margin-bottom:8px">¡TODAS LAS REACCIONES!</h3>
    <div class="gfinal">
      <div class="gfscore">${LAB_REACTIONS.length}/${LAB_REACTIONS.length}</div>
      <p style="font-size:15px;color:var(--lt);margin:8px 0 4px">🧪 Descubriste todas las reacciones. ¡Tienes mente científica!</p>
      <p style="font-size:13px;opacity:.45;margin-bottom:20px">Ese instinto de experimentar y descubrir es exactamente lo que hace un Químico Industrial.</p>
      <button class="greset" onclick="showCHEMIntro()">↺ Jugar de nuevo</button>
    </div>
  </div>`;
  spawnParticles(box,['🧪','⭐','🔬','💥'],10);
  vibrate([60,30,60]);
}

/* ============================================================
   TEST VOCACIONAL
============================================================ */

/* ============================================================
   TEST VOCACIONAL
============================================================ */
const QS=[
  {q:'¿Qué actividad te llama más la atención?',l:'Intereses',opts:[{t:'Armar o reparar maquinaria',i:'🔧',s:{prod:3,quim:0,prog:0}},{t:'Experimentar en laboratorio',i:'⚗️',s:{prod:0,quim:3,prog:0}},{t:'Crear apps o sitios web',i:'💻',s:{prod:0,quim:0,prog:3}},{t:'Organizar y planear procesos',i:'📋',s:{prod:2,quim:1,prog:1}}]},
  {q:'¿Cuál de estos retos te emociona más?',l:'Motivación',opts:[{t:'Optimizar cómo se fabrica un producto',i:'⚙️',s:{prod:3,quim:0,prog:1}},{t:'Analizar la composición de un material',i:'🧬',s:{prod:0,quim:3,prog:0}},{t:'Desarrollar una plataforma digital',i:'🌐',s:{prod:0,quim:0,prog:3}},{t:'Coordinar un equipo hacia un objetivo',i:'🎯',s:{prod:2,quim:1,prog:1}}]},
  {q:'¿En qué ambiente te sentirías mejor?',l:'Entorno ideal',opts:[{t:'Planta industrial con maquinaria',i:'🏭',s:{prod:3,quim:1,prog:0}},{t:'Laboratorio con equipo especializado',i:'🔬',s:{prod:0,quim:3,prog:0}},{t:'Oficina moderna con computadoras',i:'🖥️',s:{prod:0,quim:0,prog:3}},{t:'Área de logística y control',i:'🗂️',s:{prod:2,quim:1,prog:1}}]},
  {q:'¿Cuál de estas frases te representa mejor?',l:'Personalidad',opts:[{t:'Me gustan los resultados concretos',i:'🛠️',s:{prod:3,quim:1,prog:0}},{t:'Quiero entender el por qué de las cosas',i:'🔍',s:{prod:0,quim:3,prog:1}},{t:'Si tiene pantalla, puedo aprenderlo',i:'💡',s:{prod:0,quim:0,prog:3}},{t:'El orden y la precisión son esenciales',i:'📏',s:{prod:2,quim:2,prog:1}}]},
  {q:'¿Qué materia escolar disfrutas más?',l:'Habilidades académicas',opts:[{t:'Física y matemáticas aplicadas',i:'⚡',s:{prod:3,quim:1,prog:2}},{t:'Química y ciencias naturales',i:'🧪',s:{prod:0,quim:3,prog:0}},{t:'Informática y tecnología',i:'💻',s:{prod:0,quim:0,prog:3}},{t:'Dibujo técnico o taller',i:'📐',s:{prod:3,quim:0,prog:1}}]},
  {q:'En un proyecto en equipo, ¿qué rol tomas?',l:'Rol natural',opts:[{t:'El que trabaja con herramientas',i:'👷',s:{prod:3,quim:1,prog:0}},{t:'El que investiga y analiza datos',i:'📊',s:{prod:0,quim:3,prog:1}},{t:'El que diseña la solución digital',i:'⌨️',s:{prod:0,quim:0,prog:3}},{t:'El que organiza el equipo',i:'📌',s:{prod:2,quim:1,prog:1}}]},
  {q:'¿Cuál de estos proyectos te gustaría hacer?',l:'Proyectos ideales',opts:[{t:'Diseñar el ensamblaje de un auto',i:'🚗',s:{prod:3,quim:0,prog:0}},{t:'Analizar la fórmula de un medicamento',i:'💊',s:{prod:0,quim:3,prog:0}},{t:'Crear una app para tu escuela',i:'📱',s:{prod:0,quim:0,prog:3}},{t:'Optimizar tiempos de una fábrica',i:'⏱️',s:{prod:2,quim:2,prog:0}}]},
  {q:'¿Qué herramienta usarías con más entusiasmo?',l:'Afinidad con herramientas',opts:[{t:'Un torno o fresadora CNC',i:'🔩',s:{prod:3,quim:0,prog:0}},{t:'Un espectrómetro de laboratorio',i:'🔬',s:{prod:0,quim:3,prog:0}},{t:'Un editor de código o IDE',i:'⌨️',s:{prod:0,quim:0,prog:3}},{t:'Software de gestión de producción',i:'📦',s:{prod:2,quim:0,prog:2}}]},
];
const MAX=24;
let cQ=0,adv=false;
const SC={prod:0,quim:0,prog:0};
const CTITLES={prod:'Producción Industrial',quim:'Química Industrial',prog:'Programación'};
const CICONS={prod:'⚙️',quim:'⚗️',prog:'💻'};
const CCARDS={prod:'prod',quim:'quim',prog:'prog'};

function buildDots(){
  const c=$('qd');c.innerHTML='';
  QS.forEach((_,i)=>{const d=document.createElement('div');d.className='q-dot'+(i===0?' cur':'');d.id='dot'+i;c.appendChild(d);});
}
function updDots(i){QS.forEach((_,j)=>{const d=$('dot'+j);if(d)d.className='q-dot'+(j<i?' done':j===i?' cur':'');});}

function renderQ(i,anim){
  const q=QS[i];
  const qt=$('qt'),op=$('og');
  if(anim){qt.classList.add('qsi');op.classList.add('qsi');setTimeout(()=>{qt.classList.remove('qsi');op.classList.remove('qsi');},500);}
  $('qc').textContent=`Pregunta ${i+1} de ${QS.length}`;
  $('ql').textContent=q.l;
  $('pf').style.width=((i/QS.length)*100)+'%';
  updDots(i);qt.textContent=q.q;op.innerHTML='';
  q.opts.forEach((opt,oi)=>{
    const c=document.createElement('div');c.className='oc';
    c.innerHTML=`<div class="oi">${opt.i}</div><div class="ot">${opt.t}</div><div class="ock">✓</div>`;
    c.addEventListener('click',()=>selOpt(oi,opt.s));
    op.appendChild(c);
  });
}

function selOpt(i,sm){
  if(adv)return;adv=true;
  document.querySelectorAll('.oc').forEach((c,j)=>{if(j===i)c.classList.add('selected');else c.classList.add('disabled');});
  Object.keys(sm).forEach(k=>SC[k]+=sm[k]);
  setTimeout(()=>{adv=false;cQ++;cQ<QS.length?renderQ(cQ,true):showRes();},750);
}

function startTest(){
  cQ=0;SC.prod=0;SC.quim=0;SC.prog=0;adv=false;
  buildDots();renderQ(0,false);swScr('t-quiz');
}
function restartTest(){SC.prod=0;SC.quim=0;SC.prog=0;swScr('t-intro');}
function swScr(id){document.querySelectorAll('.tscreen').forEach(s=>s.classList.remove('active'));$(id).classList.add('active');}

function showRes(){
  $('pf').style.width='100%';
  const sorted=Object.entries(SC).map(([k,v])=>({key:k,score:v,pct:Math.round((v/MAX)*100)})).sort((a,b)=>b.score-a.score);
  const winner=sorted[0].key;
  document.querySelectorAll('.rbadge').forEach(b=>b.classList.remove('show'));
  $('rb-'+CCARDS[winner]).classList.add('show');
  $('bb').onclick=()=>{
    navTo('#CARRERAS');
    setTimeout(()=>openCareer(winner==='prod'?'produccion':winner==='quim'?'quimica':'programacion'),900);
  };
  const list=$('rl');list.innerHTML='';
  const lvls=['Alta compatibilidad ✦✦✦','Compatibilidad media ✦✦','Baja compatibilidad ✦'];
  sorted.forEach((item,rank)=>{
    const isW=rank===0;
    const card=document.createElement('div');card.className='rcard'+(isW?' winner':'');
    card.innerHTML=`${isW?'<div class="wb">⭐ Mejor opción para ti</div>':''}
      <div class="rct"><div class="ri">${CICONS[item.key]}</div><div><div class="rn">${CTITLES[item.key]}</div><div class="rco">${lvls[rank]}</div></div><div class="rp">${item.pct}%</div></div>
      <div class="rbt"><div class="rbf" id="rb${item.key}"></div></div>`;
    list.appendChild(card);
  });
  swScr('t-results');
  sorted.forEach((item,i)=>setTimeout(()=>{const el=$('rb'+item.key);if(el)el.style.width=item.pct+'%';},200+i*180));
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║  NUEVAS FUNCIONALIDADES v7 — Minijuegos mejorados           ║
   ╚══════════════════════════════════════════════════════════════╝ */

/* ============================================================
   GLOBAL GAME STATE
============================================================ */
let gCurrentGame=null;   // 'prod' | 'chem' | 'prog'
let gHintsUsed=0;
let gSkipsUsed=0;
const G_SKIP_PENALTY=30;

/* ============================================================
   MODAL GENÉRICO — muestra overlay sobre el juego actual
============================================================ */
function showGameModal(innerHTML,id='gmodal'){
  closeGameModal(); // evitar stacking
  const overlay=document.createElement('div');
  overlay.className='gmodal-overlay';
  overlay.id=id;
  overlay.innerHTML=`<div class="gmodal-box">${innerHTML}</div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click',e=>{if(e.target===overlay)closeGameModal(id);});
}
function closeGameModal(id='gmodal'){
  const el=document.getElementById(id);
  if(el)el.remove();
}

/* ============================================================
   TIPS DE AYUDA — 4 tips rotativos por carrera
============================================================ */
const G_HELP_TIPS={
  prod:[
    {icon:'📥',title:'¿Por qué iniciar en Recepción?',body:'La RECEPCIÓN verifica que los materiales sean correctos antes de que entren a la línea. Un defecto que entra en Recepción cuesta 10x más si se detecta al final del proceso.'},
    {icon:'⚙️',title:'Manufactura: el corazón de la fábrica',body:'La MANUFACTURA transforma materia prima en producto. Es la etapa de mayor valor agregado. Sin ella, la empresa no produce, no vende y no existe.'},
    {icon:'🔍',title:'Control de Calidad no es opcional',body:'¡Sin Control de Calidad el producto es defectuoso! Esta etapa garantiza que el cliente reciba exactamente lo que pidió. ISO 9001 lo exige en toda industria.'},
    {icon:'📦',title:'Empaque: la presentación lo es todo',body:'El EMPAQUE protege el producto, comunica la marca y facilita la logística. Es el último paso porque depende de que todo lo anterior esté perfecto.'},
  ],
  chem:[
    {icon:'⚛️',title:'¿Qué es la tabla periódica?',body:'La tabla periódica organiza los 118 elementos conocidos por su número atómico. Cada molécula está hecha de átomos de estos elementos en proporciones EXACTAS definidas por su fórmula.'},
    {icon:'💧',title:'Cómo se forman las moléculas',body:'Las moléculas se forman cuando átomos de distintos elementos se unen mediante enlaces químicos. H₂O = 2 átomos de Hidrógeno + 1 de Oxígeno. El número en la fórmula indica cuántos átomos de ese elemento incluye.'},
    {icon:'🔬',title:'Las proporciones importan MUCHO',body:'Si cambias las proporciones obtienes otra sustancia. H₂O es agua pero H₂O₂ es agua oxigenada. ¡Dos oxígenos hacen una diferencia enorme entre hidratarte y desinfectarte!'},
    {icon:'🧪',title:'Química en la industria',body:'Un Químico Industrial usa estas mismas fórmulas para controlar procesos en plantas de alimentos, farmacéuticas y petroquímicas. Cada producto que consumes pasó por control de fórmulas exactas.'},
  ],
  prog:[
    {icon:'💻',title:'¿Qué es una regla condicional?',body:'Una regla SI → ENTONCES es el corazón del código. En programación se llama "if statement". Así funciona TODO: videojuegos, apps bancarias, redes sociales. Si condición → ejecuta acción.'},
    {icon:'🔀',title:'Rutas = control de flujo',body:'Cuando seleccionas una ruta, estás definiendo "control de flujo". Los programadores diseñan rutas para que los datos vayan exactamente donde deben ir, igual que tú haces ahora.'},
    {icon:'⚡',title:'Automatización real',body:'Cada regla que creas aquí equivale a una línea de código real. Los sistemas de Amazon, FedEx y Mercado Libre usan exactamente este principio para clasificar millones de paquetes al día.'},
    {icon:'🏗️',title:'Múltiples reglas = algoritmo',body:'Cuando varias reglas funcionan juntas has creado un ALGORITMO. Un algoritmo es una secuencia de instrucciones que resuelven un problema. ¡Y acabas de hacer uno sin escribir código!'},
  ],
};
const gHintIdx={prod:0,chem:0,prog:0};

function showHelpModal(game){
  gHintsUsed++;
  const tips=G_HELP_TIPS[game]||G_HELP_TIPS.prod;
  const tip=tips[gHintIdx[game]%tips.length];
  gHintIdx[game]++;
  showGameModal(`
    <button class="gmodal-close" onclick="closeGameModal()">✕</button>
    <span class="gmodal-icon">${tip.icon}</span>
    <div class="gmodal-title">${tip.title}</div>
    <div class="gmodal-body">${tip.body}</div>
    <div class="gmodal-btns">
      <button class="gmodal-btn-primary" onclick="closeGameModal()">¡Entendido! 💡</button>
    </div>
  `);
  vibrate(10);
}

/* ============================================================
   SKIP — confirmación con penalización
============================================================ */
function showSkipModal(game){
  showGameModal(`
    <button class="gmodal-close" onclick="closeGameModal()">✕</button>
    <span class="gmodal-icon">⏭️</span>
    <div class="gmodal-title">¿SALTAR ESTE RETO?</div>
    <div class="gmodal-body">Si saltas, no aprenderás todo el proceso. Tu calificación final bajará.</div>
    <div style="text-align:center;margin-bottom:16px"><span class="gskip-penalty">⚠️ Penalización: −${G_SKIP_PENALTY} puntos</span></div>
    <div class="gmodal-btns">
      <button class="gmodal-btn-secondary" onclick="closeGameModal()">Cancelar — seguir intentando</button>
      <button class="gmodal-btn-danger" onclick="gConfirmSkip('${game}')">Sí, saltar (−${G_SKIP_PENALTY} pts)</button>
    </div>
  `);
}

function gConfirmSkip(game){
  gSkipsUsed++;closeGameModal();vibrate([40,20,40]);
  if(game==='prod'){
    prodSeqScore=Math.max(0,prodSeqScore-G_SKIP_PENALTY);
    prodSeqRound++;prodSeqStep=0;
    if(prodSeqRound>=window._prodSeqTemplates.length)showPRODSeqEnd();
    else renderPRODSeq();
  }else if(game==='chem'){
    chemScore=Math.max(0,chemScore-G_SKIP_PENALTY);
    chemMolIdx++;chemSelectedEls={};
    if(chemMolIdx>=chemActiveMols.length)showCHEMTableEnd();
    else renderCHEMTable();
  }else if(game==='prog'){
    autoScore=Math.max(0,autoScore-G_SKIP_PENALTY);
    autoLvl++;
    if(autoLvl>=AUTO_LEVELS.length)showAUTOEnd();
    else startAutoLevel();
  }
}

/* Barra de botones globales — inyectada en cada juego */
function globalBtnsHTML(game){
  return`<div class="game-global-bar">
    <button class="ghelp-btn" onclick="showHelpModal('${game}')">💡 Ayuda</button>
    <button class="gskip-btn" onclick="showSkipModal('${game}')">⏭️ Saltar</button>
  </div>`;
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║  JUEGO 1: PRODUCCIÓN — Flujo Secuencial Estricto            ║
   ║  4 etapas obligatorias: Recepción → Manufactura →           ║
   ║  Control de Calidad → Empaque                               ║
   ╚══════════════════════════════════════════════════════════════╝ */

/* Definición de etapas con mensajes educativos al fallar */
const PROD_STEPS=[
  {name:'Recepción',    icon:'📥',
   desc:'Verifica materiales entrantes. Sin verificación, los defectos entran a la línea.',
   wrongMsg:'¡Primero debes recibir los materiales! La Recepción verifica que todo llegue correcto antes de fabricar.'},
  {name:'Manufactura',  icon:'⚙️',
   desc:'Transforma la materia prima. Esta es la etapa de mayor valor agregado.',
   wrongMsg:'¡Cuidado! Sin Manufactura no hay producto. Debes fabricar antes de controlar calidad.'},
  {name:'Control de Calidad',icon:'🔍',
   desc:'Inspecciona el producto terminado. Aquí se atrapa cada defecto antes del empaque.',
   wrongMsg:'¡Sin Control de Calidad el producto es defectuoso! ISO 9001 exige esta etapa antes del empaque.'},
  {name:'Empaque',      icon:'📦',
   desc:'Empaca y prepara para envío. Solo cuando todo lo anterior es correcto.',
   wrongMsg:'¡Ya completaste el ciclo! Recuerda: Recepción → Manufactura → Calidad → Empaque.'},
];

/* Plantillas de productos (aleatoriedad entre rondas) */
const PROD_TEMPLATES=[
  {name:'Automóvil',         icon:'🚗',tip:'General Motors Silao produce miles de autos al día con este mismo flujo de 4 etapas.'},
  {name:'Smartphone',        icon:'📱',tip:'Los chips pasan por Recepción antes de entrar a manufactura para evitar fallas en línea.'},
  {name:'Alimento envasado', icon:'🍱',tip:'En la industria alimentaria el Control de Calidad es obligatorio por norma sanitaria NOM-251.'},
  {name:'Circuito electrónico',icon:'💡',tip:'Los PCB tienen tolerancia 0 a defectos — el Control de Calidad es crítico en electrónica.'},
  {name:'Medicamento',       icon:'💊',tip:'La FDA y COFEPRIS exigen las 4 etapas en el orden exacto para aprobar un medicamento.'},
  {name:'Neumático',         icon:'🔘',tip:'Bridgestone y Continental validan materiales en Recepción antes de vulcanizar en Manufactura.'},
];

let prodSeqStep=0,prodSeqRound=0,prodSeqScore=0,prodSeqCorrect=0;

/* showPRODIntro — OVERRIDE del original */
function showPRODIntro(){
  const box=$('gamebox');if(!box)return;
  gCurrentGame='prod';
  box.innerHTML=`
  <div class="game-intro">
    <div class="game-intro-icon">🏭</div>
    <div class="game-intro-title">Línea de Producción</div>
    <div class="game-intro-desc">Sigue el flujo obligatorio de 4 etapas. En una fábrica real, saltarse un paso causa defectos y pérdidas millonarias.</div>
    <div class="game-intro-meta">
      <div class="game-intro-pill">📋 4 etapas</div>
      <div class="game-intro-pill">🔄 Varios productos</div>
      <div class="game-intro-pill">⭐ Orden es clave</div>
    </div>
    <button class="game-start-btn" onclick="initPRODSeq()">⚙️ INICIAR EXPERIENCIA</button>
  </div>`;
}

function initPRODSeq(){
  clearInterval(plantTimer);
  prodSeqStep=0;prodSeqRound=0;prodSeqScore=0;prodSeqCorrect=0;gSkipsUsed=0;
  // Mezcla aleatoria de plantillas, elige 4
  window._prodSeqTemplates=[...PROD_TEMPLATES].sort(()=>Math.random()-.5).slice(0,4);
  renderPRODSeq();
}

/* initPROD — OVERRIDE para apuntar al nuevo juego */
function initPROD(){initPRODSeq();}

function renderPRODSeq(){
  const box=$('gamebox');if(!box)return;
  const tmpl=window._prodSeqTemplates[prodSeqRound];
  const pct=Math.round((prodSeqRound/window._prodSeqTemplates.length)*100);

  /* Chips de progreso de rondas */
  const roundChips=window._prodSeqTemplates.map((t,i)=>`
    <div class="prodseq-chip${i<prodSeqRound?' pc-done':i===prodSeqRound?' pc-active':''}">
      ${i<prodSeqRound?'✅':i===prodSeqRound?'▶':''} ${t.icon} ${t.name}
    </div>`).join('');

  /* Estaciones de producción */
  const stationsHTML=PROD_STEPS.map((s,i)=>{
    const isDone=i<prodSeqStep,isActive=i===prodSeqStep,isLocked=i>prodSeqStep;
    const cls=isDone?'ps-done':isActive?'ps-active':isLocked?'ps-locked':'';
    const statusIcon=isDone?'✅':isActive?'👆':'🔒';
    const connector=i<PROD_STEPS.length-1
      ?`<div class="prodseq-connector${isDone?' cn-done':isActive?' cn-active':''}"></div>`:'';
    return`
      <div class="prodseq-station ${cls}" id="pss-${i}" onclick="prodSeqClick(${i})">
        <div class="prodseq-num">${isDone?'✓':i+1}</div>
        <div class="prodseq-sicon">${s.icon}</div>
        <div class="prodseq-sinfo">
          <div class="prodseq-sname">${s.name}</div>
          <div class="prodseq-sdesc">${s.desc}</div>
        </div>
        <div class="prodseq-sstatus">${statusIcon}</div>
      </div>${connector}`;
  }).join('');

  box.innerHTML=`
  <div class="prodseq-game particle-wrap">
    ${globalBtnsHTML('prod')}
    <div class="game-hud">
      <span class="game-hud-level">⚙️ PROD</span>
      <div class="game-hud-bar"><div class="game-hud-fill" style="width:${pct}%"></div></div>
      <span class="game-hud-stars">PUNTOS: <strong style="color:var(--cc)">${prodSeqScore}</strong></span>
    </div>
    <div class="prodseq-progress">${roundChips}</div>
    <div class="prodseq-product-banner">
      <div class="prodseq-product-icon">${tmpl.icon}</div>
      <div class="prodseq-product-info">
        <div class="prodseq-product-name">${tmpl.name}</div>
        <div class="prodseq-product-tip">${tmpl.tip}</div>
      </div>
      <div class="prodseq-round">Producto ${prodSeqRound+1}/${window._prodSeqTemplates.length}</div>
    </div>
    <div class="prodseq-flow">${stationsHTML}</div>
    <div class="game-toast"></div>
  </div>`;
}

function prodSeqClick(stationIdx){
  const box=$('gamebox');if(!box)return;
  if(stationIdx===prodSeqStep){
    /* ✅ Paso correcto */
    prodSeqStep++;prodSeqScore+=25;prodSeqCorrect++;
    vibrate(30);
    spawnParticles(box,['✅','⭐','⚙️'],4);
    showGameToast(box,`¡Correcto! ${PROD_STEPS[stationIdx].name} completada +25 pts 🎯`);
    if(prodSeqStep>=PROD_STEPS.length){
      /* 🏆 Producto completo — bonus */
      prodSeqScore+=50;
      spawnParticles(box,['🏆','🎉','📦'],8);
      vibrate([40,20,80]);
      setTimeout(()=>{
        prodSeqRound++;prodSeqStep=0;
        if(prodSeqRound>=window._prodSeqTemplates.length)showPRODSeqEnd();
        else renderPRODSeq();
      },950);
    }else{
      renderPRODSeq();
    }
  }else if(stationIdx<prodSeqStep){
    /* Ya completo */
    showGameToast(box,'¡Etapa ya completada! Avanza a la siguiente ✅');
  }else{
    /* ❌ Orden incorrecto — toast educativo formato solicitado */
    const missed=PROD_STEPS[prodSeqStep];
    showGameToast(box,`¡Error! El proceso industrial exige orden. Debes pasar por ${missed.name} primero.`);
    vibrate(15);
    /* Sacude la estación activa para llamar la atención */
    const activeEl=box.querySelector('.ps-active');
    if(activeEl){activeEl.style.animation='machine-shake .45s ease';setTimeout(()=>{if(activeEl)activeEl.style.animation='';},450);}
  }
}

function showPRODSeqEnd(){
  clearInterval(plantTimer);
  const box=$('gamebox');if(!box)return;
  const maxPts=window._prodSeqTemplates.length*(PROD_STEPS.length*25+50);
  const pct=maxPts>0?Math.round((prodSeqScore/maxPts)*100):0;
  const msg=pct>=80?'¡Fábrica perfectamente organizada! Naciste para la producción industrial 🏭🚀'
    :pct>=50?'¡Buen flujo! Con práctica serás un experto en procesos 👏'
    :'¡Sigue practicando el orden! Recuerda: Recepción → Manufactura → Calidad → Empaque 💪';
  box.innerHTML=`<div style="text-align:center;padding:24px 16px" class="particle-wrap">
    <div style="font-size:64px;margin-bottom:12px;animation:float 3s ease-in-out infinite">🏭</div>
    <h3 style="font-family:'Bebas Neue';font-size:32px;letter-spacing:3px;color:var(--cc);margin-bottom:8px">PRODUCCIÓN COMPLETADA</h3>
    <div class="gfinal">
      <div class="gfscore">${prodSeqScore}</div>
      <p style="font-size:15px;color:var(--lt);margin:8px 0 6px">${msg}</p>
      <p style="font-size:13px;opacity:.5;margin-bottom:8px">
        Flujo dominado: 📥 Recepción → ⚙️ Manufactura → 🔍 Calidad → 📦 Empaque
      </p>
      ${gSkipsUsed>0?`<p style="font-size:12px;color:rgba(251,191,36,.6);margin-bottom:10px">⏭️ Saltaste ${gSkipsUsed} etapa(s) — penalización aplicada</p>`:''}
      <button class="greset" onclick="showPRODIntro()">↺ Jugar de nuevo</button>
    </div>
  </div>`;
  spawnParticles(box,['🏭','⚙️','📦','✅'],10);
  vibrate([60,20,60]);
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║  JUEGO 2: QUÍMICA — Tabla Periódica Interactiva             ║
   ║  Selecciona elementos reales para formar 5 moléculas        ║
   ╚══════════════════════════════════════════════════════════════╝ */

/* Subconjunto de la tabla periódica (15 elementos comunes) */
const CHEM_ELEMENTS=[
  {sym:'H', name:'Hidrógeno', num:1},
  {sym:'He',name:'Helio',     num:2},
  {sym:'Li',name:'Litio',     num:3},
  {sym:'C', name:'Carbono',   num:6},
  {sym:'N', name:'Nitrógeno', num:7},
  {sym:'O', name:'Oxígeno',   num:8},
  {sym:'F', name:'Flúor',     num:9},
  {sym:'Na',name:'Sodio',     num:11},
  {sym:'Mg',name:'Magnesio',  num:12},
  {sym:'Al',name:'Aluminio',  num:13},
  {sym:'S', name:'Azufre',    num:16},
  {sym:'Cl',name:'Cloro',     num:17},
  {sym:'K', name:'Potasio',   num:19},
  {sym:'Ca',name:'Calcio',    num:20},
  {sym:'Fe',name:'Hierro',    num:26},
];

/* Banco de 10 moléculas — se eligen 5 aleatoriamente al iniciar */
const CHEM_MOL_POOL=[
  {name:'Agua',              formula:'H₂O',   emoji:'💧',elements:{H:2,O:1},
   desc:'El disolvente universal. Esencial para toda forma de vida en la Tierra.'},
  {name:'Dióxido de carbono',formula:'CO₂',   emoji:'💨',elements:{C:1,O:2},
   desc:'Gas de la respiración y la combustión. Causa el efecto invernadero.'},
  {name:'Sal común',         formula:'NaCl',  emoji:'🧂',elements:{Na:1,Cl:1},
   desc:'Cloruro de sodio. Electrolito fundamental en biología e industria alimentaria.'},
  {name:'Amoníaco',          formula:'NH₃',   emoji:'💨',elements:{N:1,H:3},
   desc:'Base nitrogenada. Usada en fertilizantes que alimentan a millones de personas.'},
  {name:'Metano',            formula:'CH₄',   emoji:'🔥',elements:{C:1,H:4},
   desc:'Gas natural. Combustible primario en cocinas, calefacción y generación eléctrica.'},
  {name:'Fluoruro de hidrógeno',formula:'HF', emoji:'⚗️',elements:{H:1,F:1},
   desc:'Ácido muy corrosivo. Usado en producción de aluminio y semiconductores.'},
  {name:'Hidróxido de sodio',formula:'NaOH',  emoji:'⚠️',elements:{Na:1,O:1,H:1},
   desc:'Sosa cáustica. Se usa para fabricar jabones, papel y tratamiento de aguas.'},
  {name:'Cloruro de aluminio',formula:'AlCl₃',emoji:'🧪',elements:{Al:1,Cl:3},
   desc:'Catalizador en síntesis orgánica industrial. Esencial en la petroquímica.'},
  {name:'Oxígeno molecular', formula:'O₂',    emoji:'🌬️',elements:{O:2},
   desc:'El gas que respiramos. Producto de la fotosíntesis — vida gracias a las plantas.'},
  {name:'Hidrógeno molecular',formula:'H₂',   emoji:'⚡',elements:{H:2},
   desc:'El combustible del futuro. Celdas de hidrógeno pueden reemplazar el petróleo.'},
];

let chemActiveMols=[],chemMolIdx=0,chemScore=0,chemSelectedEls={};

/* showCHEMIntro — OVERRIDE del original */
function showCHEMIntro(){
  const box=$('gamebox');if(!box)return;
  gCurrentGame='chem';
  box.innerHTML=`
  <div class="game-intro">
    <div class="game-intro-icon">⚗️</div>
    <div class="game-intro-title">Tabla Periódica</div>
    <div class="game-intro-desc">Forma moléculas reales seleccionando los elementos correctos de la tabla periódica. ¡Aprende química haciendo química!</div>
    <div class="game-intro-meta">
      <div class="game-intro-pill">⚛️ ${CHEM_ELEMENTS.length} elementos</div>
      <div class="game-intro-pill">🧪 5 moléculas</div>
      <div class="game-intro-pill">🔬 Fórmulas reales</div>
    </div>
    <button class="game-start-btn" onclick="initCHEMTable()">🧪 INICIAR EXPERIENCIA</button>
  </div>`;
}

function initCHEMTable(){
  /* Elige 5 moléculas aleatorias del banco */
  chemActiveMols=[...CHEM_MOL_POOL].sort(()=>Math.random()-.5).slice(0,5);
  chemMolIdx=0;chemScore=0;chemSelectedEls={};gSkipsUsed=0;
  renderCHEMTable();
}

/* initCHEM — OVERRIDE para apuntar al nuevo juego */
function initCHEM(){initCHEMTable();}

function renderCHEMTable(){
  const box=$('gamebox');if(!box)return;
  const mol=chemActiveMols[chemMolIdx];
  const pct=Math.round((chemMolIdx/chemActiveMols.length)*100);
  const neededSyms=Object.keys(mol.elements);

  /* Chips de progreso */
  const progressHTML=chemActiveMols.map((m,i)=>`
    <div class="chemtable-chip${i<chemMolIdx?' ct-done':i===chemMolIdx?' ct-active':''}">
      ${i<chemMolIdx?'✅':i===chemMolIdx?'▶':''} ${m.emoji} ${m.name}
    </div>`).join('');

  /* Chips de selección actual */
  const selKeys=Object.keys(chemSelectedEls).filter(k=>chemSelectedEls[k]>0);
  const selHTML=selKeys.length===0
    ?'<span class="chemtable-sel-empty">Toca elementos de la tabla ↓</span>'
    :selKeys.map(sym=>`
      <div class="chemtable-el-chip" onclick="chemRemoveEl('${sym}')" title="Quitar ${sym}">
        ${sym} ×${chemSelectedEls[sym]} ✕
      </div>`).join('');

  /* Grid de tabla periódica */
  const gridHTML=CHEM_ELEMENTS.map(el=>{
    const isSel=(chemSelectedEls[el.sym]||0)>0;
    const isNeeded=neededSyms.includes(el.sym);
    return`
      <div class="pt-el${isSel?' pt-selected':''}${!isNeeded?' pt-dim':''}"
           id="ptel-${el.sym}" onclick="chemSelectEl('${el.sym}')"
           title="${el.name} (${el.sym}) · N°${el.num}">
        <span class="pt-el-num">${el.num}</span>
        <span class="pt-el-sym">${el.sym}</span>
        <span class="pt-el-name">${el.name}</span>
      </div>`;
  }).join('');

  const hasSelection=selKeys.length>0;

  box.innerHTML=`
  <div class="chemtable-game particle-wrap">
    ${globalBtnsHTML('chem')}
    <div class="game-hud">
      <span class="game-hud-level">⚗️ CHEM</span>
      <div class="game-hud-bar"><div class="game-hud-fill" style="width:${pct}%"></div></div>
      <span class="game-hud-stars">PUNTOS: <strong style="color:var(--cc)">${chemScore}</strong></span>
    </div>
    <div class="chemtable-progress">${progressHTML}</div>
    <div class="chemtable-target">
      <div class="chemtable-target-lbl">🎯 Forma esta molécula</div>
      <div style="font-size:34px;margin-bottom:6px">${mol.emoji}</div>
      <div class="chemtable-mol-name">${mol.name}</div>
      <div class="chemtable-mol-formula">${mol.formula}</div>
      <div class="chemtable-mol-desc">${mol.desc}</div>
    </div>
    <div class="chemtable-selection">
      <span class="chemtable-sel-lbl">Tu selección:</span>
      ${selHTML}
    </div>
    <div class="chemtable-grid-wrap">
      <div class="chemtable-grid-lbl">⚛️ Tabla Periódica — los elementos dimmed no pertenecen a esta molécula</div>
      <div class="chemtable-grid">${gridHTML}</div>
    </div>
    <button class="chemtable-validate-btn" ${hasSelection?'':'disabled'} onclick="chemValidate()">🔬 Formar molécula</button>
    <button class="chemtable-clear-btn" onclick="chemClearSel()">✕ Limpiar selección</button>
    <div class="game-toast"></div>
  </div>`;
}

function chemSelectEl(sym){
  const box=$('gamebox');if(!box)return;
  const mol=chemActiveMols[chemMolIdx];
  const needed=Object.keys(mol.elements);

  if(!needed.includes(sym)){
    /* ❌ Elemento incorrecto — mensaje educativo con pista del elemento correcto */
    const elInfo=CHEM_ELEMENTS.find(e=>e.sym===sym);
    /* Buscar el primer elemento requerido que aún no está completamente seleccionado */
    const hintSym=needed.find(s=>(chemSelectedEls[s]||0)<mol.elements[s])||needed[0];
    const hintEl=CHEM_ELEMENTS.find(e=>e.sym===hintSym);
    const hintText=hintEl?`intenta con ${hintEl.sym} (${hintEl.name})`:'revisa la fórmula';
    showGameToast(box,`No es correcto. El elemento ${sym} no forma parte de ${mol.formula}, ${hintText}.`);
    vibrate(15);
    const elBtn=document.getElementById('ptel-'+sym);
    if(elBtn){
      elBtn.classList.add('pt-wrong');
      setTimeout(()=>{if(elBtn)elBtn.classList.remove('pt-wrong');},600);
    }
    return;
  }
  /* Añade el elemento a la selección */
  chemSelectedEls[sym]=(chemSelectedEls[sym]||0)+1;
  vibrate(10);
  renderCHEMTable();
}

function chemRemoveEl(sym){
  if((chemSelectedEls[sym]||0)>0){
    chemSelectedEls[sym]--;
    if(chemSelectedEls[sym]===0)delete chemSelectedEls[sym];
    renderCHEMTable();
  }
}

function chemClearSel(){chemSelectedEls={};renderCHEMTable();}

function chemValidate(){
  const box=$('gamebox');if(!box)return;
  const mol=chemActiveMols[chemMolIdx];
  let correct=true;

  /* Verificar todos los elementos requeridos */
  for(const[sym,count]of Object.entries(mol.elements)){
    if((chemSelectedEls[sym]||0)!==count){correct=false;break;}
  }
  /* Verificar que no haya elementos extra */
  if(correct){
    for(const sym of Object.keys(chemSelectedEls)){
      if(chemSelectedEls[sym]>0&&!mol.elements[sym]){correct=false;break;}
    }
  }

  if(correct){
    chemScore+=50;
    spawnParticles(box,[mol.emoji,'✨','⭐','🎉'],8);
    vibrate([40,20,80]);
    showGameToast(box,`¡Correcto! ${mol.formula} formada +50 pts 🎉`);
    setTimeout(()=>{
      chemMolIdx++;chemSelectedEls={};
      if(chemMolIdx>=chemActiveMols.length)showCHEMTableEnd();
      else renderCHEMTable();
    },1200);
  }else{
    /* Construir pista específica */
    let hint='';
    for(const[sym,count]of Object.entries(mol.elements)){
      const got=chemSelectedEls[sym]||0;
      if(got<count)hint+=`Faltan ${count-got} ${sym}. `;
      else if(got>count)hint+=`Sobra(n) ${got-count} ${sym}. `;
    }
    for(const sym of Object.keys(chemSelectedEls)){
      if((chemSelectedEls[sym]||0)>0&&!mol.elements[sym])hint+=`${sym} no corresponde. `;
    }
    showGameToast(box,`⚠️ ${hint.slice(0,65)}¡Intenta de nuevo!`);
    vibrate(15);
    chemScore=Math.max(0,chemScore-5);
  }
}

function showCHEMTableEnd(){
  const box=$('gamebox');if(!box)return;
  const msg=chemScore>=200?'¡Química perfecta! Tienes mente científica nato 🧬🚀'
    :chemScore>=100?'¡Buen trabajo con las moléculas! La tabla periódica ya es tu amiga 🔬'
    :'¡Los fundamentos están en tus manos! La química se aprende experimentando ⚗️';
  box.innerHTML=`<div style="text-align:center;padding:24px 16px" class="particle-wrap">
    <div style="font-size:64px;margin-bottom:12px;animation:float 3s ease-in-out infinite">🧬</div>
    <h3 style="font-family:'Bebas Neue';font-size:32px;letter-spacing:3px;color:var(--cc);margin-bottom:8px">¡MOLÉCULAS FORMADAS!</h3>
    <div class="gfinal">
      <div class="gfscore">${chemScore}</div>
      <p style="font-size:15px;color:var(--lt);margin:8px 0 6px">${msg}</p>
      <p style="font-size:13px;opacity:.5;margin-bottom:8px">Formaste ${chemMolIdx}/${chemActiveMols.length} moléculas usando la tabla periódica real.</p>
      ${gSkipsUsed>0?`<p style="font-size:12px;color:rgba(251,191,36,.6);margin-bottom:10px">⏭️ Saltaste ${gSkipsUsed} molécula(s) — penalización aplicada</p>`:''}
      <button class="greset" onclick="showCHEMIntro()">↺ Jugar de nuevo</button>
    </div>
  </div>`;
  spawnParticles(box,['⚗️','🧬','✨','⭐'],10);
  vibrate([60,20,60]);
}

/* ╔══════════════════════════════════════════════════════════════╗
   ║  JUEGO 3: PROGRAMACIÓN — Puente de Revelación               ║
   ║  Al ganar cada nivel se muestra el código real equivalente  ║
   ╚══════════════════════════════════════════════════════════════╝ */

/* Datos de revelación por nivel */
const AUTO_REVELATIONS=[
  {
    title:'Estructura IF — ELSE IF',
    subtitle:'Nivel 1 completado — Así se ve tu lógica en código real',
    code:`<span class="kw">if</span> (paquete.color === <span class="str">"rojo"</span>) {
  enviar(paquete, <span class="str">"izquierda"</span>);   <span class="cmt">// ← tu regla rojo</span>
} <span class="kw">else if</span> (paquete.color === <span class="str">"azul"</span>) {
  enviar(paquete, <span class="str">"derecha"</span>);     <span class="cmt">// ← tu regla azul</span>
}`,
    explain:'Eso que creaste visualmente es exactamente un bloque <strong>if-else</strong>. El sistema evalúa la condición (el color) y ejecuta una acción diferente según el resultado. Es el building block más importante de toda la programación.',
  },
  {
    title:'Estructura SWITCH — CASE',
    subtitle:'Nivel 2 completado — Múltiples condiciones en código limpio',
    code:`<span class="kw">switch</span> (paquete.forma) {
  <span class="kw">case</span> <span class="str">"estrella"</span>:
    enviar(paquete, <span class="str">"arriba"</span>);    <span class="kw">break</span>;
  <span class="kw">case</span> <span class="str">"triangulo"</span>:
    enviar(paquete, <span class="str">"abajo"</span>);    <span class="kw">break</span>;
  <span class="kw">case</span> <span class="str">"cuadrado"</span>:
    enviar(paquete, <span class="str">"reciclaje"</span>); <span class="kw">break</span>;
}`,
    explain:'Con muchas condiciones, los programadores usan <strong>switch</strong> en lugar de varios if anidados. Cada "case" es una de tus reglas. Este patrón aparece en sistemas de menús, controladores de videojuegos y APIs de clasificación.',
  },
  {
    title:'forEach + IF — Procesamiento en Lote',
    subtitle:'Nivel 3 completado — Automatización real de sistemas',
    code:`paquetes.<span class="kw">forEach</span>(p => {
  <span class="kw">if</span> (p.tipo === <span class="str">"urgente"</span>) {
    enviar(p, <span class="str">"carrilRapido"</span>);  <span class="cmt">// ⚡ prioridad alta</span>
  } <span class="kw">else</span> {
    enviar(p, <span class="str">"estandar"</span>);     <span class="cmt">// 🚛 flujo normal</span>
  }
});
<span class="cmt">// Procesa miles de paquetes en milisegundos</span>`,
    explain:'Un <strong>bucle forEach</strong> con un if dentro procesa automáticamente TODOS los paquetes sin que tú tengas que hacer nada. Eso es automatización. Los sistemas de Amazon, DHL y FedEx procesan millones de paquetes diariamente con exactamente este patrón.',
  },
];

/* ============================================================
   REVELATION MODAL — callback global seguro
   Evita el bug de serializar funciones anónimas en onclick=""
============================================================ */
window._gModalCb = null; // callback pendiente global

/* showRevelationModal — aparece al ganar cada nivel de Programación */
function showRevelationModal(lvlIdx,onContinue){
  const rev=AUTO_REVELATIONS[lvlIdx];
  if(!rev){onContinue();return;}
  /* Guardamos el callback en variable global para que el onclick del HTML lo pueda invocar */
  window._gModalCb=onContinue;
  const btnLabel=lvlIdx<AUTO_LEVELS.length-1?'¡Entendido! → Siguiente nivel':'¡Entendido! → Ver resultado';
  showGameModal(`
    <button class="gmodal-close" onclick="closeRevealModal(false)">✕</button>
    <div style="text-align:center">
      <span class="revelation-badge">🔓 PUENTE DE REVELACIÓN</span>
      <div class="revelation-title">${rev.title}</div>
      <div class="revelation-sub">${rev.subtitle}</div>
    </div>
    <div class="revelation-code-lbl">💻 ¡Lo lograste! Así se ve tu lógica en código real:</div>
    <div class="revelation-code">${rev.code}</div>
    <div class="revelation-explain">${rev.explain}</div>
    <div class="gmodal-btns">
      <button class="gmodal-btn-primary" onclick="closeRevealModal(true)">${btnLabel}</button>
    </div>
  `,'revelation-modal');
}

/* closeRevealModal — botón ✕ NO avanza; botón principal SÍ avanza */
function closeRevealModal(runCallback){
  const cb=window._gModalCb;
  window._gModalCb=null;
  closeGameModal('revelation-modal');
  if(runCallback&&cb) cb();
}

/* autoExecute — OVERRIDE con Puente de Revelación al ganar */
async function autoExecute(){
  const lvl=AUTO_LEVELS[autoLvl];
  const box=$('gamebox');
  const runBtn=$('auto-run-btn');
  if(runBtn){runBtn.disabled=true;runBtn.textContent='⏳ Procesando...';}

  /* Simular procesamiento de paquetes */
  const queue=document.querySelectorAll('.auto-packet');
  let correct=0,total=lvl.packets.length;

  for(let i=0;i<lvl.packets.length;i++){
    const pkt=lvl.packets[i];
    const rule=autoRules.find(r=>
      r.cond===pkt.color||r.cond===pkt.label.toLowerCase()||
      (r.cond==='urgente'&&pkt.color==='urgente')||
      (r.cond==='normal'&&pkt.color==='normal')
    );
    await sleep(180);
    if(queue[i]){
      queue[i].classList.add('processed');
      const correctRule=lvl.correctRules.find(cr=>
        cr.cond===pkt.color||cr.cond===pkt.label.toLowerCase()||
        (cr.cond==='urgente'&&pkt.color==='urgente')||
        (cr.cond==='normal'&&pkt.color==='normal')
      );
      if(rule&&correctRule&&rule.route===correctRule.route)correct++;
    }
  }

  const isWin=autoRules.length>=lvl.correctRules.length&&
    lvl.correctRules.every(cr=>autoRules.find(r=>r.cond===cr.cond&&r.route===cr.route));

  const res=$('auto-result');
  if(res){
    res.style.display='block';
    if(isWin){
      res.className='auto-result';
      res.innerHTML=`<div class="auto-result-icon">✅</div>
        <div class="auto-result-text">${lvl.successMsg}</div>`;
      spawnParticles(box,['⭐','💡','🚀','🔥'],10);
      vibrate([60,20,80]);

      /* 🔑 PUENTE DE REVELACIÓN — aparece antes de avanzar */
      const currentLvlIdx=autoLvl;
      setTimeout(()=>{
        showRevelationModal(currentLvlIdx,function(){
          autoLvl++;autoScore+=100;
          if(autoLvl>=AUTO_LEVELS.length)showAUTOEnd();
          else startAutoLevel();
        });
      },1200);
    }else{
      res.className='auto-result err';
      res.innerHTML=`<div class="auto-result-icon">💡</div>
        <div class="auto-result-text">¡Casi! Revisa tus reglas — pista: "${lvl.hint}"</div>`;
      if(runBtn){runBtn.disabled=false;runBtn.textContent='▶ Ejecutar sistema';}
    }
  }
}


/* — fin de lógica de juegos — */

/* ============================================================
   GALLERY PRACTICE VIDEOS — carga el video al hacer clic
============================================================ */
function loadGalleryVideo(careerId, idx){
  const d=CD[careerId];
  if(!d||!d.galleryVideos||!d.galleryVideos[idx])return;
  const v=d.galleryVideos[idx];
  const ph=document.getElementById('gvph-'+careerId+'-'+idx);
  const card=document.getElementById('gv-'+careerId+'-'+idx);
  if(!ph||!card)return;
  if(!v.src){
    ph.innerHTML=`<div class="cv-gallery-video-icon">⚠️</div>
      <div class="cv-gallery-video-label">Video no configurado</div>
      <div class="cv-gallery-video-hint">Agrega la ruta en galleryVideos[${idx}].src</div>`;
    return;
  }
  const video=document.createElement('video');
  video.src=v.src;
  video.controls=true;
  video.autoplay=true;
  video.playsInline=true;
  video.preload='metadata';
  video.style.cssText='width:100%;height:100%;object-fit:cover;border-radius:14px;display:block;';
  ph.style.display='none';
  card.appendChild(video);
  video.play().catch(()=>{});
}
