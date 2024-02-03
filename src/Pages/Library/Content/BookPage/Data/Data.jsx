import axios from "axios";

export const IsBanned = async(userId) => {
    try{
        const response = await axios.get(import.meta.env.VITE_BACKEND_URI + '/api/user/getbannedusers')
        if(response.data != []){
            for(var i = 0; i < response.data.length; i++){
                if(response.data[i].userId === userId){
                    return true;
                }
            }
            console.log(response.data)
            return false;
        }
        return false;
    } catch (e) {
        throw e;
    }
}