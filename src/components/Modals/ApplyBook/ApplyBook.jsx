import React, { useState, useEffect } from 'react'
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import { useFormik } from 'formik';
import { bookSchema } from '../../../Validations/BookValidation';
import convert from 'xml-js';
import BookInput from '../AddBook/Input/BookInput';
import { GetGenres } from './Data/Data';
import BookMultiselectInput from '../AddBook/Input/BookMultiselectInput';
import MessageContent from '../MessageContent/MessageContent';
import SubmitButton  from '../../Buttons/ModalButtons/SubmitButton/SubmitButton'
import CancelButton from '../../Buttons/ModalButtons/CancelButton/CancelButton'
import './ApplyBook.css'


const ApplyBook = ({show, onHide}) => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const[genres, setGenres] = useState([])
  const[photofilename, setPhotoFileName] = useState('book.jpg')
  const [message, setMessage] = useState('')
  const[response, setResponse] = useState('')
  var userId = JSON.parse(localStorage.getItem("userId"))
  var dummyBookId = 0
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
            HandleClick()
            setOpenModal(true)
        } catch (e) {
            setMessage(e.response.data);
            setOpenModal(true);
            console.log(e)
        }
    }
})

    var imagesrc = import.meta.env.VITE_BACKEND_URI + '/Photos/' + photofilename
    var userId = localStorage.getItem("userId")
    var dummyBookId = 0

    const listXml = selectedOptions.map(obj => {
      return `
        <GenreViewModel>
          <label>${obj.label}</label>
          <value>${obj.value}</value>
        </GenreViewModel>
      `
    }).join('');

    const handleFileSelected = (e) => {
      e.preventDefault()
      setPhotoFileName(e.target.files[0].name)
      formik.values.photoFileName = e.target.files[0].name
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
   

    const HandleClick = () => {
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.open('POST', import.meta.env.VITE_BACKEND_URI + '/Service.asmx', true)
        var sr = 
        '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
          + '<Body>'
            + '<Insert xmlns="http://tempuri.org/">'
              + '<model>'
                +'<name>' + formik.values.name + '</name>'
                +'<genres>'+ listXml + '</genres>'
                +'<author>' + formik.values.author +'</author>'
                +'<description>' + formik.values.description +'</description>'
                +'<releaseDate>' + formik.values.releaseDate +'</releaseDate>'
                +'<pages>' + formik.values.pages +'</pages>'
                +'<photoFileName>' + import.meta.env.VITE_BACKEND_URI + '/Photos/' + formik.values.photoFileName +'</photoFileName>'
                +'<previewLink>' + formik.values.previewLink + '</previewLink>'
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
                setResponse(convert.xml2js(xmlhttp.responseText).elements[0].elements[0].elements[0].elements[0].elements[0].text)
                console.log(response)
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

    const handleSubmit = async(e) => {
      e.preventDefault();
      if(formik.values.photoFileName === ""){
          formik.values.photoFileName = '/Photos/book.jpg'
      } 
      formik.handleSubmit();
      console.log(formik.values)
  }

    useEffect(() => {
        const GetSelectGenres = async() => {
          try{
            var genres = await GetGenres()
            setGenres(genres)
          } catch (e) {
            console.log(e)
          }
        }
        GetSelectGenres()
        console.log(formik.values.photoFileName)
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
                    
                    <Col sm={6}>
                        <Image className='imageBook' src={imagesrc}/>
                        <input onChange={handleFileSelected} type="File" className='uploadImage'/>
                    </Col>
                    </Row>
                    
                </Modal.Body>
                <Modal.Footer>
                <div className='apply-book-actions-container'>
                  <div className='apply-book-submit-container'>
                   <SubmitButton text="Apply" action={handleSubmit}/>
                  </div>
                  <div className='cancel-apply-container'>
                    <CancelButton text="Cancel" action={onHide}/>
                  </div>
                </div>
                  </Modal.Footer>
                  <MessageContent show={openModal} onHide={() => setOpenModal(false)} message={response}/>
        </Modal>
  )
}

export default ApplyBook