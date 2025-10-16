export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string; // e.g., "2025-12-31"
}