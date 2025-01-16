'use client'

import { User } from "@supabase/supabase-js";
import { User as UserDetails } from "@/types/types";
import { createContext, useState, useContext, useEffect } from "react";
import { useSessionContext, useUser as useSupabaseUser } from "@supabase/auth-helpers-react";
import { supabase } from "../libs/supabaseClient";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoading: boolean;
};

// equivalent to AuthContext
export const UserContext = createContext<UserContextType | undefined>(undefined);

export interface Props {
    [propName: string]: any;
};

export const UserCtxProvider = (props: Props) => {
    const  {
        session,
        isLoading: isLoadingUser,
    } = useSessionContext();

    const user = useSupabaseUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);


    const getUserDetails = () => supabase.from('users').select('*').limit(1).single();


    useEffect(() => {
        if (user && !isLoadingData && !userDetails) {
            setIsLoadingData(true);

            Promise.allSettled([getUserDetails()]).then(
                (results) => {
                    const userDetailsPromise = results[0]
                    if (userDetailsPromise.status === 'fulfilled') {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }

                    setIsLoadingData(false);
                }

            )
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
        }

    }, [user, userDetails, isLoadingUser, isLoadingData]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoading: isLoadingUser || isLoadingData
    };

    return (
        <UserContext.Provider value={value} {...props} />
    )

}


export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within an UserCtxProvider');
    }
    return context;
}