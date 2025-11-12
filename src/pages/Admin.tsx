import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Star, Trash2, Loader2, Lock, Image } from "lucide-react";

export default function Admin() {
  const [authorized, setAuthorized] = useState(false);
  const [password, setPassword] = useState("");
  const [practices, setPractices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const PASSWORD = "ure2025";

  const handleLogin = () => {
    if (password === PASSWORD) {
      setAuthorized(true);
    } else {
      alert("Senha incorreta!");
    }
  };

  const fetchPractices = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/praticas");
      if (!response.ok) throw new Error("Falha ao buscar dados");
      const data = await response.json();
      console.log("✅ Dados via proxy:", data);
      setPractices(data || []);
    } catch (err) {
      console.error("❌ Erro ao carregar via proxy:", err);
      alert("Erro ao carregar práticas. Tente novamente.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authorized) fetchPractices();
  }, [authorized]);

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
              <Card key={p.id} className="shadow-sm border overflow-hidden">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  {/* Imagem */}
                  <div className="md:w-1/3 w-full bg-muted aspect-video flex items-center justify-center overflow-hidden">
                    {p.imagem_url ? (
                      <img
                        src={p.imagem_url}
                        alt={p.titulo}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-center text-muted-foreground p-6">
                        <Image className="mx-auto mb-2 h-6 w-6 opacity-60" />
                        <p className="text-sm">Sem imagem</p>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{p.titulo}</h3>
                      <p className="text-sm text-muted-foreground">
                        {p.escola} • {p.autor}
                      </p>
                      <p className="mt-2 text-sm">{p.descricao}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {p.aprovado && <Badge variant="default">Aprovado</Badge>}
                        {p.destaque && (
                          <Badge variant="secondary">Destaque</Badge>
                        )}
                      </div>
                    </div>

                    {/* Botões (apenas visuais) */}
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" disabled>
                        <CheckCircle className="h-4 w-4" />
                        <span className="ml-1">Aprovar</span>
                      </Button>

                      <Button size="sm" variant="outline" disabled>
                        <Star className="h-4 w-4" />
                        <span className="ml-1">Destaque</span>
                      </Button>

                      <Button size="sm" variant="destructive" disabled>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
