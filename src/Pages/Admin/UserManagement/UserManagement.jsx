import React, { useEffect, useState } from 'react'
import { GetGenres, GetUsers } from './Data/Data'
import UsersTable from './UserManagementComponents/Table/Table'
import EditUserModal from '../../../components/Modals/EditUserAdmin/EditUserModal'

const UserManagement = () => {
  const[data, setData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const[modalOpen, setModalOpen] = useState(false)
  const[userGenres, setUserGenres] = useState([])

  const[genres, setGenres] = useState([])

  const handleEditClick = (user, userGenres) => {
    setSelectedUser(user);
    setUserGenres(userGenres)
    setModalOpen(true)
  };

  const handleSaveUser = (editedUser) => {
    const updatedUsers = data.map(user =>
      user.id === editedUser.id ? editedUser : user
    );
    setData(updatedUsers);
  };


  
  useEffect(() => {
    const GetData = async() => {
      try{
        var newData = await GetUsers();
        setData(newData.Value)
        console.log(newData.Value)
      } catch (e) {
        console.log(e)
      }
    }

    const GetOptionsGenres = async() => {
      try{
        var genres = await GetGenres()
        setGenres(genres)
      } catch(e){
        console.log(e)
      }
    }

    GetData()
    GetOptionsGenres()
  }, [])
  return (
    <div>
      <UsersTable users={data} onEditClick={handleEditClick}/>
    </div>
  )
}

export default UserManagement