import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import GetOverdueBooks from '../GetData/Data'
import NormalCartItem from '../../../../Cart/RegularCart/NormalCartItem/NormalCartItem'
import './DesktopOverdueBooks.css'

const DesktopOverdueBooks = () => {
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
        <Link to='/library' className='back-to-library-link'><h2>Back To Library</h2></Link>
        <div className='overdue-books-container'>
            {
                data?.map((value, i) => {
                    return(
                        <NormalCartItem book={value}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default DesktopOverdueBooks