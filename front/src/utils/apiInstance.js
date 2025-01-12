import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://localhost:5000/api', // Replace with your API base URL
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiInstance;