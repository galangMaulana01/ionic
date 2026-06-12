import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Capacitor } from '@capacitor/core';

// ============================================================
// CONFIG
// ============================================================
const BACKEND_URL = 'https://sportmonks-tawny.vercel.app';
const CLIENT_ID = '304025860925-ejc1k9quboqghc6m53njs9k67ebnq7cc.apps.googleusercontent.com';

const isNative = Capacitor.isNativePlatform();

// ============================================================
// STATE
// ============================================================
let currentUser = null;

// ============================================================
// INIT — hanya untuk native APK
// ============================================================
if (isNative) {
  GoogleAuth.initialize({
    clientId: CLIENT_ID,
    scopes: ['profile', 'email'],
    grantOfflineAccess: true,
  });
}

// ============================================================
// RENDER UI
// ============================================================
function render() {
  document.getElementById('app').innerHTML = currentUser
    ? renderDashboard()
    : renderLogin();
  attachEvents();
}

function renderLogin() {
  return `
    <div class="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center px-6">
      <div class="w-full max-w-sm">
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#c8102e] mb-4 shadow-lg shadow-red-900/40">
            <svg class="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
            </svg>
          </div>
          <h1 class="text-white text-2xl font-bold tracking-tight">IndoScore</h1>
          <p class="text-[#666] text-sm mt-1">Live skor. Klasemen. Statistik.</p>
        </div>

        <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
          <h2 class="text-white font-semibold text-lg mb-1">Masuk ke akun</h2>
          <p class="text-[#666] text-sm mb-6">Simpan favorit & pantau liga pilihanmu</p>

          <button id="btn-google"
            class="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 active:bg-gray-200 text-[#1a1a1a] font-medium py-3 px-4 rounded-xl transition-colors duration-150">
            <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Lanjutkan dengan Google
          </button>

          <p id="login-error" class="hidden text-red-400 text-xs text-center mt-4"></p>
        </div>

        <p class="text-[#444] text-xs text-center mt-6">
          Dengan masuk, kamu setuju dengan syarat penggunaan IndoScore
        </p>
      </div>
    </div>
  `;
}

function renderDashboard() {
  const initial = currentUser.name?.charAt(0).toUpperCase() || '?';
  return `
    <div class="min-h-screen bg-[#0f0f0f] px-4 pt-10 pb-6">
      <div class="max-w-sm mx-auto">
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-white font-bold text-xl">IndoScore</h1>
          <button id="btn-logout" class="text-[#666] text-sm hover:text-white transition-colors">Keluar</button>
        </div>

        <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-5 mb-6">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-[#c8102e] flex items-center justify-center flex-shrink-0">
              <span class="text-white font-bold text-lg">${initial}</span>
            </div>
            <div class="min-w-0">
              <p class="text-white font-semibold truncate">${currentUser.name}</p>
              <p class="text-[#666] text-sm truncate">${currentUser.email}</p>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-[#2a2a2a] flex items-center justify-between">
            <span class="inline-flex items-center gap-1.5 text-green-400 text-xs font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              Tersimpan di database
            </span>
            <span class="text-[#444] text-xs">${isNative ? 'Native APK' : 'Browser'}</span>
          </div>
        </div>

        <div class="space-y-3">
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[#c8102e]/20 flex items-center justify-center">
              <svg class="w-4 h-4 text-[#c8102e]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
            </div>
            <span class="text-white text-sm font-medium">Live Skor</span>
            <span class="ml-auto text-[#444] text-xs">Segera →</span>
          </div>
          <div class="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-4 flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-[#c8102e]/20 flex items-center justify-center">
              <svg class="w-4 h-4 text-[#c8102e]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
              </svg>
            </div>
            <span class="text-white text-sm font-medium">Profil & Favorit</span>
            <span class="ml-auto text-[#444] text-xs">Segera →</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============================================================
// KIRIM KE BACKEND
// ============================================================
async function saveToBackend(googleId, email, name) {
  const res = await fetch(`${BACKEND_URL}/auth/google-native`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ google_id: googleId, email, name }),
  });
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}

// ============================================================
// LOGIN — NATIVE (Capacitor)
// ============================================================
async function loginNative() {
  const googleUser = await GoogleAuth.signIn();
  const data = await saveToBackend(
    googleUser.id,
    googleUser.email,
    googleUser.displayName
  );
  currentUser = data.user;
}

// ============================================================
// LOGIN — BROWSER (Google Identity Services)
// ============================================================
function loadGSI() {
  return new Promise((resolve) => {
    if (window.google) return resolve();
    const s = document.createElement('script');
    s.src = 'https://accounts.google.com/gsi/client';
    s.onload = resolve;
    document.head.appendChild(s);
  });
}

async function loginBrowser() {
  await loadGSI();
  return new Promise((resolve, reject) => {
    window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: 'profile email openid',
      callback: async (tokenResponse) => {
        try {
          if (tokenResponse.error) throw new Error(tokenResponse.error);

          // Ambil profil user
          const profileRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          });
          const profile = await profileRes.json();

          const data = await saveToBackend(profile.sub, profile.email, profile.name);
          currentUser = data.user;
          resolve();
        } catch (err) {
          reject(err);
        }
      },
    }).requestAccessToken();
  });
}

// ============================================================
// HANDLER TOMBOL LOGIN
// ============================================================
async function handleLogin() {
  const btn = document.getElementById('btn-google');
  const errEl = document.getElementById('login-error');

  btn.disabled = true;
  btn.innerHTML = `
    <svg class="animate-spin w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
    <span class="text-gray-500">Menghubungkan...</span>
  `;
  errEl.classList.add('hidden');

  try {
    if (isNative) {
      await loginNative();
    } else {
      await loginBrowser();
    }
    render();
  } catch (err) {
    console.error('Login gagal:', err);
    btn.disabled = false;
    btn.innerHTML = `
      <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Lanjutkan dengan Google
    `;
    errEl.textContent = 'Login gagal: ' + (err.message || 'Coba lagi.');
    errEl.classList.remove('hidden');
  }
}

// ============================================================
// LOGOUT
// ============================================================
async function handleLogout() {
  try {
    if (isNative) await GoogleAuth.signOut();
  } catch (_) {}
  currentUser = null;
  render();
}

// ============================================================
// ATTACH EVENTS
// ============================================================
function attachEvents() {
  document.getElementById('btn-google')?.addEventListener('click', handleLogin);
  document.getElementById('btn-logout')?.addEventListener('click', handleLogout);
}

// ============================================================
// BOOT
// ============================================================
render();
