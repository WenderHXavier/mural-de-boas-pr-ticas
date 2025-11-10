import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, CheckCircle2, Upload, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Submit = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Envie sua Boa Prática</h1>
          <p className="text-lg text-muted-foreground">
            Valorize as iniciativas da sua escola e inspire outros educadores
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-12 border-l-4 border-l-primary animate-scale-in">
          <CardContent className="pt-6">
            <p className="text-lg leading-relaxed">
              No intuito de facilitar a consulta de materiais e o compartilhamento de boas práticas, 
              criamos este espaço para valorizar as iniciativas das escolas. Envie o registro da sua 
              boa prática e inspire outras equipes!
            </p>
          </CardContent>
        </Card>

        {/* Benefits */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="pt-6 space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Reconhecimento</h3>
              <p className="text-sm text-muted-foreground">
                Destaque o trabalho da sua escola
              </p>
            </CardContent>
          </Card>

          <Card className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="pt-6 space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold">Colaboração</h3>
              <p className="text-sm text-muted-foreground">
                Inspire educadores de toda a região
              </p>
            </CardContent>
          </Card>

          <Card className="text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="pt-6 space-y-3">
              <div className="mx-auto w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Facilidade</h3>
              <p className="text-sm text-muted-foreground">
                Processo simples e rápido
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card
          className="bg-gradient-to-r from-primary to-primary-light text-white animate-scale-in"
          style={{ animationDelay: '0.4s' }}
        >
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <Send className="h-8 w-8 text-white" />
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">Pronto para compartilhar?</h2>
                <p className="text-white/90 mb-6">
                  Preencha o formulário e faça parte desta rede de inovação educacional
                </p>
              </div>

              {/* 🔄 Alterado: leva para a página interna /enviar-pratica */}
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-lg px-8"
                asChild
              >
                <Link to="/enviar-pratica">
                  Acessar Formulário de Envio
                  <Send className="h-5 w-5" />
                </Link>
              </Button>

              <p className="text-sm text-white/70">
                Você será direcionado para o formulário interno
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Dúvidas? Entre em contato conosco através do e-mail{" "}
            <a
              href="mailto:contato@deitapecerica.sp.gov.br"
              className="text-primary hover:underline"
            >
              contato@deitapecerica.sp.gov.br
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Submit;

