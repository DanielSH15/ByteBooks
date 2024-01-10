import React, { useState, useEffect } from 'react'
import  Axios  from 'axios';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import convert from 'xml-js';

const ApplyBook = ({show, onHide}) => {
    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [pages, setPages] = useState(0)
    const[genres, setGenres] = useState([])
    const[photofilename, setPhotoFileName] = useState('book.jpg')
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')
    var imagesrc = 'http://localhost:5226/Photos/' + photofilename
    var userId = localStorage.getItem("userId")
    var dummyBookId = 0

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
   

    const HandleClick = () => {
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.open('POST', 'http://localhost:5226/Service.asmx', true)
        var sr = 
        '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
          + '<Body>'
            + '<Insert xmlns="http://tempuri.org/">'
              + '<book>'
                +'<name>' + name + '</name>'
                +'<genre>' + genre +'</genre>'
                +'<author>' + author +'</author>'
                +'<description>' + description +'</description>'
                +'<releaseDate>' + releaseDate +'</releaseDate>'
                +'<pages>' + pages +'</pages>'
                +'<photoFileName>' + photofilename +'</photoFileName>'
              +'</book>'
              +'<pendingBook>'
                +'<userId>' + userId +'</userId>'
                +'<appliedBookId>' + dummyBookId +'</appliedBookId>'
              +'</pendingBook>'
            + '</Insert>'
          + '</Body>'
        + '</Envelope>'     
        
        xmlhttp.onreadystatechange = () => {
          if(xmlhttp.readyState === 4){
              if(xmlhttp.status === 200){
                console.log(xmlhttp.responseText)
                setMessage(convert.xml2js(xmlhttp.responseText))
                setResponse(message.elements[0].elements[0].elements[0].elements[0].elements[0].text)
                console.log(response)
              }
          }
        }
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(sr);
      }

    useEffect(() => {
        GetGenres()
    }, [])
  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Apply your custom book</Modal.Title>
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
                            <Form.Control as='select' onChange={e => {setGenre(e.target.value)}}>
                                <option selected hidden>Select Genre</option>
                                {genres?.map(genre => (
                                    <option key={genre.genreId}>{genre.name}</option>
                                ))}
                            </Form.Control>
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
                        <input type="File" className='uploadImage'/>
                    </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                <Button className='addbookM' onClick={HandleClick}>Apply</Button>
                <Button className='canceladd' onClick={onHide}>Cancel</Button>
                <h1>{response}</h1>
                <br />
                <br />
                  </Modal.Footer>
        </Modal>
  )
}

export default ApplyBook