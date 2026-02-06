import React from 'react';

const RecentActivity = ({ onNavigate }) => {
  const activities = [
    { employer: 'Sunny Ridge Strawberry Farm', location: 'Main Ridge, VIC', date: 'Oct 24, 2023', hours: 8.5, status: 'Verified' },
    { employer: 'Costa Berries', location: 'Corindi, NSW', date: 'Oct 23, 2023', hours: 7.0, status: 'Pending' },
    { employer: 'Costa Berries', location: 'Corindi, NSW', date: 'Oct 22, 2023', hours: 9.0, status: 'Verified' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Recent Farm Work</h3>
        <button
          onClick={() => onNavigate && onNavigate('logbook')}
          className="text-sm font-medium text-indo-red hover:text-red-700 transition-colors"
        >
          View Full Logbook
        </button>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-900 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 font-semibold">Employer</th>
                <th className="px-6 py-3 font-semibold">Location</th>
                <th className="px-6 py-3 font-semibold">Date</th>
                <th className="px-6 py-3 font-semibold text-right">Hours</th>
                <th className="px-6 py-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {activities.map((activity, index) => (
                <tr key={index} className="group hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{activity.employer}</td>
                  <td className="px-6 py-4 text-gray-500">{activity.location}</td>
                  <td className="px-6 py-4 text-gray-500">{activity.date}</td>
                  <td className="px-6 py-4 text-gray-500 text-right">{activity.hours}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${activity.status === 'Verified'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
