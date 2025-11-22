'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  LogOut,
  Clock,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  User,
  Loader,
} from 'lucide-react';
import { initializeTickets, getTickets, updateTicket, Ticket } from '@/lib/ticketStorage';

type TabType = 'dashboard' | 'todo' | 'in-progress' | 'solved' | 'issue' | 'profile';

export default function EmployeeDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedPriority, setSelectedPriority] = useState<string>('');
  const [userName, setUserName] = useState<string>('Employee');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'employee') {
      router.push('/login');
      return;
    }

    // Populate client-only data after mount to avoid SSR/client hydration mismatch
    const name = localStorage.getItem('userName');
    if (name) setUserName(name);

    // Initialize and load tickets from localStorage
    initializeTickets();
    fetchTickets();
  }, [router]);

  const fetchTickets = () => {
    try {
      setLoading(true);
      const allTickets = getTickets();
      setTickets(allTickets);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'role=; path=/; max-age=0';
    document.cookie = 'userId=; path=/; max-age=0';
    router.push('/login');
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    updateTicket(ticketId, { status: newStatus as 'todo' | 'in-progress' | 'resolved' });
    fetchTickets();
  };

  const handlePrioritySelect = (ticketId: string, newPriority: string) => {
    // When priority is selected from To Do, move ticket to In Progress with that priority
    updateTicket(ticketId, { 
      priority: newPriority as 'low' | 'medium' | 'high',
      status: 'in-progress'
    });
    fetchTickets();
    setShowDialog(false);
    setSelectedTicket(null);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: 'bg-gray-100 border-gray-300',
      'in-progress': 'bg-blue-50 border-blue-300',
      resolved: 'bg-green-50 border-green-300',
    };
    return colors[status] || 'bg-gray-100 border-gray-300';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      todo: Clock,
      'in-progress': AlertCircle,
      resolved: CheckCircle,
    };
    return icons[status] || Clock;
  };

  const getStatusIconColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: 'text-gray-500',
      'in-progress': 'text-blue-500',
      resolved: 'text-green-500',
    };
    return colors[status] || 'text-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700',
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'todo':
        return 'New / To Do';
      case 'in-progress':
        return 'In Progress';
      case 'solved':
        return 'Solved';
      case 'issue':
        return 'Critical Issues';
      case 'profile':
        return 'My Profile';
      default:
        return 'Dashboard';
    }
  };

  const totalTickets = tickets.length;
  const todoCount = tickets.filter((t) => t.status === 'todo').length;
  const inProgressCount = tickets.filter((t) => t.status === 'in-progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'resolved').length;
  const criticalCount = tickets.filter((t) => t.priority === 'high').length;

  // Filter tickets based on active tab
  const getFilteredTickets = () => {
    switch (activeTab) {
      case 'dashboard':
        return tickets;
      case 'todo':
        return tickets.filter((t) => t.status === 'todo');
      case 'in-progress':
        return tickets.filter((t) => t.status === 'in-progress');
      case 'solved':
        return tickets.filter((t) => t.status === 'resolved');
      case 'issue':
        return tickets.filter((t) => t.priority === 'high');
      case 'profile':
        return [];
      default:
        return tickets;
    }
  };

  const filteredTickets = getFilteredTickets();

  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'todo' as TabType, label: 'New/To Do', icon: Clock },
    { id: 'in-progress' as TabType, label: 'In Progress', icon: Loader },
    { id: 'solved' as TabType, label: 'Solved', icon: CheckCircle },
    { id: 'issue' as TabType, label: 'Issue', icon: AlertTriangle },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white shadow z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
            <p className="text-sm text-gray-600">Welcome, {userName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Tickets</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{totalTickets}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600">
                    <LayoutDashboard className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">To Do</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{todoCount}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">In Progress</p>
                    <p className="mt-2 text-3xl font-bold text-blue-600">{inProgressCount}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Resolved</p>
                    <p className="mt-2 text-3xl font-bold text-green-600">{resolvedCount}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-100 text-green-600">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Kanban Board */}
            {loading ? (
              <div className="text-center py-12">
                <div className="text-gray-600">Loading tickets...</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'todo', title: 'To Do', icon: Clock },
                  { id: 'in-progress', title: 'In Progress', icon: AlertCircle },
                  { id: 'resolved', title: 'Resolved', icon: CheckCircle },
                ].map((column) => {
                  const columnTickets = tickets.filter((t) => t.status === column.id as any);
                  const Icon = column.icon;

                  return (
                    <div key={column.id} className="flex flex-col">
                      <div
                        className={`${getStatusColor(
                          column.id
                        )} border-2 rounded-lg p-4 mb-4`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon
                              className={`w-5 h-5 ${getStatusIconColor(
                                column.id
                              )}`}
                            />
                            <h2 className="font-semibold text-gray-900">
                              {column.title}
                            </h2>
                          </div>
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${getStatusIconColor(
                              column.id
                            )} bg-white`}
                          >
                            {columnTickets.length}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-4 overflow-y-auto max-h-96">
                        {columnTickets.length === 0 ? (
                          <div className="text-center py-8 text-gray-400">
                            <Icon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                            <p className="text-sm">No tickets</p>
                          </div>
                        ) : (
                          columnTickets.map((ticket) => (
                            <TicketCard
                              key={ticket.id}
                              ticket={ticket}
                              onSelect={() => {
                                setSelectedTicket(ticket);
                                setShowDialog(true);
                              }}
                            />
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* List Views (To Do, In Progress, Solved, Issue) */}
        {['todo', 'in-progress', 'solved', 'issue'].includes(activeTab) && (
          <>
            {loading ? (
              <div className="text-center py-12">
                <div className="text-gray-600">Loading tickets...</div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTickets.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-30 text-gray-400" />
                    <p className="text-gray-600">No tickets found</p>
                  </div>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TicketListItem
                      key={ticket.id}
                      ticket={ticket}
                      onSelect={() => {
                        setSelectedTicket(ticket);
                        setShowDialog(true);
                      }}
                    />
                  ))
                )}
              </div>
            )}
          </>
        )}

        {/* Profile View */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center">
                <User className="w-10 h-10 text-indigo-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">{userName}</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Tickets</p>
                  <p className="text-3xl font-bold text-gray-900">{totalTickets}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">Resolved</p>
                  <p className="text-3xl font-bold text-green-600">{resolvedCount}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-blue-600">{inProgressCount}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">To Do</p>
                  <p className="text-3xl font-bold text-gray-900">{todoCount}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Ticket Detail Dialog */}
      {showDialog && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedTicket.title}
                </h2>
                <p className="text-gray-600">{selectedTicket.id}</p>
              </div>
              <button
                onClick={() => {
                  setShowDialog(false);
                  setSelectedTicket(null);
                  setSelectedPriority('');
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedTicket.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Customer</h3>
                  <p className="text-gray-700">{selectedTicket.customerName}</p>
                  <p className="text-sm text-gray-600">{selectedTicket.customerEmail}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Department</h3>
                  <p className="text-gray-700 capitalize">{selectedTicket.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Status</h3>
                  <select
                    value={selectedTicket.status}
                    onChange={(e) =>
                      handleStatusChange(selectedTicket.id, e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                {selectedTicket.status === 'todo' && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Priority</h3>
                    <select
                      onChange={(e) => {
                        setSelectedPriority(e.target.value);
                        if (e.target.value) {
                          handlePrioritySelect(selectedTicket.id, e.target.value);
                        }
                      }}
                      defaultValue=""
                      className={`w-full px-3 py-2 border rounded-lg font-medium transition-all ${
                        selectedPriority === 'high'
                          ? 'bg-red-100 border-red-300 text-red-700'
                          : selectedPriority === 'medium'
                          ? 'bg-yellow-100 border-yellow-300 text-yellow-700'
                          : selectedPriority === 'low'
                          ? 'bg-blue-100 border-blue-300 text-blue-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700'
                      }`}
                    >
                      <option value="">Select Priority...</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                )}

                {selectedTicket.status === 'in-progress' && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Priority</h3>
                    <p
                      className={`px-3 py-2 rounded text-center font-medium ${getPriorityColor(
                        selectedTicket.priority
                      )}`}
                    >
                      {selectedTicket.priority}
                    </p>
                  </div>
                )}
              </div>

              {selectedTicket.response && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Response</h3>
                  <p className="text-gray-700">{selectedTicket.response}</p>
                </div>
              )}

              {selectedTicket.estimatedResolutionTime && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Estimated Resolution Time</h3>
                  <p className="text-gray-700">{selectedTicket.estimatedResolutionTime}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Created</h3>
                  <p className="text-gray-700">
                    {new Date(selectedTicket.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {selectedTicket.resolvedAt && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Resolved</h3>
                    <p className="text-gray-700">
                      {new Date(selectedTicket.resolvedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t p-6 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDialog(false);
                  setSelectedTicket(null);
                  setSelectedPriority('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="grid grid-cols-6 w-full max-w-7xl h-20">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
                aria-label={tab.label}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs leading-tight text-center px-1">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

// Ticket Card Component
function TicketCard({ ticket, onSelect }: { ticket: Ticket; onSelect: () => void }) {
  const getStatusIconColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: 'text-gray-500',
      'in-progress': 'text-blue-500',
      resolved: 'text-green-500',
    };
    return colors[status] || 'text-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-blue-100 text-blue-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700',
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      todo: Clock,
      'in-progress': AlertCircle,
      resolved: CheckCircle,
    };
    return icons[status] || Clock;
  };

  const StatusIcon = getStatusIcon(ticket.status);

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <StatusIcon className={`w-4 h-4 ${getStatusIconColor(ticket.status)}`} />
          <span className="text-sm text-gray-600">{ticket.id}</span>
        </div>
        {ticket.status === 'in-progress' && (
          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
        )}
      </div>

      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{ticket.title}</h3>

      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{ticket.description}</p>

      <div className="text-xs text-gray-500 mb-2 line-clamp-1">
        <span className="font-medium">{ticket.customerName}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="bg-gray-100 px-2 py-1 rounded">{ticket.department}</span>
        <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

// Ticket List Item Component
function TicketListItem({ ticket, onSelect }: { ticket: Ticket; onSelect: () => void }) {
  const getStatusIcon = (status: string) => {
    const icons: Record<string, any> = {
      todo: Clock,
      'in-progress': AlertCircle,
      resolved: CheckCircle,
    };
    return icons[status] || Clock;
  };

  const getStatusIconColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: 'text-gray-500',
      'in-progress': 'text-blue-500',
      resolved: 'text-green-500',
    };
    return colors[status] || 'text-gray-500';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: 'bg-blue-100 text-blue-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-red-100 text-red-700',
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const StatusIcon = getStatusIcon(ticket.status);

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 flex items-center justify-between"
    >
      <div className="flex items-start gap-4 flex-1">
        <StatusIcon className={`w-5 h-5 ${getStatusIconColor(ticket.status)} flex-shrink-0 mt-1`} />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{ticket.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-1">{ticket.description}</p>
          <p className="text-xs text-gray-500 mt-1">
            <span className="font-medium">{ticket.customerName}</span> • {ticket.department} • {new Date(ticket.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      {ticket.status === 'in-progress' && (
        <div className="ml-4 flex-shrink-0">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
            {ticket.priority}
          </span>
        </div>
      )}
    </div>
  );
}
