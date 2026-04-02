
// auth.js
// 2026 BRETT
// Based on supabase auth
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export const supabase = createClient(
  "https://bnlvhjszqpefeegjwycm.supabase.co",
  "sb_publishable_jGxpb1gML8SaH53Y6xoqtQ_kZYlH6r5"
);

// Signup
export async function signUp(email, password) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

// Login
export async function login(email, password) {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}

// Logout
export async function logout() {
  await supabase.auth.signOut();
}

// Session prüfen
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

/* ---------------------------------------------------------
   UI-Handling für Login/Logout-Bereich
--------------------------------------------------------- */

export async function setupAuthUI() {
  const logoutDiv = document.querySelector(".logout");
  const logoutBtn = document.getElementById("logoutBtn");

  // p-Tag erzeugen (falls nicht vorhanden)
  let infoP = logoutDiv.querySelector("p");
  if (!infoP) {
    infoP = document.createElement("p");
    logoutDiv.prepend(infoP);
  }

  // Session prüfen
  const session = await getSession();
  const userEmail = session?.user?.email ?? null;

  // UI setzen
  if (userEmail) {
    infoP.textContent = "Angemeldet als: " + userEmail;
    logoutBtn.textContent = "Abmelden";
  } else {
    infoP.textContent = "Nicht angemeldet";
    logoutBtn.textContent = "Anmelden";
  }

  // Klick-Handler setzen
  logoutBtn.onclick = async () => {
    if (userEmail) {
      // Benutzer ist angemeldet → abmelden
      await logout();
      window.location.href = "login.html";
    } else {
      // Benutzer ist NICHT angemeldet → zur Login-Seite
      window.location.href = "login.html";
    }
  };
}


async function sendRating(value) {
  const { data, error } = await supabase
    .from("ratings")
    .insert({ stars: value });

  if (error) {
    console.error("Fehler beim Senden:", error);
  } else {
    console.log("Bewertung gespeichert:", data);
  }
}

window.toggleMenu=function(){document.getElementById("sidebar").classList.toggle("active");};
function setFavicon(url) {
    const head = document.head;

    // alte Icons entfernen
    document.querySelectorAll("link[rel='icon'], link[rel='shortcut icon']")
        .forEach(e => e.remove());

    // neues Icon hinzufügen
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = url;
    head.appendChild(link);
}


let toggle = false;

setInterval(() => {
    setFavicon(toggle ? "BrettWeb2026/icon2.png" : "BrettWeb2026/icon1.jpeg");
    toggle = !toggle;
}, 1000);

