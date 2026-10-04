/* Limpieza — quita todo el spam y libera la imagen.
 * Las posiciones (x, y, w, h) son porcentajes del tamaño de la imagen.
 * Zonas que se dejan libres a propósito:
 *   - Rostro del hombre:      x 46–70 %, y 3–21 %
 *   - Ojos y nariz del payaso: x 24–50 %, y 67–79 %
 * Así el espectador "entrevé" la imagen y quiere verla completa.
 */

const ADS = [
  // ---- Esquina superior izquierda (auto) ----
  { c: 'cookie', x: 0,  y: 2,  w: 31, h: 13, rot: -4,
    html: '<b>Usamos cookies 🍪</b><small>Aceptas todo, ¿verdad?</small><span class="btn">Aceptar todo</span>' },
  { c: 'banner', x: 2,  y: 15, w: 27, h: 11, rot: 5,
    html: '<small>¡SOLO HOY!</small><b>-70%</b><small>en todo, ¡compra ya!</small>' },

  // ---- Zona central izquierda (hombro / manga) ----
  { c: 'notif', x: 14, y: 8, w: 30, h: 8, rot: -3,
    html: '<div class="ico">💬</div><div class="txt"><b>Ana te mencionó</b><small>mira esto jajaja 😂</small></div><span class="badge">1</span>' },
  { c: 'win',  x: 20, y: 22, w: 36, h: 14, rot: 4,
    html: '<b>¡Ganaste!</b><small>Eres el visitante 1.000.000</small><span class="btn">RECLAMAR</span>' },

  // ---- Esquina superior derecha ----
  { c: 'notif', x: 69, y: 1.5, w: 30, h: 8, rot: 5,
    html: '<div class="ico" style="background:#ff6b35">🔔</div><div class="txt"><b>12 nuevas alertas</b><small>No te pierdas nada</small></div><span class="badge">12</span>' },
  { c: 'like',  x: 72, y: 11, w: 27, h: 10, rot: -5,
    html: '<b>❤ +999</b><small>Dale like y sigue</small>' },
  { c: 'sub',   x: 72, y: 22, w: 27, h: 9, rot: 4,
    html: '<b>SUSCRÍBETE</b><small>y activa la campanita</small>' },

  // ---- Cuerpo del hombre (debajo del rostro) ----
  { c: 'update', x: 44, y: 22, w: 30, h: 11, rot: -3,
    html: '<b>Actualización disponible</b><small>Reiniciando en 5…</small><div class="bar"><i></i></div>' },
  { c: 'captcha', x: 28, y: 36, w: 31, h: 9, rot: 3,
    html: '<div class="box"></div><div><b>No soy un robot</b><small>Verificación</small></div>' },
  { c: 'promo', x: 54, y: 34, w: 32, h: 11, rot: -4,
    html: '<small>ENVÍO GRATIS</small><b>2 x 1</b><small>solo por hoy</small>' },

  // ---- Barandal / tronco (centro) ----
  { c: 'age',   x: 22, y: 46, w: 32, h: 12, rot: 3,
    html: '<b>¿Eres mayor de 18?</b><span class="btn">Sí, entrar</span>' },
  { c: 'win',   x: 54, y: 46, w: 34, h: 13, rot: -4,
    html: '<b>¡Premio!</b><small>Gira la ruleta ahora</small><span class="btn">GIRAR</span>' },
  { c: 'vpn',   x: 0,  y: 33, w: 27, h: 13, rot: -3,
    html: '<b>⚠ Conexión insegura</b><small>Protégete ya</small>' },

  // ---- Palmera derecha ----
  { c: 'chat',  x: 74, y: 33, w: 26, h: 8, rot: 4,
    html: '<div class="dot">3</div><div>3 mensajes nuevos</div>' },
  { c: 'cookie', x: 70, y: 47, w: 30, h: 13, rot: -3,
    html: '<b>Aviso de privacidad</b><small>Compartimos tus datos con 842 socios</small>' },
  { c: 'banner', x: 68, y: 61, w: 32, h: 12, rot: 4,
    html: '<small>¡ÚLTIMA OPORTUNIDAD!</small><b>GRATIS</b>' },

  // ---- Zona del rail / pierna ----
  { c: 'notif', x: 0, y: 47, w: 28, h: 8, rot: 4,
    html: '<div class="ico" style="background:#8338ec">📸</div><div class="txt"><b>+48 seguidores</b><small>Revisa tu perfil</small></div>' },
  { c: 'battery', x: 2, y: 58, w: 24, h: 9, rot: -3,
    html: '<b>🔋 5%</b><small>Batería baja</small>' },
  { c: 'sub',    x: 52, y: 60, w: 28, h: 9, rot: 3,
    html: '<b>¡Síguenos!</b><small>@spam_total</small>' },

  // ---- Zona inferior: cubre boca y pelo del payaso, deja ojos y nariz ----
  { c: 'update', x: 0,  y: 69, w: 22, h: 12, rot: -4,
    html: '<b>Espacio lleno</b><small>Libera memoria</small><div class="bar"><i style="width:96%"></i></div>' },
  { c: 'win',    x: 22, y: 80.5, w: 32, h: 11, rot: 3,
    html: '<b>¡Oferta!</b><small>Te quedan 02:59</small>' },
  { c: 'notif',  x: 52, y: 70, w: 30, h: 8, rot: -3,
    html: '<div class="ico" style="background:#e63946">📧</div><div class="txt"><b>Bandeja llena</b><small>2.431 sin leer</small></div><span class="badge">99+</span>' },
  { c: 'promo',  x: 54, y: 79, w: 36, h: 11, rot: 4,
    html: '<small>CUPÓN</small><b>-50% HOY</b>' },
  { c: 'cookie', x: 0,  y: 92, w: 40, h: 8, rot: -3,
    html: '<b>Acepta para continuar</b>' },
  { c: 'banner', x: 40, y: 91, w: 30, h: 9, rot: 4,
    html: '<b>¡COMPRA YA!</b>' },
  { c: 'like',   x: 70, y: 90, w: 30, h: 10, rot: -4,
    html: '<b>👍 Me gusta</b><small>Comparte con 10 amigos</small>' },
];

