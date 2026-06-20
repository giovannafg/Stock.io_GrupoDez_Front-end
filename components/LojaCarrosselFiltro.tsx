// components/lojas-section.component.tsx
'use client'

import { useState, useEffect } from 'react'
import { useState as useCarouselState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Link from 'next/link'
import { ChevronUp } from 'lucide-react'

const categorias = [
  "Mercado",
  "Farmacia",
  "Beleza",
  "Moda",
  "Eletronicos",
  "Jogos",
  "Brinquedos",
  "Casa"
]
interface LojaCarrosselProps {
  items: loja[]
}

interface loja {
  id: number
  nome: string
  logo: string
  categoria: string
}

// Carrossel
function LojaCarrossel({ items }: LojaCarrosselProps) {
  const [emblaRef] = useEmblaCarousel({ dragFree: true })

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-15 pb-5">
        {items.map((loja) => (
          <Link
            href={`/lojas/${loja.id}`}
            key={loja.nome}
            className="flex flex-col items-center hover:scale-101 transition cursor-pointer"
          >
            <div  className="w-[130px] h-[130px] flex items-center justify-center">
              <img src={`http://localhost:3001${loja.logo}`} 
              className="max-w-full max-h-full object-contain" />
            </div>
            <h3 className="mt-1 text-[20px]">{loja.nome}</h3>
            <h3 className="text-brand-primary">{loja.categoria}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

// Filtros
function Filtros({ onChange }: { onChange: (selecionadas: string[]) => void }) {
  const [aberto, setAberto] = useState(false)
  const [selecionadas, setSelecionadas] = useState<string[]>([])

  function toggleCategoria(categoria: string) {
    const novas = selecionadas.includes(categoria)
      ? selecionadas.filter(c => c !== categoria)
      : [...selecionadas, categoria]

    setSelecionadas(novas)
    onChange(novas)
  }

  return (
    <div className="w-[450px] bg-white rounded-[30px] px-4 py-2 self-end absolute">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setAberto(!aberto)}
      >
        <h2 className="text-brand-primary opacity-50 text-2xl">filtros</h2>
        <ChevronUp
          className={`text-brand-primary opacity-50 transition ${aberto ? "rotate-0" : "rotate-180"}`}
          size={30}
        />
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${aberto ? "max-h-[500px] mt-6" : "max-h-0"}`}>
        <div className="flex flex-col gap-4">
          {categorias.map((categoria) => (
            <label key={categoria} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selecionadas.includes(categoria)}
                onChange={() => toggleCategoria(categoria)}
                className="w-6 h-6 accent-brand-primary rounded"
              />
              <span className="text-2xl text-brand-primary">{categoria}</span>
              <img src={`categorias/${categoria}.svg`} className="w-8 h-8 object-contain" />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

// Componente principal
export default function LojasSection({lojas}: { lojas: loja[] }) {

  const [selecionadas, setSelecionadas] = useState<string[]>([])


  const lojasFiltradas = selecionadas.length === 0
    ? lojas
    : lojas.filter(loja => selecionadas.includes(loja.categoria))

  return (
    <section className="mb-30">
      <div className="flex flex-row relative justify-between mt-10 mb-10 z-50">
        <h2 className="text-5xl text-black" >Lojas</h2>
        <div className="relative flex flex-col">
          <Filtros onChange={setSelecionadas} />
        </div>
      </div>
      <LojaCarrossel items ={lojasFiltradas} />
    </section>
  )
}
