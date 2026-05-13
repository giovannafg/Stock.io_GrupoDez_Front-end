'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const emailSuggestions = ['@gmail.com', '@cjr.org.br', '@outlook.com'];

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMensagem('');

    if (!email || !senha) {
      setMensagem('Preencha email e senha.');
      return;
    }

    setCarregando(true);

    try {
      const response = await fetch('/api/autenticacao', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type') ?? '';
        const errorPayload = contentType.includes('application/json')
          ? await response.json()
          : { message: await response.text() };

        if (response.status === 401) {
          throw new Error('Erro no email ou senha.');
        }

        throw new Error(errorPayload.message || 'Erro no login.');
      }

      const data = await response.json();
      const token = data.token ?? data.accessToken;
      if (token) {
        localStorage.setItem('token', token);
      }

      setMensagem('Login efetuado com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      setMensagem(error instanceof Error ? error.message : String(error));
    } finally {
      setCarregando(false);
    }
  }

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

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                type="email"
                placeholder="Email"
                className="w-full bg-brand-input px-6 py-5 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all text-lg"
                required
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
                className="w-full bg-brand-input px-6 py-5 rounded-full text-black placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-brand-green transition-all text-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.243 4.243L6.228 6.228" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="text-center mt-2">
              <Link href="#" className="text-base text-gray-300 hover:text-white hover:underline underline-offset-4">
                Esqueceu sua senha?
              </Link>
            </div>

            <div className="w-full mt-4">
              <button
                type="submit"
                className="w-full bg-brand-primary text-white font-bold text-xl py-5 rounded-full hover:bg-brand-primaryHover transition-all shadow-lg"
              >
                {carregando ? 'Entrando...' : 'ENTRAR'}
              </button>
            </div>
          </form>
          {mensagem ? (
            <div className="mt-6 rounded-3xl bg-white/10 p-4 text-sm text-white border border-white/10">
              {mensagem}
            </div>
          ) : null}

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