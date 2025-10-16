// import axios from 'axios';
declare const axios: any;
import type { Invoice } from '../types/invoices.js';
import type { Client } from '../types/client.js';
 
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIzLCJlbWFpbCI6ImVpYW5nNDU2bml0aGl0QGdtYWlsLmNvbSIsImlhdCI6MTc2MDYwMjgzMCwiZXhwIjoxNzYwNjA2NDMwfQ.wENnF-p3rzj35jYPsgq1ynm2XlQe9Vv0smoJMYCsCb4';

const apiClient = axios.create({
  baseURL: 'http://10.34.112.161:3100',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// To fix the issue, the parameter name is changed from "param" to "params" to match what axios expects.
const fetchData = async <T>(url:string, params?:any): Promise<T | null> =>{
  try{
    const response = await apiClient.get(url, { params }); // <-- THE FIX IS HERE
    return response.data;
  } catch(error) {
    console.error(`Error fetching data from ${url}`, error);
    return null;
  }
}

export const getInvoices = (): Promise<Invoice[] | null> => fetchData<Invoice[]>('/invoice');
export const getInvoicesById = (id: number): Promise<Invoice| null> => fetchData<Invoice>(`/invoice/by-invoice/${id}`);
export const getClientById = (id: number): Promise<Client | null> => fetchData<Client>(`/client/${id}`);

type SearchInvoicesParams = {
  company_name?: string | undefined;
  client_email?: string | undefined;
  start_date?: string | undefined;
  end_date?: string | undefined;
}

export const searchInvoices = (params: SearchInvoicesParams): Promise<Invoice[] | null> => {
  return fetchData<Invoice[]>('/invoice/search', params);
};