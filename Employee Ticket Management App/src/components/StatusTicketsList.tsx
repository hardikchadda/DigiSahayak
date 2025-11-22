import { Ticket } from '../types';
import { MobileTicketCard } from './MobileTicketCard';
import { Clock, Loader, CheckCircle, AlertTriangle } from 'lucide-react';

interface StatusTicketsListProps {
  tickets: Ticket[];
  status: 'todo' | 'in-progress' | 'resolved';
  onTicketClick: (ticket: Ticket) => void;
}

const statusConfig = {
  'todo': {
    title: 'New / To Do Tickets',
    icon: Clock,
    color: 'bg-gray-500',
    bgColor: 'bg-gray-50',
    emptyMessage: 'No new tickets'
  },
  'in-progress': {
    title: 'In Progress Tickets',
    icon: Loader,
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50',
    emptyMessage: 'No tickets in progress'
  },
  'resolved': {
    title: 'Solved Tickets',
    icon: CheckCircle,
    color: 'bg-green-500',
    bgColor: 'bg-green-50',
    emptyMessage: 'No solved tickets'
  }
};

export function StatusTicketsList({ tickets, status, onTicketClick }: StatusTicketsListProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  
  const filteredTickets = tickets.filter(t => t.status === status);
  const sortedTickets = [...filteredTickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="min-h-full pb-6 pt-2">
      {/* Header Card */}
      <div className={`${config.bgColor} mx-4 mt-4 mb-6 rounded-2xl p-4 border-2 border-gray-200`}>
        <div className="flex items-center gap-3">
          <div className={`${config.color} p-3 rounded-xl`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2>{config.title}</h2>
            <p className="text-sm text-gray-600">{sortedTickets.length} ticket{sortedTickets.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="px-4 space-y-3">
        {sortedTickets.length === 0 ? (
          <div className="text-center py-16">
            <Icon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-400">{config.emptyMessage}</p>
          </div>
        ) : (
          sortedTickets.map((ticket) => (
            <MobileTicketCard
              key={ticket.id}
              ticket={ticket}
              onClick={() => onTicketClick(ticket)}
            />
          ))
        )}
      </div>
    </div>
  );
}