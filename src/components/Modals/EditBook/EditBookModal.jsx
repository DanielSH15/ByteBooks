import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import { bookSchema } from '../../../Validations/BookValidation';
import { useFormik } from 'formik';
import './EditBookModal.css'
import { GetCurrentGenres, GetGenres, UpdateBook } from './Data/Data';
import BookInput from '../AddBook/Input/BookInput';
import BookMultiselectInput from '../AddBook/Input/BookMultiselectInput';
import MessageContent from '../MessageContent/MessageContent';

const EditBookModal = ({show, onHide, book}) => {
    const [selectedOptions, setSelectedOptions] = useState([])
    const[genres, setGenres] = useState([])
    const[photofilename, setPhotoFileName] = useState(book.photoFileName)
    const [message, setMessage] = useState('')
    const[openModal, setOpenModal] = useState(false)
    var imagesrc = photofilename

    const formik = useFormik({
        initialValues: {
            name: book.name,
            genres: selectedOptions,
            author: book.author,
            description: book.description,
            releaseDate: book.releaseDate,
            pages: book.pages,
            photoFileName: book.photoFileName,
            previewLink: book.previewLink
        },
        validationSchema: bookSchema,
        onSubmit: async(values) => {
            var update = {
                bookId: book.bookId,
                name: values.name,
                genres: values.genres,
                author: values.author,
                description: values.description,
                releaseDate: values.releaseDate,
                pages: values.pages,
                photoFileName: values.photoFileName != book.photoFileName ? import.meta.env.VITE_BACKEND_URI + '/Photos/' + values.photoFileName : values.photoFileName,
                previewLink: values.previewLink
            }
            try{
                const response = await UpdateBook(update);
                setMessage(response)
                setOpenModal(true)
                console.log(response)
            } catch (e) {
                console.log(e)
                setMessage(e.response.data)
                setOpenModal(true)
            }
        }
    })

    const handleSelectedGenres = (updatedGenres) => {
        setSelectedOptions(updatedGenres)
        formik.values.genres = updatedGenres
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(formik.values.photoFileName === ""){
            formik.values.photoFileName = import.meta.env.VITE_BACKEND_URI + '/Photos/book.jpg'
        }
        formik.values.genres = selectedOptions
        formik.values.previewLink = book.previewLink
        formik.values.photoFileName = photofilename
        formik.handleSubmit();
        console.log(formik.values)
    }

    const handleFileSelected = (e) => {
        e.preventDefault()
        setPhotoFileName(e.target.files[0].name)
        formik.values.photoFileName = import.meta.env.VITE_BACKEND_URI + "/Photos/" + e.target.files[0].name
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

    useEffect(() => {
        const GetSelectGenres = async() => {
            try{
                var genres = await GetGenres();
                setGenres(genres)
            } catch (e){
                console.log(e)
            }
        }
        const GetBookGenres = async() => {
            try{
                var bookGenres = await GetCurrentGenres(book)
                setSelectedOptions(bookGenres)
            } catch (e) {
                console.log(e)
            }
        }
        GetSelectGenres()
        GetBookGenres()
    }, [])

  return(
        <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit book: {book.name}</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                        <Form>
                        <BookInput label="Name" type="text" placeholder="Name" id="name" defaultValue={book.name} onChange={formik.handleChange}
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
                    </Form>
                        </Col>
                    
                    <Col sm={6}>
                        <Image className='imageBook' src={imagesrc}/>
                        <input onChange={handleFileSelected} type="File" className='uploadImage'/>
                    </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                <div className='actions-edit-container'>
                    <Button className='addbookM' onClick={handleSubmit}>Edit</Button>
                    <Button className='canceladd' onClick={onHide}>Cancel</Button>
                </div>
                  </Modal.Footer>
                  <MessageContent show={openModal} onHide={() => setOpenModal(false)} message={message}/>
        </Modal>
    )
}

export default EditBookModal