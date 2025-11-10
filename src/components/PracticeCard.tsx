import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar } from "lucide-react";

interface PracticeCardProps {
  id: string;
  title: string;
  school: string;
  category: string;
  description: string;
  image: string;
  date?: string;
  featured?: boolean;
}

const PracticeCard = ({
  title,
  school,
  category,
  description,
  image,
  date,
  featured = false,
}: PracticeCardProps) => {
  return (
    <Card className={`overflow-hidden card-hover h-full flex flex-col ${featured ? 'ring-2 ring-accent' : ''}`}>
      {featured && (
        <div className="bg-gradient-to-r from-accent to-accent/80 text-white px-4 py-1 text-xs font-semibold">
          ⭐ Destaque do Mês
        </div>
      )}
      
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">{title}</h3>
          <Badge variant="secondary" className="shrink-0">{category}</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-xs text-muted-foreground border-t pt-4">
        <div className="flex items-center gap-1">
          <Building2 className="h-3 w-3" />
          <span className="line-clamp-1">{school}</span>
        </div>
        {date && (
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default PracticeCard;
