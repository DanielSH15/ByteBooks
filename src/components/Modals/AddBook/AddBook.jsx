import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import './AddBook.css'
import BookInput from './Input/BookInput';
import { GetGenres } from './Data/Data';
import { useFormik } from 'formik';
import { bookSchema } from '../../../Validations/BookValidation';
import BookMultiselectInput from './Input/BookMultiselectInput';
import { InsertBook } from './Data/Data';
import MessageContent from '../MessageContent/MessageContent';
import SubmitButton from '../../Buttons/ModalButtons/SubmitButton/SubmitButton';
import CancelButton from '../../Buttons/ModalButtons/CancelButton/CancelButton';

const AddBook = ({show, onHide}) => {
    const [selectedOptions, setSelectedOptions] = useState([])
    const[genres, setGenres] = useState([])
    const[photofilename, setPhotoFileName] = useState('book.jpg')
    const [message, setMessage] = useState('')
    const[openModal, setOpenModal] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: '',
            genres: [],
            author: '',
            description: '',
            releaseDate: '',
            pages: '',
            photoFileName: 'book.jpg',
            previewLink: ''
        },
        validationSchema: bookSchema,
        onSubmit: async(values) => {
            try{
                const response = await InsertBook(values);
                setMessage(response)
                setOpenModal(true);
                console.log(response)
            } catch (e) {
                setMessage(e.response.data);
                setOpenModal(true);
                console.log(e)
            }
        }
    })

    var imagesrc = import.meta.env.VITE_BACKEND_URI + '/Photos/' + photofilename
    const handleFileSelected = (e) => {
       e.preventDefault()
       setPhotoFileName(e.target.files[0].name)
       formik.values.photoFileName = import.meta.env.VITE_BACKEND_URI + '/Photos/' + e.target.files[0].name
       const formData = new FormData()
       formData.append(
        "myFile",
        e.target.files[0],
        e.target.files[0].name
       )

       fetch(import.meta.env.VITE_BACKEND_URI + '/api/book/savefile', {
        method: 'POST',
        body: formData
       })
       .then(res => res.json())
       .then((result) => {
        imagesrc = result
        setPhotoFileName(result)
        console.log(imagesrc)
       },
       (error) => {
        alert('Failed.')
       })
    }

    const handleSelectedGenres = (updatedGenres) => {
        setSelectedOptions(updatedGenres)
        formik.values.genres = updatedGenres
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(formik.values.photoFileName === ""){
            formik.values.photoFileName = import.meta.env.VITE_BACKEND_URI + '/Photos/book.jpg'
        }
        formik.handleSubmit();
        console.log(formik.values)
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
          GetSelectGenres()
    }, [])

    return(
        <div>
            <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Add a new book</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                        <Form>
                        <BookInput label="Name" type="text" placeholder="Name" id="name" defaultValue={formik.values.name} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} touched={formik.touched.name} error={formik.errors.name}/>
                        <BookMultiselectInput options={genres} isMulti value={selectedOptions} onChange={handleSelectedGenres}
                        onBlur={formik.handleBlur} touched={formik.touched.genres} error={formik.errors.genres}/>
                        <BookInput label="Author" type="text" placeholder="Author"  id="author" defaultValue={formik.values.author} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} touched={formik.touched.author} error={formik.errors.author}/>
                        <BookInput label="Description" type="text" placeholder="Description" id="description" defaultValue={formik.values.description} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} touched={formik.touched.description} error={formik.errors.description}/>
                        <BookInput label="Release Date" type="date" placeholder="Release Date" id="releaseDate" defaultValue={formik.values.releaseDate} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} touched={formik.touched.releaseDate} error={formik.errors.releaseDate}/>
                        <BookInput label="Pages" type="number" placeholder="Pages" id="pages" defaultValue={formik.values.pages} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} touched={formik.touched.pages} error={formik.errors.pages}/>
                        <BookInput label="Preview Link" type="text" placeholder="Preview Link" id="previewLink" defaultValue={formik.values.previewLink} onChange={formik.handleChange}
                        onBlur={formik.handleBlur} touched={formik.touched.previewLink} error={formik.errors.previewLink}/>
                    </Form>
                        </Col>
                    
                    <Col sm={6} className='add-book-image-container'>
                        <Image className='imageBook' src={imagesrc}/>
                        <input onChange={handleFileSelected} type="File" className='uploadImage'/>
                    </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                <div className='actions-edit-container'>
                    <div className='add-book-button'>
                        <SubmitButton text="Add" action={handleSubmit}/>
                    </div>
                    <div className='cancel-add-book-button'>
                        <CancelButton text="Cancel" action={onHide}/>
                    </div>
                </div>
                  </Modal.Footer>
                  <MessageContent show={openModal} onHide={() => setOpenModal(false)} message={message}/>
        </Modal>
        </div>
    )
}

export default AddBook;