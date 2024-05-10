import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import './AppliedBookModal.css'


const AppliedBookModal = ({show, onHide, book}) => {
  var imgsrc = book.elements[6].elements[0].text

  const HandleClickApprove = () => {
    var xmlhttp = new XMLHttpRequest();
  
    xmlhttp.open('POST', import.meta.env.VITE_BACKEND_URI + '/Service.asmx', true)
    var sr = 
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
      + '<Body>'
        + '<Approve xmlns="http://tempuri.org/">'
          + '<id>' + book.elements[0].elements[0].text + '</id>'
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
  
    xmlhttp.open('POST', import.meta.env.VITE_BACKEND_URI + '/Service.asmx', true)
    var sr = 
    '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
      + '<Body>'
        + '<Decline xmlns="http://tempuri.org/">'
         + '<id>' + book.elements[0].elements[0].text + '</id>'
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
    window.location.reload(false)
  }

  return (
    <Modal
        size='lg'
        centered
        show={show}
        onHide={onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>{book.elements[1].elements[0].text} by {book.elements[2].elements[0].text}</Modal.Title>
            </Modal.Header>
                <Modal.Body style={{display: 'flex'}}>
                    <img src={imgsrc} style={{height:'450px', width:'320px'}}/>
                    <h4 style={{marginLeft: '30px'}}>{book.elements[3].elements[0].text}</h4>
                </Modal.Body>
                <Modal.Footer>
                <Button className='approve-applied-book' onClick={HandleClickApprove}>Approve</Button>
                <Button className='decline-applied-book' onClick={HandleClickDecline}>Decline</Button>
                <br />
                <br />
                  </Modal.Footer>
        </Modal>
  )
}

export default AppliedBookModal