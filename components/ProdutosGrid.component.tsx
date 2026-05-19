'use client'

import { useState } from 'react'
import Link from 'next/link'

const SUBCATEGORIAS_FIXAS = ['Celulares', 'Notebooks', 'TVs', 'Acessórios']

const ORDENACAO_OPCOES = [
  { label: 'Menor preço', value: 'preco_asc' },
  { label: 'Maior preço', value: 'preco_desc' },
  { label: 'Mais avaliados', value: 'avaliacao' },
  { label: 'Mais recentes', value: 'recente' },
]

const PRODUTOS_POR_PAGINA = 15

interface Produto {
  id: number
  nome: string
  imagem: string
  loja: string
  preco: number | string
  estoque: number
  subcategoria: string
}

interface Props {
  categoria: string
  produtosIniciais: Produto[]
}

function ordenarProdutos(produtos: Produto[], ordem: string): Produto[] {
  switch (ordem) {
    case 'preco_asc':  return [...produtos].sort((a, b) => Number(a.preco) - Number(b.preco))
    case 'preco_desc': return [...produtos].sort((a, b) => Number(b.preco) - Number(a.preco))
    case 'recente':    return [...produtos].reverse()
    default:           return produtos
  }
}

export default function ProdutosGrid({ categoria, produtosIniciais }: Props) {
  const [subcategoria, setSubcategoria] = useState('Todos')
  const [ordenacao, setOrdenacao] = useState('')
  const [ordenacaoAberta, setOrdenacaoAberta] = useState(false)
  const [pagina, setPagina] = useState(1)

  const produtosFiltrados = (() => {
    let lista = produtosIniciais

    if (subcategoria === 'Outros') {
      lista = lista.filter(p => !SUBCATEGORIAS_FIXAS.includes(p.subcategoria))
    } else if (subcategoria !== 'Todos') {
      lista = lista.filter(p => p.subcategoria === subcategoria)
    }

    return ordenarProdutos(lista, ordenacao)
  })()

  const totalPaginas = Math.ceil(produtosFiltrados.length / PRODUTOS_POR_PAGINA)
  const produtosPagina = produtosFiltrados.slice(
    (pagina - 1) * PRODUTOS_POR_PAGINA,
    pagina * PRODUTOS_POR_PAGINA
  )

  function mudarSubcategoria(nova: string) {
    setSubcategoria(nova)
    setPagina(1)
  }

  const abas = ['Todos', ...SUBCATEGORIAS_FIXAS, 'Outros']
  const ordenacaoLabel = ORDENACAO_OPCOES.find(o => o.value === ordenacao)?.label || 'ordenar por'

  return (
    <div className="px-20 py-10">
      {/* Abas + Ordenação */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex gap-2 flex-wrap">
          {abas.map(aba => (
            <button
              key={aba}
              onClick={() => mudarSubcategoria(aba)}
              className={`
                px-5 py-2 rounded-full text-sm font-medium transition
                ${subcategoria === aba
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-white text-[#C4A2EC] border-gray-300 hover:border-brand-primary hover:text-brand-primary'
                }
              `}
            >
              {aba}
            </button>
          ))}
        </div>

        {/* Ordenação */}
        <div className="relative">
          <button
            onClick={() => setOrdenacaoAberta(!ordenacaoAberta)}
            className="flex items-center gap-3 bg-white  rounded-full px-6 py-2 text-[#C4A2EC] min-w-[400px] justify-between"
          >
            <span>{ordenacaoLabel}</span>
            <span className={`transition-transform ${ordenacaoAberta ? 'rotate-180' : ''}`}>▾</span>
          </button>

          {ordenacaoAberta && (
            <div className="absolute right-0 top-12 bg-white rounded-2xl z-50 min-w-[200px] overflow-hidden">
              {ORDENACAO_OPCOES.map(op => (
                <button
                  key={op.value}
                  onClick={() => {
                    setOrdenacao(op.value)
                    setOrdenacaoAberta(false)
                    setPagina(1)
                  }}
                  className={`
                    w-full text-left px-5 py-3 text-sm hover:bg-gray-50 transition
                    ${ordenacao === op.value ? 'text-brand-primary font-medium' : 'text-[#C4A2EC]'}
                  `}
                >
                  {op.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-5 pb-5">
        {produtosPagina.map(produto => (
          <Link
            href={`/produto/${produto.id}`}
            key={produto.id}
            className=" h-[320px] w-[23vh] bg-white rounded-2xl flex flex-col relative hover:scale-101 transition cursor-pointer overflow-hidden"
          >
            <div className="absolute top-4 right-4 z-10">
              <img src={produto.loja} className="w-[70px] object-contain" />
            </div>
            <div className="flex justify-center items-center h-[160px]">
              <img src={produto.imagem} className="w-[180px]" />
            </div>
            <div className="mt-6">
              <h3 className="text-3xl font-semibold px-5">{produto.nome}</h3>
              <p className="text-2xl mt-2 px-5">
                {typeof produto.preco === 'number'
                ? produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                : produto.preco}
              </p>
              {produto.estoque > 0 ? (
                <span className="text-[#C6E700] font-bold px-5">DISPONÍVEL</span>
              ) : (
                <span className="text-[#AF052A] font-bold px-5">INDISPONÍVEL</span>
              )}
            </div>
          </Link>
          
        ))}
      </div>

      {/* Paginação */}
        {totalPaginas > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
            <button
            onClick={() => setPagina(p => Math.max(1, p - 1))}
            disabled={pagina === 1}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 disabled:opacity-30 hover:border-brand-primary hover:text-brand-primary transition"
            >
            ←
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1)
            .filter(n => n === 1 || n === totalPaginas || Math.abs(n - pagina) <= 1)
            .reduce<(number | string)[]>((acc, n, i, arr) => {
                if (i > 0 && n - (arr[i - 1] as number) > 1) acc.push('...')
                acc.push(n)
                return acc
            }, [])
            .map((n, i) => n === '...' ? (
                <span key={`dots-${i}`} className="text-gray-400">...</span>
            ) : (
                <button
                key={n}
                onClick={() => setPagina(n as number)}
                className={`
                    w-10 h-10 rounded-full text-sm font-medium transition
                    ${pagina === n
                    ? 'bg-brand-primary text-white'
                    : 'border border-gray-300 text-gray-600 hover:border-brand-primary hover:text-brand-primary'
                    }
                `}
                >
                {n}
                </button>
            ))
            }

            <button
            onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
            className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 disabled:opacity-30 hover:border-brand-primary hover:text-brand-primary transition"
            >
            →
            </button>
        </div>
        )}
    </div>
  )
}