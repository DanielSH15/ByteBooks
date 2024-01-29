import React, { useState, useEffect } from 'react'
import  Axios  from 'axios';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import Select from 'react-select';
import convert from 'xml-js';
import BookInput from '../AddBook/Input/BookInput';


const ApplyBook = ({show, onHide}) => {
    const [name, setName] = useState('')
    const [selectedOptions, setSelectedOptions] = useState([])
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [pages, setPages] = useState(0)
    const[genres, setGenres] = useState([])
    const[photofilename, setPhotoFileName] = useState('book.jpg')
    const [message, setMessage] = useState('')
    const [response, setResponse] = useState('')

    var imagesrc = import.meta.env.VITE_BACKEND_URI + '/Photos/' + photofilename
    var userId = localStorage.getItem("userId")
    var dummyBookId = 0

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

    const errorMessages = {
        name: "Title should start with a big letter and shouldn't include special characters!",
        notempty: "Should not be empty!"
    }

    const listXml = selectedOptions.map(obj => {
      return `
        <GenreViewModel>
          <label>${obj.label}</label>
          <value>${obj.value}</value>
        </GenreViewModel>
      `
    }).join('');
   

    const HandleClick = () => {
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.open('POST', import.meta.env.VITE_BACKEND_URI + '/Service.asmx', true)
        var sr = 
        '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
          + '<Body>'
            + '<Insert xmlns="http://tempuri.org/">'
              + '<model>'
                +'<name>' + name + '</name>'
                +'<genres>'+ listXml + '</genres>'
                +'<author>' + author +'</author>'
                +'<description>' + description +'</description>'
                +'<releaseDate>' + releaseDate +'</releaseDate>'
                +'<pages>' + pages +'</pages>'
                +'<photoFileName>' + photofilename +'</photoFileName>'
              +'</model>'
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