"use client";

import Link from "next/link";
import { useState } from "react";

interface Loja {
  id: number;
  nome: string;
  categoria?: string;
  descricao?: string | null;
  logo?: string | null;
  logo_url?: string | null;
  banner_url?: string | null;
  usuarioId?: number;
  usuario?: {
    id?: number;
    nome?: string | null;
    userName?: string | null;
  };
}

interface Produto {
  id: number;
  nome: string;
  preco: number | string;
  estoque: number;
  loja?: {
    nome?: string;
    logo_url?: string | null;
  };
  imagens_produto?: {
    id: number;
    url_imagem: string;
    ordem: number;
  }[];
}

interface Props {
  loja: Loja;
  produtos: Produto[];
}

const PRODUTOS_POR_PAGINA = 10;

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

export default function LojaDetalhe({ loja, produtos }: Props) {
  const [pagina, setPagina] = useState(1);
  const totalPaginas = Math.max(1, Math.ceil(produtos.length / PRODUTOS_POR_PAGINA));
  const produtosPagina = produtos.slice((pagina - 1) * PRODUTOS_POR_PAGINA, pagina * PRODUTOS_POR_PAGINA);
  const banner = apiUrl(loja.banner_url);
  const dono = loja.usuario?.nome || loja.usuario?.userName;
  const donoId = loja.usuario?.id || loja.usuarioId;

  return (
    <>
      <section className="relative h-[560px] w-full overflow-hidden bg-black">
        {banner ? (
          <img src={banner} alt={`Banner da loja ${loja.nome}`} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,#3B2C56_0,#111_42%,#000_80%)]" />
        )}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1500px] items-center justify-center px-16">
          <div>
            <h1 className="text-[92px] font-semibold leading-none text-white">{loja.nome}</h1>
            {loja.categoria && <p className="text-4xl font-light lowercase text-white">{loja.categoria}</p>}
            {loja.descricao && <p className="mt-4 max-w-[760px] text-2xl leading-tight text-white/80">{loja.descricao}</p>}
          </div>

          {dono && (
            <Link
              href={donoId ? `/perfil/${donoId}` : "#"}
              className="absolute bottom-8 right-16 text-2xl text-white/90 underline-offset-4 transition hover:text-brand-primary hover:underline"
            >
              by {dono}
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-14 py-12">
        <div className="mb-9 flex items-baseline gap-2">
          <h2 className="text-5xl font-semibold text-black">Produtos</h2>
          <span className="text-xl font-semibold text-black">de {loja.nome}</span>
        </div>

        {produtosPagina.length > 0 ? (
          <div className="grid grid-cols-5 gap-x-8 gap-y-7">
            {produtosPagina.map((produto) => {
              const imagem = [...(produto.imagens_produto || [])].sort((a, b) => a.ordem - b.ordem)[0]?.url_imagem;

              return (
                <Link
                  key={produto.id}
                  href={`/produto/${produto.id}`}
                  className="relative flex h-[335px] flex-col rounded-[32px] bg-white px-6 py-6 transition hover:scale-[1.02]"
                >
                  <div className="flex h-[175px] items-center justify-center">
                    {imagem ? (
                      <img src={apiUrl(imagem)} alt={produto.nome} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-brand-primary">Sem imagem</span>
                    )}
                  </div>

                  <h3 className="mt-4 line-clamp-2 text-3xl font-semibold leading-none text-black">{produto.nome}</h3>
                  <p className="mt-2 text-3xl text-black">{formatarPreco(produto.preco)}</p>
                  <span className={produto.estoque > 0 ? "mt-1 text-lg font-semibold text-[#A6D800]" : "mt-1 text-lg font-semibold text-[#AF052A]"}>
                    {produto.estoque > 0 ? "DISPONIVEL" : "INDISPONIVEL"}
                  </span>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex min-h-[220px] items-center justify-center rounded-2xl bg-white">
            <p className="text-3xl text-brand-primary">Essa loja ainda nao tem produtos cadastrados.</p>
          </div>
        )}

        {totalPaginas > 1 && (
          <div className="mt-12 flex items-center gap-10 text-5xl text-black">
            <button
              type="button"
              onClick={() => setPagina((atual) => Math.max(1, atual - 1))}
              disabled={pagina === 1}
              className="transition hover:text-brand-primary disabled:opacity-30"
            >
              &lt;
            </button>

            {Array.from({ length: totalPaginas }, (_, index) => index + 1).map((numero) => (
              <button
                type="button"
                key={numero}
                onClick={() => setPagina(numero)}
                className={pagina === numero ? "font-semibold text-black" : "font-light text-black transition hover:text-brand-primary"}
              >
                {numero}
              </button>
            ))}

            <button
              type="button"
              onClick={() => setPagina((atual) => Math.min(totalPaginas, atual + 1))}
              disabled={pagina === totalPaginas}
              className="transition hover:text-brand-primary disabled:opacity-30"
            >
              &gt;
            </button>
          </div>
        )}
      </section>
    </>
  );
}
