import axios from "axios";

const GetOverdueBooks = async() => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/book/getoverduebooks/' + JSON.parse(localStorage.getItem("userId")))
        console.log(response)
        return response.data
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export default GetOverdueBooks