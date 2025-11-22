import { User } from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
<<<<<<< HEAD
        <div className="text-4xl mb-4">🇮🇳</div>
=======
        <User className="w-20 h-20 text-gray-300 mx-auto mb-4" />
>>>>>>> 0c3ca3a312480db61ae58ed577a338f170a2ce8f
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Welcome to DigiSahayak</h2>
        <p className="text-gray-600 mb-4">
          Profile and authentication features coming soon
        </p>
        <p className="text-sm text-gray-500">
          Soon you'll be able to save your favorite schemes and track your applications
        </p>
      </div>
    </div>
  );
}
