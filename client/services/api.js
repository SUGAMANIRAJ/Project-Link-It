import axios from 'axios';

const apiUrl=import.meta.env.VITE_API_URL;


export const uploadFile = async (data) =>{
    try{
        console.log(apiUrl);
       let response = await axios.post(`${apiUrl}/upload`,data);
       return response.data;

    }
    catch(error){
        console.error("Error while calling api ", error.message);
    }
}

