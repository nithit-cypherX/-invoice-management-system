// src/pages/invoice-list.ts
import { getInvoices, getClientById, searchInvoices, getInvoicesById } from '../services/apiService.js';
import type { Invoice } from '../types/invoices.js';
import type { Client } from '../types/client.js';

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const renderInvoices = async (invoices: Invoice | Invoice[] | null) => {
  const tableBody = document.getElementById('invoice-table-body');
  if (!tableBody) {
    console.error("Table body with id 'invoice-table-body' not found!");
    return;
  }

  tableBody.innerHTML = '';

  // Handle API error case
  if (invoices === null) {
    tableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4 text-red-500">Could not fetch invoices. Please try again later.</td></tr>';
    return;
  }

  const invoicesArray = Array.isArray(invoices) ? invoices : [invoices];

  if (invoicesArray.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4">No invoices were found.</td></tr>';
    return;
  }

  for (const invoice of invoicesArray) {
    const client = await getClientById(invoice.client_id);
    const companyName = client ? client.company_name : 'N/A';
    const row = document.createElement('tr');
    row.className = 'border-b-1 border-gray-200';
    row.innerHTML = `
      <td class="py-3">${invoice.invoice_id}</td>
      <td>${formatDate(invoice.issue_date)}</td>
      <td>${formatDate(invoice.due_date)}</td>
      <td>${companyName}</td>
      <td>${invoice.quotation_number}</td>
      <td>฿${invoice.total_amount}</td>
      <td class="${invoice.status === 'Paid' ? 'text-green-500' : 'text-blue-500'}">${invoice.status}</td>
    `;
    tableBody.appendChild(row);
  }
};

const main = () => {
  const searchForm = document.getElementById('search-form');
  const searchByIdForm = document.getElementById('search-by-id-form');

  if (searchForm) {
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      
      // Get values from the form inputs
      const companyNameInput = document.querySelector('input[placeholder="Company Name"]') as HTMLInputElement;
      const startDateInput = document.getElementById('start-date') as HTMLInputElement;
      const endDateInput = document.getElementById('end-date') as HTMLInputElement;

      // Create the params object for the API call
      const searchParams = {
        company_name: companyNameInput.value || undefined,
        start_date: startDateInput.value || undefined,
        end_date: endDateInput.value || undefined,
      };

      // Call the search function with the params
      const invoices = await searchInvoices(searchParams);
      
      if (invoices === null) {
        alert('Error: Could not perform the search. Please try again.');
      }
      renderInvoices(invoices);
    });
  }

  if (searchByIdForm) {
    searchByIdForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const invoiceIdInput = document.getElementById('invoice-id') as HTMLInputElement;
      const invoiceId = parseInt(invoiceIdInput.value, 10);

      if (!isNaN(invoiceId)) {
        const invoice = await getInvoicesById(invoiceId);
        if (invoice === null) {
            alert(`Error: Could not find an invoice with ID #${invoiceId}.`);
        }
        renderInvoices(invoice);
      }
    });
  }

  // Initial load with error handling
  getInvoices().then(invoices => {
      if (invoices === null) {
          alert('There was an error loading the initial list of invoices.');
      }
      renderInvoices(invoices);
  });
};

main();