import { useState, useEffect } from 'react'
import './App.css'
import ProductsForm from './components/ProductsForm'
import axios from 'axios'
import ProductsList from './components/ProductsList'


function App() {
    const [products, setProducts] = useState( [] ) //usersData
    console.log(products);
    
    const addProducts = (data) =>{
      // console.log("nuevoUsuario", data);
      // setUsers( [...users, data] )
      // console.log(users);
      /* axios.post("url", body)*/

      axios.post("https://products-crud.academlo.tech/products/", data)
      .then(() => getAPIDATA())
      .catch(error => console.error(error))
}

useEffect(()=>{
  axios.get("https://products-crud.academlo.tech/products/")
  .then( resp => setProducts(resp.data))
  .catch( error => console.error(error))
}, [])

const getAPIDATA = () =>{
  axios.get("https://products-crud.academlo.tech/products/")
  .then( resp => setProducts(resp.data))
  .catch( error => console.error(error))
}


// FUNCION DE ELIMINACION, ELIMINA UN USUARIO

const deleteProducts = (productsId) => {                              // UserList.jsx >> deleteUser >> App.jsx llamar a deleteUser
  
  /* axios.delete("url") */

  axios.delete(`https://products-crud.academlo.tech/products/${productsId}/`)
  .then(() => getAPIDATA())
  .catch(error => console.error(error))
  // console.log(userId);
  //QUITAR USUARIO: Filtrar a todos los usuarios diferentes al usuario que queramos eliminar
  // Todos los usuarios que queremos conservar
  
  // const filteredUsers = users.filter( user => user.id !== userId )
  // setUsers( filteredUsers)
}
//Estados no deben mutarse

const selectProducts = (productsData) => {
  // console.log(userData);
  // alert("Usuario seleccionado")
  setProductsDataUpdate(productsData)
}

// INFORMACION DEL USERDATA
/* POSIBLES VALORES 

NULL  >>  CUANDO NO HAY NADA SELECCIONADO
{name, id ... } >> hay un usuario

*/

const[productsDataUpdate, setProductsDataUpdate] = useState(null)

const updateProducts = (editedProducts)=>{
  // alert("Actualizacion!!!")
// console.log(editedUser);

axios.put(`https://products-crud.academlo.tech/products/${editedProducts.id}/`, editedProducts)
.then(() => getAPIDATA())
.catch(error => console.error(error))

// const index = users.findIndex( (user) => user.id === editedUser.id)

// users[index] = editedUser

// setUsers( [...users] )

setProductsDataUpdate(null)

}





return (
  <div className="App">
    <ProductsForm
    createProductsData={ (data) => addProducts(data)}
    productsSelectedData ={productsDataUpdate}
    updateProducts={updateProducts}
    /><br />
    <hr /><br />
    <ProductsList
    products={products}
    deleteProducts={deleteProducts}
    selectProducts={selectProducts}
    />
    </div>
  )
}

export default App
