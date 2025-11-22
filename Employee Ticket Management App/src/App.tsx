import { useEffect, useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { MobileHeader } from './components/MobileHeader';
import { MobileDashboard } from './components/MobileDashboard';
import { StatusTicketsList } from './components/StatusTicketsList';
import { IssueTicketsList } from './components/IssueTicketsList';
import { MobileProfile } from './components/MobileProfile';
import { BottomNavigation } from './components/BottomNavigation';
import { TicketDetailDialog } from './components/TicketDetailDialog';
import { login, logout, getCurrentUser } from './utils/auth';
import { initializeTickets, getTicketsByDepartment, updateTicket } from './utils/ticketStorage';
import { Employee, Ticket } from './types';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'todo' | 'in-progress' | 'solved' | 'issue' | 'profile'>('dashboard');
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    initializeTickets();
    const employee = getCurrentUser();
    if (employee) {
      setCurrentEmployee(employee);
      loadTickets(employee);
    }
  }, []);

  const loadTickets = (employee: Employee) => {
    const departmentTickets = getTicketsByDepartment(employee.department);
    setTickets(departmentTickets);
  };

  const handleLogin = (email: string, password: string) => {
    const employee = login(email, password);
    if (employee) {
      setCurrentEmployee(employee);
      setLoginError('');
      loadTickets(employee);
      toast.success(`Welcome back, ${employee.name}!`);
    } else {
      setLoginError('Invalid username or password');
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    logout();
    setCurrentEmployee(null);
    setTickets([]);
    setActiveTab('dashboard');
    toast.success('Logged out successfully');
  };

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDialogOpen(true);
  };

  const handleTicketUpdate = (ticketId: string, updates: Partial<Ticket>) => {
    updateTicket(ticketId, updates);
    if (currentEmployee) {
      loadTickets(currentEmployee);
    }
    setIsDialogOpen(false);
    setSelectedTicket(null);
    toast.success('Ticket updated successfully');
  };

  if (!currentEmployee) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <LoginPage onLogin={handleLogin} error={loginError} />
          </div>
        </div>
        <Toaster />
      </>
    );
  }

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

  return (
    <>
      {/* Desktop Web Application - WhatsApp Style Layout */}
      <div className="h-screen overflow-hidden bg-gray-50 flex flex-col">
        <MobileHeader 
          employee={currentEmployee} 
          title={getPageTitle()}
          showNotification={activeTab !== 'profile'}
        />

        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pt-[120px] pb-[80px]">
          <div className="max-w-7xl mx-auto px-4 pb-6">
            {activeTab === 'dashboard' && (
              <MobileDashboard
                tickets={tickets}
                employeeId={currentEmployee.id}
                onTicketClick={handleTicketClick}
              />
            )}

            {activeTab === 'todo' && (
              <StatusTicketsList
                tickets={tickets}
                status="todo"
                onTicketClick={handleTicketClick}
              />
            )}

            {activeTab === 'in-progress' && (
              <StatusTicketsList
                tickets={tickets}
                status="in-progress"
                onTicketClick={handleTicketClick}
              />
            )}

            {activeTab === 'solved' && (
              <StatusTicketsList
                tickets={tickets}
                status="resolved"
                onTicketClick={handleTicketClick}
              />
            )}

            {activeTab === 'issue' && (
              <IssueTicketsList
                tickets={tickets}
                onTicketClick={handleTicketClick}
              />
            )}

            {activeTab === 'profile' && (
              <MobileProfile
                employee={currentEmployee}
                onLogout={handleLogout}
              />
            )}
          </div>
        </main>

        {/* Bottom Navigation - Fixed Like WhatsApp */}
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <TicketDetailDialog
          ticket={selectedTicket}
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedTicket(null);
          }}
          onUpdate={handleTicketUpdate}
          employeeId={currentEmployee.id}
          employeeName={currentEmployee.name}
        />
      </div>
      <Toaster />
    </>
  );
}