import { useState } from "react";

export default function EnviarPratica() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setStatus("success");
      form.reset();
    } else {
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

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Nome da Escola
          </label>
          <input
            type="text"
            name="escola"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Categoria
          </label>
          <input
            type="text"
            name="categoria"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Descrição breve (máx. 200 caracteres)
          </label>
          <textarea
            name="descricao_breve"
            maxLength={200}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Descrição completa
          </label>
          <textarea
            name="descricao_completa"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Foto de destaque
          </label>
          <input
            type="file"
            name="foto"
            accept="image/*"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">
            Nome do Professor(a)
          </label>
          <input
            type="text"
            name="professor"
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Enviar
        </button>

        {status === "success" && (
          <p className="text-green-600 mt-3 text-center font-semibold">
            ✅ Envio realizado com sucesso!
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-3 text-center font-semibold">
            ❌ Ocorreu um erro. Tente novamente.
          </p>
        )}
      </form>
    </div>
  );
}
