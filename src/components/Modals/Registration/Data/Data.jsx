import axios from "axios";

export const GetGenres = async() => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/genre')
        return response.data
    } catch (e) {
        throw e;
    }
}

export const Register = async(data) => {
    try{
        console.log(data)
        const response = await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/user', data)
        return response.data;
    } catch (e){
        throw e;
    }
}