import { BarChart3, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Ticket } from '../types';

interface DashboardStatsProps {
  tickets: Ticket[];
}

export function DashboardStats({ tickets }: DashboardStatsProps) {
  const totalTickets = tickets.length;
  const todoTickets = tickets.filter(t => t.status === 'todo').length;
  const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
  const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;

  const stats = [
    {
      title: 'Total Tickets',
      value: totalTickets,
      icon: BarChart3,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'To Do',
      value: todoTickets,
      icon: Clock,
      color: 'bg-gray-100 text-gray-600'
    },
    {
      title: 'In Progress',
      value: inProgressTickets,
      icon: AlertCircle,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Resolved',
      value: resolvedTickets,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
