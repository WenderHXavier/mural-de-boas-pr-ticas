import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Lightbulb, Send } from "lucide-react";
import PracticeCard from "@/components/PracticeCard";
import { mockPractices } from "@/data/mockPractices";

const Home = () => {
  const recentPractices = mockPractices.slice(0, 3);

  const features = [
    {
      icon: TrendingUp,
      title: "Aprendizado Coletivo",
      description: "Compartilhe e aprenda com experiências de toda a rede",
    },
    {
      icon: Users,
      title: "Colaboração entre Escolas",
      description: "Conecte-se com outras instituições e fortaleça a educação",
    },
    {
      icon: Lightbulb,
      title: "Inspiração para Novas Ideias",
      description: "Descubra práticas inovadoras que transformam a aprendizagem",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center space-y-8 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Boas Práticas em Ação!
            </h1>
            <p className="text-xl md:text-2xl text-white/90">
              Conheça as iniciativas que estão transformando a educação nas escolas da Diretoria de Ensino de Itapecerica da Serra
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/submit">
                <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                  <Send className="h-5 w-5" />
                  Envie sua boa prática
                </Button>
              </Link>
              <Link to="/practices">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8 bg-white/10 hover:bg-white/20 border-white/30 text-white">
                  Ver todas as práticas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que compartilhar?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Faça parte de uma rede colaborativa que valoriza e multiplica boas ideias
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-8 pb-8 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Practices Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Destaques Recentes</h2>
              <p className="text-lg text-muted-foreground">Conheça as práticas que estão fazendo a diferença</p>
            </div>
            <Link to="/practices" className="hidden md:block">
              <Button variant="outline">Ver todas</Button>
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {recentPractices.map((practice, index) => (
              <div key={practice.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <PracticeCard {...practice} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12 md:hidden">
            <Link to="/practices">
              <Button variant="outline" size="lg">Ver todas as práticas</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Sua escola tem uma história para contar?</h2>
            <p className="text-xl text-white/90">
              Compartilhe suas iniciativas e inspire educadores de toda a região!
            </p>
            <Link to="/submit">
              <Button size="lg" variant="secondary" className="gap-2 text-lg px-8">
                <Send className="h-5 w-5" />
                Enviar minha boa prática
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
