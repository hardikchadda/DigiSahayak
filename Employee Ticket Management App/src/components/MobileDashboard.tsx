import { Ticket } from '../types';
import { PersonalStats } from './PersonalStats';
import { MobileTicketCard } from './MobileTicketCard';

interface MobileDashboardProps {
  tickets: Ticket[];
  employeeId: string;
  onTicketClick: (ticket: Ticket) => void;
}

export function MobileDashboard({ tickets, employeeId, onTicketClick }: MobileDashboardProps) {
  // Get recent tickets
  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="pb-6 pt-2">
      <PersonalStats tickets={tickets} employeeId={employeeId} />
      
      <div className="px-4 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2>Recent Tickets</h2>
          <span className="text-sm text-gray-500">{tickets.length} total</span>
        </div>
        
        <div className="space-y-3">
          {recentTickets.map((ticket) => (
            <MobileTicketCard
              key={ticket.id}
              ticket={ticket}
              onClick={() => onTicketClick(ticket)}
            />
          ))}
        </div>
        
        {tickets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No tickets available</p>
          </div>
        )}
      </div>
    </div>
  );
}