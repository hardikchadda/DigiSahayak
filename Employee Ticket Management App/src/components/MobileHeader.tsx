import { CreditCard, FileText, ClipboardList, Bell } from 'lucide-react';
import { Employee } from '../types';
import { Badge } from './ui/badge';

interface MobileHeaderProps {
  employee: Employee;
  title: string;
  showNotification?: boolean;
}

const departmentIcons = {
  payment: CreditCard,
  document: FileText,
  application: ClipboardList
};

const departmentColors = {
  payment: 'bg-green-500',
  document: 'bg-blue-500',
  application: 'bg-purple-500'
};

export function MobileHeader({ employee, title, showNotification = false }: MobileHeaderProps) {
  const Icon = departmentIcons[employee.department];
  const bgColor = departmentColors[employee.department];

  return (
    <header className={`fixed top-0 left-0 right-0 w-full ${bgColor} text-white px-4 py-4 shadow-md z-[100]`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm opacity-90">Welcome back</p>
              <p className="font-medium">{employee.name}</p>
            </div>
          </div>
          {showNotification && (
            <button className="relative p-2">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          )}
        </div>
        <h1 className="text-white">{title}</h1>
      </div>
    </header>
  );
}