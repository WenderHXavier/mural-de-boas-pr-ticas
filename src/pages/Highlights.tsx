import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, ArrowRight } from "lucide-react";
import PracticeCard from "@/components/PracticeCard";
import { mockPractices } from "@/data/mockPractices";

const Highlights = () => {
  const featuredPractices = mockPractices.filter((practice) => practice.featured);

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/80 text-white mb-6">
            <Award className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Destaques do Mês</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Práticas escolhidas pela equipe da Diretoria de Ensino que se destacaram pela inovação e impacto educacional
          </p>
        </div>

        {/* Featured Practices */}
        {featuredPractices.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {featuredPractices.map((practice, index) => (
                <div key={practice.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <PracticeCard {...practice} featured />
                </div>
              ))}
            </div>

            {/* CTA to see all practices */}
            <div className="text-center bg-muted/50 rounded-2xl p-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-2xl font-bold mb-4">Quer conhecer mais práticas?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Explore todas as iniciativas compartilhadas pelas escolas da nossa região
              </p>
              <Link to="/practices">
                <Button size="lg" className="gap-2">
                  Ver todos os projetos
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-6">
              Os destaques do mês serão anunciados em breve.
            </p>
            <Link to="/practices">
              <Button variant="outline">Ver todas as práticas</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Highlights;
