// import axios from 'axios';
import type { Invoice } from '../types/invoices.js'; // Import the interface
 // Import the interface

// Task 1: Configure API base URL
const apiClient = axios.create({
  baseURL: 'http://10.34.112.161:3100', // Replace with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  }
});


// Task 2: fectch all invoices from the api
export const getInvoices = async (): Promise<Invoice[]> =>{
    try {
        const response = await apiClient.get('/invoice');
        return response.data;
    }catch(error){
        console.error('Error fetching invoices',error);
        return [];
    }
}



