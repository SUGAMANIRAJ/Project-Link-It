import mongoose from 'mongoose';
import {nanoid} from 'nanoid';

const fileSchema = new mongoose.Schema({
    _id:{
        type: String,
        required: true,
    },
    path:{
        type: String,
        required : true
    },
    name:{
        type: String,
        required : true
    },
    downloadContent:{
        type: Number,
        required : true,
        default : 0
    }
})

const File = mongoose.model('files',fileSchema)   // files is collection name!

export default File;