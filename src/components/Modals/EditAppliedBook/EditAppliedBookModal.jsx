import React, { useState, useEffect } from 'react'
import { Col, Form, Modal, Row, Image } from 'react-bootstrap';
import { useFormik } from 'formik';
import { bookSchema } from '../../../Validations/BookValidation';
import Select from 'react-select';
import convert from 'xml-js';
import axios from 'axios';
import './EditAppliedBookModal.css'
import BookInput from '../AddBook/Input/BookInput';
import BookMultiselectInput from '../AddBook/Input/BookMultiselectInput';


const EditAppliedBookModal = ({show, onHide, book}) => {
  var imagesrc = book.elements[6].elements[0].text
  const [id, setId] = useState(book.elements[0].elements[0].text)
  const[genres, setGenres] = useState([])
  const[photofilename, setPhotoFileName] = useState(book.elements[6].elements[0].text)
  const[selectedOptions, setSelectedOptions] = useState([])
  const [message, setMessage] = useState('')
  
  const formik = useFormik({
    initialValues: {
        name: book.elements[1].elements[0].text,
        genres: selectedOptions,
        author: book.elements[2].elements[0].text,
        description: book.elements[3].elements[0].text,
        releaseDate: book.elements[4].elements[0].text,
        pages: book.elements[5].elements[0].text,
        photoFileName: book.elements[6].elements[0].text,
        previewLink: ''
    },
    validationSchema: bookSchema,
    onSubmit: async(values) => {
        try{
            HandleClickEdit()
            setOpenModal(true)
        } catch (e) {
            setMessage(e.response.data);
            setOpenModal(true);
            console.log(e)
        }
    }
})

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
            +'<name>' + formik.values.name + '</name>'
            +'<genres>' + listXml + '</genres>'
            +'<author>' + formik.values.author +'</author>'
            +'<description>' + formik.values.description +'</description>'
            +'<releaseDate>' + formik.values.releaseDate +'</releaseDate>'
            +'<pages>' + formik.values.pages +'</pages>'
            +'<photoFileName>' + import.meta.env.VITE_BACKEND_URI + '/Photos/' + photofilename +'</photoFileName>'
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

  const handleSelectedGenres = (updatedGenres) => {
    setSelectedOptions(updatedGenres)
    formik.values.genres = updatedGenres
}

const handleFileSelected = (e) => {
  e.preventDefault()
  setPhotoFileName(import.meta.env.VITE_BACKEND_URI + '/Photos/' + e.target.files[0].name)
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
                  <button className='addbookM' onClick={HandleClickEdit}>Edit</button>
                  <button className='canceladd' onClick={onHide}>Cancel</button>
                </div>
                <h2 style={{position: 'absolute', left: '2%'}}>{message}</h2>
                  </Modal.Footer>
        </Modal>
  )
}

export default EditAppliedBookModal