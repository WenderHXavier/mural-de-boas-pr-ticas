import { Link } from "react-router-dom";
import { BookOpen, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold">Mural de Boas Práticas</h3>
                <p className="text-xs text-muted-foreground">URE Itapecerica da Serra</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Compartilhando inovação e inspiração nas escolas da nossa região.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/practices" className="text-muted-foreground hover:text-foreground transition-colors">
                  Boas Práticas
                </Link>
              </li>
              <li>
                <Link to="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                  Enviar Prática
                </Link>
              </li>
              <li>
                <Link to="/highlights" className="text-muted-foreground hover:text-foreground transition-colors">
                  Destaques
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://sites.google.com/view/tecnologiaderits/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Materiais de Tecnologia e Robótica
                </a>
              </li>
              <li>
                <a
                  href="https://sites.google.com/view/npe-derits/p%C3%A1gina-inicial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Site da Equipe de Especialistas em Currículo
                </a>
              </li>
              <li>
                <a
                  href="https://padlet.com/wellingtonsantos02/n-cleo-pedag-gico-npe-derits-2024-2025-aln1ejdxbztywah8"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Padlet Oficial
                </a>
              </li>
              <li>
                <a
                  href="https://deitapecerica.educacao.sp.gov.br/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Site institucional
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>its.eec@educacao.sp.gov.br</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Unidade Regional de Ensino – Região de Itapecerica da Serra. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