const stage   = document.getElementById('stage');
const adsEl   = document.getElementById('ads');
const startBtn = document.getElementById('start');
const counter = document.getElementById('counter');
const modal   = document.getElementById('modal');
const acceptBtn = document.getElementById('accept');

let remaining = ADS.length;
let started = false;

// Construir anuncios
ADS.forEach((a, i) => {
  const el = document.createElement('div');
  el.className = `ad ${a.c}`;
  el.style.left   = a.x + '%';
  el.style.top    = a.y + '%';
  el.style.width  = a.w + '%';
  el.style.height = a.h + '%';
  el.style.setProperty('--rot', (a.rot || 5) + 'deg');
  el.style.rotate = `${(a.rot || 0) * 0.3}deg`;
  el.style.zIndex = String(10 + i);
  el.innerHTML = a.html + '<span class="x">✕</span>';
  el.addEventListener('pointerdown', () => dismiss(el));
  adsEl.appendChild(el);
});

function updateCounter() {
  counter.textContent = remaining > 0
    ? `Anuncios restantes: ${remaining}`
    : 'Casi listo…';
}

function dismiss(el) {
  if (!started || el.classList.contains('out')) return;
  el.classList.add('out');
  remaining--;
  updateCounter();
  setTimeout(() => el.remove(), 300);

  if (remaining === 0) {
    // Imagen libre: se muestra 2 segundos y luego aparece el cartel
    counter.hidden = true;
    setTimeout(() => { modal.hidden = false; acceptBtn.focus(); }, 2000);
  }
}

startBtn.addEventListener('click', () => {
  started = true;
  startBtn.hidden = true;
  counter.hidden = false;
  updateCounter();
  adsEl.querySelectorAll('.ad').forEach(el => el.classList.add('live'));
});

acceptBtn.addEventListener('click', () => { modal.hidden = true; });
