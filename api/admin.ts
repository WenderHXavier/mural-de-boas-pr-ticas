import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = "https://tidqbfobizzbqwodgiel.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZHFiZm9iaXp6YnF3b2RnaWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTM0NDYsImV4cCI6MjA3ODQyOTQ0Nn0.GLApVW55UFsrGHhRwvUyTsXyd5jNo_GSh4Kf3tkD1gM";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // 🧭 Configura CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") return res.status(200).end();

    // ✅ Garante parsing seguro do body
    let body: any;
    try {
      body =
        typeof req.body === "string"
          ? JSON.parse(req.body)
          : req.body || {};
    } catch (err) {
      console.error("❌ Erro ao parsear body:", err);
      return res.status(400).json({ error: "Body inválido" });
    }

    const { id, action } = body;

    if (!id || !action) {
      console.warn("⚠️ Parâmetros inválidos recebidos:", body);
      return res.status(400).json({ error: "Parâmetros inválidos" });
    }

    console.log(`🔹 Ação recebida: ${action} | ID: ${id}`);

    let method = "PATCH";
    let updateData: Record<string, any> = {};

    // 🔀 Define ação
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
        return res.status(400).json({ error: "Ação inválida" });
    }

    const url = `${SUPABASE_URL}/rest/v1/praticas?id=eq.${id}`;

    const fetchOptions: any = {
      method,
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=representation",
      },
    };

    if (method !== "DELETE") {
      fetchOptions.body = JSON.stringify(updateData);
    }

    console.log("📡 Enviando para Supabase:", { url, method, updateData });

    const response = await fetch(url, fetchOptions);

    const text = await response.text();
    console.log("📥 Resposta do Supabase:", text);

    if (!response.ok) {
      throw new Error(`Erro do Supabase: ${text}`);
    }

    const result = text ? JSON.parse(text) : { success: true };
    return res.status(200).json(result);
  } catch (err: any) {
    console.error("💥 Erro interno no /api/admin:", err);
    return res.status(500).json({
      error: "Erro interno no servidor",
      details: err.message || err.toString(),
    });
  }
}
