import React from 'react'
import { useState, useEffect } from 'react';
import convert from 'xml-js';
import AppliedBookItem from './AppliedBookItem/AppliedBookItem';
import { useNavigate } from 'react-router-dom';


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
              + '<userId>'+ localStorage.getItem("userId") +'</userId>'
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
      <h3 style={{marginLeft: '30vh', color: '#D4B996FF', cursor: 'pointer'}} onClick={() => navigate('/library')}>Back To Library</h3>
       <div className='pendingBooksContainer'>
        {
          response?.map((value, i) => {
            return(
              <AppliedBookItem book={response[i]}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default UserAppliedBooks