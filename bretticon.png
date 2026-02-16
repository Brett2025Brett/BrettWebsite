// auth.js
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
