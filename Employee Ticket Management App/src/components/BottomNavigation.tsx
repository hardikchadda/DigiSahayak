import { LayoutDashboard, Clock, Loader, CheckCircle, AlertTriangle, User } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'dashboard' | 'todo' | 'in-progress' | 'solved' | 'issue' | 'profile';
  onTabChange: (tab: 'dashboard' | 'todo' | 'in-progress' | 'solved' | 'issue' | 'profile') => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'todo' as const, label: 'New/To Do', icon: Clock },
    { id: 'in-progress' as const, label: 'In Progress', icon: Loader },
    { id: 'solved' as const, label: 'Solved', icon: CheckCircle },
    { id: 'issue' as const, label: 'Issue', icon: AlertTriangle },
    { id: 'profile' as const, label: 'Profile', icon: User }
  ];

  const navigationStyle = {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '80px',
    zIndex: 2147483647,
    backgroundColor: '#ffffff',
    borderTop: '2px solid #e5e7eb',
    boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const
  };

  return (
    <div 
      id="bottom-navigation-menu"
      style={navigationStyle}
    >
      <nav className="grid grid-cols-6 w-full h-full max-w-7xl">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                isActive 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
              style={{ cursor: 'pointer' }}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs leading-tight text-center px-1">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
