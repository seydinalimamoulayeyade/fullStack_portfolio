import { supabase, isSupabaseConfigured } from "./supabase-client.js";

export async function requireAdmin() {
  if (!isSupabaseConfigured || !supabase) {
    alert("Supabase non configuré. Ajoutez vos clés dans supabase-client.js");
    throw new Error("Supabase non configuré");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "login-admin.html";
    throw new Error("Non connecté");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    window.location.href = "index.html";
    throw new Error("Accès refusé");
  }

  return { user, profile };
}
