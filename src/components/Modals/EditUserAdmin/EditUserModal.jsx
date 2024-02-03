import React, {useEffect, useState} from 'react'
import { Modal } from 'react-bootstrap';
import UserInput from './Input/UserInput'
import UserMultiSelectInput from './Input/UserMultiSelectInput'
import SelectInput from './Input/SelectInput'
import axios from 'axios';
import { GetGenres } from '../UpdateProfile/Data/Data';

const EditUserModal = (props) => {
  const[genres, setGenres] = useState([])
  const[selectedGenres, setSelectedGenres] = useState([])

  const handleSelectedGenres = (updatedGenres) => {
    setSelectedGenres(updatedGenres)
  }


  useEffect(() => {
    const GetOptionsGenres = async() => {
      try{
        var res = await GetGenres()
        setGenres(res)
      } catch (e) {
        console.log(e)
      }
    }

    const GetCurrentGenres = async() => {
        try{
            const response = await axios.get(import.meta.env.VITE_BACKEND_URI + `/api/user/getgenres/${props.user.userId}`);    
            setSelectedGenres(response.data);
        } catch (e){
            console.log(e)
        }
    }

    GetOptionsGenres()
    GetCurrentGenres();
  }, [])



  return (
    <Modal
        size='lg'
        centered
        show={props.show}
        onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <UserInput type='text' placeholder='First name' defaultValue={props.user.firstName}/>
                <UserInput type='text' placeholder='Last name' defaultValue={props.user.lastName}/>
                <UserInput type='text' placeholder='Username' defaultValue={props.user.username}/>
                <UserInput type='text' placeholder='Email' defaultValue={props.user.email}/>
                <UserInput type='text' placeholder='Password' defaultValue={props.user.password}/>
                <UserInput type='text' placeholder='Confirm password' />
                <UserInput type='text' placeholder='Phone number' defaultValue={props.user.phone}/>
                <UserMultiSelectInput options={genres} selectedOptions={selectedGenres} onChange={handleSelectedGenres}/>
                <SelectInput />
            </Modal.Body>
            <Modal.Footer>
                <button>Save</button>
                <button onClick={props.onHide}>Cancel</button>
            </Modal.Footer>
    </Modal>
  )
}

export default EditUserModal