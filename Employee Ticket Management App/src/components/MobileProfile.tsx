import { User, Mail, Briefcase, LogOut, CreditCard, FileText, ClipboardList } from 'lucide-react';
import { Employee } from '../types';
import { Button } from './ui/button';

interface MobileProfileProps {
  employee: Employee;
  onLogout: () => void;
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

export function MobileProfile({ employee, onLogout }: MobileProfileProps) {
  const Icon = departmentIcons[employee.department];
  const bgColor = departmentColors[employee.department];

  return (
    <div className="pb-6 min-h-full bg-gray-50">
      <div className={`${bgColor} text-white px-4 py-12 rounded-b-[3rem]`}>
        <div className="flex flex-col items-center">
          <div className="bg-white/20 p-6 rounded-full mb-4">
            <User className="w-16 h-16" />
          </div>
          <h2 className="text-white mb-1">{employee.name}</h2>
          <p className="text-white/80 text-sm mb-4">{employee.email}</p>
          <div className="bg-white/20 px-4 py-2 rounded-full flex items-center gap-2">
            <Icon className="w-4 h-4" />
            <span className="capitalize text-sm">{employee.department} Department</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-3">
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Account Information</p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Full Name</p>
                <p className="text-sm">{employee.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Email Address</p>
                <p className="text-sm">{employee.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Briefcase className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Department</p>
                <p className="text-sm capitalize">{employee.department}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <p className="text-sm text-gray-500 mb-3">Employee ID</p>
          <p className="font-mono bg-gray-50 px-4 py-3 rounded-lg">{employee.id}</p>
        </div>

        <Button 
          onClick={onLogout}
          variant="destructive"
          className="w-full h-14 rounded-xl mt-6"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );
}