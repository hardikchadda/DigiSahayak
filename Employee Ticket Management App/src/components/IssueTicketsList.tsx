import { Ticket } from '../types';
import { MobileTicketCard } from './MobileTicketCard';
import { AlertTriangle, XCircle, Clock, MessageSquareX, AlertOctagon } from 'lucide-react';

interface IssueTicketsListProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

// Helper function to check if ticket has any issues
const getTicketIssues = (ticket: Ticket): { hasIssue: boolean; issueType: string; icon: any; color: string } => {
  const now = new Date();
  const createdDate = new Date(ticket.createdAt);
  const daysDiff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // 1. Solved but no response given to customer
  if (ticket.status === 'resolved' && !ticket.response) {
    return { 
      hasIssue: true, 
      issueType: 'Solved without customer response', 
      icon: MessageSquareX,
      color: 'bg-orange-500'
    };
  }
  
  // 2. High priority and still unsolved (todo or in-progress)
  if (ticket.priority === 'high' && ticket.status !== 'resolved') {
    return { 
      hasIssue: true, 
      issueType: 'High priority - Needs immediate attention', 
      icon: AlertTriangle,
      color: 'bg-red-500'
    };
  }
  
  // 3. Stuck in progress for more than 3 days
  if (ticket.status === 'in-progress' && daysDiff > 3) {
    return { 
      hasIssue: true, 
      issueType: `Stuck in progress for ${daysDiff} days`, 
      icon: Clock,
      color: 'bg-purple-500'
    };
  }
  
  // 4. Employee marked as issue
  if (ticket.hasIssue || ticket.issueType === 'employee_marked_issue') {
    return { 
      hasIssue: true, 
      issueType: ticket.issueDescription || 'Employee marked as problematic', 
      icon: AlertOctagon,
      color: 'bg-yellow-500'
    };
  }
  
  // 5. ToDo tickets older than 2 days (not assigned)
  if (ticket.status === 'todo' && daysDiff > 2) {
    return { 
      hasIssue: true, 
      issueType: `Unassigned for ${daysDiff} days`, 
      icon: XCircle,
      color: 'bg-gray-500'
    };
  }
  
  return { hasIssue: false, issueType: '', icon: AlertTriangle, color: '' };
};

export function IssueTicketsList({ tickets, onTicketClick }: IssueTicketsListProps) {
  // Filter tickets that have any issue
  const issueTickets = tickets.filter(ticket => {
    const { hasIssue } = getTicketIssues(ticket);
    return hasIssue;
  });
  
  const sortedTickets = [...issueTickets].sort((a, b) => {
    // Sort by priority first (high > medium > low)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    // Then by creation date (oldest first)
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <div className="min-h-full pb-6 pt-2">
      {/* Header Card */}
      <div className="bg-red-50 mx-4 mt-4 mb-6 rounded-2xl p-4 border-2 border-red-200">
        <div className="flex items-center gap-3">
          <div className="bg-red-500 p-3 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-red-700">Critical Issues</h2>
            <p className="text-sm text-red-600">{sortedTickets.length} problematic ticket{sortedTickets.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Issue Types Legend */}
      <div className="mx-4 mb-4 bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 p-4 rounded-xl">
        <p className="text-sm mb-3">Issues detected:</p>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            <span className="text-gray-700">Solved without customer response</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <span className="text-gray-700">High priority unsolved</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500"></div>
            <span className="text-gray-700">Stuck in progress (3+ days)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <span className="text-gray-700">Employee marked issue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            <span className="text-gray-700">Unassigned (2+ days)</span>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="px-4 space-y-3">
        {sortedTickets.length === 0 ? (
          <div className="text-center py-16">
            <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-400">No issues found</p>
            <p className="text-sm text-gray-500 mt-2">All tickets are being handled properly!</p>
          </div>
        ) : (
          sortedTickets.map((ticket) => {
            const { issueType, icon: IssueIcon, color } = getTicketIssues(ticket);
            return (
              <div key={ticket.id} className="relative">
                {/* Issue Badge on Card */}
                <div className="absolute -top-2 -right-2 z-10">
                  <div className={`${color} p-2 rounded-full shadow-lg`}>
                    <IssueIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* Issue Type Label */}
                <div className="bg-red-100 border-l-4 border-red-500 px-3 py-2 rounded-t-xl">
                  <p className="text-xs text-red-700">⚠️ {issueType}</p>
                </div>
                
                <MobileTicketCard
                  ticket={ticket}
                  onClick={() => onTicketClick(ticket)}
                  className="rounded-t-none border-t-0"
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}