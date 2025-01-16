'use client'

// import { supabase } from "@/app/libs/supabaseClient";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import Profile from "./Profile";
import img from "@/public/user-icon.png"
import { useUser } from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";

// interface NavbarProps {

// };

const Navbar = ({}) => {

    const supabase = createClientComponentClient();
    const {user, isLoading} = useUser();
    const router = useRouter();

    const signOut = async () => {
        const {error} = await supabase.auth.signOut();
        router.refresh();
        router.push('/login');
        if (error) {
            console.log(error);
        }
    }

    if (isLoading) return (<></>)

    return (
        <div className="w-full h-[60px] bg-slate-600 items-center">
            <div className="flex text-gray-200 justify-between h-[100%] items-center mx-8">
                <div className="text-2xl select-none cursor-pointer" onClick={() => router.push('/')}>
                    File Agent
                </div>

                {user ? (
                <div className="flex gap-4 items-center">
                    <span className="">{user.id}</span>
                    <Link className="cursor-pointer border-[1px] border-slate-400 rounded-lg p-2" href="/dashboard">Dashboard</Link> 
                    <span className="cursor-pointer border-[1px] border-slate-400 rounded-lg p-2" onClick={signOut}>Sign out</span>
                    <Profile image={img}/> 
                </div>
                
                ) : (
                <div className="flex gap-4">
                    <Link className="cursor-pointer border-[1px] border-slate-400 rounded-lg p-2" href="/signup">Sign Up</Link> 
                    <Link className="cursor-pointer border-[1px] border-slate-400 rounded-lg p-2" href="/login">Log In</Link>
                </div>

                )
                
                
                }

            </div>
        </div>
    );
}

export default Navbar;