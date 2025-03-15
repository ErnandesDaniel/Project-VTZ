'use client'
import axios from 'axios';
const apiInstance=(()=>{

    if (typeof window !== "undefined") {
        const apiInstance = axios.create({
            baseURL: `${window.location.protocol}//${window.location.hostname}:5000/api`, // Replace with your API base URL
            timeout: 3000,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return apiInstance;
    }
})();

export default apiInstance;