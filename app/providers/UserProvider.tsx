'use client'

import { UserCtxProvider } from "../hooks/useUser"

interface UserProviderProps {
    children: React.ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
    return (
        <UserCtxProvider>
            {children}
        </UserCtxProvider>
    )
}

export default UserProvider;