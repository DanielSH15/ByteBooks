import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import moment from 'moment/moment';
import Select from 'react-select';
import './AddBook.css'
import BookInput from './Input/BookInput';

const AddBook = ({show, onHide}) => {
    const [name, setName] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([])
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [pages, setPages] = useState(0)
    const[genres, setGenres] = useState([])
    const[photofilename, setPhotoFileName] = useState('book.jpg')
    const [message, setMessage] = useState('')

    var imagesrc = import.meta.env.VITE_BACKEND_URI + '/Photos/' + photofilename

    const GetGenres = async () => {
        try{
            await Axios.get(import.meta.env.VITE_BACKEND_URI + '/api/genre')
            .then((response) => {
                setGenres(response.data)
            }) 
        } catch (e){
            console.log(e.response.data)
        }
    }

    const handleFileSelected = (e) => {
       e.preventDefault()
       setPhotoFileName(e.target.files[0].name)
       const formData = new FormData()
       formData.append(
        "myFile",
        e.target.files[0],
        e.target.files[0].name
       )

       fetch(import.meta.env.VITE_BACKEND_URI + 'api/book/savefile', {
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

    const insert = {
        name: name,
        genres: selectedOptions,
        author: author,
        description: description,
        releaseDate: releaseDate,
        pages: pages,
        photoFileName: import.meta.env.VITE_BACKEND_URI + '/Photos/' + photofilename,
    }

    const errorMessages = {
        name: "Title should start with a big letter and shouldn't include special characters!",
        notempty: "Should not be empty!"
    }

    const AddBook = async () => {
       var dateString = moment(releaseDate).format('YYYY-MM-DD')
       setReleaseDate(dateString)
       try{
         await Axios.post(import.meta.env.VITE_BACKEND_URI + '/api/book', insert)
         .then((response) => {
            setMessage(response.data)
         })
       } catch (e){
         setMessage(e.response.data)
       }
    }

    useEffect(() => {
        GetGenres()
        console.log(name)
    }, [])

    return(
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
                        <BookInput label="Name" type="text" placeholder="Name" action={e => {setName(e.target.value)}} id="name" regex={/^[A-Z][a-z]*$/} errorMessage={errorMessages.name}/>
                        <Form.Group>
                            <Form.Label>Genres</Form.Label>
                            <Select options={genres} isMulti value={selectedOptions} onChange={(selectedOptions) => setSelectedOptions(selectedOptions)}/>
                        </Form.Group>
                        <BookInput label="Author" type="text" placeholder="Author" action={e => {setAuthor(e.target.value)}} id="author" regex={/^(?!\s*$).+/} errorMessage={errorMessages.notempty}/>
                        <BookInput label="Description" type="text" placeholder="Description" action={e => {setDescription(e.target.value)}} id="description" regex={/^(?!\s*$).+/} errorMessage={errorMessages.notempty}/>
                        <BookInput label="Release Date" type="date" placeholder="Release Date" action={e => {setReleaseDate(e.target.value)}} id="releaseDate" regex={/^(?!\s*$).+/} errorMessage={errorMessages.notempty}/>
                        <BookInput label="Pages" type="number" placeholder="Pages" action={e => {setPages(e.target.value)}} id="pages" regex={/^(?!\s*$).+/} errorMessage={errorMessages.notempty}/>
                        
                    </Form>
                        </Col>
                    
                    <Col sm={6}>
                        <Image className='imageBook' src={imagesrc}/>
                        <input onChange={handleFileSelected} type="File" className='uploadImage'/>
                    </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button className='addbookM' onClick={AddBook}>Add</Button>
                <Button className='canceladd' onClick={onHide}>Cancel</Button>
                <h1>{message}</h1>
                <br />
                <br />
                  </Modal.Footer>
        </Modal>
    )
}

export default AddBook;