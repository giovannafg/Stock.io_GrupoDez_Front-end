import LojaCarrossel from "@/components/lojasCarrossel.component";
import { Navbar } from "@/components/navbar.component";

export default function ProdutoEspecifico(){
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
                        <div className="w-[55%]  relative  translate-x-[60px]">
                            <h1 className="text-white text-6xl text-right font-semibold">
                                O universo da tecnologia
                                <br />
                                em um só lugar
                            </h1>
                        </div>

                        {/* imagem */}
                        <div className="w-[30%] flex relative  mt-[480px]  translate-x-[-110px] z-0">
                            <img
                                src="Stockles.svg"
                                className="scale-80"
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
                        {/* falta o mostrar produtos */}
                        <section>
                            <div>
                                <h1>kkkkkkkk
                                </h1>
                            </div>
                        </section>

                        {/* Principais lojas */}
                        <section>
                            <div className="bg-black p-10">
                                <h2>
                                    Principais Lojas 
                                </h2>
                                <LojaCarrossel title="Lojas preto" items={lojas}></LojaCarrossel>
                            </div>
                        </section>
                    </div>
                </div>
        </main>
    )
}