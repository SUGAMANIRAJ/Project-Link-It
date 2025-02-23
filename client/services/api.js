import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export const uploadFile = async (data) => {
    try {
        if (!apiUrl) {
            throw new Error("API URL is missing! Check VITE_API_URL in .env");
        }

        console.log("Uploading to:", apiUrl);
        
        let response = await axios.post(`${apiUrl}/upload`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },timeout: 60000
        });

        console.log("Upload Success:", response.data);
        return response.data;

    } catch (error) {
        console.error("Error while uploading file:", error.message);
    }
};
