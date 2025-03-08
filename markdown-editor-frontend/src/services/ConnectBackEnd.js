import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// Function to make a GET request
export const fetchData = async (endpoint, signal) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${endpoint}`, signal);
        return await response.data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        }
        throw error;
    }
};

// Function to make a POST request
export const postData = async (endpoint, data, signal) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, signal);
        return await response.data;
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
        }
        throw error;
    }
};

// Add more API functions as needed (PUT, DELETE, etc.)
