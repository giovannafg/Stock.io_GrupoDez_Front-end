"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

interface Categoria {
  id: number;
  nome: string;
  categoria_pai_id?: number | null;
  categoria_pai?: {
    nome: string;
  } | null;
}

interface Produto {
  id: number;
  nome: string;
  preco: number | string;
  categoria?: {
    nome: string;
    categoria_pai?: {
      nome: string;
    } | null;
  };
  imagens_produto?: {
    url_imagem: string;
    ordem: number;
  }[];
}

interface Props {
  categoriaAtual?: string;
  subcategoriaAtual?: string;
}

function apiUrl(path?: string | null) {
  if (!path) return "";
  return path.startsWith("http") ? path : `http://localhost:3001${path}`;
}

function normalizar(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function formatarPreco(preco: number | string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(preco));
}

export default function SearchBar({ categoriaAtual, subcategoriaAtual }: Props) {
  const [query, setQuery] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [dropdownVisivel, setDropdownVisivel] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const termo = query.trim();

  useEffect(() => {
    let ativo = true;

    async function buscar() {
      if (termo.length === 0) {
        setProdutos([]);
        return;
      }

      setCarregando(true);

      try {
        const [categoriasRes, produtosRes] = await Promise.all([
          fetch("http://localhost:3001/categorias").then((res) => (res.ok ? res.json() : [])),
          fetch(`http://localhost:3001/produtos?search=${encodeURIComponent(termo)}`).then((res) => (res.ok ? res.json() : [])),
        ]);

        if (!ativo) return;
        setCategorias(categoriasRes);
        setProdutos(produtosRes);
      } catch {
        if (!ativo) return;
        setCategorias([]);
        setProdutos([]);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    const timeout = setTimeout(buscar, 180);

    return () => {
      ativo = false;
      clearTimeout(timeout);
    };
  }, [termo]);

  useEffect(() => {
    function fecharAoClicarFora(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setDropdownVisivel(false);
      }
    }

    document.addEventListener("mousedown", fecharAoClicarFora);

    return () => {
      document.removeEventListener("mousedown", fecharAoClicarFora);
    };
  }, []);

  const categoriasFiltradas = useMemo(() => {
    if (!termo) return [];

    const busca = normalizar(termo);
    return categorias
      .filter((categoria) => {
        if (!categoriaAtual) return true;

        const categoriaPrincipal = categoria.categoria_pai?.nome || categoria.nome;
        const dentroDaCategoria = normalizar(categoriaPrincipal) === normalizar(categoriaAtual);
        if (!dentroDaCategoria) return false;

        if (!subcategoriaAtual) return true;
        return normalizar(categoria.nome) === normalizar(subcategoriaAtual);
      })
      .filter((categoria) => normalizar(categoria.nome).includes(busca))
      .slice(0, 4);
  }, [categorias, categoriaAtual, subcategoriaAtual, termo]);

  const produtosFiltrados = produtos
    .filter((produto) => {
      if (!categoriaAtual) return true;

      const categoriaProduto = produto.categoria?.nome;
      const categoriaPaiProduto = produto.categoria?.categoria_pai?.nome;
      const dentroDaCategoria =
        normalizar(categoriaProduto || "") === normalizar(categoriaAtual) ||
        normalizar(categoriaPaiProduto || "") === normalizar(categoriaAtual);

      if (!dentroDaCategoria) return false;
      if (!subcategoriaAtual) return true;

      return normalizar(categoriaProduto || "") === normalizar(subcategoriaAtual);
    })
    .slice(0, 5);
  const dropdownAberto = dropdownVisivel && termo.length > 0;

  function categoriaHref(categoria: Categoria) {
    if (categoria.categoria_pai?.nome) {
      return `/categoria/${categoria.categoria_pai.nome}?subcategoria=${encodeURIComponent(categoria.nome)}`;
    }

    return `/categoria/${categoria.nome}`;
  }

  function categoriaLabel(categoria: Categoria) {
    if (categoria.categoria_pai?.nome) {
      return (
        <>
          em categoria: <span className="font-semibold text-brand-primary">{categoria.categoria_pai.nome}</span>
          <span className="text-black/40"> / </span>
          subcategoria: <span className="font-semibold text-brand-primary">{categoria.nome}</span>
        </>
      );
    }

    return (
      <>
        em categoria: <span className="font-semibold text-brand-primary">{categoria.nome}</span>
      </>
    );
  }

  return (
    <div ref={containerRef} className="relative w-[700px]">
      <div className="flex h-[45px] items-center justify-between rounded-full bg-white px-7">
        <input
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setDropdownVisivel(true);
          }}
          onFocus={() => {
            if (termo.length > 0) setDropdownVisivel(true);
          }}
          placeholder="Procurar por..."
          className="w-full text-2xl text-brand-primary outline-none"
        />
        <img src="/Lupa.png" alt="Buscar" className="w-5" />
      </div>

      {dropdownAberto && (
        <div className="absolute right-0 top-14 z-[80] w-full overflow-hidden rounded-3xl bg-white shadow-2xl">
          {carregando ? (
            <div className="px-6 py-5 text-xl text-brand-primary">Buscando...</div>
          ) : categoriasFiltradas.length === 0 && produtosFiltrados.length === 0 ? (
            <div className="px-6 py-5 text-xl text-black/60">Nenhum resultado encontrado.</div>
          ) : (
            <div className="max-h-[430px] overflow-y-auto py-3">
              {categoriasFiltradas.length > 0 && (
                <div className="border-b border-black/10 pb-2">
                  <h3 className="px-6 pb-2 text-lg font-semibold text-black/50">Categorias</h3>
                  {categoriasFiltradas.map((categoria) => (
                    <Link
                      key={categoria.id}
                      href={categoriaHref(categoria)}
                      className="block px-6 py-3 text-2xl text-black transition hover:bg-brand-bg"
                    >
                      {categoriaLabel(categoria)}
                    </Link>
                  ))}
                </div>
              )}

              {produtosFiltrados.length > 0 && (
                <div className="pt-2">
                  <h3 className="px-6 pb-2 text-lg font-semibold text-black/50">Produtos</h3>
                  {produtosFiltrados.map((produto) => {
                    const imagem = [...(produto.imagens_produto || [])].sort((a, b) => a.ordem - b.ordem)[0]?.url_imagem;

                    return (
                      <Link
                        key={produto.id}
                        href={`/produto/${produto.id}`}
                        className="flex items-center gap-4 px-6 py-3 transition hover:bg-brand-bg"
                      >
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-bg p-2">
                          {imagem ? (
                            <img src={apiUrl(imagem)} alt={produto.nome} className="h-full w-full object-contain" />
                          ) : (
                            <span className="text-sm text-brand-primary">sem img</span>
                          )}
                        </div>
                        <div>
                          <p className="text-2xl font-semibold leading-none text-black">{produto.nome}</p>
                          <p className="mt-1 text-lg text-brand-primary">{formatarPreco(produto.preco)}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
