import { getInvoices } from '../services/apiService.js';
import type { Invoice } from '../types/invoices.js';

// Function to format the date for display
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// This function takes the list of invoices and builds the HTML table rows
const renderInvoices = (invoices: Invoice[]) => {
  const tableBody = document.getElementById('invoice-table-body');
  if (!tableBody) {
    console.error("Table body with id 'invoice-table-body' not found!");
    return;
  }

  // Clear any old data
  tableBody.innerHTML = '';

  if (invoices.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="text-center py-4">No invoices were found.</td></tr>';
    return;
  }

  // Create and append a row for each invoice
  invoices.forEach(invoice => {
    const row = document.createElement('tr');
    row.className = 'border-b-1 border-gray-200';
    row.innerHTML = `
      <td class="py-3">${invoice.invoice_id}</td>
      <td>${formatDate(invoice.issue_date)}</td>
      <td>${formatDate(invoice.due_date)}</td>
      <td>Company Name</td> <td>${invoice.quotation_number}</td>
      <td>฿${invoice.total_amount}</td>
      <td class="${invoice.status === 'Paid' ? 'text-green-500' : 'text-blue-500'}">${invoice.status}</td>
    `;
    tableBody.appendChild(row);
  });
};

// This is the main function that sets everything up
const main = () => {
  const searchForm = document.getElementById('search-form');
  if (!searchForm) {
    console.error("Search form with id 'search-form' not found!");
    return;
  }

  // Listen for the form to be submitted
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // IMPORTANT: This stops the page from reloading
    
    console.log("Search button clicked. Fetching invoices...");
    const invoices = await getInvoices(); // Call the API
    renderInvoices(invoices); // Display the results
  });
};

// Run the main function when the page is ready
main();