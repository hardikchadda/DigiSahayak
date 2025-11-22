// Ticket storage utility for employee dashboard
// Uses localStorage to persist ticket data like the Ticket Management App

export interface Ticket {
  id: string;
  title: string;
  description: string;
  customerName: string;
  customerEmail: string;
  department: string;
  status: 'todo' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  assignedTo?: string;
  response?: string;
  estimatedResolutionTime?: string;
  resolvedAt?: string;
}

const TICKETS_KEY = 'employee_tickets';

// Mock tickets data - same as Ticket Management App
const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'Payment gateway not working',
    description: 'Unable to complete payment through credit card',
    customerName: 'Vikram Singh',
    customerEmail: 'vikram@example.com',
    department: 'payment',
    status: 'todo',
    priority: 'high',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'TKT-002',
    title: 'Refund request pending',
    description: 'Requested refund 5 days ago, no response yet',
    customerName: 'Sneha Reddy',
    customerEmail: 'sneha@example.com',
    department: 'payment',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: 'emp-1',
    response: 'Checking with finance team',
    estimatedResolutionTime: '24 hours'
  },
  {
    id: 'TKT-003',
    title: 'Document verification failed',
    description: 'PAN card verification showing error',
    customerName: 'Rajesh Gupta',
    customerEmail: 'rajesh@example.com',
    department: 'document',
    status: 'todo',
    priority: 'high',
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'TKT-004',
    title: 'Need to upload additional documents',
    description: 'What documents are required for KYC?',
    customerName: 'Anita Desai',
    customerEmail: 'anita@example.com',
    department: 'document',
    status: 'in-progress',
    priority: 'low',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: 'emp-2',
    response: 'Need Aadhar and PAN card',
    estimatedResolutionTime: '2 hours'
  },
  {
    id: 'TKT-005',
    title: 'Application status inquiry',
    description: 'When will my loan application be processed?',
    customerName: 'Suresh Iyer',
    customerEmail: 'suresh@example.com',
    department: 'application',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'TKT-006',
    title: 'Application form error',
    description: 'Getting error while submitting application form',
    customerName: 'Meera Nair',
    customerEmail: 'meera@example.com',
    department: 'application',
    status: 'resolved',
    priority: 'high',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: 'emp-3',
    response: 'Technical issue resolved. Please try again.',
    estimatedResolutionTime: '1 hour',
    resolvedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'TKT-007',
    title: 'Transaction failed but amount deducted',
    description: 'Money deducted from account but transaction shows failed',
    customerName: 'Karan Mehta',
    customerEmail: 'karan@example.com',
    department: 'payment',
    status: 'todo',
    priority: 'high',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'TKT-008',
    title: 'Document upload size limit',
    description: 'Unable to upload document, file size too large',
    customerName: 'Pooja Shah',
    customerEmail: 'pooja@example.com',
    department: 'document',
    status: 'resolved',
    priority: 'low',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: 'emp-2',
    response: 'Please compress the file to under 5MB',
    estimatedResolutionTime: '30 minutes',
    resolvedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const initializeTickets = () => {
  if (typeof window === 'undefined') return;
  
  const existing = localStorage.getItem(TICKETS_KEY);
  if (!existing) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(mockTickets));
  }
};

export const getTickets = (): Ticket[] => {
  if (typeof window === 'undefined') return mockTickets;
  
  const ticketsStr = localStorage.getItem(TICKETS_KEY);
  return ticketsStr ? JSON.parse(ticketsStr) : mockTickets;
};

export const updateTicket = (ticketId: string, updates: Partial<Ticket>) => {
  if (typeof window === 'undefined') return;
  
  const tickets = getTickets();
  const index = tickets.findIndex(t => t.id === ticketId);
  
  if (index !== -1) {
    tickets[index] = { ...tickets[index], ...updates };
    localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
  }
};

export const getTicketsByDepartment = (department: string): Ticket[] => {
  const tickets = getTickets();
  return tickets.filter(t => t.department === department);
};

export const getAllTickets = (): Ticket[] => {
  return getTickets();
};
