import { Bell } from 'lucide-react';

export default function UpdatesPage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Updates & Notifications</h1>

      <div className="text-center py-12">
        <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 mb-2">No new updates at the moment</p>
        <p className="text-sm text-gray-400">
          Check back later for new scheme announcements and updates
        </p>
      </div>
    </div>
  );
}
