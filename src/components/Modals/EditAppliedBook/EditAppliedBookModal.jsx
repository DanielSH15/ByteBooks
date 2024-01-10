import React, { useState, useEffect } from 'react'
import  Axios  from 'axios';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import './EditAppliedBookModal.css'


const EditAppliedBookModal = ({show, onHide, book}) => {
  var imgsrc = 'http://localhost:5226/Photos/' + book.elements[7].elements[0].text
  const [id, setId] = useState(book.elements[0].elements[0].text)
  const [name, setName] = useState(book.elements[1].elements[0].text)
  const [genre, setGenre] = useState(book.elements[2].elements[0].text)
  const [author, setAuthor] = useState(book.elements[3].elements[0].text)
  const [description, setDescription] = useState(book.elements[4].elements[0].text)
  const [releaseDate, setReleaseDate] = useState(book.elements[5].elements[0].text)
  const [pages, setPages] = useState(book.elements[6].elements[0].text)
  const[genres, setGenres] = useState([])
  const[photofilename, setPhotoFileName] = useState(book.elements[7].elements[0].text)
  const [message, setMessage] = useState('')

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

  const HandleClickEdit = () => {
    var xmlhttp = new XMLHttpRequest();
  
    xmlhttp.open('POST', 'http://localhost:5226/Service.asmx', true)
    var sr = 
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
      + '<Body>'
        + '<Update xmlns="http://tempuri.org/">'
          + '<book>'
            +'<Id>' + id + '</Id>'
            +'<name>' + name + '</name>'
            +'<genre>' + genre +'</genre>'
            +'<author>' + author +'</author>'
            +'<description>' + description +'</description>'
            +'<releaseDate>' + releaseDate +'</releaseDate>'
            +'<pages>' + pages +'</pages>'
            +'<photoFileName>' + photofilename +'</photoFileName>'
          +'</book>'
        + '</Update>'
      + '</Body>'
    + '</Envelope>'     
    
    xmlhttp.onreadystatechange = () => {
      if(xmlhttp.readyState === 4){
          if(xmlhttp.status === 200){
            console.log(xmlhttp.responseText)
          }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    window.location.reload(false)
  }

  const HandleClickDelete = () => {
    var xmlhttp = new XMLHttpRequest();
  
    xmlhttp.open('POST', 'http://localhost:5226/Service.asmx', true)
    var sr = 
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
      + '<Body>'
        + '<Delete xmlns="http://tempuri.org/">'
          +'<id>' + id + '</id>'
        + '</Delete>'
      + '</Body>'
    + '</Envelope>'     
    
    xmlhttp.onreadystatechange = () => {
      if(xmlhttp.readyState === 4){
          if(xmlhttp.status === 200){
            console.log(xmlhttp.responseText)
          }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
    window.location.reload(false)
  }

  useEffect(() => {
    GetGenres()
  })
  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>Edit book {book.elements[1].elements[0].text}</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                        <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' placeholder='Name' name='name' defaultValue={book.elements[1].elements[0].text} required onChange={e => {setName(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control as='select' id = 'genres' defaultValue = {book.elements[2].elements[0].text} onChange={e => {setGenre(e.target.value)}}>
                                {genres?.map(genre => (
                                    <option key={genre.genreId} value={genre.name}>{genre.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type='text' placeholder='Author' name='author' defaultValue = {book.elements[3].elements[0].text} required onChange={e => {setAuthor(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Description' name='description' defaultValue = {book.elements[4].elements[0].text} required onChange={e => {setDescription(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type='date' placeholder='Release Date' name='releaseDate' required defaultValue = {book.elements[5].elements[0].text} onChange={e => {setReleaseDate(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pages</Form.Label>
                            <Form.Control type='number' placeholder='Pages' name='pages' required defaultValue = {book.elements[6].elements[0].text} onChange={e => {setPages(e.target.value)}}/>
                        </Form.Group>
                    </Form>
                        </Col>
                    
                    <Col sm={6}>
                        <Image className='imageBook' src={imgsrc}/>
                        <input type="File" className='uploadImage'/>
                    </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                <button className='addbookM' onClick={HandleClickEdit}>Edit</button>
                <button className='canceladd' onClick={onHide}>Cancel</button>
                <h2 style={{position: 'absolute', left: '2%'}}>{message}</h2>
                <br />
                <br />
                  </Modal.Footer>
        </Modal>
  )
}

export default EditAppliedBookModal