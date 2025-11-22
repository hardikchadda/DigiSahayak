import { Circle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Ticket } from '../types';
import { TicketCard } from './TicketCard';

interface KanbanBoardProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const columns = [
  {
    id: 'todo',
    title: 'To Do',
    icon: Circle,
    color: 'bg-gray-100 border-gray-300',
    iconColor: 'text-gray-500'
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    icon: AlertCircle,
    color: 'bg-blue-50 border-blue-300',
    iconColor: 'text-blue-500'
  },
  {
    id: 'resolved',
    title: 'Resolved',
    icon: CheckCircle2,
    color: 'bg-green-50 border-green-300',
    iconColor: 'text-green-500'
  }
];

export function KanbanBoard({ tickets, onTicketClick }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {columns.map((column) => {
        const columnTickets = tickets.filter(t => t.status === column.id);
        const Icon = column.icon;
        
        return (
          <div key={column.id} className="flex flex-col">
            <div className={`${column.color} border-2 rounded-lg p-4 mb-4`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-5 h-5 ${column.iconColor}`} />
                  <h2>{column.title}</h2>
                </div>
                <span className={`px-2 py-1 rounded-full text-sm ${column.iconColor} bg-white`}>
                  {columnTickets.length}
                </span>
              </div>
            </div>
            
            <div className="flex-1 space-y-4 overflow-y-auto">
              {columnTickets.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Icon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No tickets</p>
                </div>
              ) : (
                columnTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    onClick={() => onTicketClick(ticket)}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
