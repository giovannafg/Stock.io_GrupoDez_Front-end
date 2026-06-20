'use client'

import useEmblaCarousel from 'embla-carousel-react'
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

export default function LojaCarrossel({ title, items }: Props , ) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true })

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
    </section>
  )
}
