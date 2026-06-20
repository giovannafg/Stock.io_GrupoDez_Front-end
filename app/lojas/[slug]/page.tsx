import LojaDetalhe from "@/components/LojaDetalhe.component";
import { Navbar } from "@/components/navbar.component";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
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

export default async function LojaPage({ params }: Props) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? null;

  const [loja, lojas, produtos, categorias] = await Promise.all([
    fetch(`http://localhost:3001/lojas/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null),
    fetch("http://localhost:3001/lojas")
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => []),
    fetch(`http://localhost:3001/produtos/loja/${slug}`)
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => []),
    fetch("http://localhost:3001/categorias")
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => []),
  ]);

  if (!loja) {
    notFound();
  }

  const lojaResumo = lojas.find((item: { id: number }) => item.id === Number(slug));
  const lojaComInfo = {
    ...loja,
    categoria: lojaResumo?.categoria,
    categoria_id: loja.categoria_id,
    logo: lojaResumo?.logo || loja.logo_url,
    banner_url: lojaResumo?.banner_url || loja.banner_url,
    descricao: lojaResumo?.descricao || loja.descricao,
  };
  const subCategorias = loja.categoria_id
    ? await fetch(`http://localhost:3001/produtos/subcategoria/${loja.categoria_id}`)
        .then((res) => (res.ok ? res.json() : []))
        .catch(() => [])
    : [];
  const userId = getUserIdFromToken(token);
  const podeEditar = Boolean(token && userId && loja.usuarioId === userId);

  return (
    <main className="min-h-screen bg-brand-bg [font-family:var(--font-league-spartan)]">
      <Navbar />
      <LojaDetalhe
        loja={lojaComInfo}
        produtos={produtos}
        token={token}
        podeEditar={podeEditar}
        categorias={categorias}
        subCategorias={subCategorias}
      />
    </main>
  );
}
