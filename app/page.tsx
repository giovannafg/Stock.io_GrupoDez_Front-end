'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    /* h-screen para o F11, min-h para quando houver scroll */
    <main className="min-h-screen h-screen bg-brand-bg flex justify-between overflow-y-auto overflow-x-hidden">
      
      {/* Lado Esquerdo: Logo e Ilustração */}
      <div className="flex-1 flex flex-col justify-between h-full min-w-[500px]">
        {/* LOGO: */}
        <div className="pt-0 pl-12 xl:pl-20 shrink-0">
          <Image
            src="/logo.svg" 
            alt="Stock.io Logo"
            width={480} 
            height={140}
            className="object-contain"
            priority
          />
        </div>

        {/* BONECO: No chão */}
        <div className="pl-8 lg:pl-12 xl:pl-16 w-[450px] xl:w-[600px] 2xl:w-[700px] shrink-0 mt-auto">
          <Image
            src="/personagem-login.svg"
            alt="Mascote Stock.io"
            width={700}
            height={800}
            className="w-full h-auto object-contain object-bottom block"
            priority
          />
        </div>
      </div>

      {/* h-full garante que este lado acompanhe a altura do main */}
      <div className="flex flex-col items-end pr-0 lg:pr-8 xl:pr-12 w-full lg:w-[55%] xl:w-[60%] h-full shrink-0">
        
        {/* onde a caixa comeca */}
        <div className="h-[10vh] w-full shrink-0" />

        {/* CAIXA PRETA: 
            - flex-grow faz ela ocupar todo o espaço restante até o chão.
            - min-h-[750px] impede que ela amasse o formulário.
            - rounded-t-[48px] mantém seu design original. */}
        <div className="w-full max-w-[850px] flex-grow bg-brand-dark rounded-t-[48px] px-10 xl:px-20 flex flex-col justify-center relative shadow-2xl min-h-[750px]">
          
          <h1 className="text-4xl xl:text-[64px] font-bold text-white mb-12 tracking-wide leading-tight">
            BEM VINDO DE VOLTA!
          </h1>

          <form className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-brand-input px-6 py-5 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all text-lg"
            />

            <div className="relative">
              <input
                type="password"
                placeholder="Senha"
                className="w-full bg-brand-input px-6 py-5 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all text-lg"
              />
              <button type="button" className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </button>
            </div>

            <div className="text-center mt-2">
              <Link href="#" className="text-base text-gray-300 hover:text-white hover:underline underline-offset-4">
                Esqueceu sua senha?
              </Link>
            </div>

            <Link href="/dashboard" className="w-full mt-4">
              <button
                type="button"
                className="w-full bg-brand-primary text-white font-bold text-xl py-5 rounded-full hover:bg-brand-primaryHover transition-all shadow-lg"
              >
                ENTRAR
              </button>
            </Link>
          </form>

          <div className="mt-10 text-left text-base xl:text-lg text-gray-300">
            Não possui uma conta?{' '}
            <Link href="/cadastro" className="text-brand-purple font-bold hover:underline underline-offset-4">
              Cadastre-se
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}