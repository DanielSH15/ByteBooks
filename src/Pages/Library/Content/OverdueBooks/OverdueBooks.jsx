import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetOverdueBooks from './GetData/Data'
import CartItem from '../../../Cart/CartItem/CartItem'
import './OverdueBooks.css'

const OverdueBooks = () => {
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
        
        return <div className='overdue-page-container' style={{flexDirection: 'column', textAlign: 'center'}}>
            <h1 style={{color: '#FFF'}}>No overdued books</h1>
            <Link to='/library'><h2>Back To Library</h2></Link>
        </div>;
    }

  return (
    <div className='overdue-page-container'>
        <Link to='/library'><h2>Back To Library</h2></Link>
        <div className='overdue-books-container'>
            {
                data?.map((value, i) => {
                    return(
                        <CartItem book={value}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default OverdueBooks