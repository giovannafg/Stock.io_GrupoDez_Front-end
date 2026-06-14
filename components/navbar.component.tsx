import Link from "next/link";
import PersonIcon from '@/components/icons/iconeLogado.component'
import iconLogout from '@/components/icons/iconLogout.component'
import IconLogout from "@/components/icons/iconLogout.component";
import { cookies, headers } from "next/headers";

export async function Navbar(){

    const cookiesStore=await cookies()
    const session=cookiesStore.get('token')?.value ?? null
    // console.log(session)

    return(
        <div className=" top-0 right-0 left-0 bg-black py-2 ">
           <div className=" flex items-center justify-between px-20 py-3">
                <Link href="/">
                    <img src="/LOGO_header.png" alt="logo" ></img>
                </Link>
            {session ? (
                <div className="flex items-center gap-15">
                    <Link href="/perfil">
                        <PersonIcon></PersonIcon>
                    </Link>
                    
                    <Link href="/logout">
                        <IconLogout></IconLogout>
                    </Link>
                </div>
            )  : (
                <nav>
                    <a className="text-white px-15 hover:text-brand-primary" href="/login">LOGIN</a>
                    <Link href="/cadastro" className="text-white py-2 px-5 bg-brand-primary rounded-2xl hover:bg-white hover:text-brand-primary  ">CADASTRE-SE</Link>
                    
            </nav>    
        
            )}
            
           </div>
        </div>
    )
}