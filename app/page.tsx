
import Carrossel from "@/components/carrossel.component";
import LojaCarrossel from "@/components/lojasCarrossel.component";
import { Navbar } from "@/components/navbar.component";
import Link from "next/link";

export default function home(){
    const categorias =[
        {
            nome:"Mercado",
            imagem: "categorias/mercado.svg"
        },
        {
            nome:"Farmácia",
            imagem: "categorias/farmacia.svg"
        },
        {
            nome:"Beleza",
            imagem: "categorias/beleza.svg"
        },
        {
            nome:"Moda",
            imagem: "categorias/moda.svg"
        },
        {
            nome:"Eletrônicos",
            imagem: "categorias/informatica.svg"
        },
        {
            nome:"Jogos",
            imagem: "categorias/jogos.svg"
        },
        {
            nome:"Brinquedos",
            imagem: "categorias/brinquedos.svg"
        },
        {
            nome:"Casa",
            imagem: "categorias/casa.svg"
        },
    ]

    const produtos = [
    {
        id: 1,
        nome: "Brownie",
        preco: "R$ 4,70",
        imagem: "/produtos/brownie.svg",
        loja: "/lojas/cjr.svg",
        estoque: 12,
    },
    {
        id: 2,
        nome: "Mouse Gamer",
        preco: "R$ 120,00",
        imagem: "/produtos/mouse.png",
        loja: "/lojas/cjr.svg",
        estoque: 0
    },
    {
        id: 3,
        nome: "Headset",
        preco: "R$ 250,00",
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10
    },
    {
        id: 4,
        nome: "Teclado",
        preco: "R$ 180,00",
        imagem: "/produtos/teclado.svg ",
        loja: "/lojas/cjr.svg",
        estoque: 10
    },
    {
        id: 5,
        nome: "Headset1",
        preco: "R$ 250,00",
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10
    },
        {
        id: 6,
        nome: "Headset2",
        preco: "R$ 250,00",
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10
    },
        {
        id: 7,
        nome: "Headset3",
        preco: "R$ 250,00",
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10
    },
        {
        id: 8,
        nome: "Headset4",
        preco: "R$ 250,00",
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10
    }
    
    ]
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
    return(
        <main>
            <Navbar></Navbar>
            <section className="w-full h-[539px] bg-black flex items-center">
                <div className="w-full max-w-[2000px] mx-auto flex items-center justify-between">

                    {/* texto */}
                    <div className="w-[55%]  relative  translate-x-[20px]">
                        <h1 className="text-white text-6xl text-right font-semibold">
                            Do CAOS à organização,
                            <br />
                            em alguns cliques
                        </h1>
                    </div>

                    {/* imagem */}
                    <div className="w-[30%] flex relative  mt-[380px]  translate-x-[-130px] z-0">
                        <img
                            src="Group30.png"
                            className="scale-150"
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
                                <img src="Lupa.png" className="w-5"></img>
                            </div>
                        </div>
                    </section>
                    {/* Categorias */}
                    <section className="flex flex-col mt-10">
                        <h2 className=" text-5xl mb-10 ">
                            Categoria
                        </h2>
                        <div className="flex gap-8">
                        {categorias.map((categoria)=>(
                            <Link key={categoria.nome} href="#" className="bg-white h-[130px] w-[130px] hover:scale-105 transition cursor-pointer rounded-[35px] flex flex-col items-center justify-center gap-2">
                                {/* <div className="bg-white h-[120px] w-[120px] rounded-[35px] flex flex-col items-center justify-center gap-2"> */}
                                    <img src={categoria.imagem}></img>
                                    <p>{categoria.nome}</p>
                                {/* </div> */}
                            </Link>
                        ))}
                        </div>
                    </section>
                    {/* Melhores avaliados */}
                    <section>
                         <div className=" flex items-baseline gap-4 mb-10 mt-10">

                            <h2 className="text-5xl">
                                Produtos
                            </h2>

                            <button className="font-semibold text-brand-primary">
                                Melhores avaliados
                            </button>

                        </div>
                        <Carrossel title="Mais Avaliados" items={produtos}></Carrossel>
                    </section>
                    {/* Mais baratos */}
                    <section>
                        <div className=" flex items-baseline gap-4 mb-10 mt-10">

                            <h2 className="text-5xl">
                                Produtos
                            </h2>

                            <button className="font-semibold text-brand-primary">
                                Mais Baratos
                            </button> 
                        </div>
                        <Carrossel title="Mais baratos" items={produtos}></Carrossel>
                    </section>
                    {/* Mais recem adicionados */}
                    <section>
                        <section>
                        <div className=" flex items-baseline gap-4 mb-10 mt-10">

                            <h2 className="text-5xl">
                                Produtos
                            </h2>

                            <button className="font-semibold text-brand-primary">
                                Recém adicinionados
                            </button> 
                        </div>
                        <Carrossel title="Recem add" items={produtos}></Carrossel>
                    </section>
                    </section> 
                    {/* Lojas */}
                    <section>
                        <div className="flex flex-row justify-between mt-10 mb-10">
                            <div>
                                <h2 className="text-5xl">
                                    Lojas
                                </h2>
                            </div>
                            <div>
                                <div className="bg-white rounded-full w-[420px] h-[50px] items-center px-7 flex justify-between">
                                    <input type="text"
                                    placeholder="filtros"
                                    className="text-brand-primary text-2xl outline-none"></input>
                                </div>
                            </div>
                        </div>
                        {/*Carrossel de lojas*/}
                        <LojaCarrossel title="carrossel de lojas" items={lojas}></LojaCarrossel>
                    </section>                                       
                </div>
            </div>
        </main>    
    )

}
