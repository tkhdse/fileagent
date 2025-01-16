'use client'

import { supabase } from "@/app/libs/supabaseClient";
import Link from "next/link";
import Profile from "./Profile";
import img from "@/public/user-icon.png"
import { useUser } from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";

// interface NavbarProps {

// };

const Navbar = ({}) => {

    const {user, isLoading} = useUser();
    const router = useRouter();

    const signOut = async () => {
        await supabase.auth.signOut();
    }

    if (isLoading) return (<></>)

    return (
        <div className="w-full h-[60px] bg-slate-600 items-center">
            <div className="flex justify-between h-[100%] items-center mx-8">
                <div className="text-gray-200 text-2xl select-none cursor-pointer" onClick={() => router.push('/')}>
                    File Agent
                </div>

                {user ? (
                <div className="flex gap-4 items-center">
                    <span className="text-gray-200">{user.id}</span>
                    <Link className="text-gray-200 cursor-pointer border-[1px] border-slate-400 rounded-lg p-2" href="/dashboard">Dashboard</Link> 
                    <Link className="text-gray-200 cursor-pointer border-[1px] border-slate-400 rounded-lg p-2" href="/login" onClick={signOut}>Sign out</Link>
                    <Profile image={img}/> 
                </div>
                
                ) : (
                <div className="flex gap-4">
                    <Link className="text-gray-200 cursor-pointer" href="/signup">Sign Up</Link> 
                    <Link className="text-gray-200 cursor-pointer" href="/login">Log In</Link>
                </div>

                )
                
                
                }

            </div>
        </div>
    );
}

export default Navbar;