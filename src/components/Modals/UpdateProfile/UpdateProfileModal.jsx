import React, {useState, useEffect} from 'react'
import { Modal } from 'react-bootstrap'
import { userSchema } from '../../../Validations/UserValidation'
import { useFormik } from 'formik'
import { GetGenres, GetUserGenres, RefreshToken, Update, deleteUser } from './Data/Data'
import Input from '../../Input/Input'
import MultiSelectInput from '../../Input/MultiSelectInput'
import SelectInput from '../../Input/SelectInput'
import MessageContent from '../MessageContent/MessageContent'
import DeleteConfirmation from '../DeleteConfirmation/DeleteConfirmationModal'
import { Link } from 'react-router-dom'

const UpdateProfileModal = ({show, onHide, user}) => {
    const[genres, setGenres] = useState([])
    const[genders, setGenders] = useState(['Male', 'Female'])
    const[selectedGenres, setSelectedGenres] = useState([])
    const[openModal, setOpenModal] = useState(false)
    const[openDeleteModal, setOpenDeleteModal] = useState(false)
    const[message, setMessage] = useState([])
    const userId = JSON.parse(localStorage.getItem("userId"))

    const formik = useFormik({
        initialValues: {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          password: user.password,
          confirmPassword: '',
          phone: user.phone,
          dateOfBirth: user.dateOfBirth,
          genres: selectedGenres,
          gender: user.gender
        },
        validationSchema: userSchema,
        onSubmit: async (values) => {
          var update = {
            userId: user.userId,
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            password: values.password,
            phone: values.phone,
            dateOfBirth: values.dateOfBirth,
            genres: values.genres,
            gender: values.gender
          }
          try{
            const response = await Update(update)
            await RefreshToken(update)
            console.log(values)
            setMessage(response)
            setOpenModal(true);
          } catch (e){
            setMessage(e.response.data)
            console.log(e)
            setOpenModal(true);
          }
        }
      })

      const handleSelectedGenres = (updatedGenres) => {
        setSelectedGenres(updatedGenres)
        formik.values.genres = updatedGenres
      }
    
      const handleSubmit = async(e) => {
        e.preventDefault()
        formik.values.genres = selectedGenres.map((item, i) => item.value)
        console.log(formik.values)
        formik.handleSubmit()
      }

      const handleDelete = async() => {
        try{
          var res = await deleteUser(userId)
          console.log(res)
        } catch (e) {
          console.log(e)
        }
      }

      useEffect(() => {
        const GetSelectGenres = async() => {
          try{
            var genres = await GetGenres()
            setGenres(genres)
            console.log(genres)
          } catch (e){
            console.log(e)
          }
        }
        const GetUsersGenres = async() => {
          try{
            var userGenres = await GetUserGenres(user)
            setSelectedGenres(userGenres)
          } catch (e){
            console.log(e)
          }
        }
        GetSelectGenres()
        GetUsersGenres()
      }, [])

  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <div className='modalContainer'>
            <Modal.Header closeButton>
                <Modal.Title><h1 style={{marginLeft: '26.5vh'}}>Update Profile</h1></Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <div className='inputs'>
                       <div className='inputContainer'>
                          <Input type='text' label='First Name' id='firstName' defaultValue={formik.values.firstName} onChange={formik.handleChange} 
                          onBlur={formik.handleBlur} touched={formik.touched.firstName} error={formik.errors.firstName}/>
                          <Input type='text' label='Last Name' id='lastName' defaultValue={formik.values.lastName} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.lastName} error={formik.errors.lastName}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Username' id='username' defaultValue={formik.values.username} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.username} error={formik.errors.username}/>
                          <Input type='text' label='Email' id='email' defaultValue={formik.values.email} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.email} error={formik.errors.email}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='password' label='Password' id='password' defaultValue={formik.values.password} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.password} error={formik.errors.password}/>
                          <Input type='password' label='Confirm Password' id='confirmPassword' defaultValue={formik.values.confirmPassword} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.confirmPassword} error={formik.errors.confirmPassword}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='text' label='Phone Number'id='phone' defaultValue={formik.values.phone} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.phone} error={formik.errors.phone}/>
                          <MultiSelectInput options={genres} selectedOptions={selectedGenres} onChange={handleSelectedGenres}
                          onBlur={formik.handleBlur} touched={formik.touched.genres} error={formik.errors.genres}/>
                       </div>
                       <div className='inputContainer'>
                          <Input type='date' label='Birthday' id='dateOfBirth' defaultValue={formik.values.dateOfBirth} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.dateOfBirth} error={formik.errors.dateOfBirth}/>
                          <SelectInput label='Gender' id='gender' options={genders} defaultValue={formik.values.gender} hiddenoption={"Select gender"} onChange={formik.handleChange}
                          onBlur={formik.handleBlur} touched={formik.touched.gender} error={formik.errors.gender}/>
                       </div>
                    </div>
                    <div className='submitContainer'>
                        <button onClick={handleSubmit}>Update</button>
                        <h4><Link style={{color: '#DB630C'}} onClick={() => setOpenDeleteModal(true)}>Delete Account</Link></h4>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                  </Modal.Footer>
            </div>
            <MessageContent show={openModal} onHide={() => setOpenModal(false)} message={message}/>
            <DeleteConfirmation show={openDeleteModal} onHide={() => setOpenDeleteModal(false)} onDelete={handleDelete}/>
        </Modal>
  )
}

export default UpdateProfileModal