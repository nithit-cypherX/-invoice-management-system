// src/types/invoice.ts

export interface Invoice {
  invoice_id: number;
  invoice_number: string;
  client_id: number;
  quotation_number: string;
  issue_date: string; // Using string to represent datetime from the API
  due_date: string;   // Using string to represent datetime from the API
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  amount_paid: number;
  currency: string;
  status: 'Paid' | 'Unpaid' | 'Overdue'; // You can adjust these based on actual API values
  notes?: string; // The '?' makes this property optional
  created_by: number;
  created_at: string;
  updated_at: string;
}

