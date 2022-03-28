import react,{useState,useEffect} from "react";
import {TextField,Button} from "@material-ui/core";
import { useAuth } from "../Hooks/useAuth";
import { push, ref, set } from "firebase/database";
import { db } from "./firebase";
import { useHistory } from "react-router-dom";
 
export function Cadastro(){
    /**CONTEXT */
    const {user} = useAuth();

    const history = useHistory();


    const initialValues = {
        email:"",
        tel:"",
    }
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const [isSubmitting,setIsSubmitting] = useState(false);

    function submit(){
        try {
            salvarDados();
            history.push("/sucess");
        } catch (error) {
            console.log("nao deu certo")
        }
        
    }

    const salvarDados = async()=>{
        const formRef = ref(db,"contas");

        const dados = {
            authorId:user.id,
            nome:user.nome,
            email:formValues.email,
            telefone:formValues.tel
        }

        console.log(user);
        
        const firebaseForm = await push(formRef);
        set(firebaseForm,dados)
    }

    function validate(values){
        let erros = {};

        if(!values.email){
            erros.email = "Campo Obrigatorio";
        }
        if(!values.tel){
            erros.tel = "Campo Obrigatorio";
        }

        return erros;

    }

    useEffect(()=>{
        if(Object.keys(formErrors).length === 0 && isSubmitting){
            submit();
            setIsSubmitting(false);
        }
    },[isSubmitting,formErrors])

    function handleSubmit(e){
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);

    }


    function handleChange(e){
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }


    return(
        <form
            onSubmit={handleSubmit}
            //onReset={cleanFields}
            style={{marginTop:"10vh"}}
        >
            <TextField 
                name="nome"
                variant="outlined"
                label="nome"
                fullWidth
                margin="normal"
                disabled
                value={user.nome}
            />
            <TextField 
                name="email"
                variant="outlined"
                label="email"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formValues.email}
                helperText={formErrors.email}
                error={formErrors.email}
            />
            <TextField 
                name="tel"
                variant="outlined"
                label="telefone"
                fullWidth
                margin="normal"
                onChange={handleChange}
                value={formValues.tel}
                helperText={formErrors.tel}
                error={formErrors.tel}
            />

            <Button
                type="reset"
                color="default"
                variant="contained"
                size="large"
                >
                Resetar
            </Button>
            <Button
                style={{left:"31vh"}}
                color="primary"
                variant="contained"
                type="submit"
                size="large"
            >
                Confirmar
            </Button>
        </form>
    )
}