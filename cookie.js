(function () {
  var KEY = 'streax_consent';

  function loadFonts() {
    var p1 = document.createElement('link');
    p1.rel = 'preconnect'; p1.href = 'https://fonts.googleapis.com';
    var p2 = document.createElement('link');
    p2.rel = 'preconnect'; p2.href = 'https://fonts.gstatic.com'; p2.crossOrigin = '';
    var l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,700&family=Barlow+Condensed:wght@700;800;900&display=swap';
    document.head.append(p1, p2, l);
  }

  function removeBanner() {
    var b = document.getElementById('cookie-banner');
    if (b) { b.style.transform = 'translateY(120%)'; setTimeout(function () { b.remove(); }, 400); }
  }

  function accept() {
    localStorage.setItem(KEY, 'accepted');
    loadFonts();
    removeBanner();
  }

  function decline() {
    localStorage.setItem(KEY, 'declined');
    removeBanner();
  }

  var pref = localStorage.getItem(KEY);
  if (pref === 'accepted') { loadFonts(); return; }
  if (pref === 'declined') { return; }

  // Inject styles
  var style = document.createElement('style');
  style.textContent = [
    '#cookie-banner{',
      'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;',
      'width:calc(100% - 48px);max-width:640px;',
      'background:#0e0e1a;border:1px solid rgba(255,255,255,0.1);',
      'border-radius:16px;padding:20px 24px;',
      'display:flex;align-items:center;gap:20px;flex-wrap:wrap;',
      'box-shadow:0 8px 40px rgba(0,0,0,0.6);',
      'transition:transform 0.4s ease;',
      'font-family:system-ui,sans-serif;',
    '}',
    '#cookie-banner p{',
      'flex:1;min-width:200px;margin:0;',
      'font-size:13px;line-height:1.6;color:rgba(240,240,248,0.6);',
    '}',
    '#cookie-banner a{color:#00c8a0;text-decoration:none;}',
    '#cookie-banner a:hover{text-decoration:underline;}',
    '#cookie-banner .cb-btns{display:flex;gap:10px;flex-shrink:0;}',
    '#cookie-banner .cb-accept{',
      'background:linear-gradient(135deg,#1e74f0 0%,#00c8a0 55%,#a0e840 100%);',
      'color:#000;font-weight:700;font-size:13px;',
      'padding:9px 18px;border-radius:8px;border:none;cursor:pointer;',
      'transition:opacity 0.2s;white-space:nowrap;',
    '}',
    '#cookie-banner .cb-accept:hover{opacity:0.85;}',
    '#cookie-banner .cb-decline{',
      'background:transparent;border:1px solid rgba(255,255,255,0.12);',
      'color:rgba(240,240,248,0.5);font-size:13px;font-weight:500;',
      'padding:9px 18px;border-radius:8px;cursor:pointer;',
      'transition:border-color 0.2s,color 0.2s;white-space:nowrap;',
    '}',
    '#cookie-banner .cb-decline:hover{border-color:rgba(255,255,255,0.25);color:rgba(240,240,248,0.8);}',
    '@media(max-width:500px){',
      '#cookie-banner{bottom:0;left:0;transform:none;width:100%;border-radius:16px 16px 0 0;max-width:100%;}',
      '#cookie-banner .cb-btns{width:100%;}',
      '#cookie-banner .cb-accept,#cookie-banner .cb-decline{flex:1;text-align:center;}',
    '}'
  ].join('');
  document.head.appendChild(style);

  // Inject banner
  var banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML =
    '<p>Wir laden Schriftarten über <strong>Google Fonts</strong> von Googles Servern. ' +
    'Dabei wird deine IP-Adresse übermittelt. Mehr dazu in unserer ' +
    '<a href="/datenschutz.html">Datenschutzerklärung</a>.</p>' +
    '<div class="cb-btns">' +
      '<button class="cb-decline">Ablehnen</button>' +
      '<button class="cb-accept">Akzeptieren</button>' +
    '</div>';

  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(banner);
    banner.querySelector('.cb-accept').addEventListener('click', accept);
    banner.querySelector('.cb-decline').addEventListener('click', decline);
  });
})();
