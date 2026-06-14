"use client"

import { useState } from "react"
import IconVoltar from "../icons/iconVoltar.component";
import { Herr_Von_Muellerhoff } from "next/font/google";
import { srcEmptySsgManifest } from "next/dist/build/webpack/plugins/build-manifest-plugin-utils";

type Loja = {
  loja: any
  usuario: any
  token: any
  subCategorias: any
}





export default function ModalAddProduto( {usuario, token, loja, subCategorias}: Loja ) {
  // console.log('loja no modal:', loja)
  // console.log('usuario no modal:', usuario)
  // console.log('token no modal:', token)
  console.log('subCategorias no modal:', subCategorias)
  
  const [open, setOpen] = useState(false)
  const [aberto,setAberto] = useState(false)


  const [nomeProduto, setNomeProduto] = useState('')
  const [subCategoria, setSubCategoria] = useState(null)
  const [subCategoriaSelecionada, setSubCategoriaSelecionada] = useState(null)
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')

  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')


  const [estoque, setEstoque] = useState(0)

  function incrementarEstoque() {
    setEstoque(prev => prev + 1)
  }

  function decrementarEstoque() {
    setEstoque(prev => prev > 0 ? prev - 1 : 0)
  }

  async function adicionarProduto() {
    console.log(loja.id, nomeProduto, subCategoria, descricao, preco, token)
    setLoading(true)
    setErro('')
    try{
      const res = await fetch(`http://localhost:3001/produtos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ loja_id: loja.id, categoria_id: Number(subCategoria), nome: nomeProduto, descricao: descricao, preco: preco ,
           estoque: estoque, imagens: []})
      })
      if (!res.ok) {        
        const data = await res.json()
        throw new Error(data.message || 'Erro ao salvar as alterações')
      } else {
        window.location.reload()
      }
    } catch (error) {
      console.error('Erro ao adicionar produto:', error)
      setErro('Erro de conexao')
    } finally {
      setLoading(false)
    }
  }




  return (
    <>
        <button className="cursor-pointer"
        onClick={() => setOpen(true)}
        >
            <img src="\modalAdd.svg" ></img>
        </button>   

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          
          <div className="bg-[#EDEDED] h-[800px] w-[700px] rounded-2xl p-8 relative flex flex-col items-center gap-1">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-7 right-7 text-6xl text-white hover:text-brand-primaryHover transition cursor-pointer z-10"
            >
              ✕
            </button>
            <div className="relative">
              <h2 className="text-4xl text-black mb-5 text-center">Adicionar Produto</h2>
              <img src="\retangulo_addProduto.png" className="" />
              <img src="\camera_add_foto.png" className=" absolute top-20 left-70" />
              <button className="absolute top-30 left-80 text-sm bg-white rounded-full p-1 hover:bg-brand-primaryHover transition cursor-pointer">
                <img src="\icone_add_ft.png" alt="mais" />
              </button>
              <h3 className=" absolute top-40 left-55">Anexe as fotos do seu produto</h3>
            </div>
            <div className="relative mt-1 flex gap-5">
              <div>
                <img src="\retangulo_menor_add_produto.png" className="w-50"></img>
                <img src="\camera_add_foto.png" className=" absolute top-8 left-15" />
                <button className="absolute top-18 left-25 text-sm bg-white rounded-full p-1 hover:bg-brand-primaryHover transition cursor-pointer">
                  <img src="\icone_add_ft.png" alt="mais" />
                </button>
              </div>
              <div>
                <img src="\retangulo_menor_add_produto.png" className="w-50"></img>
                <img src="\camera_add_foto.png" className=" absolute top-8 left-70" />
                <button className="absolute top-18 left-80 text-sm bg-white rounded-full p-1 hover:bg-brand-primaryHover transition cursor-pointer">
                  <img src="\icone_add_ft.png" alt="mais" />
                </button>
              </div>
              <div>
                <img src="\retangulo_menor_add_produto.png" className="w-50"></img>
                <img src="\camera_add_foto.png" className=" absolute top-8 left-125" />
                <button className="absolute top-18 left-135 text-sm bg-white rounded-full p-1 hover:bg-brand-primaryHover transition cursor-pointer">
                  <img src="\icone_add_ft.png" alt="mais" />
                </button>
              </div>
            </div>

            {erro && <p className="text-red-500 relative absolute top-5 m-0 p-0">{erro}</p>}
 
            {/* Inputs */}
            <div className="flex flex-col gap-2 w-full items-center mb-4 mt-4">
              <input
                onChange={e => setNomeProduto(e.target.value)}
                placeholder="Nome do Produto"
                className="w-full bg-white rounded-full px-5 py-2 text-gray  outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <div className="relative w-full">
                <button
                onClick={() => setAberto(!aberto)}
                className="w-full bg-white rounded-full px-5 py-2 text-gray  outline-none focus:ring-2 focus:ring-brand-primary flex justify-between items-center"
                >
                {subCategoriaSelecionada 
                ? <h2 className="">{subCategoriaSelecionada}</h2>
                : <h2 className="text-gray opacity-65">Subcategoria</h2>}
                <h2 className="text-gray opacity-65">{aberto ? '▲' : '▼'}</h2>
                
                </button>
                {aberto && (
                  <div className="absolute top-full left-0 z-50 w-full bg-white rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {subCategorias.map((sc: any) => (
                      <div
                        key={sc.nome}
                        onClick={() => {
                          setSubCategoria(sc.id);
                          setSubCategoriaSelecionada(sc.nome);
                          setAberto(false);
                        }}
                        className="p-2 hover:bg-brand-primaryHover cursor-pointer text-gray opacity-65"
                      >
                        {sc.nome}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* <input
                onChange={e => setSubCategoria(e.target.value)}
                placeholder="Subcategoria"
                className="w-full bg-white rounded-full px-5 py-3 text-gray outline-none focus:ring-2 focus:ring-brand-primary"
              /> */}
              <textarea
                onChange={e => setDescricao(e.target.value)}
                placeholder="Descrição do produto"
                className="w-full min-h-20 resize-none bg-white rounded-4xl px-5 py-3 text-gray outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                type="number"
                step="0.01"
                min="0"
                onChange={e => setPreco(e.target.value)}
                placeholder="Preço do produto"
                className="w-full bg-white rounded-full px-5 py-3 text-gray outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
 
            {/* Botões */}
            <div className="flex gap-30 w-full justify-center items-center mb-2">
              <button className="relative cursor-pointer justify-center items-center "
              onClick={decrementarEstoque}>
                <h3 className="absolute text-8xl text-brand-primary justify-self-center -top-2 ">-</h3>
                <img src="/circulo_addProduto.png" className="" />
              </button>
              <h2 className="text-3xl font-bold text-brand-primaryHover">{estoque}</h2>
              <button className="relative cursor-pointer justify-center items-center"
              onClick={incrementarEstoque}>
                <h3 className="absolute text-8xl text-brand-primary justify-self-center">+</h3>
                <img src="/circulo_addProduto.png" className="" />
              </button>
            </div>

              <button className="w-[400px] bg-brand-primary text-white text-2xl rounded-full py-2 font-medium hover:bg-brand-primaryHover transition cursor-pointer shadow-lg shadow-gray-400"
              onClick={adicionarProduto}
              disabled={loading}>
                Adicionar 
              </button>
          </div>
        </div>
      )}
    </>
  )
}