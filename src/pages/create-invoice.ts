// src/pages/create-invoice.ts
import { createInvoice } from '../services/apiService.js';
import type { NewInvoice } from '../services/apiService.js';

const main = () => {
    const createInvoiceForm = document.getElementById('create-invoice-form');

    if (createInvoiceForm) {
        createInvoiceForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const totalAmountInput = document.getElementById('total_amount') as HTMLInputElement;
            const totalAmount = parseFloat(totalAmountInput.value);

            // Calculate subtotal and tax (assuming 7% tax)
            const subtotal = totalAmount / 1.07;
            const taxAmount = totalAmount - subtotal;

            // Gather form data into an object
            const newInvoiceData: NewInvoice = {
                invoice_number: `INV-${Date.now()}`, // Auto-generate a unique invoice number
                client_id: parseInt((document.getElementById('client_id') as HTMLInputElement).value, 10),
                quotation_number: (document.getElementById('quotation_number') as HTMLSelectElement).value,
                issue_date: new Date((document.getElementById('issue_date') as HTMLInputElement).value).toISOString(),
                due_date: new Date((document.getElementById('due_date') as HTMLInputElement).value).toISOString(),
                status: (document.getElementById('status') as HTMLSelectElement).value as 'Paid' | 'Unpaid' | 'Overdue',
                subtotal: parseFloat(subtotal.toFixed(2)),
                tax_amount: parseFloat(taxAmount.toFixed(2)),
                total_amount: totalAmount,
                amount_paid: 0, // Default to 0
                currency: "THB", // Default currency
                notes: "Invoice created from frontend",
                created_by: 23 // Assuming a default user ID
            };
            
            // Basic Form Validation
            if (!newInvoiceData.client_id || !newInvoiceData.issue_date || !newInvoiceData.due_date || isNaN(totalAmount)) {
                alert('Please fill out all required fields correctly.');
                return;
            }

            const createdInvoice = await createInvoice(newInvoiceData);

            if (createdInvoice) {
                alert(`Invoice #${createdInvoice.invoice_number} created successfully!`);
                window.location.href = '/invoice'; // Redirect to invoice list on success
            } else {
                alert('Error: Could not create the invoice. Please check the console for more details.');
            }
        });
    }
};

main();