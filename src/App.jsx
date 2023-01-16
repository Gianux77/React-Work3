import { useState, useEffect } from 'react'
import './App.css'
import FormUser from './components/FormUser'
import usersData from './data/userData'
import UserList from './components/UsersList'
import axios from 'axios'

function App() {
    const [users, setUsers] = useState( [] ) //usersData
    console.log(users);
    
    const addUser = (data) =>{
      // console.log("nuevoUsuario", data);
      // setUsers( [...users, data] )
      // console.log(users);
      /* axios.post("url", body)*/

      axios.post("https://users-crud.academlo.tech/users/", data)
      .then(() => getAPIDATA())
      .catch(error => console.error(error))
}

useEffect(()=>{
  axios.get("https://users-crud.academlo.tech/users/")
  .then( resp => setUsers(resp.data))
  .catch( error => console.error(error))
}, [])

const getAPIDATA = () =>{
  axios.get("https://users-crud.academlo.tech/users/")
  .then( resp => setUsers(resp.data))
  .catch( error => console.error(error))
}


// FUNCION DE ELIMINACION, ELIMINA UN USUARIO

const deleteUser = (userId) => {                              // UserList.jsx >> deleteUser >> App.jsx llamar a deleteUser
  
  /* axios.delete("url") */

  axios.delete(`https://users-crud.academlo.tech/users/${userId}/`)
  .then(() => getAPIDATA())
  .catch(error => console.error(error))
  // console.log(userId);
  //QUITAR USUARIO: Filtrar a todos los usuarios diferentes al usuario que queramos eliminar
  // Todos los usuarios que queremos conservar
  
  // const filteredUsers = users.filter( user => user.id !== userId )
  // setUsers( filteredUsers)
}
//Estados no deben mutarse

const selectUser = (userData) => {
  // console.log(userData);
  // alert("Usuario seleccionado")
  setUserDataUpdate(userData)
}

// INFORMACION DEL USERDATA
/* POSIBLES VALORES 

NULL  >>  CUANDO NO HAY NADA SELECCIONADO
{name, id ... } >> hay un usuario

*/

const[userDataUpdate, setUserDataUpdate] = useState(null)

const updateUser = (editedUser)=>{
  // alert("Actualizacion!!!")
// console.log(editedUser);

axios.put(`https://users-crud.academlo.tech/users/${editedUser.id}/`, editedUser)
.then(() => getAPIDATA())
.catch(error => console.error(error))

// const index = users.findIndex( (user) => user.id === editedUser.id)

// users[index] = editedUser

// setUsers( [...users] )

setUserDataUpdate(null)

}





return (
  <div className="App">
    <FormUser
    createUserData={ (data) => addUser(data)}
    userSelectedData ={userDataUpdate}
    updateUser={updateUser}
    /><br />
    <hr /><br />
    <UserList
    users={users}
    deleteUser={deleteUser}
    selectUser={selectUser}
    />
    </div>
  )
}

export default App
