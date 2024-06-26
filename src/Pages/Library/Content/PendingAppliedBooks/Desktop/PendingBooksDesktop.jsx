import React, { useState, useEffect } from 'react'
import convert from 'xml-js';
import './PendingBooksDesktop.css'
import DesktopItem from './PendingBookItem/DesktopItem'

const PendingBooksDesktop = () => {
    const [response, setResponse] = useState([])

    const GetPendingBooks = async() => {
      var xmlhttp = new XMLHttpRequest();
          
          xmlhttp.open('POST', import.meta.env.VITE_BACKEND_URI + '/Service.asmx', true)
          
          var sr = 
          '<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">'
            + '<Body>'
              + '<Get xmlns="http://tempuri.org/">'
              + '</Get>'
            + '</Body>'
          + '</Envelope>'     
          
          xmlhttp.onreadystatechange = () => {
            if(xmlhttp.readyState === 4){
                if(xmlhttp.status === 200){
                  console.log(xmlhttp.responseText)
                  setResponse(convert.xml2js(xmlhttp.responseText).elements[0].elements[0].elements[0].elements[0].elements)
                }
            }
          }
          xmlhttp.setRequestHeader('Content-Type', 'text/xml');
          xmlhttp.send(sr);
    }
  
    useEffect(() => {
      GetPendingBooks()
    }, [])
  
    return (
        <div className='pending-books-container'>
        <div className='pending-books-content'>
          <h1 style={{color: "#D4B996FF", marginBottom: "3vh"}}>Applied Books</h1>
          <div className='pending-books-items-container'>
            {
                response?.map((value, i) => {
                  return(
                      <DesktopItem book={response[i]}/>
                  )
                })
            }
          </div>
        </div>
      </div>
    )
}

export default PendingBooksDesktop