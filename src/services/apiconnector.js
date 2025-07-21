import axios from 'axios';

export const axiosInstance = axios.create({});

export const apiConnector = (method,url,bodyData, headers, params)=>{
    // api connector  is used to  make request to user in Database ;

    return axiosInstance({
        method:`${method}`,
        url:`${url}`,
        data:bodyData ? bodyData: null,
        headers: headers ? headers: null,
        params:params?params:null,
    })

    //  return response.data;  --> // Return only necessary data which having db call data 
}

 // No need for template literals
 // Insted of above we can also do this like below method --> chatgpt 
 /*


import axios from 'axios';

// Create an Axios instance with common settings
export const axiosInstance = axios.create({
    baseURL: "https://your-api-url.com", 
    timeout: 5000, // Timeout for requests
    headers: {
        "Content-Type": "application/json",
    },
});

// API Connector function for making API requests
export const apiConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
    try {
        const response = await axiosInstance({
            method, // No need for template literals
            url,
            data: bodyData,
            headers,
            params,
        });

        return response.data; // Return only necessary data
    } catch (error) {
        console.error("API Error:", error?.response?.data || error.message);
        throw error; // Rethrow the error for handling in UI
    }
};

 */