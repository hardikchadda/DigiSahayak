import { useState, useEffect } from 'react';
import { Employee, Ticket } from '../types';
import { DashboardHeader } from './DashboardHeader';
import { DashboardStats } from './DashboardStats';
import { KanbanBoard } from './KanbanBoard';
import { TicketDetailDialog } from './TicketDetailDialog';
import { getTicketsByDepartment, updateTicket } from '../utils/ticketStorage';

interface DashboardProps {
  employee: Employee;
  onLogout: () => void;
}

export function Dashboard({ employee, onLogout }: DashboardProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    loadTickets();
  }, [employee.department]);

  const loadTickets = () => {
    const departmentTickets = getTicketsByDepartment(employee.department);
    setTickets(departmentTickets);
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDialogOpen(true);
  };

  const handleTicketUpdate = (ticketId: string, updates: Partial<Ticket>) => {
    updateTicket(ticketId, updates);
    loadTickets();
    setIsDialogOpen(false);
    setSelectedTicket(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader employee={employee} onLogout={onLogout} />
      
      <DashboardStats tickets={tickets} />
      
      <KanbanBoard tickets={tickets} onTicketClick={handleTicketClick} />
      
      <TicketDetailDialog
        ticket={selectedTicket}
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setSelectedTicket(null);
        }}
        onUpdate={handleTicketUpdate}
        employeeId={employee.id}
      />
    </div>
  );
}
