import File from "../models/file.js";
import { nanoid } from "nanoid";
import cloudinary from "../config/cloudinary.js";
import axios from "axios"; 


export const uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No file uploaded" });

        console.log("Uploading file:", req.file.originalname);

     
        const mimeType = req.file.mimetype;
        let resourceType = "auto"; 
        if (mimeType.startsWith("image/")) resourceType = "image";
        else if (mimeType.startsWith("video/")) resourceType = "video";
        else resourceType = "raw"; 

        console.log(`Detected type: ${mimeType}, Uploading as: ${resourceType}`);

        // Start timing upload
        console.time("Cloudinary Upload Time");

        // Upload to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: resourceType,
                folder: "uploads",
                use_filename: true,
                overwrite: true,
            },
            async (error, result) => {
                console.timeEnd("Cloudinary Upload Time");

                if (error) {
                    console.error("Cloudinary Upload Error:", error);
                    return res.status(500).json({ error: error.message });
                }

                console.log("Upload Success:", result);

                // Saving data to MongoDB!
                const fileData = {
                    _id: nanoid(5),
                    name: req.file.originalname,
                    type: mimeType,
                    path: result.secure_url, 
                    cloudinaryId: result.public_id,
                    downloadContent: 0, 
                };

                await File.create(fileData);
                console.log("File stored in DB:", fileData);

                // Send success response
                res.status(200).json({
                    message: "File uploaded successfully",
                    fileId: fileData._id,
                });
            }
        );

        uploadStream.end(req.file.buffer); // Upload file buffer
    } catch (error) {
        console.error("Server Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//Download File from Cloudinary & Serve to User
export const downloadImage = async (req, res) => {
    try {
        const file = await File.findById(req.params.fileId);
        if (!file) return res.status(404).json({ error: "File Not Found" });

        console.log("Downloading file:", file.name, "Type:", file.type);

        const contentType = file.type || "application/octet-stream"; // Default 

        // Fetch file from Cloudinary using its URL
        const cloudinaryResponse = await axios.get(file.path, { responseType: "stream" });

        // Set correct headers
        res.setHeader("Content-Disposition", `attachment; filename="${file.name}"`);
        res.setHeader("Content-Type", contentType);

        // Pipe the response from Cloudinary to the user
        cloudinaryResponse.data.pipe(res);

        // Increment download count in MongoDB
        await File.findByIdAndUpdate(file._id, { $inc: { downloadContent: 1 } });

    } catch (error) {
        console.error("Download Error:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
