import File from '../models/file.js';
import {nanoid} from 'nanoid';


export const uploadImage = async (request,response) => {

    const fileObj={
        _id:nanoid(5),
        path: request.file.path,
        name: request.file.originalname
    }
    try{
        const file = await File.create(fileObj);
        response.status(200).json({downloadpath : `http://localhost:8000/file/${file._id}`});
    }
    catch(error){
        console.error(error.message)
    }

}


export const downloadImage = async (request,response) => {

   
    try{
        const file = await File.findById(request.params.fileId);
        file.downloadContent++;
        await file.save();
        response.download(file.path,file.name);
    }
    catch(error){
        console.error(error.message)
        return response.status(500).json({error : error.message});
    }

}
