
import Carrossel from "@/components/carrossel.component";
import LojaCarrossel from "@/components/lojasCarrossel.component";
import { Navbar } from "@/components/navbar.component";
import ProdutosGrid from '@/components/ProdutosGrid.component';
import SearchBar from "@/components/SearchBar.component";

interface Props {
    params: {slug:string}
    searchParams?: Promise<{ subcategoria?: string }>
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


export default async function CategoriaPage({params, searchParams}:Props){
    const {slug}= await params
    const query = searchParams ? await searchParams : {}
    const subcategoriaInicial = query.subcategoria ? decodeURIComponent(query.subcategoria) : undefined

    const produtosCategoriaLista=await fetch(`http://localhost:3001/produtos/categoria/${slug}`)
    .then(res=>res.json())
    console.log(produtosCategoriaLista)

    const lojas = await fetch(`http://localhost:3001/lojas/categoria/${slug}`)
    .then(res => res.json())

    const produtosDisponiveis = produtosCategoriaLista.filter((produto: Produto) => produto.estoque > 0)

    const subcategorias= await fetch(`http://localhost:3001/produtos/subcategorias/${slug}`)
    .then(res=>res.json())

    // console.log('Subcategorias únicas:', subcategorias)

    
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
                            <SearchBar categoriaAtual={slug} subcategoriaAtual={subcategoriaInicial} />
                        </section>
                        {/* Tipos e as abas de produtos */}
                        <section className="mt-4">
                            <ProdutosGrid subcategorias={subcategorias} produtosIniciais={produtosCategoriaLista} subcategoriaInicial={subcategoriaInicial}></ProdutosGrid>
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
                {/* Nao tem, ent troquei por disponiveis */}
                <section className="bg-brand-bg w-full">
                    <div className="px-20 py-10 m-10">
                        <h2 className="text-5xl text-black mb-10 font-medium">Disponíveis</h2>
                        <Carrossel title="Carrossel produtos disponiveis de cada categoria" items={produtosDisponiveis}></Carrossel>
                    </div>
                {/* recem adicionados de categoria especifica */}   
                    <div className="px-20 py-10 m-10">
                        <h2 className="text-5xl text-black mb-10 font-medium">Recém adicionados </h2>
                        <Carrossel title="Carrossel principais produtos de dada categoria" items={produtosCategoriaLista}></Carrossel>
                    </div>
                </section>

                
        </main>
    )
}
