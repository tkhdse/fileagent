'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { User } from "@supabase/supabase-js";

interface AuthContextType {
    user: User | null; // replace with User type
    loading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children} : {children : React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
            setLoading(false);
          };
      
          fetchSession();

          const { data } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null);
          });
      
          // Cleanup subscription on unmount
          return () => data.subscription.unsubscribe();

    }, [])

    return (
        <AuthContext.Provider value={{user, loading}}>
            {children}
        </AuthContext.Provider>
    );
}



export const useAuth = () => {
    const context =  useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;

}