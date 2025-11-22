import { LogOut, User, CreditCard, FileText, ClipboardList } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Employee } from '../types';

interface DashboardHeaderProps {
  employee: Employee;
  onLogout: () => void;
}

const departmentIcons = {
  payment: CreditCard,
  document: FileText,
  application: ClipboardList
};

const departmentColors = {
  payment: 'bg-green-100 text-green-700',
  document: 'bg-blue-100 text-blue-700',
  application: 'bg-purple-100 text-purple-700'
};

export function DashboardHeader({ employee, onLogout }: DashboardHeaderProps) {
  const Icon = departmentIcons[employee.department];

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1>Ticket Management System</h1>
            <p className="text-sm text-gray-500">Welcome, {employee.name}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge className={departmentColors[employee.department]}>
            {employee.department.charAt(0).toUpperCase() + employee.department.slice(1)} Department
          </Badge>
          
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
