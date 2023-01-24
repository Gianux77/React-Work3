import { useForm } from 'react-hook-form'
import { useEffect } from 'react';


const ProductsForm =({createProductData, productSelectedData, updateProduct}) =>{

    const { register, handleSubmit, formState: { errors }, reset} = useForm()
    // handleSubmit es la funcion que se ejecutara en el submit
    // register va a tener informacion del input
    console.log(register);

    const getFormData = data => {
        // objeto.propiedad = valor
        //objeto["propiedad"] = valor
        
        if (productSelectedData) {
            //actualizar
            // alert("Actualizando usuario ...");
            // console.log(data);

            updateProduct(data)
        }else{
            //crea un nuevo usuario 
            
            // data.id = Date.now()
            console.log(data);
            createProductData(data)
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
    if(productSelectedData !== null){
        reset(productSelectedData)
        console.log("se selecciono un usuario");
        }else{
            resetForm()
        }
    },[productSelectedData])
    
    const resetForm = () => {
        reset(
            {
                // id: null,          no lo necesitamos ya lo genera el mismo backend
                name: "",
                category: "",
                price:"",
                isAvailable: false
            }
        )
    }
    
    return(
        <div>
            <form onSubmit={handleSubmit(getFormData)}>
                <div className="input-wrapper">
                    <label htmlFor="product-name">Nombre</label><br />
                    <input 
                    type="text"
                    id="product-name"
                    { ...register('name', { required: true})}
                    />

                    {  errors.name?.type === "required" && <span>Este input es Requerido</span> }
                </div>
                <div className="input-wrapper">
                    <label htmlFor="product-category">Categoria</label><br />
                    <input 
                    type="text"
                    id="product-category"
                    { ...register('category', { required: true})}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="product-price">Precio</label><br />
                    <input 
                    type="number"
                    id="product-price"
                    { ...register('price',{ required: true} )}  
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="product-isAvailable">Disponible</label><br />
                    <input 
                    type="checkbox"
                    id="product-isAvailable"
                    { ...register('isAvailable')}
                    />
                </div>
            <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default ProductsForm