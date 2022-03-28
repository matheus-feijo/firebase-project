import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";


export function Pagina404(){

    return(
        <div>
            <h1>PAGINA 404 PODE VOLTAR</h1>

            <Button 
                size="large"
                variant="contained"
                color="secondary"
                component={Link}
                to={"/"}
            >
                Voltar
            </Button>
        </div>
    )
}