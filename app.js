// ✅ PUT YOUR APPS SCRIPT WEB APP URL HERE (must end with /exec)
const API_URL = "https://script.google.com/macros/s/AKfycbyDR0iKrEa0m0Jnsovox2zrBHjl2AMkUiPfB28hNDKGF0hN-2V19YJGlfh7ePomB-k1MQ/exec";

// ===============================
// Loader + Toast
// ===============================
let LOADER_LOCK = false;

function showLoader(show = true, text = "Loading...", silent = false) {
  const overlay = document.getElementById("loaderOverlay");
  const loaderText = document.getElementById("loaderText");
  if (!overlay) return;

  // ✅ Silent mode: SHOW block, HIDE allowed
  if (silent && show) return;

  if (show) {
    if (LOADER_LOCK) return;
    LOADER_LOCK = true;
    if (loaderText) loaderText.innerText = text;
    overlay.classList.add("show");
  } else {
    LOADER_LOCK = false;
    overlay.classList.remove("show");
  }
}




function toast(msg, type = "success") {
  const el = document.getElementById("toast");
  if (!el) return;

  el.className = `toast ${type} show`;
  el.innerText = msg;

  setTimeout(() => {
    el.classList.remove("show");
  }, 2200);
}

// ===============================
// Local Storage Session
// ===============================
function saveSession(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getSession(key) {
  const v = localStorage.getItem(key);
  return v ? JSON.parse(v) : null;
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// ===============================
// API Helpers (CORS SAFE)
// ===============================
async function apiPOST(payload) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload)
      // ✅ IMPORTANT: headers MAT DO (preflight CORS issue avoid)
    });

    const data = await res.json();
    return data;

  } catch (err) {
    console.error("POST Error:", err);
    return {
      success: false,
      message: "Failed to fetch ❌ (Check API URL / Deploy access / Internet)"
    };
  }
}

async function apiGET(params) {
  try {
    const url = API_URL + "?" + new URLSearchParams(params).toString();
    const res = await fetch(url);
    const data = await res.json();
    return data;

  } catch (err) {
    console.error("GET Error:", err);
    return {
      success: false,
      message: "Failed to fetch ❌ (Check API URL / Deploy access / Internet)"
    };
  }
}

// ===============================
// Extra Helpers (Optional)
// ===============================
function formatDate(dateStr) {
  try {
    return String(dateStr).slice(0, 10);
  } catch {
    return dateStr;
  }
}
