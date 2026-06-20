"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, X } from "lucide-react";

interface ImagemProduto {
  id: number;
  url_imagem: string;
  ordem: number;
}

interface Subcategoria {
  id: number;
  nome: string;
}

interface ProdutoEdicao {
  id: number;
  nome: string;
  descricao?: string | null;
  preco: number | string;
  estoque: number;
  categoria?: {
    id: number;
    nome: string;
  };
  imagens_produto?: ImagemProduto[];
}

interface Props {
  produto: ProdutoEdicao;
  token: string;
  subCategorias: Subcategoria[];
}

function apiUrl(path?: string | null) {
  if (!path) return "";
  return path.startsWith("http") ? path : `http://localhost:3001${path}`;
}

export default function ModalEditarProduto({ produto, token, subCategorias }: Props) {
  const router = useRouter();
  const imagensOrdenadas = [...(produto.imagens_produto || [])].sort((a, b) => a.ordem - b.ordem);
  const opcoesSubcategoria = subCategorias.length > 0
    ? subCategorias
    : produto.categoria
      ? [{ id: produto.categoria.id, nome: produto.categoria.nome }]
      : [];

  const [open, setOpen] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [nomeProduto, setNomeProduto] = useState(produto.nome);
  const [subCategoria, setSubCategoria] = useState<number | null>(produto.categoria?.id || null);
  const [subCategoriaSelecionada, setSubCategoriaSelecionada] = useState(produto.categoria?.nome || "");
  const [descricao, setDescricao] = useState(produto.descricao || "");
  const [preco, setPreco] = useState(String(produto.preco));
  const [estoque, setEstoque] = useState(produto.estoque);
  const [imagemPreview, setImagemPreview] = useState<(string | null)[]>([
    apiUrl(imagensOrdenadas[0]?.url_imagem),
    apiUrl(imagensOrdenadas[1]?.url_imagem),
    apiUrl(imagensOrdenadas[2]?.url_imagem),
    apiUrl(imagensOrdenadas[3]?.url_imagem),
  ]);
  const [arquivos, setArquivos] = useState<(File | null)[]>([null, null, null, null]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  function incrementarEstoque() {
    setEstoque((prev) => prev + 1);
  }

  function decrementarEstoque() {
    setEstoque((prev) => (prev > 0 ? prev - 1 : 0));
  }

  function handleImagemChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const file = e.target.files?.[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setImagemPreview((prev) => {
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

  function removerImagem(index: number) {
    setImagemPreview((prev) => {
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

  async function uploadImagem(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:3001/upload/produto", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    return data.url as string;
  }

  async function salvarProduto() {
    setLoading(true);
    setErro("");

    try {
      const urls = await Promise.all(
        imagemPreview.map(async (preview, index) => {
          if (!preview) return null;
          if (arquivos[index]) return uploadImagem(arquivos[index] as File);
          return imagensOrdenadas[index]?.url_imagem || null;
        })
      );

      const res = await fetch(`http://localhost:3001/produtos/${produto.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nomeProduto,
          categoria_id: subCategoria,
          descricao,
          preco,
          estoque,
          imagens: urls.filter(Boolean),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao salvar as alteracoes");
      }

      setOpen(false);
      router.refresh();
    } catch (error) {
      setErro(error instanceof Error ? error.message : "Erro de conexao");
    } finally {
      setLoading(false);
    }
  }

  async function deletarProduto() {
    if (!confirm("Deseja deletar este produto?")) return;

    setLoading(true);
    setErro("");

    try {
      const res = await fetch(`http://localhost:3001/produtos/${produto.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Erro ao deletar produto");
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
        aria-label="Editar produto"
        onClick={() => setOpen(true)}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-white transition hover:bg-brand-primaryHover"
      >
        <Pencil size={16} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative flex h-[820px] w-[700px] flex-col items-center gap-2 rounded-2xl bg-[#EDEDED] p-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-7 top-5 z-10 cursor-pointer text-5xl text-black transition hover:text-brand-primary"
            >
              <X size={42} />
            </button>

            <h2 className="mb-4 text-center text-4xl text-black">Editar Produto</h2>

            <div className="relative flex h-[130px] w-full items-center justify-center rounded-xl border-2 border-dashed border-brand-primary bg-white/20">
              <input id="editar-foto-0" type="file" accept="image/*" className="hidden" onChange={(e) => handleImagemChange(e, 0)} />
              <button
                type="button"
                onClick={() => document.getElementById("editar-foto-0")?.click()}
                className="flex h-full w-full flex-col items-center justify-center gap-2 text-brand-primary transition hover:bg-white/50"
              >
                {imagemPreview[0] ? (
                  <span className="text-3xl font-semibold">Foto 1</span>
                ) : (
                  <>
                    <img src="/camera_add_foto.png" alt="camera" className="w-14" />
                    <span className="text-sm text-black">Anexe as fotos do seu produto</span>
                  </>
                )}
              </button>
              {imagemPreview[0] && (
                <button
                  type="button"
                  aria-label="Remover foto 1"
                  onClick={(event) => {
                    event.stopPropagation();
                    removerImagem(0);
                  }}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow transition hover:bg-red-600 hover:text-white"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="mt-2 grid w-full grid-cols-3 gap-8">
              {[1, 2, 3].map((index) => (
                <div key={index} className="relative flex h-[105px] items-center justify-center rounded-xl border-2 border-dashed border-brand-primary bg-white/20">
                  <input id={`editar-foto-${index}`} type="file" accept="image/*" className="hidden" onChange={(e) => handleImagemChange(e, index)} />
                  <button
                    type="button"
                    onClick={() => document.getElementById(`editar-foto-${index}`)?.click()}
                    className="flex h-full w-full flex-col items-center justify-center gap-1 text-brand-primary transition hover:bg-white/50"
                  >
                    {imagemPreview[index] ? (
                      <span className="text-2xl font-semibold">Foto {index + 1}</span>
                    ) : (
                      <img src="/camera_add_foto.png" alt="camera" className="w-12" />
                    )}
                  </button>
                  {imagemPreview[index] && (
                    <button
                      type="button"
                      aria-label={`Remover foto ${index + 1}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        removerImagem(index);
                      }}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow transition hover:bg-red-600 hover:text-white"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {erro && <p className="text-sm text-red-500">{erro}</p>}

            <div className="mt-3 flex w-full flex-col items-center gap-3">
              <input
                value={nomeProduto}
                onChange={(e) => setNomeProduto(e.target.value)}
                placeholder="Nome do Produto"
                className="w-full rounded-full bg-white px-5 py-3 text-black outline-none focus:ring-2 focus:ring-brand-primary"
              />

              <div className="relative w-full">
                <button
                  type="button"
                  onClick={() => setAberto(!aberto)}
                  className="flex w-full items-center justify-between rounded-full bg-white px-5 py-3 text-black outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <span className={subCategoriaSelecionada ? "" : "opacity-60"}>
                    {subCategoriaSelecionada || "Subcategoria"}
                  </span>
                  <span className="opacity-60">{aberto ? "^" : "v"}</span>
                </button>
                {aberto && (
                  <div className="absolute left-0 top-full z-50 mt-1 max-h-40 w-full overflow-y-auto rounded-lg bg-white shadow-lg">
                    {opcoesSubcategoria.map((sc) => (
                      <button
                        type="button"
                        key={sc.id}
                        onClick={() => {
                          setSubCategoria(sc.id);
                          setSubCategoriaSelecionada(sc.nome);
                          setAberto(false);
                        }}
                        className="w-full p-2 text-left text-black/70 hover:bg-brand-primaryHover hover:text-white"
                      >
                        {sc.nome}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Descricao do produto"
                className="min-h-24 w-full resize-none rounded-4xl bg-white px-5 py-3 text-black outline-none focus:ring-2 focus:ring-brand-primary"
              />

              <input
                value={preco}
                type="number"
                step="0.01"
                min="0"
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Preco do produto"
                className="w-full rounded-full bg-white px-5 py-3 text-black outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <button
              type="button"
              onClick={deletarProduto}
              disabled={loading}
              className="mt-1 w-full rounded-full bg-red-600 py-3 text-xl font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
            >
              DELETAR
            </button>

            <div className="mt-5 flex w-full items-center justify-center gap-24">
              <button type="button" onClick={decrementarEstoque} className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-primary text-5xl text-brand-primary">
                -
              </button>
              <h2 className="text-5xl font-medium text-brand-primary">{estoque}</h2>
              <button type="button" onClick={incrementarEstoque} className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-primary text-5xl text-brand-primary">
                +
              </button>
            </div>

            <button
              type="button"
              onClick={salvarProduto}
              disabled={loading}
              className="mt-4 w-[400px] cursor-pointer rounded-full bg-brand-primary py-2 text-2xl font-medium text-white shadow-lg shadow-gray-400 transition hover:bg-brand-primaryHover disabled:opacity-60"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
