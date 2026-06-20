"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, Upload, X } from "lucide-react";

interface Categoria {
  id: number;
  nome: string;
  categoria_pai_id?: number | null;
}

interface Loja {
  id?: number;
  nome?: string;
  categoria_id?: number;
  categoria?: string;
  descricao?: string | null;
  logo?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  sticker_url?: string | null;
}

interface Props {
  modo: "criar" | "editar";
  token: string;
  categorias: Categoria[];
  loja?: Loja;
}

function apiUrl(path?: string | null) {
  if (!path) return "";
  return path.startsWith("http") ? path : `http://localhost:3001${path}`;
}

export default function ModalLoja({ modo, token, categorias, loja }: Props) {
  const router = useRouter();
  const editando = modo === "editar";
  const categoriasPai = categorias.filter((categoria) => !categoria.categoria_pai_id);
  const categoriaInicial = categoriasPai.find((categoria) => categoria.id === loja?.categoria_id || categoria.nome === loja?.categoria);

  const [open, setOpen] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState(loja?.nome || "");
  const [categoriaId, setCategoriaId] = useState<number | null>(categoriaInicial?.id || loja?.categoria_id || null);
  const [categoriaNome, setCategoriaNome] = useState(categoriaInicial?.nome || loja?.categoria || "");
  const [previews, setPreviews] = useState<(string | null)[]>([
    apiUrl(loja?.sticker_url),
    apiUrl(loja?.logo || loja?.logo_url),
    apiUrl(loja?.banner_url),
  ]);
  const [arquivos, setArquivos] = useState<(File | null)[]>([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const labels = [
    "Anexe a foto de perfil de sua loja",
    "Anexe a logo em SVG de sua loja",
    "Anexe o banner de sua loja",
  ];

  function handleArquivoChange(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = event.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPreviews((prev) => {
      const novas = [...prev];
      novas[index] = preview;
      return novas;
    });
    setArquivos((prev) => {
      const novas = [...prev];
      novas[index] = file;
      return novas;
    });
  }

  function removerArquivo(index: number) {
    setPreviews((prev) => {
      const novas = [...prev];
      novas[index] = null;
      return novas;
    });
    setArquivos((prev) => {
      const novas = [...prev];
      novas[index] = null;
      return novas;
    });
  }

  async function uploadArquivo(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:3001/upload/loja", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    return data.url as string;
  }

  async function montarUrls() {
    const urls = await Promise.all(
      previews.map(async (preview, index) => {
        if (!preview) return null;
        if (arquivos[index]) return uploadArquivo(arquivos[index] as File);

        if (index === 0) return loja?.sticker_url || null;
        if (index === 1) return loja?.logo || loja?.logo_url || null;
        return loja?.banner_url || null;
      })
    );

    return {
      sticker_url: urls[0],
      logo_url: urls[1],
      banner_url: urls[2],
    };
  }

  async function salvarLoja() {
    setLoading(true);
    setErro("");

    try {
      if (!nome.trim() || !categoriaId) {
        throw new Error("Preencha nome e categoria.");
      }

      const urls = await montarUrls();
      const res = await fetch(editando ? `http://localhost:3001/lojas/${loja?.id}` : "http://localhost:3001/lojas", {
        method: editando ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome,
          categoria_id: categoriaId,
          descricao: loja?.descricao || "",
          ...urls,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao salvar loja.");
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro de conexao");
    } finally {
      setLoading(false);
    }
  }

  async function deletarLoja() {
    if (!loja?.id || !confirm("Deseja deletar esta loja?")) return;

    setLoading(true);
    setErro("");

    try {
      const res = await fetch(`http://localhost:3001/lojas/${loja.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao deletar loja.");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro de conexao");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={editando ? "Editar loja" : "Adicionar loja"}
        onClick={() => setOpen(true)}
        className="flex h-[45px] w-[45px] items-center justify-center rounded-full bg-brand-primary text-white shadow transition hover:bg-brand-primaryHover"
      >
        {editando ? <Pencil size={24} /> : <Plus size={30} />}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative flex w-[700px] flex-col items-center rounded-2xl bg-[#EDEDED] px-16 py-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-6 top-5 text-black transition hover:text-brand-primary"
            >
              <X size={42} />
            </button>

            <h2 className="mb-5 text-center text-4xl font-semibold text-black">{editando ? "Editar loja" : "Adicionar loja"}</h2>

            <div className="flex w-full flex-col gap-4">
              <input
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Nome da loja"
                className="w-full rounded-full bg-white px-6 py-3 text-black outline-none focus:ring-2 focus:ring-brand-primary"
              />

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAberto(!aberto)}
                  className="flex w-full items-center justify-between rounded-full bg-white px-6 py-3 text-black outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <span className={categoriaNome ? "" : "opacity-60"}>{categoriaNome || "Categoria"}</span>
                  <span className="opacity-70">{aberto ? "^" : "v"}</span>
                </button>
                {aberto && (
                  <div className="absolute left-0 top-full z-50 mt-1 max-h-44 w-full overflow-y-auto rounded-xl bg-white shadow-lg">
                    {categoriasPai.map((categoria) => (
                      <button
                        key={categoria.id}
                        type="button"
                        onClick={() => {
                          setCategoriaId(categoria.id);
                          setCategoriaNome(categoria.nome);
                          setAberto(false);
                        }}
                        className="w-full px-6 py-3 text-left text-black/70 hover:bg-brand-primaryHover hover:text-white"
                      >
                        {categoria.nome}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {labels.map((label, index) => (
                <div key={label} className="relative flex h-[120px] items-center justify-center rounded-xl border-2 border-dashed border-brand-primary">
                  <input
                    id={`${modo}-loja-arquivo-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => handleArquivoChange(event, index)}
                  />

                  <button
                    type="button"
                    onClick={() => document.getElementById(`${modo}-loja-arquivo-${index}`)?.click()}
                    className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand-primary transition hover:bg-white/40"
                  >
                    {previews[index] ? (
                      <span className="text-2xl font-semibold">Arquivo {index + 1}</span>
                    ) : (
                      <>
                        <Upload size={34} fill="currentColor" />
                        <span className="text-base text-black">{label}</span>
                      </>
                    )}
                  </button>

                  {previews[index] && (
                    <button
                      type="button"
                      aria-label={`Remover arquivo ${index + 1}`}
                      onClick={() => removerArquivo(index)}
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow transition hover:bg-red-600 hover:text-white"
                    >
                      <X size={19} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {erro && <p className="mt-3 text-red-500">{erro}</p>}

            {editando && (
              <button
                type="button"
                onClick={deletarLoja}
                disabled={loading}
                className="mt-5 w-full rounded-full bg-red-600 py-3 text-xl font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                DELETAR
              </button>
            )}

            <button
              type="button"
              onClick={salvarLoja}
              disabled={loading}
              className="mt-5 w-[260px] rounded-full bg-brand-primary py-3 text-xl font-medium text-white shadow-lg shadow-gray-400 transition hover:bg-brand-primaryHover disabled:opacity-60"
            >
              {editando ? "Salvar" : "Adicionar"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
