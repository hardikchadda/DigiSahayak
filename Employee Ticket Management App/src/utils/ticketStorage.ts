import { Ticket } from '../types';
import { mockTickets } from './mockData';

const TICKETS_KEY = 'tickets';

export const initializeTickets = () => {
  const existing = localStorage.getItem(TICKETS_KEY);
  if (!existing) {
    localStorage.setItem(TICKETS_KEY, JSON.stringify(mockTickets));
  }
};

export const getTickets = (): Ticket[] => {
  const ticketsStr = localStorage.getItem(TICKETS_KEY);
  return ticketsStr ? JSON.parse(ticketsStr) : mockTickets;
};

export const updateTicket = (ticketId: string, updates: Partial<Ticket>) => {
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
