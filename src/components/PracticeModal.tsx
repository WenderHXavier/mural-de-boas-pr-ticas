import { X } from "lucide-react";

interface PracticeModalProps {
  practice: any;
  onClose: () => void;
}

export default function PracticeModal({ practice, onClose }: PracticeModalProps) {
  if (!practice) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem grande */}
        <img
          src={practice.image}
          alt={practice.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{practice.title}</h2>
            <button onClick={onClose}>
              <X className="h-6 w-6 text-muted-foreground hover:text-black" />
            </button>
          </div>

          <p className="text-sm text-muted-foreground">
            {practice.description}
          </p>

          <div className="text-sm text-muted-foreground pt-2">
            <strong>Escola:</strong> {practice.school}
            <br />
            <strong>Categoria:</strong> {practice.category}
          </div>
        </div>
      </div>
    </div>
  );
}
