import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment/moment';
import './EditBookModal.css'

const EditBookModal = ({show, onHide, book}) => {
    const [name, setName] = useState(book.name)
    const [selectedOptions, setSelectedOptions] = useState([])
    const [author, setAuthor] = useState(book.author)
    const [description, setDescription] = useState(book.description)
    const [releaseDate, setReleaseDate] = useState(book.releaseDate)
    const [pages, setPages] = useState(book.pages)
    const[genres, setGenres] = useState([])
    const[photofilename, setPhotoFileName] = useState(book.photoFileName)
    const [message, setMessage] = useState('')

    var imagesrc = photofilename

    const GetGenres = async () => {
        try{
            await Axios.get('http://localhost:5226' + '/api/genre')
            .then((response) => {
                setGenres(response.data)
            }) 
        } catch (e){
            console.log(e.response.data)
        }
    }

    const GetCurrentGenres = async() => {
        try{
            await Axios.get('http://localhost:5226/api/book/getgenresbyid/' + book.bookId)
            .then((response) => {
                setSelectedOptions(response.data)
                console.log(response.data)
            })
        } catch (e) {
            console.log(e.response.data)
        }
    }

    var update = {
        bookId: book.bookId,
        name: name,
        genres: selectedOptions,
        author: author,
        description: description,
        releaseDate: releaseDate,
        pages: pages,
        photoFileName: photofilename
    }

    const handleClick = async() => {
        try{
            await Axios.put('http://localhost:5226/api/book', update)
            .then((response) => {
                console.log(response.data)
            })
        } catch (e){
            console.log(e.response.data)
        }
    }


    useEffect(() => {
        GetGenres()
        GetCurrentGenres()
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
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Name' name='bookname' required onChange={e => {setName(e.target.value)}} defaultValue={name}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Genres</Form.Label>
                            <Select options={genres} isMulti value={selectedOptions} onChange={(selectedOptions) => setSelectedOptions(selectedOptions)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type='text' placeholder='Author' name='bookname' required onChange={e => {setAuthor(e.target.value)}} defaultValue={author}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Description' name='bookname' required onChange={e => {setDescription(e.target.value)}} defaultValue={description}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type='date' placeholder='Release Date' name='bookname' required onChange={e => {setReleaseDate(e.target.value)}} defaultValue={releaseDate}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pages</Form.Label>
                            <Form.Control type='number' placeholder='Pages' name='bookname' required onChange={e => {setPages(e.target.value)}} defaultValue={pages}/>
                        </Form.Group>
                    </Form>
                        </Col>
                    
                    <Col sm={6}>
                        <Image className='imageBook' src={imagesrc}/>
                        <input type="File" className='uploadImage'/>
                    </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button className='addbookM' onClick={handleClick}>Edit</Button>
                <Button className='canceladd' onClick={onHide}>Cancel</Button>
                <h1>{message}</h1>
                <br />
                <br />
                  </Modal.Footer>
        </Modal>
    )
}

export default EditBookModal