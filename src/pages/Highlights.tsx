import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight } from "lucide-react";
import PracticeCard from "@/components/PracticeCard";

const Highlights = () => {
  const [practices, setPractices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        setLoading(true);

        // 🔁 Agora busca pelo proxy local (funciona dentro da intragov!)
        const response = await fetch("/api/praticas?destaque=true");
        if (!response.ok) throw new Error("Erro ao buscar destaques");

        const data = await response.json();
        setPractices(data || []);
      } catch (error) {
        console.error("Erro ao carregar destaques:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white mb-6">
            <Award className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Destaques do Mês
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Práticas escolhidas pela equipe da{" "}
            <strong>URE Itapecerica da Serra</strong> que se destacaram pela
            inovação e impacto educacional.
          </p>
        </div>

        {/* Featured Practices */}
        {!loading && practices.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {practices.map((practice, index) => (
                <div
                  key={practice.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <PracticeCard
                    id={practice.id}
                    title={practice.titulo}
                    school={practice.escola}
                    category={practice.categoria}
                    description={practice.descricao}
                    image={practice.imagem_url}
                    featured={true}
                  />
                </div>
              ))}
            </div>

            {/* CTA to see all practices */}
            <div
              className="text-center bg-muted/50 rounded-2xl p-12 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <h2 className="text-2xl font-bold mb-4">
                Quer conhecer mais práticas?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Explore todas as iniciativas compartilhadas pelas escolas da{" "}
                <strong>URE Itapecerica da Serra</strong>.
              </p>
              <Link to="/practices">
                <Button size="lg" className="gap-2">
                  Ver todos os projetos
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </>
        ) : !loading ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-6">
              Nenhum destaque do mês foi definido ainda.
            </p>
            <Link to="/practices">
              <Button variant="outline">Ver todas as práticas</Button>
            </Link>
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Carregando...</p>
        )}
      </div>
    </div>
  );
};

export default Highlights;
