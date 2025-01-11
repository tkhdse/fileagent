'use client'

// import Image, { StaticImageData } from "next/image";
import { supabase } from "@/utils/supabaseClient";
import Link from "next/link";
import Profile from "./Profile";
import img from "@/public/user-icon.png"
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";

interface NavbarProps {
    // profile: StaticImageData,

};

const Navbar: React.FC<NavbarProps> = ({}) => {
    // const { 
    //     data: {curr_user},
    // } = await supabase.auth.getUser();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

      const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      };
  
      getSession();
  
      const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth event:', event);
        setUser(session?.user || null);
      });
  
      // Cleanup subscription on unmount
      return () => {
        // subscription.unsubscribe();
      };
    }, []);

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null)
    }


    return (
        <div className="w-full h-[60px] bg-slate-600 items-center">
            <div className="flex justify-between h-[100%] items-center mx-8">
                <div className="text-gray-200 text-2xl">
                    File Agent
                </div>

                {user ? (
                <div className="flex gap-4 items-center">
                    <Link className="text-gray-200 cursor-pointer" href="/login" onClick={signOut}>Sign out</Link>
                    <span className="text-gray-200">{user.id}</span>
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