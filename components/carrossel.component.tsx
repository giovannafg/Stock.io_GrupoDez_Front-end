'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

interface Produto {
  id: number
  nome: string
  imagem: string
  loja: string
  preco: string
  estoque: number
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
              className="min-w-[320px] bg-white rounded-[35px] p-6 flex flex-col relative hover:scale-101 transition cursor-pointer"
            >
              <div className="absolute top-4 right-4 z-10">
                <img src={produto.loja} className="w-[80px] object-contain" />
              </div>
              <div className="flex justify-center items-center h-[220px]">
                <img src={produto.imagem} className="w-[250px]" />
              </div>
              <div className="mt-6">
                <h3 className="text-3xl font-semibold">{produto.nome}</h3>
                <p className="text-2xl mt-3">{produto.preco}</p>
                {produto.estoque > 0 ? (
                  <span className="text-[#C6E700] font-bold">DISPONÍVEL</span>
                ) : (
                  <span className="text-[#AF052A] font-bold">INDISPONÍVEL</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}