
import Carrossel from "@/components/carrossel.component";
import LojasSection from "@/components/LojaCarrosselFiltro";
import Filtros from "@/components/LojaCarrosselFiltro";
import LojaCarrossel from "@/components/lojasCarrossel.component";
import { Navbar } from "@/components/navbar.component";
import SearchBar from "@/components/SearchBar.component";
import Link from "next/link";


export default async function  home(){
    const categorias =[
        {
            nome:"Mercado",
            value: "Mercado",
            imagem: "categorias/mercado.svg"
        },
        {
            nome:"Farmácia",
            value: "Farmacia",
            imagem: "categorias/farmacia.svg"
        },
        {
            nome:"Beleza",
            value: "Beleza",
            imagem: "categorias/beleza.svg"
        },
        {
            nome:"Moda",
            value: "Moda",
            imagem: "categorias/moda.svg"
        },
        {
            nome:"Eletrônicos",
            value: "Eletronicos",
            imagem: "categorias/eletronicos.svg"
        },
        {
            nome:"Jogos",
            value: "Jogos",
            imagem: "categorias/jogos.svg"
        },
        {
            nome:"Brinquedos",
            value: "Brinquedos",
            imagem: "categorias/brinquedos.svg"
        },
        {
            nome:"Casa",
            value: "Casa",
            imagem: "categorias/casa.svg"
        },
    ]

    const produtosMaisBaratos = await fetch(
        'http://localhost:3001/produtos/menor-preco'
    ).then(res => res.ok ? res.json() : [])
    .catch(() => [])

    const produtosRecemAdd = await fetch(
        'http://localhost:3001/produtos/recem-add'
    ).then(res => res.ok ? res.json() : [])
    .catch(() => [])

    const lojas = await fetch(
        'http://localhost:3001/lojas'
    ).then(res => res.ok ? res.json() : [])
    .catch(() => [])

    return(
        <main>
            <Navbar></Navbar>
            <section className="w-full h-[539px] bg-black overflow-hidden">
            <div className="w-full max-w-[2000px] mx-auto h-full flex items-center justify-center px-20">

                {/* texto */}
                <div className="w-[90vh] flex justify-end">
                <h1 className="text-white text-6xl text-right font-semibold">
                    Do CAOS à organização,
                    <br />
                    em alguns cliques
                </h1>
                </div>

                {/* imagem */}
                <div className="w-[45%] flex justify-center items-end h-full">
                <img
                    src="Group30.png"
                    style={{ height: '90vh', width: 'auto', marginBottom: '-42vh' }}
                />
                </div>

            </div>
            </section>
            <div className="w-full bg-brand-bg h-auto relative z-10">
                <div className="px-20 py-10">
                    {/* Procurar */}
                    <section className="pt-2 flex justify-end ">
                        <SearchBar />
                    </section>
                    {/* Categorias */}
                    <section className="flex flex-col mt-10">
                        <h2 className=" text-5xl mb-10 text-black">
                            Categoria
                        </h2>
                        <div className="flex gap-8">
                        {categorias.map((categoria)=>(
                            <Link key={categoria.nome} href={`/categoria/${categoria.value}`} className="bg-white h-[130px] w-[130px] hover:scale-105 transition cursor-pointer rounded-[35px] flex flex-col items-center justify-center gap-2">
                                {/* <div className="bg-white h-[120px] w-[120px] rounded-[35px] flex flex-col items-center justify-center gap-2"> */}
                                    <img src={categoria.imagem}></img>
                                    <p>{categoria.nome}</p>
                                {/* </div> */}
                            </Link>
                        ))}
                        </div>
                    </section>
                    {/* Melhores avaliados */}
                    {/* <section>
                         <div className=" flex items-baseline gap-4 mb-10 mt-10">

                            <h2 className="text-5xl text-black">
                                Produtos
                            </h2>

                            <button className="font-semibold text-brand-primary">
                                Melhores avaliados
                            </button>

                        </div>
                        <Carrossel title="Mais Avaliados" items={produtos}></Carrossel>
                    </section> */}

                    {/* Mais baratos */}
                    <section>
                        <div className=" flex items-baseline gap-4 mb-10 mt-10">

                            <h2 className="text-5xl text-black">
                                Produtos
                            </h2>

                            <button className="font-semibold text-brand-primary">
                                Mais Baratos
                            </button> 
                        </div>
                        <Carrossel title="Mais baratos" items={produtosMaisBaratos}></Carrossel>
                    </section>
                    {/* Mais recem adicionados */}
                    <section>
                        <section>
                        <div className=" flex items-baseline gap-4 mb-10 mt-10">

                            <h2 className="text-5xl text-black">
                                Produtos
                            </h2>

                            <button className="font-semibold text-brand-primary">
                                Recém adicinionados
                            </button> 
                        </div>
                        <Carrossel title="Recem add" items={produtosRecemAdd}></Carrossel>
                    </section>
                    </section> 
                    {/* Lojas */}
                    <section className="mb-30">

                        <LojasSection lojas={lojas}></LojasSection>
                        {/*Carrossel de lojas*/}
                            {/* <LojaCarrossel title="carrossel de lojas" items={lojas}></LojaCarrossel> */}
                    </section>                                       
                </div>
            </div>
        </main>    
    )

}
