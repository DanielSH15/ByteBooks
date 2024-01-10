import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import moment from 'moment/moment';
import Select from 'react-select';
import './AddBook.css'

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

    var imagesrc = 'http://localhost:5226/Photos/' + photofilename

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

    const handleFileSelected = (e) => {
       e.preventDefault()
       setPhotoFileName(e.target.files[0].name)
       const formData = new FormData()
       formData.append(
        "myFile",
        e.target.files[0],
        e.target.files[0].name
       )

       fetch('http://localhost:5226/' + 'api/book/savefile', {
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
        photoFileName: 'http://localhost:5226/Photos/' + photofilename,
    }

    const AddBook = async () => {
       var dateString = moment(releaseDate).format('YYYY-MM-DD')
       setReleaseDate(dateString)
       try{
         await Axios.post('http://localhost:5226/api/book', insert)
         .then((response) => {
            setMessage(response.data)
         })
       } catch (e){
         setMessage(e.response.data)
       }
    }

    useEffect(() => {
        GetGenres()
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
                            <Form.Control type='text' placeholder='Name' name='bookname' required onChange={e => {setName(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Select options={genres} isMulti value={selectedOptions} onChange={(selectedOptions) => setSelectedOptions(selectedOptions)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type='text' placeholder='Author' name='bookname' required onChange={e => {setAuthor(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Description' name='bookname' required onChange={e => {setDescription(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type='date' placeholder='Release Date' name='bookname' required onChange={e => {setReleaseDate(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pages</Form.Label>
                            <Form.Control type='number' placeholder='Pages' name='bookname' required onChange={e => {setPages(e.target.value)}}/>
                        </Form.Group>
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