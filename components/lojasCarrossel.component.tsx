'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'

interface Produto {
  nome: string
  imagem: string
  categoria: string
}

interface Props {
  title: string
  items: Produto[]
}

export default function LojaCarrossel({ title, items }: Props) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true })

  return (
    <section>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-15 pb-5">
          {items.map((loja) => (
            <Link
              href="#"
              key={loja.nome}
              className=" flex flex-col items-center hover:scale-101 transition cursor-pointer"
            >
              <div className="">
                <img src={loja.imagem} className="w-[125px] object-contain" />
              </div>
              <div>
                <h3 className="mt-1 text-[20px]">
                    {loja.nome}
                </h3>
              </div>
              <div className="">
                <h3 className="text-brand-primary">{loja.categoria}</h3>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}