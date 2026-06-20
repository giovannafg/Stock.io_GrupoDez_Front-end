import { Navbar } from "@/components/navbar.component";
import ProdutoDetalhe from "@/components/ProdutoDetalhe.component";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

interface Produto {
  id: number;
  nome: string;
  descricao?: string | null;
  preco: number | string;
  estoque: number;
  loja?: {
    nome: string;
    logo_url?: string | null;
    usuarioId?: number;
  };
  categoria?: {
    id: number;
    nome: string;
    categoria_pai_id?: number | null;
  };
  imagens_produto?: {
    id: number;
    url_imagem: string;
    ordem: number;
  }[];
}

function getUserIdFromToken(token?: string | null) {
  if (!token) return null;

  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const payload = JSON.parse(Buffer.from(base64, "base64").toString());
    return Number(payload.sub);
  } catch {
    return null;
  }
}

export default async function ProdutoPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? null;

  const produto: Produto | null = await fetch(`http://localhost:3001/produtos/${id}`)
    .then((res) => (res.ok ? res.json() : null))
    .catch(() => null);

  if (!produto) {
    notFound();
  }

  const userId = getUserIdFromToken(token);
  const podeEditar = Boolean(userId && produto.loja?.usuarioId === userId);
  const categoriaPaiId = produto.categoria?.categoria_pai_id;
  const subCategorias = categoriaPaiId
    ? await fetch(`http://localhost:3001/produtos/subcategoria/${categoriaPaiId}`)
        .then((res) => (res.ok ? res.json() : []))
        .catch(() => [])
    : [];

  return (
    <main className="min-h-screen bg-brand-bg">
      <Navbar />
      <ProdutoDetalhe produto={produto} podeEditar={podeEditar} token={token} subCategorias={subCategorias} />
    </main>
  );
}
