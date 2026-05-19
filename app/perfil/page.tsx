import Carrossel from '@/components/carrossel.component';
import IconVoltar from '@/components/icons/iconVoltar.component';
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
 
          <div className="absolute right-0 top-45">
            <a
              href="/perfil/editar"
              className="bg-brand-primary text-white px-30 py-4 rounded-full  text-2xl hover:opacity-90 transition shadow-lg"
            >
              Editar Perfil
            </a>
          </div>
 
        </div>
        <div className="my-18">
          <h2 className=" text-5xl text-black">Produtos</h2>
        </div>
        <Carrossel title="Lista de Produtos de tal usuario" items={produtos}></Carrossel>
        <div className="my-18">
          <h2 className=" text-5xl text-black">Lojas</h2>
        </div>
        <p>Lojasss</p>
        <div className="my-18">
          <h2 className=" text-5xl text-black">Avaliações</h2>
        </div>
        <p>avaliados</p>
      </div>
    </main>
  )
}