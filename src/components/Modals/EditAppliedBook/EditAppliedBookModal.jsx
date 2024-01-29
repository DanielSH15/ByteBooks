import React, { useState, useEffect } from 'react'
import { Col, Form, Modal, Row, Image } from 'react-bootstrap';
import Select from 'react-select';
import convert from 'xml-js';
import axios from 'axios';
import './EditAppliedBookModal.css'


const EditAppliedBookModal = ({show, onHide, book}) => {
  var imgsrc = import.meta.env.VITE_BACKEND_URI + '/Photos/' + book.elements[6].elements[0].text
  const [id, setId] = useState(book.elements[0].elements[0].text)
  const [name, setName] = useState(book.elements[1].elements[0].text)
  const [author, setAuthor] = useState(book.elements[2].elements[0].text)
  const [description, setDescription] = useState(book.elements[3].elements[0].text)
  const [releaseDate, setReleaseDate] = useState(book.elements[4].elements[0].text)
  const [pages, setPages] = useState(book.elements[5].elements[0].text)
  const[genres, setGenres] = useState([])
  const[photofilename, setPhotoFileName] = useState(book.elements[6].elements[0].text)
  const[selectedOptions, setSelectedOptions] = useState([])
  const [message, setMessage] = useState('')
  
  

  const listXml = selectedOptions.map(obj => {
    return `
      <GenreViewModel>
        <label>${obj.label}</label>
        <value>${obj.value}</value>
      </GenreViewModel>
    `
  }).join('');

  const HandleClickEdit = () => {
    var xmlhttp = new XMLHttpRequest();
  
    xmlhttp.open('POST', import.meta.env.VITE_BACKEND_URI + '/Service.asmx', true)
    var sr = 
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
      + '<Body>'
        + '<Update xmlns="http://tempuri.org/">'
          + '<model>'
            +'<name>' + name + '</name>'
            +'<genres>' + listXml + '</genres>'
            +'<author>' + author +'</author>'
            +'<description>' + description +'</description>'
            +'<releaseDate>' + releaseDate +'</releaseDate>'
            +'<pages>' + pages +'</pages>'
            +'<photoFileName>' + photofilename +'</photoFileName>'
            +'<id>' + id + '</id>'
          +'</model>'
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

  const GetGenres = async() => {
    try{
      await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/genre')
      .then((response) => {
        setGenres(response.data)
      })
    } catch (e) {
      console.log(e.response.data)
    }
  }


  const GetBookGenres = async() => {
    var xmlhttp = new XMLHttpRequest();
  
    xmlhttp.open('POST', import.meta.env.VITE_BACKEND_URI + '/Service.asmx', true)
    var sr = 
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
      + '<Body>'
          + '<GetGenres xmlns="http://tempuri.org/">'
            + '<id>' + id + '</id>'
          + '</GetGenres>'
      + '</Body>'
    + '</Envelope>'     
    
    xmlhttp.onreadystatechange = () => {
      if(xmlhttp.readyState === 4){
          if(xmlhttp.status === 200){
            console.log(convert.xml2js(xmlhttp.responseText).elements[0].elements[0].elements[0].elements[0].elements)
            setSelectedOptions(convert.xml2js(xmlhttp.responseText).elements[0].elements[0].elements[0].elements[0].elements.map((item) => {
              return {
                label: item.elements[0].elements[0].text,
                value: item.elements[0].elements[0].text
              }
            }))
          }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.send(sr);
  }


  useEffect(() => {
    GetGenres()
    GetBookGenres()
  }, [])
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
                            <Form.Label>Genres</Form.Label>
                            <Select options={genres} isMulti value={selectedOptions} onChange={(selectedOptions) => setSelectedOptions(selectedOptions)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type='text' placeholder='Author' name='author' defaultValue = {book.elements[2].elements[0].text} required onChange={e => {setAuthor(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type='text' placeholder='Description' name='description' defaultValue = {book.elements[3].elements[0].text} required onChange={e => {setDescription(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Release Date</Form.Label>
                            <Form.Control type='date' placeholder='Release Date' name='releaseDate' required defaultValue = {book.elements[4].elements[0].text} onChange={e => {setReleaseDate(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Pages</Form.Label>
                            <Form.Control type='number' placeholder='Pages' name='pages' required defaultValue = {book.elements[5].elements[0].text} onChange={e => {setPages(e.target.value)}}/>
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