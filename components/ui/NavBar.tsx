'use client';

import Link from 'next/link';
<<<<<<< HEAD
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Bell, User, LogIn, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();

  // Determine visibility on mount to avoid SSR/client hydration mismatch
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    setIsVisible(!!token && userRole === 'user');
  }, []);

  if (!isVisible) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    document.cookie = 'token=; path=/; max-age=0';
    document.cookie = 'role=; path=/; max-age=0';
    document.cookie = 'userId=; path=/; max-age=0';
    setIsVisible(false);
    router.push('/login');
  };
=======
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Home, Search, Bell, User, LogIn, LogOut, LayoutDashboard } from 'lucide-react';

export default function NavBar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Hide nav on auth pages
  if (pathname === '/login' || pathname === '/register') {
    return null;
  }
>>>>>>> 0c3ca3a312480db61ae58ed577a338f170a2ce8f

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/updates', label: 'Updates', icon: Bell },
<<<<<<< HEAD
    { href: '/profile', label: 'Profile', icon: User },
  ];

=======
    session ? { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard } : { href: '/login', label: 'Login', icon: LogIn },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

>>>>>>> 0c3ca3a312480db61ae58ed577a338f170a2ce8f
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:top-0 md:bottom-auto">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ href, label, icon: Icon }) => {
<<<<<<< HEAD
            const isActive = pathname === href;
=======
            const isActive = pathname === href || (href === '/dashboard' && pathname.startsWith('/dashboard'));
>>>>>>> 0c3ca3a312480db61ae58ed577a338f170a2ce8f
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center justify-center gap-1 py-2 px-3 transition-colors ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{label}</span>
              </Link>
            );
          })}
<<<<<<< HEAD

          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center gap-1 py-2 px-3 text-gray-500 hover:text-gray-700 transition-colors"
            title={`Logout (user)`}
          >
            <LogOut className="w-5 h-5" />
            <span className="text-xs font-medium">Logout</span>
          </button>
=======
          {session && (
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center justify-center gap-1 py-2 px-3 transition-colors text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-xs font-medium">Logout</span>
            </button>
          )}
>>>>>>> 0c3ca3a312480db61ae58ed577a338f170a2ce8f
        </div>
      </div>
    </nav>
  );
}
