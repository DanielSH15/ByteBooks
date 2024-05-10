import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const GenreContext = createContext()

const GenreProvider = ({children}) => {
    const[genres, setGenres] = useState([])

    useEffect(() => {
        const GetGenres = async() => {
            try{
                const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/genre')
                setGenres(response.data)
            } catch (e) {
                console.log(e)
            }
        }
        GetGenres()
    }, [])


  return (
    <GenreContext.Provider value={{genres}}>
        {children}
    </GenreContext.Provider>
  )
}

export {GenreContext, GenreProvider}