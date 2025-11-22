import { Clock, User, AlertCircle, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import { Ticket } from '../types';

interface MobileTicketCardProps {
  ticket: Ticket;
  onClick: () => void;
  className?: string;
}

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
};

const priorityBorderColors = {
  low: 'border-green-200 bg-green-50',
  medium: 'border-yellow-200 bg-yellow-50',
  high: 'border-red-200 bg-red-50'
};

const priorityTextColors = {
  low: 'text-green-700',
  medium: 'text-yellow-700',
  high: 'text-red-700'
};

const statusIcons = {
  'todo': Circle,
  'in-progress': AlertCircle,
  'resolved': CheckCircle2
};

const statusColors = {
  'todo': 'text-gray-500',
  'in-progress': 'text-blue-500',
  'resolved': 'text-green-500'
};

export function MobileTicketCard({ ticket, onClick, className = '' }: MobileTicketCardProps) {
  const StatusIcon = statusIcons[ticket.status];
  const timeAgo = getTimeAgo(ticket.createdAt);

  return (
    <div
      className={`rounded-2xl p-4 shadow-sm border-2 active:scale-98 transition-transform ${priorityBorderColors[ticket.priority]} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-5 h-5 ${statusColors[ticket.status]}`} />
          <span className="text-xs text-gray-500">{ticket.id}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium text-white ${priorityColors[ticket.priority]}`}>
          {ticket.priority.toUpperCase()}
        </div>
      </div>

      <h3 className={`mb-2 line-clamp-2 ${priorityTextColors[ticket.priority]}`}>{ticket.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{ticket.description}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <User className="w-4 h-4" />
          <span className="truncate max-w-[120px]">{ticket.customerName}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{timeAgo}</span>
        </div>
      </div>

      {ticket.estimatedResolutionTime && (
        <div className="mt-3 pt-3 border-t border-gray-300">
          <p className="text-xs text-blue-600">
            Est: {ticket.estimatedResolutionTime}
          </p>
        </div>
      )}

      <div className="flex justify-end mt-2">
        <ChevronRight className={`w-5 h-5 ${priorityTextColors[ticket.priority]}`} />
      </div>
    </div>
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
    return `${diffMins}m`;
  } else if (diffHours < 24) {
    return `${diffHours}h`;
  } else {
    return `${diffDays}d`;
  }
}