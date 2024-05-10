import React from 'react'
import { useState, useEffect } from 'react';
import convert from 'xml-js';
import AppliedBookItem from './AppliedBookItem/AppliedBookItem';
import { useNavigate } from 'react-router-dom';
import DesktopAppliedBooks from './Desktop/DesktopAppliedBooks';
import MobileAppliedBooks from './Mobile/MobileAppliedBooks';
import './UserAppliedBooks.css'


const UserAppliedBooks = () => {
    const [response, setResponse] = useState([])
    var navigate = useNavigate()

  const GetAppliedBooks = async() => {
    var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.open('POST', 'http://localhost:5226/Service.asmx', true)
        var sr = 
        '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
          + '<Body>'
            + ' <GetAppliedBooksOfAUser xmlns="http://tempuri.org/">'
              + '<userId>'+ JSON.parse(localStorage.getItem("userId")) +'</userId>'
            + '</GetAppliedBooksOfAUser>'
          + '</Body>'
        + '</Envelope>'     
        
        xmlhttp.onreadystatechange = () => {
          if(xmlhttp.readyState === 4){
              if(xmlhttp.status === 200){
                console.log(xmlhttp.responseText)
                console.log(convert.xml2js(xmlhttp.responseText).elements[0].elements[0].elements[0].elements[0].elements)
                setResponse(convert.xml2js(xmlhttp.responseText).elements[0].elements[0].elements[0].elements[0].elements)
              }
          }
        }
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.send(sr);
  }

  useEffect(() => {
    GetAppliedBooks()
  }, [])

  return (
    <div>
      <div className='desktop-user-applied-books'>
        <DesktopAppliedBooks />
      </div>
      <div className='mobile-user-applied-books'>
        <MobileAppliedBooks />
      </div>
    </div>
  )
}

export default UserAppliedBooks