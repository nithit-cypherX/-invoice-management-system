// import axios from 'axios';
declare const axios: any;
import type { Invoice } from '../types/invoices.js'; // Import the interface
 // Import the interface
 
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIzLCJlbWFpbCI6ImVpYW5nNDU2bml0aGl0QGdtYWlsLmNvbSIsImlhdCI6MTc2MDU5ODcxNCwiZXhwIjoxNzYwNjAyMzE0fQ.eUMUlQYTJfv1hKjDXVhi6DEaQonNCU_v8JJ4QBzf7t8';
// Task 1: Configure API base URL
const apiClient = axios.create({
  baseURL: 'http://10.34.112.161:3100', // Replace with your actual API URL
  headers: {
    'Authorization': `Bearer ${token}`
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



