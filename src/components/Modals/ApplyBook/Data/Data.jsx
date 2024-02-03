import axios from "axios";

export const GetGenres = async () => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/genre')
        return response.data;
    } catch (e){
        throw e;
    }
}