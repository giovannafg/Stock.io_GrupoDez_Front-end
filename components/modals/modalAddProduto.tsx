"use client"

import { useState } from "react"
import IconVoltar from "../icons/iconVoltar.component";
import { Herr_Von_Muellerhoff } from "next/font/google";

type Props = {
  usuario: any
  token: string
}



export default function ModalAddProduto( {usuario, token}: Props) {

  const [open, setOpen] = useState(false)
  const [nome, setNome] = useState(usuario.nome ?? '')
  const [userName, setUserName] = useState(usuario.userName ?? '')
  const [email, setEmail] = useState(usuario.email ?? '')
  const [aba, setAba]= useState(false)

  const [senhaAntiga, setSenhaAntiga] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')

  async function Salvar() {
    console.log(usuario.id, nome, userName, email,token)
    setLoading(true)
    setErro('')
    try{
      const res = await fetch(`http://localhost:3001/usuarios/${usuario.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nome, userName, email })
      })
      if (!res.ok) {        
        const data = await res.json()
        throw new Error(data.message || 'Erro ao salvar as alterações')
      } else {
        window.location.reload()
      }
    } catch (error) {
      setErro('Erro de conexao')
    } finally {
      setLoading(false)
    }
  }

  async function AlterarSenha() {
    if (novaSenha !== confirmarSenha) return setErro('As senhas não coincidem')
    setLoading(true)
    setErro('')
    try{
      const res=await fetch(`http://localhost:3001/usuarios/senha/${usuario.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ 
          senha_atual: senhaAntiga,
          nova_senha: novaSenha
         })
      })
      if (!res.ok) {        
        const data = await res.json()
        throw new Error(data.message || 'Erro ao alterar a senha')
      }
      alert('Senha alterada com sucesso')
      setAba(false)
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : 'Erro de conexao'
      )
      
    } finally {

      setLoading(false)
      // alert('Senha alterada com sucesso')
      // setAba(false)
    }
  }

  async function DeletarConta() {
    if (!confirm('Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.')) return
    const res =await fetch(`http://localhost:3001/usuarios/${usuario.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    if (res.ok) {
      window.location.href = '/logout'
    } else {
      alert('Erro ao deletar a conta')
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
          <div className="bg-[#EDEDED] h-[600px] w-[700px] rounded-2xl p-8 relative flex flex-col items-center gap-1">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-7 right-7 text-6xl text-white hover:text-brand-primaryHover transition cursor-pointer"
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
              </div>
              <div>
                <img src="\retangulo_menor_add_produto.png" className="w-50"></img>
              </div>
              <div>
                <img src="\retangulo_menor_add_produto.png" className="w-50"></img>
              </div>
            </div>

            {erro && <p className="text-red-500 relative absolute top-5 m-0 p-0">{erro}</p>}
 
            {/* Inputs */}
            <div className="flex flex-col gap-2 w-full items-center mb-10 mt-5">
              <input
                onChange={e => setNome(e.target.value)}
                placeholder="Nome do Produto"
                className="w-[400px] bg-white rounded-full px-5 py-2 text-gray  outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                onChange={e => setUserName(e.target.value)}
                placeholder="Subcategoria"
                className="w-[400px] bg-white rounded-full px-5 py-3 text-gray outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                onChange={e => setEmail(e.target.value)}
                placeholder="Descrição do produto"
                className="w-[400px] bg-white rounded-full px-5 py-3 text-gray outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                onChange={e => setEmail(e.target.value)}
                placeholder="Preço do produto"
                className="w-[400px] bg-white rounded-full px-5 py-3 text-gray outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
 
            {/* Botões */}
            <div className="flex flex-col gap-3 w-full items-center">
              <button className="w-[400px] border border-[#AF052A] text-[#AF052A] text-2xl rounded-full py-2 hover:bg-[#AF052A] hover:text-white transition cursor-pointer"
              onClick={DeletarConta}>
                Deletar conta
              </button>
              <button className="w-[400px] border border-brand-primary text-brand-primary text-2xl rounded-full py-2 hover:bg-brand-primary hover:text-white transition cursor-pointer"
              onClick={()=>setAba(true)}>
                Alterar senha
              </button>
              {aba && (
                <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center">
                  <div className="bg-[#EDEDED] h-[700px] w-[500px] rounded-2xl p-8 relative flex flex-col items-center ">

                    <button
                      onClick={() => setAba(false)}
                      className="absolute top-7 right-7 text-6xl text-white hover:text-brand-primaryHover transition cursor-pointer"
                    >
                      ✕
                    </button>

                    <button
                      onClick={() => setAba(false)}
                      className="absolute top-5 left-5 text-3xl"
                    >
                      <IconVoltar></IconVoltar>
                    </button>

                    <img
                      src="\uim_key-skeleton.png"
                      className="w-40 mt-10"
                    />
                    {erro && <p className="text-red-500">{erro}</p>}

                    <div className="flex flex-col gap-5 mt-10 w-full items-center">

                      <input
                        placeholder="Senha Antiga"
                        className="w-[350px] bg-white rounded-full px-5 py-3 outline-none"
                        value={senhaAntiga}
                        onChange={e => setSenhaAntiga(e.target.value)}
                        type="password"

                      />
                      <input
                        placeholder="Nova Senha"
                        className="w-[350px] bg-white rounded-full px-5 py-3 outline-none"
                        value={novaSenha}
                        onChange={e => setNovaSenha(e.target.value)}
                        type="password"
                      />
                      <input
                        placeholder="Confirmar Senha"
                        className="w-[350px] bg-white rounded-full px-5 py-3 outline-none"
                        value={confirmarSenha}
                        onChange={e => setConfirmarSenha(e.target.value)}
                        type="password"
                      />
                    </div>

                    <button className="w-[350px] mt-16 bg-brand-primary text-white rounded-full py-3 text-2xl hover:bg-brand-primaryHover transition cursor-pointer"
                    onClick={AlterarSenha}
                    disabled={loading}
                    // {loading ? 'salvando...' : 'salvar senha'}
                    >
                      Salvar Senha
                    </button>

                  </div>
                </div>
              )}
              <button className="w-[400px] bg-brand-primary text-white text-2xl rounded-full py-2 font-medium hover:bg-brand-primaryHover transition cursor-pointer"
              onClick={Salvar}
              disabled={loading}>
                Salvar
              </button>
            </div>
 
          </div>
        </div>
      )}
    </>
  )
}