import { ReactNode } from 'react';
import { LogOut, User, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

interface DesktopLayoutProps {
  children: ReactNode;
  employeeName: string;
  department: string;
  onLogout: () => void;
}

export function DesktopLayout({ children, employeeName, department, onLogout }: DesktopLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white">TK</span>
              </div>
              <div>
                <h1 className="text-xl">Ticket Management System</h1>
                <p className="text-sm text-gray-500 capitalize">{department} Department</p>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-xl">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-indigo-600 text-white">
                    {employeeName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm">{employeeName}</p>
                  <p className="text-xs text-gray-500">Employee</p>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={onLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        {children}
      </main>
    </div>
  );
}
