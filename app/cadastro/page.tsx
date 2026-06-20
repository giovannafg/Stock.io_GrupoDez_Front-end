'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const emailSuggestions = ['@gmail.com', '@cjr.org.br', '@outlook.com'];

export default function Cadastro() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem('');

    if (!nome || !userName || !email || !senha || !confirmSenha) {
      setMensagem('Preencha todos os campos.');
      return;
    }

    if (senha !== confirmSenha) {
      setMensagem('As senhas não conferem.');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          userName,
          email,
          senha_hash: senha,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 409) {
          throw new Error('Email já cadastrado. Use outro email ou faça login.');
        }
        throw new Error(errorText || 'Erro no cadastro.');
      }

      setMensagem('Cadastro realizado com sucesso! Redirecionando para login...');
      setTimeout(() => router.push('/login'), 800);
    } catch (error) {
      setMensagem(error instanceof Error ? error.message : String(error));
    } finally {
      setCarregando(false);
    }
  }

  return (
    /* Mantendo a estrutura de scroll inteligente e h-screen */
    <main className="min-h-screen h-screen bg-brand-bg flex flex-row-reverse justify-between overflow-y-auto overflow-x-hidden">
      
      {/* Lado Direito: Logo e Personagem de Cadastro */}
      <div className="flex-1 flex flex-col justify-between h-full min-w-[500px]">
        
        {/* LOGO: Alinhada à direita */}
        <div className="pt-0 pr-12 xl:pr-20 flex justify-end shrink-0">
          <Image
            src="/logo.svg" 
            alt="Stock.io Logo"
            width={480} 
            height={140}
            className="object-contain"
            priority
          />
        </div>

        {/* BONECO DE CADASTRO:  */}
        <div className="pr-8 lg:pr-12 xl:pr-16 w-[450px] xl:w-[600px] 2xl:w-[700px] shrink-0 mt-auto ml-auto">
          <Image
            src="/person-cadastro.png"
            alt="Mascote Cadastro Stock.io"
            width={700}
            height={800}
            className="w-full h-auto object-contain object-bottom block"
            priority
          />
        </div>
      </div>

      {/* Lado Esquerdo: Painel de Cadastro (Caixa Preta) */}
      <div className="flex flex-col items-start pl-0 lg:pl-8 xl:pl-12 w-full lg:w-[55%] xl:w-[60%] h-full shrink-0">
        
        {/* Espaço do topo para alinhar com a logo */}
        <div className="h-[10vh] w-full shrink-0" />

        {/* CAIXA PRETA: 
            - rounded-tr (topo direito) arredondado.
            - flex-grow para esticar até o chão. */}
        <div className="w-full max-w-[850px] flex-grow bg-brand-dark rounded-t-[48px] px-10 xl:px-20 flex flex-col justify-center relative shadow-2xl min-h-[850px]">
          
          <h1 className="text-4xl xl:text-[56px] font-bold text-white mb-10 tracking-wide leading-tight text-center uppercase">
            CRIE SUA CONTA
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              type="text"
              placeholder="Nome Completo"
              className="w-full bg-brand-input px-6 py-4 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all"
            />

            <input
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              type="text"
              placeholder="Username"
              className="w-full bg-brand-input px-6 py-4 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all"
            />

            <div className="relative">
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                type="email"
                placeholder="Email"
                className="w-full bg-brand-input px-6 py-4 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all"
              />
              {showSuggestions && email.trim() !== '' && (
                <div className="absolute left-0 top-full z-20 mt-2 w-full overflow-hidden rounded-3xl border border-white/10 bg-brand-dark/95 p-2 shadow-2xl backdrop-blur-md">
                  {emailSuggestions.map((suggestion) => {
                    const localPart = email.includes('@') ? email.split('@')[0] : email;
                    const completedEmail = `${localPart}${suggestion}`;
                    return (
                      <button
                        key={suggestion}
                        type="button"
                        onMouseDown={() => setEmail(completedEmail)}
                        className="w-full rounded-3xl px-4 py-3 text-left text-sm text-white transition hover:bg-white/10"
                      >
                        {completedEmail}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="relative">
              <input
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                className="w-full bg-brand-input px-6 py-4 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="relative">
              <input
                value={confirmSenha}
                onChange={(event) => setConfirmSenha(event.target.value)}
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirmar Senha"
                className="w-full bg-brand-input px-6 py-4 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary text-white font-bold text-xl py-4 rounded-full hover:bg-brand-primaryHover transition-all shadow-lg mt-4 uppercase"
            >
              {carregando ? 'Cadastrando...' : 'CRIAR CONTA'}
            </button>
          </form>

          {mensagem ? (
            <div className="mt-6 rounded-3xl bg-white/10 p-4 text-sm text-white border border-white/10">
              {mensagem}
            </div>
          ) : null}

          <div className="mt-8 text-left text-sm xl:text-base text-gray-300">
            Já possui uma conta?{' '}
            <Link href="/login" className="text-brand-purple font-bold hover:underline underline-offset-4">
              Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}