import LojaDetalhe from "@/components/LojaDetalhe.component";
import { Navbar } from "@/components/navbar.component";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function LojaPage({ params }: Props) {
  const { slug } = await params;

  const [loja, lojas, produtos] = await Promise.all([
    fetch(`http://localhost:3001/lojas/${slug}`)
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null),
    fetch("http://localhost:3001/lojas")
      .then((res) => (res.ok ? res.json() : []))
      .catch(() => []),
    fetch(`http://localhost:3001/produtos/loja/${slug}`)
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
    logo: lojaResumo?.logo || loja.logo_url,
    banner_url: lojaResumo?.banner_url || loja.banner_url,
    descricao: lojaResumo?.descricao || loja.descricao,
  };

  return (
    <main className="min-h-screen bg-brand-bg [font-family:var(--font-league-spartan)]">
      <Navbar />
      <LojaDetalhe loja={lojaComInfo} produtos={produtos} />
    </main>
  );
}
