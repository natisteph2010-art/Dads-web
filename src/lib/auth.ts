import { NavigateFunction } from "react-router-dom";
import { supabase } from "./supabase";

export async function redirectByRole(navigate: NavigateFunction) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    navigate("/login");
    return;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  navigate(profile?.role === "admin" ? "/admin" : "/dashboard", { replace: true });
}
