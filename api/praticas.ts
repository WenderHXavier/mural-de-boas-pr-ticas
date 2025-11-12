import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

const SUPABASE_URL = "https://tidqbfobizzbqwodgiel.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZHFiZm9iaXp6YnF3b2RnaWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTM0NDYsImV4cCI6MjA3ODQyOTQ0Nn0.GLApVW55UFsrGHhRwvUyTsXyd5jNo_GSh4Kf3tkD1gM";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/praticas?select=*`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
      },
    });

    if (!response.ok) {
      console.error("Erro ao buscar práticas:", response.statusText);
      return res.status(response.status).json({ error: "Erro ao buscar práticas" });
    }

    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (err) {
    console.error("Erro interno no proxy:", err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
