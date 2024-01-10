import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import './AppliedBookModal.css'


const AppliedBookModal = ({show, onHide, book}) => {
  var imgsrc = 'http://localhost:5226/Photos/' + book.elements[7].elements[0].text

  const HandleClickApprove = () => {
    var xmlhttp = new XMLHttpRequest();
  
    xmlhttp.open('POST', 'http://localhost:5226/Service.asmx', true)
    var sr = 
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
      + '<Body>'
        + '<Approve xmlns="http://tempuri.org/">'
          + '<book>'
            + '<Id>' + book.elements[0].elements[0].text + '</Id>'
            +'<name>' + book.elements[1].elements[0].text + '</name>'
            +'<genre>' + book.elements[2].elements[0].text +'</genre>'
            +'<author>' + book.elements[3].elements[0].text +'</author>'
            +'<description>' + book.elements[4].elements[0].text +'</description>'
            +'<releaseDate>' + book.elements[5].elements[0].text +'</releaseDate>'
            +'<pages>' + book.elements[6].elements[0].text +'</pages>'
            +'<photoFileName>' + book.elements[7].elements[0].text +'</photoFileName>'
          +'</book>'
        + '</Approve>'
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

  const HandleClickDecline = () => {
    var xmlhttp = new XMLHttpRequest();
  
    xmlhttp.open('POST', 'http://localhost:5226/Service.asmx', true)
    var sr = 
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
      + '<Body>'
        + '<Decline xmlns="http://tempuri.org/">'
          + '<book>'
            + '<Id>' + book.elements[0].elements[0].text + '</Id>'
            +'<name>' + book.elements[1].elements[0].text + '</name>'
            +'<genre>' + book.elements[2].elements[0].text +'</genre>'
            +'<author>' + book.elements[3].elements[0].text +'</author>'
            +'<description>' + book.elements[4].elements[0].text +'</description>'
            +'<releaseDate>' + book.elements[5].elements[0].text +'</releaseDate>'
            +'<pages>' + book.elements[6].elements[0].text +'</pages>'
            +'<photoFileName>' + book.elements[7].elements[0].text +'</photoFileName>'
          +'</book>'
        + '</Decline>'
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
    
  }
  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>{book.elements[1].elements[0].text} by {book.elements[3].elements[0].text}</Modal.Title>
            </Modal.Header>
                <Modal.Body style={{display: 'flex'}}>
                    <img src={imgsrc} style={{height:'450px', width:'220px'}}/>
                    <h4 style={{marginLeft: '30px'}}>{book.elements[4].elements[0].text}</h4>
                </Modal.Body>
                <Modal.Footer>
                <Button className='addgenreAM' onClick={HandleClickApprove}>Approve</Button>
                <Button className='canceladdAM' onClick={HandleClickDecline}>Decline</Button>
                <br />
                <br />
                  </Modal.Footer>
        </Modal>
  )
}

export default AppliedBookModal