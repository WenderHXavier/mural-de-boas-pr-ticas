import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tidqbfobizzbqwodgiel.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZHFiZm9iaXp6YnF3b2RnaWVsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4NTM0NDYsImV4cCI6MjA3ODQyOTQ0Nn0.GLApVW55UFsrGHhRwvUyTsXyd5jNo_GSh4Kf3tkD1gM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default function EnviarPratica() {
  const [status, setStatus] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    const form = event.currentTarget;
    const data = new FormData(form);

    const titulo = data.get("titulo") as string;
    const descricao = data.get("descricao") as string;
    const autor = data.get("autor") as string;
    const escola = data.get("escola") as string;
    const categoria = data.get("categoria") as string;

    let imageUrl: string | null = null;

    try {
      // 📸 Upload da imagem, se houver
      if (file) {
        const fileName = `${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("imagens-praticas")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Erro no upload:", uploadError);
          alert("Erro ao enviar imagem: " + uploadError.message);
          setStatus("error");
          return;
        }

        // Gera URL pública
        const { data: publicUrlData } = supabase.storage
          .from("imagens-praticas")
          .getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
        console.log("✅ Imagem enviada com sucesso:", imageUrl);
      }

      // 💾 Inserção na tabela com aprovação = false
      const { data: insertData, error: insertError } = await supabase
        .from("praticas")
        .insert([
          {
            titulo,
            descricao,
            autor,
            escola,
            categoria,
            imagem_url: imageUrl,
            aprovado: false, // 🔒 ainda não publicado
            data_envio: new Date().toISOString(),
          },
        ])
        .select();

      if (insertError) {
        console.error("❌ Erro ao inserir registro:", insertError);
        alert("Erro ao salvar no banco: " + insertError.message);
        setStatus("error");
        return;
      }

      console.log("✅ Registro salvo:", insertData);
      setStatus("success");
      form.reset();
      setFile(null);
    } catch (error) {
      console.error("⚠️ Erro inesperado:", error);
      alert("Erro inesperado: " + (error as Error).message);
      setStatus("error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Envie sua Boa Prática
        </h2>

        {/* Campo: Título */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Título</label>
          <input
            type="text"
            name="titulo"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Campo: Categoria */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Categoria
          </label>
          <select
            name="categoria"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Selecione uma categoria</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Robótica">Robótica</option>
            <option value="Sustentabilidade">Sustentabilidade</option>
            <option value="Arte e Cultura">Arte e Cultura</option>
            <option value="Inovação">Inovação</option>
            <option value="Colaboração">Colaboração</option>
          </select>
        </div>

        {/* Campo: Descrição */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Descrição
          </label>
          <textarea
            name="descricao"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        {/* Campo: Autor */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Nome do(a) Professor(a)
          </label>
          <input
            type="text"
            name="autor"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Campo: Escola */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Escola</label>
          <input
            type="text"
            name="escola"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Campo: Foto */}
        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Foto de destaque
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Enviar
        </button>

        {/* Status */}
        {status === "loading" && (
          <p className="text-gray-600 mt-3 text-center">⏳ Enviando...</p>
        )}
        {status === "success" && (
          <p className="text-green-600 mt-3 text-center font-semibold">
            ✅ Envio realizado com sucesso! Aguarde a aprovação para publicação.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-3 text-center font-semibold">
            ❌ Ocorreu um erro. Veja o console para detalhes.
          </p>
        )}
      </form>
    </div>
  );
}
