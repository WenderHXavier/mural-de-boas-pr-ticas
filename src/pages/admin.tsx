import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Trash2, Loader2, Lock } from "lucide-react";

// 🔗 Supabase client
const supabaseUrl = "https://tidqbfobizzbqwodgiel.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZHFiZm9iaXp6YnF3b2RnaWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTM0NDYsImV4cCI6MjA3ODQyOTQ0Nn0.GLApVW55UFsrGHhRwvUyTsXyd5jNo_GSh4Kf3tkD1gM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [practices, setPractices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Senha simples — pode alterar aqui
  const PASSWORD = "ure2025";

  // Login simples
  const handleLogin = () => {
    if (password === PASSWORD) {
      setAuthorized(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  // Carregar práticas
  const fetchPractices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("praticas")
      .select("*")
      .order("data_envio", { ascending: false });
    if (error) console.error("Erro ao buscar práticas:", error);
    else setPractices(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (authorized) fetchPractices();
  }, [authorized]);

  // Funções de ação
  const handleApprove = async (id: string, aprovado: boolean) => {
    setUpdating(true);
    const { error } = await supabase
      .from("praticas")
      .update({ aprovado: !aprovado })
      .eq("id", id);
    if (error) alert("Erro ao atualizar: " + error.message);
    else fetchPractices();
    setUpdating(false);
  };

  const handleHighlight = async (id: string, destaque: boolean) => {
    setUpdating(true);
    const { error } = await supabase
      .from("praticas")
      .update({ destaque: !destaque })
      .eq("id", id);
    if (error) alert("Erro ao definir destaque: " + error.message);
    else fetchPractices();
    setUpdating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta prática?")) return;
    setUpdating(true);
    const { error } = await supabase.from("praticas").delete().eq("id", id);
    if (error) alert("Erro ao excluir: " + error.message);
    else fetchPractices();
    setUpdating(false);
  };

  // 🔐 Tela de login
  if (!authorized) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-muted/30">
        <Card className="p-8 shadow-lg w-[90%] max-w-sm text-center">
          <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Painel de Moderação</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Acesso restrito à equipe da <strong>URE Itapecerica da Serra</strong>
          </p>
          <input
            type="password"
            placeholder="Digite a senha"
            className="border w-full p-2 rounded-lg mb-4 text-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          <Button onClick={handleLogin} className="w-full">
            Entrar
          </Button>
        </Card>
      </div>
    );
  }

  // 🧭 Painel principal
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Painel de Moderação — URE Itapecerica da Serra
        </h1>

        {loading ? (
          <p className="text-center text-muted-foreground">Carregando...</p>
        ) : (
          <div className="grid gap-6">
            {practices.map((p) => (
              <Card key={p.id} className="shadow-sm border">
                <CardContent className="py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-lg">{p.titulo}</h3>
                    <p className="text-sm text-muted-foreground">
                      {p.escola} • {p.autor}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.aprovado && <Badge variant="default">Aprovado</Badge>}
                      {p.destaque && <Badge variant="secondary">Destaque</Badge>}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={p.aprovado ? "outline" : "default"}
                      onClick={() => handleApprove(p.id, p.aprovado)}
                      disabled={updating}
                    >
                      {updating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      <span className="ml-1">
                        {p.aprovado ? "Reprovar" : "Aprovar"}
                      </span>
                    </Button>

                    <Button
                      size="sm"
                      variant={p.destaque ? "outline" : "secondary"}
                      onClick={() => handleHighlight(p.id, p.destaque)}
                      disabled={updating}
                    >
                      <Star className="h-4 w-4" />
                      <span className="ml-1">
                        {p.destaque ? "Remover Destaque" : "Destaque"}
                      </span>
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(p.id)}
                      disabled={updating}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
