import axios from "axios";
import moment from "moment";

export const InsertBook = async(data) => {
       var dateString = moment(data.releaseDate).format('YYYY-MM-DD')
       data.releaseDate = dateString
       try{
         const response = await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/book', data)
         return response.data;
       } catch (e){
         throw e;
       }
}

export const GetGenres = async() => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/genre')
        return response.data
    } catch (e) {
        throw e;
    }
}