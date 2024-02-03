import axios from "axios";

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

export const Update = async(values) => {
    try{
        const response = await axios.put(import.meta.env.VITE_BACKEND_URI + '/api/user', values)
        return response.data;
    } catch (e){
        throw e;
    }
}