import react from "react";
import { createContext,useState } from "react";
import {  GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../Pages/firebase";
import { useEffect } from "react";

export const authContext = createContext();

export function AuthProvider({children}){

    const [user,SetUser] = useState({});

    

    const signIn = async() =>{
        try {  
            console.log("tent") 
             const googleProvider = new GoogleAuthProvider();
             const result = await signInWithPopup(auth,googleProvider);
             //console.log(result);
             if(result.user){
                 const {displayName,photoURL,uid} = result.user;

                 if(!displayName || !photoURL){
                     throw new Error("nao foi possivel autenticar pois nao tem foto ou nome");
                 }

                 SetUser({
                     nome:displayName,
                     avatar:photoURL,
                     id:uid
                 })

             }

        } catch (error) {
            console.log("nao foi possivel realizar autneticação: ",error)
        }
    }


    useEffect(()=>{
        const cadastrado = auth.onAuthStateChanged(user=>{
            if(user){
                const {displayName,photoURL,uid} = user
                

                if(!displayName || !photoURL){
                    throw new Error("Cadastro sem nome ou foto")
                }
                SetUser({
                    nome:displayName,
                    avatar:photoURL,
                    id:uid
                })

            }
        })

        return ()=>{cadastrado()}
    },[])

    return(
        <authContext.Provider
        value={{
            user,
            signIn
        }}
        >
        {children}
        </authContext.Provider>
    )
}