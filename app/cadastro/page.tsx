'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Cadastro() {
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

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome Completo"
              className="w-full bg-brand-input px-6 py-4 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all"
            />

            <input
              type="text"
              placeholder="Username"
              className="w-full bg-brand-input px-6 py-4 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-brand-input px-6 py-4 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all"
            />

            <div className="relative">
              <input
                type="password"
                placeholder="Senha"
                className="w-full bg-brand-input px-6 py-4 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all"
              />
              <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Confirmar Senha"
                className="w-full bg-brand-input px-6 py-4 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all"
              />
              <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary text-white font-bold text-xl py-4 rounded-full hover:bg-brand-primaryHover transition-all shadow-lg mt-4 uppercase"
            >
              CRIAR CONTA
            </button>
          </form>

          <div className="mt-8 text-left text-sm xl:text-base text-gray-300">
            Já possui uma conta?{' '}
            <Link href="/" className="text-brand-purple font-bold hover:underline underline-offset-4">
              Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}