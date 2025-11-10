export interface Practice {
  id: string;
  title: string;
  school: string;
  category: string;
  description: string;
  fullDescription?: string;
  image: string;
  date: string;
  featured?: boolean;
}

export const mockPractices: Practice[] = [
  {
    id: "1",
    title: "Projeto de Leitura Interativa com Tecnologia",
    school: "EE Prof. João Silva",
    category: "Tecnologia",
    description: "Uso de tablets e aplicativos educacionais para incentivar a leitura entre alunos do ensino fundamental.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    date: "Mar 2024",
    featured: true,
  },
  {
    id: "2",
    title: "Horta Escolar Sustentável",
    school: "EE Maria Santos",
    category: "Sustentabilidade",
    description: "Projeto de horta orgânica desenvolvido pelos alunos, promovendo educação ambiental e alimentação saudável.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    date: "Fev 2024",
    featured: true,
  },
  {
    id: "3",
    title: "Robótica nas Aulas de Matemática",
    school: "EE Dr. Carlos Mendes",
    category: "Robótica",
    description: "Integração de kits de robótica para ensinar conceitos matemáticos de forma prática e divertida.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    date: "Mar 2024",
    featured: true,
  },
  {
    id: "4",
    title: "Teatro como Ferramenta de Aprendizagem",
    school: "EE Ana Paula Costa",
    category: "Arte e Cultura",
    description: "Projeto de teatro integrado ao currículo, desenvolvendo expressão oral e trabalho em equipe.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    date: "Jan 2024",
  },
  {
    id: "5",
    title: "Gamificação nas Aulas de História",
    school: "EE Pedro Álvares",
    category: "Inovação",
    description: "Uso de jogos educativos para tornar o ensino de história mais engajador e interativo.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    date: "Fev 2024",
  },
  {
    id: "6",
    title: "Programa de Tutoria entre Alunos",
    school: "EE Sofia Rodrigues",
    category: "Colaboração",
    description: "Alunos mais avançados auxiliam colegas com dificuldades, promovendo aprendizado colaborativo.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    date: "Mar 2024",
  },
];
