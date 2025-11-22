import { CheckCircle2, Clock, AlertCircle, XCircle, TrendingUp } from 'lucide-react';
import { Ticket } from '../types';
import { DesktopTicketCard } from './DesktopTicketCard';

interface DesktopDashboardProps {
  tickets: Ticket[];
  employeeId: string;
  onTicketClick: (ticket: Ticket) => void;
}

export function DesktopDashboard({ tickets, employeeId, onTicketClick }: DesktopDashboardProps) {
  const myTickets = tickets.filter(t => t.assignedTo === employeeId || t.status === 'todo');
  const newTickets = tickets.filter(t => t.status === 'todo').length;
  const inProgress = tickets.filter(t => t.assignedTo === employeeId && t.status === 'in-progress').length;
  const solved = tickets.filter(t => t.assignedTo === employeeId && t.status === 'resolved').length;
  const unsolved = tickets.filter(t => t.assignedTo === employeeId && t.status !== 'resolved').length;

  const stats = [
    {
      label: 'New Tickets',
      value: newTickets,
      icon: AlertCircle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgLight: 'bg-orange-50',
      change: '+12%'
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: Clock,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50',
      change: '+5%'
    },
    {
      label: 'Solved',
      value: solved,
      icon: CheckCircle2,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgLight: 'bg-green-50',
      change: '+18%'
    },
    {
      label: 'Issues',
      value: unsolved,
      icon: XCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgLight: 'bg-red-50',
      change: '-8%'
    }
  ];

  // Group tickets by status
  const todoTickets = myTickets.filter(t => t.status === 'todo');
  const inProgressTickets = myTickets.filter(t => t.status === 'in-progress');
  const resolvedTickets = myTickets.filter(t => t.status === 'resolved');

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${stat.bgLight} rounded-2xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={`${stat.color} p-3 rounded-xl shadow-sm`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl mb-1">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs">{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* To Do Column */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <h3>To Do</h3>
            </div>
            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-lg text-sm">
              {todoTickets.length}
            </span>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {todoTickets.map(ticket => (
              <DesktopTicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => onTicketClick(ticket)}
              />
            ))}
            {todoTickets.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No tickets</p>
            )}
          </div>
        </div>

        {/* In Progress Column */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <h3>In Progress</h3>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm">
              {inProgressTickets.length}
            </span>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {inProgressTickets.map(ticket => (
              <DesktopTicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => onTicketClick(ticket)}
              />
            ))}
            {inProgressTickets.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No tickets</p>
            )}
          </div>
        </div>

        {/* Solved Column */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <h3>Solved</h3>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-lg text-sm">
              {resolvedTickets.length}
            </span>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {resolvedTickets.map(ticket => (
              <DesktopTicketCard
                key={ticket.id}
                ticket={ticket}
                onClick={() => onTicketClick(ticket)}
              />
            ))}
            {resolvedTickets.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No tickets</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
