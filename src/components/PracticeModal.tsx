import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface PracticeModalProps {
  practice: any;
  onClose: () => void;
}

export default function PracticeModal({ practice, onClose }: PracticeModalProps) {
  if (!practice) return null;

  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    if (!practice?.image) return;

    const img = new Image();
    img.src = practice.image;
    img.onload = () => {
      setIsVertical(img.height > img.width);
    };
  }, [practice]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagem com detecção de proporção */}
        {practice.image ? (
          <div classNam
