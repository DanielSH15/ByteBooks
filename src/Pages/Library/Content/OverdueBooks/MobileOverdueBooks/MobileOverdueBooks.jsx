import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import GetOverdueBooks from '../GetData/Data'
import MobileCartItem from '../../../../Cart/MobileCart/MobileCartItem/MobileCartItem'
import './MobileOverdueBooks.css'

const MobileOverdueBooks = () => {
    const [data, setData] = useState([])
    
    useEffect(() => {
        const GetData = async() => {
            try{
                var newData = await GetOverdueBooks()
                console.log(newData)
                setData(newData)
            } catch (e){
                console.log(e)
            }
        }
        GetData()
    }, [])


    if (data.length === 0) {
        
        return <div className='mobile-overdue-page-container' style={{flexDirection: 'column', textAlign: 'center'}}>
            <h1 style={{color: '#FFF'}}>No overdued books</h1>
            <Link to='/library'><h2>Back To Library</h2></Link>
        </div>;
    }
  return (
    <div className='mobile-overdue-page-container'>
        <Link to='/library' className='mobile-back-to-library-link'><h2>Back To Library</h2></Link>
        <div className='mobile-overdue-books-container'>
            {
                data?.map((value, i) => {
                    return(
                        <MobileCartItem book={value}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default MobileOverdueBooks