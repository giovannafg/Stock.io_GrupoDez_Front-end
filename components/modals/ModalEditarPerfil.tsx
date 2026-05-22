"use client"

import { useState } from "react"

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
  // async function handleSalvar() {
  //   const res = await fetch('http://localhost:3001/perfil', {
  //     method: 'PATCH',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`
  //     },
  //     body: JSON.stringify({ nome, userName, email })
  //   })

  //   if (res.ok) {
  //     setOpen(false)
  //     window.location.reload() // atualiza a página com os novos dados
  //   }
  // }

  return (
    <>
      <button
        className="absolute right-0 top-45 mr-15 bg-brand-primary cursor-pointer text-white px-30 py-4 rounded-full  text-2xl hover:opacity-90 transition shadow-lg"
        onClick={() => setOpen(true)}>
        Editar Perfil
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#EDEDED] h-[802px] w-[654px] rounded-2xl p-8 relative flex flex-col items-center gap-5">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-black transition"
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
 
            {/* Inputs */}
            <div className="flex flex-col gap-5 w-full items-center my-10">
              <input
                value={nome}
                onChange={e => setNome(e.target.value)}
                placeholder="Nome"
                className="w-[500px] bg-white rounded-full px-5 py-3 text-gray-400  outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder="Username"
                className="w-[500px] bg-white rounded-full px-5 py-3 text-gray-400 outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="w-[500px] bg-white rounded-full px-5 py-3 text-gray-400 outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
 
            {/* Botões */}
            <div className="flex flex-col gap-3 w-full mt-2 items-center">
              <button className="w-[500px] border border-[#AF052A] text-[#AF052A] text-2xl rounded-full py-3 hover:bg-[#AF052A] hover:text-white transition cursor-pointer">
                Deletar conta
              </button>
              <button className="w-[500px] border border-brand-primary text-brand-primary text-2xl rounded-full py-3 hover:bg-brand-primary hover:text-white transition cursor-pointer"
              onClick={()=>setAba(true)}>
                Alterar senha
              </button>
              {aba && (
                <div className="fixed inset-0 bg-black/40 z-[60] flex items-center justify-center">
                  <div className="bg-[#EDEDED] h-[802px] w-[654px] rounded-2xl p-8 relative flex flex-col items-center ">

                    <button
                      onClick={() => setAba(false)}
                      className="absolute top-5 right-5 text-3xl"
                    >
                      ✕
                    </button>

                    <button
                      onClick={() => setAba(false)}
                      className="absolute top-5 left-5 text-3xl"
                    >
                      ←
                    </button>

                    <img
                      src="\uim_key-skeleton.png"
                      className="w-40 mt-10"
                    />
                    <div className="flex flex-col gap-5 mt-10 w-full items-center">

                      <input
                        placeholder="Senha Antiga"
                        className="w-[350px] bg-white rounded-full px-5 py-3 outline-none"
                      />
                      <input
                        placeholder="Nova Senha"
                        className="w-[350px] bg-white rounded-full px-5 py-3 outline-none"
                      />
                      <input
                        placeholder="Confirmar Senha"
                        className="w-[350px] bg-white rounded-full px-5 py-3 outline-none"
                      />
                    </div>

                    <button className="w-[350px] mt-16 bg-brand-primary text-white rounded-full py-3 text-2xl">
                      Salvar Senha
                    </button>

                  </div>
                </div>
              )}
              <button className="w-[500px] bg-brand-primary text-white text-2xl rounded-full py-3 font-medium hover:bg-brand-primaryHover transition cursor-pointer">
                Salvar
              </button>
            </div>
 
          </div>
        </div>
      )}
    </>
  )
}