// ── FIREBASE CONFIG ─────────────────────────────────────────
// 1. Go to https://console.firebase.google.com
// 2. Create project → Add web app → copy config here
const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyD8EcKze19EjAZiEH0QhC_OfUGYzUQXT6A",
  authDomain:        "brand-x-94850.firebaseapp.com",
  projectId:         "brand-x-94850",
  storageBucket:     "brand-x-94850.firebasestorage.app",
  messagingSenderId: "460267381491",
  appId:             "1:460267381491:web:dc574f520a285d4301cd86",
  measurementId:     "G-RXGKCFPDQN"
};

const FB_CONFIGURED = FIREBASE_CONFIG.apiKey !== "PASTE_YOUR_API_KEY";

if (FB_CONFIGURED) {
  firebase.initializeApp(FIREBASE_CONFIG);
}

// ── AUTH STATE → UPDATE HEADER ───────────────────────────────
function initAuthHeader() {
  if (!FB_CONFIGURED) return;

  firebase.auth().onAuthStateChanged(function(user) {
    const btn = document.getElementById('account-btn');
    if (!btn) return;

    if (user) {
      const initial = (user.displayName || user.email || '?')[0].toUpperCase();
      const photo   = user.photoURL;
      btn.innerHTML = `
        <div class="auth-avatar" onclick="toggleAuthMenu(event)"
             style="width:34px;height:34px;border-radius:50%;background:var(--yellow);
                    display:flex;align-items:center;justify-content:center;
                    font-size:14px;font-weight:800;color:var(--blue);cursor:pointer;
                    overflow:hidden;flex-shrink:0">
          ${photo ? `<img src="${photo}" style="width:100%;height:100%;object-fit:cover">` : initial}
        </div>
        <span class="lb" style="max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
          ${user.displayName ? user.displayName.split(' ')[0] : 'ანგარიში'}
        </span>
        <div id="auth-menu" style="display:none;position:absolute;top:calc(100% + 8px);right:0;
             background:#fff;border:1.5px solid var(--border);border-radius:10px;
             min-width:180px;box-shadow:0 8px 24px rgba(27,58,107,.15);z-index:999;overflow:hidden">
          <div style="padding:14px 16px;border-bottom:1px solid var(--border)">
            <div style="font-size:13px;font-weight:700;color:var(--text)">${user.displayName || ''}</div>
            <div style="font-size:11px;color:var(--light);margin-top:2px">${user.email || ''}</div>
          </div>
          <a href="#" onclick="signOut(event)" style="display:flex;align-items:center;gap:8px;
             padding:12px 16px;font-size:13px;font-weight:600;color:var(--red);
             text-decoration:none;transition:.2s">
            🚪 გასვლა
          </a>
        </div>`;
      btn.style.position = 'relative';
    } else {
      btn.innerHTML = `👤<span class="lb">შესვლა</span>`;
      btn.onclick = function() { window.location.href = 'login.html'; };
    }
  });
}

function toggleAuthMenu(e) {
  e.stopPropagation();
  const m = document.getElementById('auth-menu');
  if (m) m.style.display = m.style.display === 'none' ? 'block' : 'none';
}

function signOut(e) {
  e.preventDefault();
  firebase.auth().signOut().then(() => { window.location.href = 'index.html'; });
}

document.addEventListener('click', function() {
  const m = document.getElementById('auth-menu');
  if (m) m.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', initAuthHeader);
