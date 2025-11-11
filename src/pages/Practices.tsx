import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import PracticeCard from "@/components/PracticeCard";

// 🔗 Conexão com o Supabase
const supabaseUrl = "https://tidqbfobizzbqwodgiel.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZHFiZm9iaXp6YnF3b2RnaWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTM0NDYsImV4cCI6MjA3ODQyOTQ0Nn0.GLApVW55UFsrGHhRwvUyTsXyd5jNo_GSh4Kf3tkD1gM";
const supabase = createClient(supabaseUrl, supabaseKey);

const Practices = () => {
  const [practices, setPractices] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const categories = [
    "Todos",
    "Tecnologia",
    "Sustentabilidade",
    "Robótica",
    "Arte e Cultura",
    "Inovação",
    "Colaboração",
  ];

  // 📦 Buscar dados do Supabase
  useEffect(() => {
    const fetchPractices = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("praticas")
        .select(
          "id, titulo, descricao, autor, escola, categoria, imagem_url, data_envio, aprovado"
        )
        .eq("aprovado", true) // 🔒 mostra apenas os aprovados
        .order("data_envio", { ascending: false });

      if (error) {
        console.error("Erro ao carregar práticas:", error);
      } else {
        setPractices(data || []);
      }
      setLoading(false);
    };

    fetchPractices();
  }, []);

  // 🔍 Filtro de busca e categoria
  const filteredPractices = practices.filter((practice) => {
    const matchesSearch =
      practice.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practice.escola?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      practice.descricao?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !selectedCategory ||
      selectedCategory === "Todos" ||
      practice.categoria === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Boas Práticas</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore as iniciativas inovadoras das escolas da nossa região
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por título, escola ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={
                  selectedCategory === category ||
                  (!selectedCategory && category === "Todos")
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() =>
                  setSelectedCategory(category === "Todos" ? null : category)
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center">
          {loading ? (
            <p className="text-muted-foreground">Carregando práticas...</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Mostrando {filteredPractices.length}{" "}
              {filteredPractices.length === 1 ? "prática" : "práticas"}
              {selectedCategory && selectedCategory !== "Todos" && (
                <Badge variant="secondary" className="ml-2">
                  {selectedCategory}
                </Badge>
              )}
            </p>
          )}
        </div>

        {/* Practices Grid */}
        {!loading && filteredPractices.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPractices.map((practice, index) => (
              <div
                key={practice.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <PracticeCard
                  id={practice.id}
                  title={practice.titulo}
                  school={practice.escola}
                  category={practice.categoria}
                  description={practice.descricao}
                  image={practice.imagem_url}
                />
              </div>
            ))}
          </div>
        ) : !loading ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">
              Nenhuma prática encontrada com os filtros selecionados.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory(null);
              }}
            >
              Limpar filtros
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Practices;
