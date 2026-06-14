import ModalAddProduto from "@/components/modals/modalAddProduto";
import { cookies } from "next/dist/server/request/cookies";

export default async function LojaPage({ params }: { params: { slug: string } }) {
    const { slug } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    // console.log('token:', token)

    const loja = await fetch(`http://localhost:3001/lojas/${slug}`)
        .then(res => res.json())
        .catch(err => {
        console.error('Erro ao buscar loja:', err)
        return null
        })

    const subcategorias = await fetch(`http://localhost:3001/produtos/subcategoria/${slug}`)
        .then(res => res.json())
        .catch(err => {
        console.error('Erro ao buscar subcategorias:', err)
        return []
        })
    
    return (
        <main>
            <div className="m-10">
                <h1 className="text-2xl font-bold justify-self-center">Loja: {slug}</h1>
                <p>{loja?.nome}</p>
                <p>{loja?.categoria_id}</p>
                <p>Subcategorias: {subcategorias.map((sc: any) => sc.nome).join(', ')}</p>
                <p className="font-semibold  text-3xl">Produtos Quantidade: {loja?.produtos?.length || 0}</p>
                <p>Produtos: {loja?.produtos?.map((p: any) => p.nome).join(', ') || 0}</p>
            </div>
            <ModalAddProduto loja={loja} usuario={loja?.usuario} token={token} subCategorias={subcategorias} />
        </main>
    )
}