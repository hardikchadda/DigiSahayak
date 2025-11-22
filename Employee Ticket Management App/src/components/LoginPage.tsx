import { useState } from 'react';
import { LogIn, User, Lock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';

interface LoginPageProps {
  onLogin: (email: string, password: string) => void;
  error?: string;
}

export function LoginPage({ onLogin, error }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 p-6 rounded-3xl shadow-lg">
              <User className="w-16 h-16 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-gray-800 mb-2">Employee Portal</h1>
          <p className="text-gray-600">Login to manage your tickets</p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="username">Username / Email</Label>
              <div className="relative">
                <User className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 h-14 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 h-14 rounded-xl"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-14 rounded-xl">
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Button>
          </form>

          <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-xs text-gray-600 mb-3">Demo Credentials:</p>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment:</span>
                <span>rahul@company.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Document:</span>
                <span>priya@company.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Application:</span>
                <span>amit@company.com</span>
              </div>
              <div className="pt-2 border-t border-indigo-200 mt-3">
                <span className="text-gray-600">Password: </span>
                <span>password123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
