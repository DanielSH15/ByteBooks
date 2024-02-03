import axios from "axios";

export const GetUsers = async() => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/user')
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

export const GetUserGenres = async(user) => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/user/getgenres/' + user.userId)
        return response.data;
    } catch (e) {
        throw e;
    }
}