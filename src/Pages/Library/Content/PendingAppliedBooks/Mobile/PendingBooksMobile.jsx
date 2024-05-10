import React, { useState, useEffect } from 'react'
import convert from 'xml-js';
import './PendingBooksMobile.css'
import MobileItem from './MobilePendingBookItem/MobileItem';

const PendingBooksMobile = () => {
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
    <div className="mobile-pending-books-container">
        <div className="mobile-pending-books-content">
            <div className="mobile-pending-books-items">
            {
                response?.map((value, i) => {
                  return(
                      <MobileItem book={response[i]}/>
                  )
                })
            }
            </div>
        </div>
    </div>
  )
}

export default PendingBooksMobile