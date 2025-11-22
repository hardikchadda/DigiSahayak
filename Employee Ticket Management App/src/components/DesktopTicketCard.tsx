import { Calendar, User, Eye, EyeOff } from 'lucide-react';
import { Ticket } from '../types';
import { Badge } from './ui/badge';

interface DesktopTicketCardProps {
  ticket: Ticket;
  onClick: () => void;
}

const priorityColors = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500'
};

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High'
};

export function DesktopTicketCard({ ticket, onClick }: DesktopTicketCardProps) {
  const isViewed = ticket.viewedBy && ticket.viewedBy.length > 0;

  return (
    <div
      onClick={onClick}
      className={`bg-white border-2 rounded-xl p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${
        isViewed ? 'border-gray-200' : 'border-indigo-300 shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${priorityColors[ticket.priority]}`}></div>
          <span className="text-sm text-gray-600">{ticket.id}</span>
          {!isViewed && (
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-600 text-xs">
              New
            </Badge>
          )}
        </div>
        {isViewed ? (
          <Eye className="w-4 h-4 text-gray-400" />
        ) : (
          <EyeOff className="w-4 h-4 text-indigo-500" />
        )}
      </div>

      {/* Title */}
      <h4 className="mb-2 line-clamp-2">{ticket.title}</h4>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {ticket.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <User className="w-3 h-3" />
          <span className="truncate max-w-[120px]">{ticket.customerName}</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Progress Indicator */}
      {ticket.estimatedResolutionTime && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500">Callback</span>
            <span className="text-indigo-600">{ticket.estimatedResolutionTime}</span>
          </div>
        </div>
      )}
    </div>
  );
}
