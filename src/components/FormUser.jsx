import { useForm } from 'react-hook-form'
import { useEffect } from 'react';


const FormUser =({createUserData, userSelectedData, updateUser}) =>{

    const { register, handleSubmit, formState: { errors }, reset} = useForm()
    // handleSubmit es la funcion que se ejecutara en el submit
    // register va a tener informacion del input
    console.log(register);

    const getFormData = data => {
        // objeto.propiedad = valor
        //objeto["propiedad"] = valor
        
        if (userSelectedData) {
            //actualizar
            // alert("Actualizando usuario ...");
            // console.log(data);

            updateUser(data)
        }else{
            //crea un nuevo usuario 
            
            // data.id = Date.now()
            console.log(data);
            createUserData(data)
            resetForm()
        }
        
        
    }

    // del estado de RESET
    /*
    reset({
        name: "Tony Stark",
        age:45
    })
    */

    useEffect(() => {
        if(userSelectedData !== null){
            reset(userSelectedData)
            console.log("se selecciono un usuario");
        }else{
            resetForm()
        }
    },[userSelectedData])


    const resetForm = () => {
        reset(
            {
                // id: null,          no lo necesitamos ya lo genera el mismo backend
                first_name: "",
                email: "",
                last_name: "",
                password: "",
                birthday:""
            }
        )
    }
    return(
        <div>
            <form onSubmit={handleSubmit( getFormData)}>
                <div className="input-wrapper">
                    <label htmlFor="user-firstname">Nombre</label><br />
                    <input 
                    type="text"
                    id="user-firstname"
                    { ...register("first_name", { required: true})}
                    />

                    {  errors.name?.type === "required" && <span>Este input es Requerido</span> }
                </div>
                <div className="input-wrapper">
                    <label htmlFor="user-lastname">Categoria</label><br />
                    <input 
                    type="text"
                    id="user-lastname"
                    { ...register("last_name", { required: true})}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="user-email">Precio</label><br />
                    <input 
                    type="email"
                    id="user-email"
                    { ...register("email")}  
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="user-password">Disponible</label><br />
                    <input 
                    type="password"
                    id="user-password"
                    { ...register("password", { required: true})}
                    />
                </div>
            <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default FormUser