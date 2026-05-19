'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

interface Produto {
  id: number
  nome: string
  imagem: string
  loja: string
  preco: number
  estoque: number
  subcategoria: string
}

interface Props {
  title: string
  items: Produto[]
}

export default function Carrossel({ title, items }: Props) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true })

  return (
    <section>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-8 pb-5">
          {items.map((produto) => (
            <Link
              href="#"
              key={produto.nome}
              className="min-w-[230px] h-[300px] bg-white rounded-2xl flex flex-col relative hover:scale-101 transition cursor-pointer"
            >
              <div className="absolute top-4 right-4 z-10">
                <img src={produto.loja} className="w-[70px] object-contain" />
              </div>
              <div className="flex justify-center items-center h-[160px]">
                <img src={produto.imagem} className="w-[180px]" />
              </div>
              <div className="mt-6">
                <h3 className="text-3xl font-semibold px-5">
                  {produto.nome}</h3>
                <p className="text-2xl mt-3 px-5">
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
      </div>
    </section>
  )
}