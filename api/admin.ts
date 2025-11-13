import type { VercelRequest, VercelResponse } from "@vercel/node";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

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

    const response = await fetch(url, {
      method,
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: updateData ? JSON.stringify(updateData) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ Erro do Supabase:", errorText);
      return res.status(response.status).json({ error: "Erro no Supabase", details: errorText });
    }

    const result = await response.json();
    console.log(`✅ Ação '${action}' aplicada no registro ${id}`, result);

    return res.status(200).json({ success: true, result });
  } catch (err: any) {
    console.error("⚠️ Erro interno:", err);
    return res.status(500).json({ error: "Erro interno do servidor", details: err.message });
  }
}
