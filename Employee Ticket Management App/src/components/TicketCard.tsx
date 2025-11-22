import { Clock, User, Mail, AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Ticket } from '../types';

interface TicketCardProps {
  ticket: Ticket;
  onClick: () => void;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700'
};

const statusIcons = {
  'todo': Circle,
  'in-progress': AlertCircle,
  'resolved': CheckCircle2
};

const statusColors = {
  'todo': 'text-gray-400',
  'in-progress': 'text-blue-500',
  'resolved': 'text-green-500'
};

export function TicketCard({ ticket, onClick }: TicketCardProps) {
  const StatusIcon = statusIcons[ticket.status];
  const timeAgo = getTimeAgo(ticket.createdAt);

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <StatusIcon className={`w-4 h-4 ${statusColors[ticket.status]}`} />
            <span className="text-sm text-gray-600">{ticket.id}</span>
          </div>
          <Badge className={priorityColors[ticket.priority]}>
            {ticket.priority}
          </Badge>
        </div>
        <h3 className="mt-2">{ticket.title}</h3>
      </CardHeader>
      
      <CardContent className="space-y-2">
        <p className="text-sm text-gray-600 line-clamp-2">{ticket.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="w-3 h-3" />
          <span>{ticket.customerName}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Mail className="w-3 h-3" />
          <span className="truncate">{ticket.customerEmail}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-3 h-3" />
          <span>{timeAgo}</span>
        </div>
        
        {ticket.estimatedResolutionTime && (
          <div className="pt-2 border-t">
            <p className="text-xs text-gray-500">
              Est. Resolution: {ticket.estimatedResolutionTime}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `${diffMins} minutes ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hours ago`;
  } else {
    return `${diffDays} days ago`;
  }
}
