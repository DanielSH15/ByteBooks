import axios from "axios";

export const GetUser = async(userId) => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/user/getuserbyid/' + userId)
        return response.data;
    } catch (e) {
        throw e;
    }
}

export const GetGenres = async() => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/genre')
        return response.data;
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

export const deleteUser = async(userId) => {
    try{
        const response = await axios.delete(import.meta.env.VITE_BACKEND_URI + '/api/user/' + userId)
        return response.data;
    } catch (e) {
        throw e;
    }
}

export const RefreshToken = async(user) => {
    try{
        await axios.post(import.meta.env.VITE_BACKEND_URI + '/api/login', {
         username: user.username,
         password: user.password
        }).then((response) => {
         console.log(response.data)
         sessionStorage.setItem("token", JSON.stringify(response.data))
         sessionStorage.setItem("username", user.username)
         sessionStorage.setItem("password", user.password)
         window.location = "/"
        })
     
       } catch (e) {
         throw e;
       }
}