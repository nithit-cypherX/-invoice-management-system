// import axios from 'axios';
declare const axios: any;
import type { Invoice } from '../types/invoices.js';
import type { Client } from '../types/client.js';
 
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjM3LCJlbWFpbCI6InNlZTFAZ21haWwuY29tIiwiaWF0IjoxNzYwNjE4MDQxLCJleHAiOjE3NjA2MjE2NDF9.A66I3lhCT_7dR8J7NctSFGb1nhpcypprSABcWXzFxOI';

const apiClient = axios.create({
  baseURL: 'http://203.159.93.114:3100/',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});


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


// Type for the new invoice data
export type NewInvoice = {
    invoice_number: string;
    client_id: number;
    quotation_number: string;
    issue_date: string;
    due_date: string;
    status: 'Paid' | 'Unpaid' | 'Overdue';
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    amount_paid: number;
    currency: string;
    notes: string;
    created_by: number;
};


// Function to create a new invoice
export const createInvoice = async (invoiceData: NewInvoice): Promise<Invoice | null> => {
    try {
        const response = await apiClient.post('/invoice', invoiceData);
        return response.data;
    } catch (error) {
        console.error('Error creating invoice:', error);
        return null;
    }
};