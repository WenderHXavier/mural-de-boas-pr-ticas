import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = "https://tidqbfobizzbqwodgiel.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZHFiZm9iaXp6YnF3b2RnaWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTM0NDYsImV4cCI6MjA3ODQyOTQ0Nn0.GLApVW55UFsrGHhRwvUyTsXyd5jNo_GSh4Kf3tkD1gM";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const { id, action } = req.body;

  if (!id || !action) {
    return res.status(400).json({ error: "Parâmetros inválidos" });
  }

  try {
    let updateData = {};

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
        const deleteResponse = await fetch(
          `${SUPABASE_URL}/rest/v1/praticas?id=eq.${id}`,
          {
            method: "DELETE",
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        );
        return res.status(deleteResponse.status).end();
    }

    // Executa atualização no Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/praticas?id=eq.${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText);
    }

    const result = await response.json();
    res.status(200).json(result);
  } catch (err: any) {
    console.error("Erro no proxy admin:", err);
    res.status(500).json({ error: err.message || "Erro interno" });
  }
}
