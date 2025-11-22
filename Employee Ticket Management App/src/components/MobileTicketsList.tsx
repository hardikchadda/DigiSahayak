import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Ticket } from '../types';
import { MobileTicketCard } from './MobileTicketCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';

interface MobileTicketsListProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

export function MobileTicketsList({ tickets, onTicketClick }: MobileTicketsListProps) {
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredTickets = tickets.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.priority === filter;
  });

  const sortedTickets = [...filteredTickets].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="pb-24">
      <div className="px-4 py-4 bg-white border-b border-gray-200 sticky top-0 z-10">
        <Tabs value={filter} onValueChange={(v: any) => setFilter(v)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
            <TabsTrigger value="high" className="text-sm">High</TabsTrigger>
            <TabsTrigger value="medium" className="text-sm">Medium</TabsTrigger>
            <TabsTrigger value="low" className="text-sm">Low</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="px-4 py-6 space-y-3 bg-gray-50">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">
            {sortedTickets.length} ticket{sortedTickets.length !== 1 ? 's' : ''}
          </p>
        </div>

        {sortedTickets.map((ticket) => (
          <MobileTicketCard
            key={ticket.id}
            ticket={ticket}
            onClick={() => onTicketClick(ticket)}
          />
        ))}

        {sortedTickets.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p className="text-gray-400">No tickets found</p>
          </div>
        )}
      </div>
    </div>
  );
}
