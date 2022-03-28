import { Button, Container } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export function HomePage(){

    const history = useHistory();
    const {user,signIn} = useAuth();

    const handleJoin = async(e)=>{
        e.preventDefault();

        if(!user){
            //console.log("teste")
            await signIn();
        }

        history.push("/cadastro");
        
    }


    return(
        <Container 
            maxWidth="sm"
            className="container__home"
        >
        


        <Button
            variant="contained"
            color="primary"
            onClick={handleJoin}
        >
        Entrar com o google
        </Button>

    
        </Container>
    )
}