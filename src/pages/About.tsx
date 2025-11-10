import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Users, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Objetivo",
      description: "Centralizar e valorizar as ações inovadoras das escolas da nossa região.",
    },
    {
      icon: Heart,
      title: "Valorização",
      description: "Reconhecer e celebrar o trabalho dedicado dos educadores e escolas.",
    },
    {
      icon: Users,
      title: "Colaboração",
      description: "Promover uma rede colaborativa de aprendizagem e troca de experiências.",
    },
    {
      icon: Sparkles,
      title: "Inspiração",
      description: "Inspirar novas práticas pedagógicas através de exemplos reais de sucesso.",
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre o Projeto</h1>
          <p className="text-lg text-muted-foreground">
            Conheça a iniciativa que está transformando a educação na nossa região
          </p>
        </div>

        {/* Main Description */}
        <Card className="mb-12 animate-scale-in">
          <CardContent className="pt-8 pb-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                O <strong>Mural de Boas Práticas</strong> é uma iniciativa da Unidade Regiuonal de Ensino de 
                Itapecerica da Serra criada para promover e compartilhar as experiências educacionais 
                mais inovadoras e inspiradoras das escolas da nossa região.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Acreditamos que a educação se fortalece quando compartilhamos conhecimento e 
                experiências. Por isso, criamos este espaço digital onde professores, coordenadores 
                e gestores podem descobrir, aprender e se inspirar com as práticas de sucesso 
                implementadas em outras unidades escolares.
              </p>
              <p className="text-lg leading-relaxed">
                Nosso objetivo é construir uma rede colaborativa de aprendizagem, onde cada escola 
                contribui para o crescimento coletivo e a melhoria contínua da educação em toda a região.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Values Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Nossos Pilares</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <Card key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="pt-6 pb-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <Card className="bg-muted/50 animate-scale-in" style={{ animationDelay: '0.4s' }}>
          <CardContent className="pt-8 pb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Recursos Úteis</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <a
                href="https://www.alura.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-accent/10 transition-colors group"
              >
                <span className="font-medium">Plataforma Alura</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="https://www.obmep.org.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-accent/10 transition-colors group"
              >
                <span className="font-medium">OBMEP</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-accent/10 transition-colors group"
              >
                <span className="font-medium">Robótica Educacional</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
              </a>
              <a
                href="#"
                className="flex items-center justify-between p-4 rounded-lg bg-background hover:bg-accent/10 transition-colors group"
              >
                <span className="font-medium">Provão Paulista</span>
                <span className="text-primary group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="mt-12 text-center text-muted-foreground">
          <p className="mb-2">
            <strong>Diretoria de Ensino – Região de Itapecerica da Serra</strong>
          </p>
          <p>
            Para mais informações:{" "}
            <a href="mailto:contato@deitapecerica.sp.gov.br" className="text-primary hover:underline">
              contato@deitapecerica.sp.gov.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
