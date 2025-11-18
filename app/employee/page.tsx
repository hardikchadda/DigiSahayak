import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { Ticket, Clock, CheckCircle, Users } from 'lucide-react';

export default async function EmployeeDashboard() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  if (session.user.role !== 'employee' && session.user.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Employee Dashboard
        </h1>
        <p className="text-gray-600 mt-1">
          Welcome, {session.user.name} - Manage tickets and assist users
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Ticket className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-900">Open Tickets</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="font-semibold text-gray-900">In Progress</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-900">Resolved</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Users Assisted</h3>
          </div>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
      </div>

      {/* Ticket Queue */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ticket Queue</h2>
        
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          <button className="px-4 py-2 font-medium text-blue-600 border-b-2 border-blue-600">
            Open (0)
          </button>
          <button className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900">
            Assigned to Me (0)
          </button>
          <button className="px-4 py-2 font-medium text-gray-600 hover:text-gray-900">
            In Progress (0)
          </button>
        </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No tickets available</p>
          <p className="text-sm text-gray-400">
            New assistance requests will appear here
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Review Documents</h3>
          <p className="text-sm text-blue-800">
            Verify user-uploaded documents for scheme eligibility
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-semibold text-green-900 mb-2">Schedule Sessions</h3>
          <p className="text-sm text-green-800">
            Book 1-to-1 assistance sessions with users
          </p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="font-semibold text-purple-900 mb-2">Submit Applications</h3>
          <p className="text-sm text-purple-800">
            Apply for schemes on behalf of users
          </p>
        </div>
      </div>
    </div>
  );
}
