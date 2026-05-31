"use client"

import { useState } from "react"
import IconVoltar from "../icons/iconVoltar.component";

type Props = {
  usuario: any
  token: string
}



export default function ModalEditarPerfil( {usuario, token}: Props) {

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
      const res=await fetch('http://localhost:3001/usuarios/${usuario.id}', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ senhaAntiga, novaSenha })
      })
      if (!res.ok) {        
        const data = await res.json()
        throw new Error(data.message || 'Erro ao alterar a senha')
      }
    } catch (error) {
      setErro('Erro de conexao')
    } finally {
      setLoading(false)
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
      <button
        className="absolute right-0 top-45 mr-15 bg-brand-primary cursor-pointer text-white px-30 py-4 rounded-full  text-2xl hover:opacity-90 transition shadow-lg"
        onClick={() => setOpen(true)}>
        Editar Perfil
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#EDEDED] h-[700px] w-[500px] rounded-2xl p-8 relative flex flex-col items-center gap-1">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-7 right-7 text-6xl text-white hover:text-brand-primaryHover transition cursor-pointer"
            >
              ✕
            </button>
            <div className="relative">
              <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                {usuario.foto_perfil_url ? (
                  <img src={usuario.foto_perfil_url} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-4xl text-gray-500">{usuario.nome?.charAt(0).toUpperCase()}</span>
                  </div>
                )}
              </div>
              <button className="absolute bottom-[-20] right-18 bg-white rounded-full h-13 w-13 flex items-center justify-center text-sm hover:bg-gray-800 transition">
                <img src="/camera.png"></img>
              </button>
            </div>

            {erro && <p className="text-red-500 relative absolute top-5 m-0 p-0">{erro}</p>}
 
            {/* Inputs */}
            <div className="flex flex-col gap-5 w-full items-center mb-10 mt-5">
              <input
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Nome"
                className="w-[400px] bg-white rounded-full px-5 py-3 text-gray-400  outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="Username"
                className="w-[400px] bg-white rounded-full px-5 py-3 text-gray-400 outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="w-[400px] bg-white rounded-full px-5 py-3 text-gray-400 outline-none focus:ring-2 focus:ring-brand-primary"
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

                    <button className="w-[350px] mt-16 bg-brand-primary text-white rounded-full py-3 text-2xl"
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