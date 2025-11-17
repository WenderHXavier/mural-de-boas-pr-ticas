import { Link } from "react-router-dom";
import { CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, ImageOff } from "lucide-react";

interface PracticeCardProps {
  id?: string;
  title: string;
  school?: string;
  category?: string;
  description?: string;
  image?: string | null;
  date?: string;
  featured?: boolean;
}

const PracticeCard = ({
  id,
  title,
  school,
  category,
  description,
  image,
  date,
  featured = false,
}: PracticeCardProps) => {
  const imageUrl =
    image && image.includes("/imagens-praticas/")
      ? `/api/imagem?path=${encodeURIComponent(
          image.split("/imagens-praticas/")[1]
        )}`
      : null;

  return (
    <Link to={`/practices/${id}`} className="block">
      <div
        className={`relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all duration-500 h-full flex flex-col
        ${
          featured
            ? "hover:scale-[1.08] hover:shadow-2xl"
            : "hover:scale-[1.03]"
        }`}
      >
        {/* Selo de Destaque visível apenas quando featured */}
        {featured && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-black px-3 py-1 rounded-md font-bold z-20">
            ⭐ Destaque
          </span>
        )}

        {/* Imagem */}
        <div className="overflow-hidden flex-1">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className={`w-full h-56 object-cover transition duration-500
              ${featured ? "group-hover:scale-110 group-hover:brightness-75" : ""}
              `}
            />
          ) : (
            <div className="h-56 text-muted-foreground flex flex-col items-center justify-center bg-muted">
              <ImageOff className="h-8 w-8 mb-2 opacity-60" />
              <p className="text-xs">Sem imagem</p>
            </div>
          )}
        </div>

        {/* Conteúdo com expansão */}
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent text-white z-10">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-bold transition-all duration-500 leading-tight
              ${
                featured
                  ? "text-lg group-hover:text-2xl"
                  : "text-lg"
              }`}
            >
              {title || "Sem título"}
            </h3>

            {category && (
              <Badge
                variant="secondary"
                className="shrink-0 bg-white/20 backdrop-blur-sm"
              >
                {category}
              </Badge>
            )}
          </div>

          <p
            className={`text-sm transition-[max-height] duration-500 ease-in-out overflow-hidden
            ${
              featured
                ? "max-h-0 group-hover:max-h-44"
                : "max-h-12 line-clamp-3"
            }`}
          >
            {description || "Sem descrição disponível."}
          </p>

          {/* Botão só aparece em destaque */}
          {featured && (
            <span className="opacity-0 group-hover:opacity-100 mt-3 inline-block bg-white text-black px-3 py-1 rounded-lg transition duration-500 text-sm">
              Ver mais +
            </span>
          )}
        </div>

        {/* Rodapé para práticas normais - escondemos nos destaques */}
        {!featured && (
          <CardFooter className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4 bg-white z-20 relative">
            <div className="flex items-center gap-1">
              <Building2 className="h-3 w-3" />
              <span className="line-clamp-1">
                {school || "Escola não informada"}
              </span>
            </div>
            {date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{date}</span>
              </div>
            )}
          </CardFooter>
        )}
      </div>
    </Link>
  );
};

export default PracticeCard;
