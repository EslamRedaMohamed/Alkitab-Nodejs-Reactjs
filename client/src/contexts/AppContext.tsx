import React, { createContext } from 'react'
import { User } from '../types/user'

interface AppContextProps {
    user: User | null;
    setUser?:React.Dispatch<React.SetStateAction<null>>;
}

const AppContext= createContext<AppContextProps>({} as AppContextProps)

export default AppContext