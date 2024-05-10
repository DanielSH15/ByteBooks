import React, { useEffect, useState } from 'react'
import { HiUser, HiPencil, HiTrash } from 'react-icons/hi'
import { GetUserGenres } from '../../Data/Data'
import EditUserModal from '../../../../../components/Modals/EditUserAdmin/EditUserModal'
import DeleteConfirmation from '../../../../../components/Modals/DeleteConfirmation/DeleteConfirmationModal'
import axios from 'axios'

const UserItem = (props) => {
    const[modalOpen, setModalOpen] = useState(false)
    const[deleteModalOpen, setDeleteModalOpen] = useState(false)

    const GetSelectedGenres = async() => {
        try{
            const selectedGenres = await GetUserGenres(props.user)
            setUserGenres(selectedGenres)
            return selectedGenres;
        } catch (e) {
            console.log(e)
            return null;
        }
    }

    const GetGenres = async() => {
        try{
            await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/genre')
            .then((response) => {
                setGenres(response.data)
            })
        } catch (e){
            console.log(e)
        }
    }

    const DeleteUser = async() => {
        try{
            await axios.delete(import.meta.env.VITE_BACKEND_URI + '/api/user/' + props.user.userId)
            .then((response) => {
                console.log(response)
                window.location.reload(false)
            })
        } catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        GetGenres()
        GetSelectedGenres()
    }, [])

  return (
    <tr key={props.key}>
        <td>{props.user.userId}</td>
        <td><HiUser /></td>
        <td>{props.user.username}</td>
        <td>{props.user.accessKey}</td>
        <td>
            <HiPencil style={{cursor: 'pointer'}} onClick={() => setModalOpen(true)}/>
            <HiTrash style={{cursor: 'pointer'}} onClick={() => setDeleteModalOpen(true)}/>
        </td>
        <EditUserModal
          user={props.user}
          show={modalOpen}
          onHide={() => setModalOpen(false)}
        />
        <DeleteConfirmation show={deleteModalOpen} onHide={() => setDeleteModalOpen(false)} onDelete={DeleteUser}/>
    </tr>
  )
}

export default UserItem