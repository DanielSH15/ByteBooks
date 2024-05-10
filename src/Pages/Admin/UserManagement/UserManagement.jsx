import React, { useEffect, useState } from 'react'
import { GetGenres, GetUsers } from './Data/Data'
import UsersTable from './UserManagementComponents/Table/Table'
import EditUserModal from '../../../components/Modals/EditUserAdmin/EditUserModal'
import './UserManagement.css'
import AddUserModal from '../../../components/Modals/AddUserAdmin/AddUserModal'

const UserManagement = () => {
  const[data, setData] = useState([])
  const[searchTerm, setSearchTerm] = useState('')
  const[addUserModalOpen, setAddUserModalOpen] = useState(false)
  const[genres, setGenres] = useState([])

  const handleEditClick = (user, userGenres) => {
    setSelectedUser(user);
    setModalOpen(true)
  };


  const filteredUsers = data.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()) && user.accessKey !== 10)


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
    <div className='admin-page-container'>
      <div className='search-user-container'>
        <input type='text' placeholder='Search by username...' onChange={(e) => setSearchTerm(e.target.value)}/>
      </div>
      <button onClick={() => setAddUserModalOpen(true)} className='add-user-admin-button'>Add User</button>
      <div className='data-table-container' style={{textAlign: 'center'}}>
        {filteredUsers.length > 0 ? (
          <UsersTable users={filteredUsers} onEditClick={handleEditClick}/>
        ) : <h3 style={{color: '#FFF'}}>No matching users found.</h3>}
      </div>
      <AddUserModal show={addUserModalOpen} onHide={() => setAddUserModalOpen(false)}/>
    </div>
  )
}

export default UserManagement