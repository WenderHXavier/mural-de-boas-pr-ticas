import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = "https://tidqbfobizzbqwodgiel.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZHFiZm9iaXp6YnF3b2RnaWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTM0NDYsImV4cCI6MjA3ODQyOTQ0Nn0.GLApVW55UFsrGHhRwvUyTsXyd5jNo_GSh4Kf3tkD1gM";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ error: "Método não permitido" });

  try {
    const { id, action } = req.body;

    if (!id || !action) {
      return res.status(400).json({ error: "Parâmetros inválidos" });
    }

    let updateData: Record<string, any> | null = null;
    let method = "PATCH";
    let url = `${SUPABASE_URL}/rest/v1/praticas?id=eq.${id}`;

    switch (action) {
      case "aprovar":
        updateData = { aprovado: true };
        break;
      case "reprovar":
        updateData = { aprovado: false };
        break;
      case "destaque":
        updateData = { destaque: true };
        break;
      case "removerDestaque":
        updateData = { destaque: false };
        break;
      case "deletar":
        method = "DELETE";
        break;
      default:
        return res.status(400).json({ error: "Ação desconhecida" });
    }

    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
      },
      body: updateData ? JSON.stringify(updateData) : undefined,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Erro do Supabase:", errorText);
      return res.status(response.status).json({ error: "Erro no Supabase", details: errorText });
    }

    const result = await response.json();
    console.log(`✅ Ação '${action}' aplicada no registro ${id}`, result);

    return res.status(200).json({ success: true, action, result });
  } catch (err: any) {
    console.error("⚠️ Erro interno:", err);
    return res.status(500).json({ error: "Erro interno do servidor", details: err.message });
  }
}
