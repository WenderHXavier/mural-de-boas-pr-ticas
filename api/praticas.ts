import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = "https://tidqbfobizzbqwodgiel.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZHFiZm9iaXp6YnF3b2RnaWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTM0NDYsImV4cCI6MjA3ODQyOTQ0Nn0.GLApVW55UFsrGHhRwvUyTsXyd5jNo_GSh4Kf3tkD1gM";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 🔓 Permite acesso público (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // 🧠 Responde imediatamente requisições OPTIONS (pré-flight CORS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    const params = new URLSearchParams();

    // ✅ Filtros opcionais
    if (req.query.destaque === "true") params.append("destaque", "eq.true");
    if (req.query.aprovado === "true") params.append("aprovado", "eq.true");

    // ✅ Ordenação (mais recentes primeiro)
    params.append("order", "data_envio.desc");

    const query = `${SUPABASE_URL}/rest/v1/praticas?select=*&${params.toString()}`;

    const response = await fetch(query, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("❌ Erro ao buscar práticas:", response.statusText);
      return res
        .status(response.status)
        .json({ error: "Erro ao buscar práticas", details: response.statusText });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err: any) {
    console.error("⚠️ Erro interno no proxy:", err);
    res.status(500).json({
      error: "Erro interno do servidor",
      details: err.message || err.toString(),
    });
  }
}

