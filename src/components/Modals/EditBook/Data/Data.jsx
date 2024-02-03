import axios from "axios";

export const GetGenres = async () => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/genre')
        return response.data
    } catch (e){
        throw e;
    }
}

export const GetCurrentGenres = async(book) => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/book/getgenresbyid/' + book.bookId)
        return response.data
    } catch (e) {
       throw e;
    }
}

export const UpdateBook = async(book) => {
    try{
        const response = await axios.put(import.meta.env.VITE_BACKEND_URI + '/api/book', book)
        return response.data;
    } catch (e) {
        throw e;
    }
}