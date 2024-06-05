import React, {useState, useEffect} from 'react'
import convert from 'xml-js';
import AppliedBookItem from '../AppliedBookItem/AppliedBookItem';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './DesktopAppliedBooks.css'

const DesktopAppliedBooks = () => {
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


  if(response === undefined) {
    return (
      <div className='overdue-page-container' style={{flexDirection: 'column', textAlign: 'center'}}>
        <h1 style={{color: '#FFF'}}>No applied books</h1>
        <Link to='/library'><h2>Back To Library</h2></Link>
      </div>
    )
  }
  return (
    <div className='user-applied-books-desktop'>
      <h3 className='user-applied-back-to-library' onClick={() => navigate('/library')}>Back To Library</h3>
       <div className='user-applied-books-desktop-items'>
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

export default DesktopAppliedBooks