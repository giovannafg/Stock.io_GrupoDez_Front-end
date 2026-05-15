
import Carrossel from "@/components/carrossel.component";
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
    return(
        <main>
            <Navbar></Navbar>
            <section className="w-full h-[539px] bg-black flex items-center">

                {/* container central */}
                <div className="w-full max-w-[2000px] mx-auto flex items-center justify-between">

                    {/* texto */}
                    <div className="w-[55%]  relative  translate-x-[120px]">
                        <h1 className="text-white text-7xl text-right font-bold">
                            Do CAOS à organização,
                            <br />
                            em alguns cliques
                        </h1>
                    </div>

                    {/* imagem */}
                    <div className="w-[30%] flex relative  mt-[380px]  translate-x-[-220px] z-0">
                        <img
                            src="Group30.png"
                            className="w-[700px]"
                        />
                    </div>

                </div>
            </section>
            <div className="w-full bg-brand-bg h-auto relative z-10">
                <div className="px-40 py-10">
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
                        <h2 className="font-bold text-5xl mb-10 ">
                            Categoria
                        </h2>
                        <div className="flex gap-15">
                        {categorias.map((categoria)=>(
                            <Link key={categoria.nome} href="#" className="bg-white h-[120px] w-[120px] hover:scale-105 transition cursor-pointer rounded-[35px] flex flex-col items-center justify-center gap-2">
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

                            <h2 className="text-5xl font-bold">
                                Produtos
                            </h2>

                            <button className="text-2xl font-semibold text-brand-primary">
                                Melhores avaliados
                            </button>

                        </div>
                        <Carrossel title="Mais Avaliados" items={produtos}></Carrossel>
                    </section>
                    {/* Mais baratos */}
                    <section>

                    </section>
                    {/* Mais recem adicionados */}
                    <section>

                    </section> 
                    {/* Lojas */}
                    <section>

                    </section>                                       
                </div>
            </div>
        </main>    
    )

}
