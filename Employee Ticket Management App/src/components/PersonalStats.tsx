import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';
import { Ticket } from '../types';

interface PersonalStatsProps {
  tickets: Ticket[];
  employeeId: string;
}

export function PersonalStats({ tickets, employeeId }: PersonalStatsProps) {
  const myTickets = tickets.filter(t => t.assignedTo === employeeId || t.status === 'todo');
  const solved = tickets.filter(t => t.assignedTo === employeeId && t.status === 'resolved').length;
  const processing = tickets.filter(t => t.assignedTo === employeeId && t.status === 'in-progress').length;
  const newTickets = tickets.filter(t => t.status === 'todo').length;
  const unsolved = tickets.filter(t => t.assignedTo === employeeId && t.status !== 'resolved').length;

  const stats = [
    {
      label: 'New',
      value: newTickets,
      icon: AlertCircle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgLight: 'bg-orange-50'
    },
    {
      label: 'In Progress',
      value: processing,
      icon: Clock,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgLight: 'bg-blue-50'
    },
    {
      label: 'Solved',
      value: solved,
      icon: CheckCircle2,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgLight: 'bg-green-50'
    },
    {
      label: 'Issue',
      value: unsolved,
      icon: XCircle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgLight: 'bg-red-50'
    }
  ];

  return (
    <div className="px-4 py-6 bg-white">
      <h2 className="mb-4">My Performance</h2>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`${stat.bgLight} rounded-2xl p-4 border-2 border-gray-100`}
            >
              <div className="flex items-center gap-3">
                <div className={`${stat.color} p-2 rounded-xl`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className={`${stat.textColor}`}>{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}