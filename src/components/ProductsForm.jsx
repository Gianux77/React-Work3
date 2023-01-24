import { useForm } from 'react-hook-form'
import { useEffect } from 'react';


const ProductsForm =({createProductData, productsSelectedData, updateProducts}) =>{

    const { register, handleSubmit, formState: { errors }, reset} = useForm()
    // handleSubmit es la funcion que se ejecutara en el submit
    // register va a tener informacion del input
    console.log(register);

    const getFormData = data => {
        // objeto.propiedad = valor
        //objeto["propiedad"] = valor
        
        if (productsSelectedData) {
            //actualizar
            // alert("Actualizando usuario ...");
            // console.log(data);

            updateProducts(data)
        }else{
            //crea un nuevo usuario 
            
            // data.id = Date.now()
            console.log(data);
            createProductData(data);
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
    

    const resetForm = () => {
        reset(
            {
                // id: null,          no lo necesitamos ya lo genera el mismo backend
                name: "",
                category: "",
                price:""
            }
        )
    }
    useEffect(() => {
        if(productsSelectedData !== null){
            reset(productsSelectedData)
            console.log("se selecciono un usuario");
        }else{
            resetForm()
        }
    },[productsSelectedData])


    return(
        <div>
            <form onSubmit={handleSubmit( getFormData)}>
                <div className="input-wrapper">
                    <label htmlFor="products-name">Nombre</label><br />
                    <input 
                    type="text"
                    id="products-name"
                    { ...register('name', { required: true})}
                    />

                    {  errors.name?.type === "required" && <span>Este input es Requerido</span> }
                </div>
                <div className="input-wrapper">
                    <label htmlFor="products-category">Categoria</label><br />
                    <input 
                    type="text"
                    id="products-category"
                    { ...register('category', { required: true})}
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="products-price">Precio</label><br />
                    <input 
                    type="number"
                    id="products-price"
                    { ...register('price',{ required: true} )}  
                    />
                </div>
                <div className="input-wrapper">
                    <label htmlFor="products-isAvailable">Disponible</label><br />
                    <input 
                    type="checkbox"
                    id="products-isAvailable"
                    { ...register('isAvailable')}
                    />
                </div>
            <button type='submit'>Crear</button>
            </form>
        </div>
    )
}

export default ProductsForm