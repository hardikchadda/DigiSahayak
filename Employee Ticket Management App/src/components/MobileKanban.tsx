import { Circle, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Ticket } from '../types';
import { useState } from 'react';
import { MobileTicketCard } from './MobileTicketCard';

interface MobileKanbanProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const columns = [
  {
    id: 'todo',
    title: 'New / To Do',
    icon: Circle,
    color: 'bg-gray-500',
    bgColor: 'bg-gray-50'
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    icon: AlertCircle,
    color: 'bg-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    id: 'resolved',
    title: 'Resolved',
    icon: CheckCircle2,
    color: 'bg-green-500',
    bgColor: 'bg-green-50'
  }
];

export function MobileKanban({ tickets, onTicketClick }: MobileKanbanProps) {
  const [expandedColumn, setExpandedColumn] = useState<string | null>('todo');

  return (
    <div className="pb-24 px-4 py-6 space-y-3">
      {columns.map((column) => {
        const columnTickets = tickets.filter(t => t.status === column.id);
        const Icon = column.icon;
        const isExpanded = expandedColumn === column.id;
        
        return (
          <div key={column.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <button
              onClick={() => setExpandedColumn(isExpanded ? null : column.id)}
              className="w-full px-4 py-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`${column.color} p-2 rounded-lg`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{column.title}</p>
                  <p className="text-sm text-gray-500">{columnTickets.length} tickets</p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
            </button>
            
            {isExpanded && (
              <div className={`${column.bgColor} px-4 pb-4 space-y-3 border-t border-gray-100`}>
                {columnTickets.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm text-gray-400">No tickets</p>
                  </div>
                ) : (
                  columnTickets.map((ticket) => (
                    <div key={ticket.id} className="pt-3">
                      <MobileTicketCard
                        ticket={ticket}
                        onClick={() => onTicketClick(ticket)}
                      />
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
