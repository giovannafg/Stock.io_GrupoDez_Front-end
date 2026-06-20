'use client'

import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface loja {
  id: number
  nome: string
  logo: string
  categoria: string
  descricao: string 
}

interface Props {
  title: string
  items: loja[]
}

export default function LojaCarrossel({ items }: Props , ) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true })

  return (

    <section>
      <div className="overflow-hidden mx-25" ref={emblaRef}>
        <div className="flex gap-15 pb-5">
          {items.map((loja) => (
            <Link
              href={`/lojas/${loja.id}`}
              key={loja.id}
              className=" flex flex-col items-center hover:scale-101 transition cursor-pointer "
            >
              <div className="">
                <img src={`http://localhost:3001${loja.logo}`} className="w-[125px] object-contain" />
              </div>
              <div>
                <h3 className="mt-1 text-[20px] text-white">
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
      {items.length > 0 && (
        <div className="mt-4 flex justify-center gap-4">
          <button
            type="button"
            aria-label="Lojas anteriores"
            onClick={() => emblaApi?.scrollPrev()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-primary shadow transition hover:bg-brand-primary hover:text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            aria-label="Proximas lojas"
            onClick={() => emblaApi?.scrollNext()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-primary shadow transition hover:bg-brand-primary hover:text-white"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </section>
  )
}
