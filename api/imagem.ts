import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path } = req.query;

  if (!path || Array.isArray(path)) {
    return res.status(400).json({ error: "Parâmetro 'path' obrigatório" });
  }

  const imageUrl = `https://tidqbfobizzbqwodgiel.supabase.co/storage/v1/object/public/imagens-praticas/${path}`;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Erro ao buscar imagem" });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");

    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err: any) {
    console.error("Erro ao proxyar imagem:", err);
    res.status(500).json({ error: "Erro ao carregar imagem" });
  }
}
