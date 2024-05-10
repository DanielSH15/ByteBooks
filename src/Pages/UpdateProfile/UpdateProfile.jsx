import React, { useContext, useEffect, useState } from 'react'
import './UpdateProfile.css'
import DataField from './Components/InitialDataField/DataField'
import { Link } from 'react-router-dom'
import { userSchema } from '../../Validations/UserValidation'
import { useFormik } from 'formik'
import { GetUserGenres, RefreshToken, Update, deleteUser } from './Data/Data'
import { Context } from '../../components/Contexts/AuthContext/AuthContext'
import { GenreContext } from '../../components/Contexts/GenreContext/GenreContext'
import MessageContent from '../../components/Modals/MessageContent/MessageContent'
import DeleteConfirmationModal from '../../components/Modals/DeleteConfirmation/DeleteConfirmationModal'
import MultiSelectDataField from './Components/MultiSelectDataField/MultiSelectDataField'

const UpdateProfile = () => {
    const userId = localStorage.getItem("userId")
    const[selectedGenres, setSelectedGenres] = useState([])
    const[openModal, setOpenModal] = useState(false)
    const[openDeleteModal, setOpenDeleteModal] = useState(false)
    const[message, setMessage] = useState([])
    const [loading, setLoading] = useState(true);
    const[userGender, setUserGender] = useState()
    const { user } = useContext(Context)
    const { genres } = useContext(GenreContext)

    const genders = ['Male', 'Female']



    useEffect(() => {

          const fetchData = async() => {
            if (!user) return;

            try {
                const userGenres = await GetUserGenres(user);
                setSelectedGenres(userGenres);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
          }

          fetchData();

          const handleResize = () => {
            if(window.innerWidth < 768){
                const newHeight = window.innerHeight + 700
                document.body.style.height = newHeight + "px";
            } else {
                document.body.style.height = "100vh";
            }
        }

        window.addEventListener('resize', handleResize);

        console.log(user)
        console.log(genres)
        return () => {
            window.removeEventListener('resize', handleResize);
          };
    }, [user])

    const formik = useFormik({
      initialValues: {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || '',
        email: user.email || '',
        password: user.password || '',
        confirmPassword: '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        genres: selectedGenres,
        gender: user.gender || ''
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
          //await RefreshToken(update)
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

    useEffect(() => {
      if (!loading) {
          formik.setValues({
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              username: user.username || '',
              email: user.email || '',
              password: user.password || '',
              confirmPassword: '',
              phone: user.phone || '',
              dateOfBirth: user.dateOfBirth || '',
              genres: selectedGenres,
              gender: user.gender || ''
          });
      }
    }, [loading, user, selectedGenres]);

    if(!user || Object.keys(user).length === 0){
      return <div>Loading...</div>
    }

      const handleSelectedGenres = (updatedGenres) => {
        setSelectedGenres(updatedGenres)
        formik.values.genres = updatedGenres
      }

      const handleSelectedGender = (updatedGender) => {
        console.log(updatedGender.target.value)
        setUserGender(updatedGender.target.value)
        formik.values.gender = updatedGender.target.value
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



  return (
    <div className='update-profile-content-container'>
        <div className="data-fields">
            <div className="data-field">
                <DataField type='text' label='First Name' id='firstName' defaultValue={formik.values.firstName} onChange={formik.handleChange} 
                onBlur={formik.handleBlur} touched={formik.touched.firstName} error={formik.errors.firstName}/>
                <DataField type='text' label='Last Name' id='lastName' defaultValue={formik.values.lastName} onChange={formik.handleChange}
                onBlur={formik.handleBlur} touched={formik.touched.lastName} error={formik.errors.lastName}/>
            </div>
            <div className="data-field">
                <DataField type='text' label='Username' id='username' defaultValue={formik.values.username} onChange={formik.handleChange}
                onBlur={formik.handleBlur} touched={formik.touched.username} error={formik.errors.username}/>
                <DataField type='text' label='Email' id='email' defaultValue={formik.values.email} onChange={formik.handleChange}
                onBlur={formik.handleBlur} touched={formik.touched.email} error={formik.errors.email}/>
            </div>
            <div className="data-field">
                <DataField type='password' label='Password' id='password' defaultValue={formik.values.password} onChange={formik.handleChange}
                onBlur={formik.handleBlur} touched={formik.touched.password} error={formik.errors.password}/>
                <DataField type='password' label='Confirm Password' id='confirmPassword' defaultValue={formik.values.confirmPassword} onChange={formik.handleChange}
                onBlur={formik.handleBlur} touched={formik.touched.confirmPassword} error={formik.errors.confirmPassword}/>
            </div>
            <div className="data-field">
                <DataField type='text' label='Phone Number'id='phone' defaultValue={formik.values.phone} onChange={formik.handleChange}
                onBlur={formik.handleBlur} touched={formik.touched.phone} error={formik.errors.phone}/>
                <MultiSelectDataField label={"Favorite Genres"} options={genres} selectedOptions={selectedGenres} onChange={handleSelectedGenres}
                onBlur={formik.handleBlur} touched={formik.touched.genres} error={formik.errors.genres} isMulti={true} placeholer="Select Favorite Genres"/>
            </div>
            <div className="data-field">
                <DataField type='date' label='Birthday' id='dateOfBirth' defaultValue={formik.values.dateOfBirth} onChange={formik.handleChange}
                onBlur={formik.handleBlur} touched={formik.touched.dateOfBirth} error={formik.errors.dateOfBirth}/>
                <MultiSelectDataField label = "Gender" options={genders} selectedOptions={formik.values.gender} onChange={handleSelectedGender} 
                onBlur = {formik.handleBlur} touched = {formik.touched.gender} error={formik.errors.gender} isMulti={false} placeholer="Select your gender"/>
            </div>
        </div>
        <div className='update-profile-actions'>
            <button onClick={handleSubmit}>Update Profile</button>
            <div className='delete-profile-action'><Link style={{color: "#DB630C"}}>Delete Account</Link></div>
        </div>
        <MessageContent show={openModal} onHide={() => setOpenModal(false)} message={message}/>
        <DeleteConfirmationModal show={openDeleteModal} onHide={() => setOpenDeleteModal(false)} onDelete={handleDelete}/>
    </div>
  )
}

export default UpdateProfile