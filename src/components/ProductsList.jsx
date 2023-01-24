

const ProductsList = ({products, deleteProducts, selectProducts}) =>{

    return(
        <ul>
            {
                products?.map( (productsElement, index) => (
            
                        <li key={`product-${index}`}>
                            <h4><span>Nombre: </span>{productsElement.name}</h4>
                            <h4><span>Categoria: </span>{productsElement.category}</h4>
                            <h4><span>Precio: </span>${productsElement.price}</h4>
                            <button onClick={() => deleteProducts(productsElement.id)}>Eliminar</button>
                            <button onClick={ () => selectProducts(productsElement) }>Editar</button>
                        </li>
                ) )
            }
        
            
        </ul>
    )
}

export default ProductsList