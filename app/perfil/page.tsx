import Carrossel from '@/components/carrossel.component';
import IconVoltar from '@/components/icons/iconVoltar.component';
import ModalEditarPerfil from '@/components/modals/ModalEditarPerfil';
import { Navbar } from '@/components/navbar.component';
import { Link } from 'lucide-react';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function PerfilPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  console.log('token:', token)
  if (!token) redirect('/login')

  const res = await fetch('http://localhost:3001/perfil', {
    headers: { Authorization: `Bearer ${token}` }
  })
  
  if (!res.ok) {
    const text = await res.text()
    console.log('status:', res.status)
    console.log('resposta:', text)}

  const usuario = await res.json()
  console.log('usuario:', usuario)

  const produtos = [
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
        preco: 120,
        imagem: "/produtos/mouse.png",
        loja: "/lojas/cjr.svg",
        estoque: 0,
        subcategoria: 'Notebooks'
    },
    {
        id: 3,
        nome: "Headset",
        preco: 250,
        imagem: "/produtos/headset.png",
        loja: "/lojas/cjr.svg",
        estoque: 10,
        subcategoria: 'Notebooks'
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
        categoria:"farmacia"
        },
        {
        nome: "cjr2",
        imagem: "/lojas/cjr.svg",
        categoria:"Brinquedos"
        }
      ]
  return (

    <main>
      <Navbar></Navbar>
      
 
      <div className="w-full h-[250px] bg-black" />

 
      <div className=" px-25 pb-20 relative">
        
        <div className="relative">
        
          <div className="relative -mt-30 flex items-center gap-6 ml-10 w-fit">

            <a href="/">
              <img
                src="/Vector_seta.png"
                className="w-8 h-8 cursor-pointer hover:opacity-70 transition"
              />
            </a>

            <div className="w-[200px] h-[200px] rounded-full overflow-hidden shadow-lg">
              {usuario.foto_perfil_url ? (
                <img
                  src={usuario.foto_perfil_url}
                  alt={usuario.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                  <span className="text-5xl text-gray-500">
                    {usuario.nome?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

          </div>
 
          <div className="mt-4">
            <h1 className="text-4xl font-bold text-black mx-28">{usuario.nome}</h1>
            <p className="text-gray-500 mt-1 flex items-center text-2xl gap-2 mx-28">
              <span>@</span>{usuario.userName}
            </p>
            <p className="text-gray-500 flex items-center text-2xl gap-2 mt-1 mx-28">
              <span>✉</span>{usuario.email}
            </p>
          </div>

          
 
        </div>
        <div className="my-18">
          <h2 className=" text-5xl text-black">Produtos</h2>
        </div>
        <div>
          <Carrossel title="Lista de Produtos de tal usuario" items={produtos}></Carrossel>
          
        </div>
        <div className="my-18 flex items-center justify-between">
          <h2 className=" text-5xl text-black">Lojas</h2>
          {/* modal de adicionar loja */}
          <button className="cursor-pointer" >
            <img src="\modalAdd.svg" ></img>
          </button>
        </div>
        <div className="flex flex-wrap gap-10">
          {lojas.map((loja) => (
            <div key={loja.nome} className="flex items-center justify-between bg-white rounded-2xl p-8 w-[500px]">
              <div>
                <h3 className="font-spartan font-light text-[55.76px]">{loja.nome}</h3>
                <span className="text-brand-primary font-medium text-[35.15px]">{loja.categoria}</span>
              </div>
              <div className="w-[120px] h-[120px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img src={loja.imagem} className="w-full h-full object-contain" />
              </div>
            </div>
          ))}
        </div>
        <ModalEditarPerfil usuario={usuario} token={token}></ModalEditarPerfil>
      </div>
    </main>
  )
}

