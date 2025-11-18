'use client';

import Link from 'next/link';
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

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/updates', label: 'Updates', icon: Bell },
    session ? { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard } : { href: '/login', label: 'Login', icon: LogIn },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 md:top-0 md:bottom-auto">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href || (href === '/dashboard' && pathname.startsWith('/dashboard'));
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
          {session && (
            <button
              onClick={handleSignOut}
              className="flex flex-col items-center justify-center gap-1 py-2 px-3 transition-colors text-gray-500 hover:text-gray-700"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-xs font-medium">Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
