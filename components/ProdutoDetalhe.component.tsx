"use client";

import Link from "next/link";
import { useState } from "react";
import ModalEditarProduto from "@/components/modals/ModalEditarProduto";

interface ImagemProduto {
  id: number;
  url_imagem: string;
  ordem: number;
}

interface Subcategoria {
  id: number;
  nome: string;
}

interface Produto {
  id: number;
  loja_id?: number;
  nome: string;
  descricao?: string | null;
  preco: number | string;
  estoque: number;
  loja?: {
    nome: string;
    logo_url?: string | null;
    usuarioId?: number;
  };
  categoria?: {
    id: number;
    nome: string;
    categoria_pai_id?: number | null;
  };
  imagens_produto?: ImagemProduto[];
}

interface Props {
  produto: Produto;
  podeEditar: boolean;
  token: string | null;
  subCategorias: Subcategoria[];
  produtosMesmaLoja: Produto[];
}

function apiUrl(path?: string | null) {
  if (!path) return "";
  return path.startsWith("http") ? path : `http://localhost:3001${path}`;
}

function formatarPreco(preco: number | string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(preco));
}

export default function ProdutoDetalhe({ produto, podeEditar, token, subCategorias, produtosMesmaLoja }: Props) {
  const imagens = [...(produto.imagens_produto || [])].sort((a, b) => a.ordem - b.ordem);
  const [imagemSelecionada, setImagemSelecionada] = useState(imagens[0]?.url_imagem || "");
  const logoLoja = apiUrl(produto.loja?.logo_url);
  const descricao = produto.descricao?.trim();

  return (
    <>
      <section className="mx-auto grid w-full max-w-[1500px] grid-cols-[64px_150px_minmax(650px,1fr)_470px] gap-7 px-14 py-12">
        <Link
          href="/"
          aria-label="Voltar para a pagina inicial"
          className="mt-5 flex h-12 w-12 items-center justify-center text-5xl font-light text-black transition hover:text-brand-primary"
        >
          &lt;
        </Link>

        <div className="flex h-[650px] flex-col gap-[30px]">
          {imagens.slice(0, 4).map((imagem, index) => (
            <button
              key={imagem.id}
              type="button"
              onClick={() => setImagemSelecionada(imagem.url_imagem)}
              className={`flex h-[140px] w-[140px] items-center justify-center overflow-hidden rounded-2xl bg-white p-4 transition ${
                imagemSelecionada === imagem.url_imagem ? "ring-4 ring-brand-primary" : "hover:ring-2 hover:ring-brand-primary/40"
              }`}
            >
              <img
                src={apiUrl(imagem.url_imagem)}
                alt={`${produto.nome} ${index + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>

        <div className="relative flex h-[650px] items-center justify-center rounded-2xl bg-white p-10">
          {imagemSelecionada ? (
            <img src={apiUrl(imagemSelecionada)} alt={produto.nome} className="h-full w-full object-contain" />
          ) : (
            <p className="text-4xl text-brand-primary">Imagem indisponivel</p>
          )}

          {logoLoja && (
            <div className="absolute right-4 top-4 flex h-[86px] w-[86px] items-center justify-center rounded-full bg-[#004574] p-3">
              <img src={logoLoja} alt={`Logo ${produto.loja?.nome || "loja"}`} className="max-h-full max-w-full object-contain" />
            </div>
          )}
        </div>

        <aside className="pt-3">
          <div className="flex items-start gap-3">
            <h1 className="text-[48px] font-medium leading-none text-black">{produto.nome}</h1>
            {podeEditar && token && <ModalEditarProduto produto={produto} token={token} subCategorias={subCategorias} />}
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-lg">
            {produto.categoria?.nome && <span className="text-brand-primary">{produto.categoria.nome}</span>}
            <span className={produto.estoque > 0 ? "text-brand-primary" : "text-[#AF052A]"}>
              {produto.estoque > 0 ? `${produto.estoque} disponiveis` : "indisponivel"}
            </span>
          </div>

          <p className="mt-3 text-[54px] font-light leading-none text-black">{formatarPreco(produto.preco)}</p>

          <div className="mt-9">
            <h2 className="text-3xl font-semibold text-black">{"Descri\u00e7\u00e3o"}</h2>
            <p className="mt-4 max-w-[460px] whitespace-pre-line text-lg leading-tight text-black/80">
              {descricao || "Sem descricao cadastrada."}
            </p>
          </div>

          {produto.loja?.nome && (
            <p className="mt-10 text-lg text-black/70">
              vendido por <span className="font-semibold text-brand-primary">{produto.loja.nome}</span>
            </p>
          )}
        </aside>
      </section>

      {produtosMesmaLoja.length > 0 && (
        <section className="mx-auto w-full max-w-[1500px] px-14 pb-16">
          <h2 className="mb-8 text-5xl font-medium text-black">Da mesma loja</h2>

          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-10 pb-4">
              {produtosMesmaLoja.map((item) => {
                const imagem = [...(item.imagens_produto || [])].sort((a, b) => a.ordem - b.ordem)[0]?.url_imagem;
                const itemLogoLoja = apiUrl(item.loja?.logo_url);

                return (
                  <Link
                    key={item.id}
                    href={`/produto/${item.id}`}
                    className="relative flex h-[350px] min-w-[255px] flex-col rounded-[32px] bg-white px-6 py-6 transition hover:scale-[1.02]"
                  >
                    {itemLogoLoja && (
                      <div className="absolute right-5 top-5 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#004574] p-3">
                        <img src={itemLogoLoja} alt={`Logo ${item.loja?.nome || "loja"}`} className="max-h-full max-w-full object-contain" />
                      </div>
                    )}

                    <div className="flex h-[170px] items-center justify-center">
                      {imagem ? (
                        <img src={apiUrl(imagem)} alt={item.nome} className="h-full w-full object-contain" />
                      ) : (
                        <span className="text-brand-primary">Sem imagem</span>
                      )}
                    </div>

                    <h3 className="mt-5 line-clamp-2 text-3xl font-semibold leading-none text-black">{item.nome}</h3>
                    <p className="mt-3 text-2xl text-black">{formatarPreco(item.preco)}</p>
                    <span className={item.estoque > 0 ? "mt-1 text-lg font-semibold text-[#A6D800]" : "mt-1 text-lg font-semibold text-[#AF052A]"}>
                      {item.estoque > 0 ? "DISPONIVEL" : "INDISPONIVEL"}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
