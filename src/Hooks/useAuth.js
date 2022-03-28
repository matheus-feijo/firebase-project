import { useContext } from "react";
import { authContext } from "../Context/AuthContext";


export function useAuth(){
    const value = useContext(authContext);
    return value;
}