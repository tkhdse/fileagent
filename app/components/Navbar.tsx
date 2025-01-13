'use client'

import { supabase } from "@/libs/supabaseClient";
import Link from "next/link";
import Profile from "./Profile";
import img from "@/public/user-icon.png"
import { useAuth } from "@/libs/AuthContext";
import { useRouter } from "next/navigation";

// interface NavbarProps {

// };

const Navbar = ({}) => {

    const {user, loading} = useAuth();
    const router = useRouter();

    const signOut = async () => {
        await supabase.auth.signOut();
    }

    if (loading) return (<></>)

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
                    <span className="text-gray-200 cursor-pointer border-[1px] border-slate-400 rounded-lg p-2" onClick={signOut}>Sign out</span>
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