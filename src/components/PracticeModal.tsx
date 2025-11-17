import { X } from "lucide-react";

interface PracticeModalProps {
  practice: any;
  onClose: () => void;
}

export default function PracticeModal({ practice, onClose }: PracticeModalProps) {
  if (!practice) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem grande como destaque */}
        {practice.image ? (
          <img
            src={practice.image}
            alt={practice.title}
            className="w-full h-80 object-contain bg-black"

          />
        ) : (
          <div className="w-full h-80 bg-muted flex items-center justify-center text-muted-foreground">
            Sem imagem
          </div>
        )}

        {/* Conteúdo */}
        <div className="p-8 space-y-6">
          {/* Cabeçalho com botão fechar */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold leading-tight text-gray-900">
                {practice.title}
              </h2>

              {practice.category && (
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 text-xs font-medium rounded-full">
                  {practice.category}
                </span>
              )}
            </div>

            <button onClick={onClose} className="hover:scale-110 transition">
              <X className="h-7 w-7 text-gray-500 hover:text-black" />
            </button>
          </div>

          {/* Texto principal */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
            {practice.description}
          </p>

          {/* Informações da prática */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl">
            {practice.school && (
              <div>
                <strong className="font-medium">Escola:</strong> {practice.school}
              </div>
            )}
            {practice.category && (
              <div>
                <strong className="font-medium">Categoria:</strong> {practice.category}
              </div>
            )}
            {practice.date && (
              <div>
                <strong className="font-medium">Data:</strong> {practice.date}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
