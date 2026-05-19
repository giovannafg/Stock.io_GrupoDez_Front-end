
import Carrossel from "@/components/carrossel.component";
import LojaCarrossel from "@/components/lojasCarrossel.component";
import { Navbar } from "@/components/navbar.component";
import ProdutosGrid from '@/components/ProdutosGrid.component';

interface Props {
    params: {slug:string}
}

interface Produto {
  id: number
  nome: string
  imagem: string
  loja: string // imagem logo da loja
  preco: number
  estoque: number
  subcategoria: string
}

const SUBCATEGORIAS_FIXAS = ['Celulares', 'Notebooks', 'TVs', 'Acessórios']

const ORDENACAO_OPCOES = [
  { label: 'Menor preço', value: 'preco_asc' },
  { label: 'Maior preço', value: 'preco_desc' },
  { label: 'Mais avaliados', value: 'avaliacao' },
  { label: 'Mais recentes', value: 'recente' },
]

const PRODUTOS_POR_PAGINA = 15

function ordenarProdutos(produtos: Produto[], ordem: string): Produto[]{
    switch (ordem){
        case 'preco_asc':  return [...produtos].sort((a, b) => a.preco - b.preco)
        case 'preco_desc': return [...produtos].sort((a, b) => b.preco - a.preco)
        case 'avaliacao':  return [...produtos] 
        case 'recente':    return [...produtos].reverse()
        default:           return produtos
    }
}

export default async function CategoriaPage({params}:Props){
    const {slug}= await params
    // const res=await fetch(`http://localhost:3000/api/produtos?categoria=${slug}`)
    // const produtosLista= await res.json()

        const lojas= [
        {
        nome: "cjr",
        imagem: "/lojas/cjr.svg",
        categoria:"mercado"
        },
        {
        nome: "cjr1",
        imagem: "/lojas/cjr.svg",
        categoria:"mercado"
        },
        {
        nome: "cjr2",
        imagem: "/lojas/cjr.svg",
        categoria:"mercado"
        },
        {
        nome: "cjr3",
        imagem: "/lojas/cjr.svg",
        categoria:"mercado"
        },
        {
        nome: "cjr4",
        imagem: "/lojas/cjr.svg",
        categoria:"mercado"
        },
        {
        nome: "cjr5",
        imagem: "/lojas/cjr.svg",
        categoria:"mercado"
        },

    ]
    const produtosList = [
    {
        id: 1,
        nome: "Brownie",
        preco:  4.70,
        imagem: "/produtos/brownie.svg",
        loja: "/lojas/cjr.svg",
        estoque: 12,
        subcategoria: 'Notebooks'
    },
    {
        id: 2,
        nome: "Mouse Gamer",
        preco: 120.00,
        imagem: "/produtos/mouse.png",
        loja: "/lojas/cjr.svg",
        estoque: 0,
        subcategoria: 'Celulares'
    },
    {
        id: 3,
        nome: "Headset",
        preco: 250,
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10,
        subcategoria: 'TVs'
    },
    {
        id: 4,
        nome: "Teclado",
        preco: 180,
        imagem: "/produtos/teclado.svg ",
        loja: "/lojas/cjr.svg",
        estoque: 10,
        subcategoria: 'Notebooks'
    },
    {
        id: 5,
        nome: "Headset1",
        preco: 250,
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10,
        subcategoria: 'Notebooks'
    },
        {
        id: 6,
        nome: "Headset2",
        preco: 250,
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10,
        subcategoria: 'Notebooks'
    },
        {
        id: 7,
        nome: "Headset3",
        preco: 250,
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10,
        subcategoria: 'Notebooks'
    },
        {
        id: 8,
        nome: "Headset4",
        preco: 250,
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10,
        subcategoria: 'Notebooks'
    }
    
    ]
    
    return(
        
        <main>
            <Navbar></Navbar>
            <section className="w-full h-[539px] bg-black overflow-hidden">
            <div className="w-full max-w-[2000px] mx-auto h-full flex items-center justify-center px-20">

                {/* texto */}
                <div className="w-[90vh] flex justify-end">
                <h1 className="text-white text-6xl text-right font-semibold">
                    O universo da tecnologia
                    <br />
                    em um só lugar
                </h1>
                </div>

                {/* imagem */}
                <div className="w-[35%] flex justify-center items-end h-full">
                <img
                    src="/Stockles.svg"
                    style={{ height: '90vh', width: 'auto', marginBottom: '-42vh' }}
                />
                </div>

            </div>
            </section>
            
                <div className="w-full bg-brand-bg h-auto relative z-10">
                    <div className="px-20 py-10">
                    {/* Procurar */}
                        <section className="pt-2 flex justify-end ">
                            <div className="bg-white rounded-full w-[700px] h-[45px] items-center px-7 flex justify-between">
                                <input type="text"
                                placeholder="Procurar por..."
                                className="text-brand-primary text-2xl outline-none"></input>
                                <div className="">
                                    <img src="/Lupa.png" className="w-5"></img>
                                </div>
                            </div>
                        </section>
                        {/* Tipos e as abas de produtos */}
                        <section className="mt-4">
                            <ProdutosGrid categoria={slug} produtosIniciais={produtosList}></ProdutosGrid>
                        </section>
                    </div>    
                </div>
                        {/* Principais lojas de categoria especifica */}
                <section>
                    <div className="bg-black p-10">
                        <div>
                            <h2 className="text-5xl text-white my-10 mx-25">
                                Principais Lojas 
                            </h2>
                            <LojaCarrossel title="Carrossel preto" items={lojas}></LojaCarrossel>
                        </div>    
                    </div>
                </section>
                {/* Principais produtos de categoria especifica */}
                <section className="bg-brand-bg w-full">
                    <div className="px-20 py-10 m-10">
                        <h2 className="text-5xl text-black mb-10 font-medium">Mais Populares</h2>
                        <Carrossel title="Carrossel principais produtos de dada categoria" items={produtosList}></Carrossel>
                    </div>
                {/* recem adicionados de categoria especifica */}   
                    <div className="px-20 py-10 m-10">
                        <h2 className="text-5xl text-black mb-10 font-medium">Recém adicionados </h2>
                        <Carrossel title="Carrossel principais produtos de dada categoria" items={produtosList}></Carrossel>
                    </div>
                </section>

                
        </main>
    )
}