// src/components/Dashboard.jsx

import React from 'react';

const Dashboard = ({ subjects, departments = [], staff = [], rooms = [] }) => {
    // Calculate dynamic stats
    const totalStaff = staff.length;
    const totalDepts = departments.length;
    const totalRooms = rooms.length;

    // Estimate total hours from subjects if available
    const allSubjs = subjects ? Object.values(subjects).flat() : [];
    const totalHours = allSubjs.reduce((acc, s) => acc + (s.hours || 0), 0);

    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-rose-500"];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-blue-50/50 border border-blue-50 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-4xl font-black text-gray-800 tracking-tighter mb-2">📊 Academic Analytics</h2>
                    <p className="text-gray-500 font-medium">Real-time overview of faculty workload and department infrastructure.</p>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-20 -mt-20 opacity-50"></div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Departments" value={totalDepts} icon="🏢" color="text-blue-600" />
                <StatCard title="Total Faculty" value={totalStaff} icon="👥" color="text-green-600" />
                <StatCard title="Classrooms/Labs" value={totalRooms} icon="🏫" color="text-purple-600" />
                <StatCard title="Teaching Load" value={`${totalHours} hrs`} icon="⏱️" color="text-orange-600" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Department Breakdown */}
                <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50 border-t-4 border-t-blue-600">
                    <h3 className="text-xl font-bold mb-6 text-gray-700 flex items-center gap-2">
                        Department Student Distribution
                    </h3>

                    <div className="space-y-6">
                        {departments.length > 0 ? departments.map((dept, idx) => (
                            <div key={dept.id} className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="font-bold text-gray-700">{dept.name}</span>
                                    <span className="text-xs font-bold text-gray-400">{dept.students} Students</span>
                                </div>
                                <div className="w-full bg-gray-50 h-3 rounded-full overflow-hidden">
                                    <div
                                        className={`${colors[idx % colors.length]} h-full rounded-full transition-all duration-1000`}
                                        style={{ width: `${Math.min((dept.students / 150) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-gray-400 italic text-center py-10">No department data available.</p>
                        )}
                    </div>
                </div>

                {/* Staff Overview */}
                <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50 border-t-4 border-t-green-500">
                    <h3 className="text-xl font-bold mb-6 text-gray-700 flex items-center gap-2">
                        Faculty Designation Mix
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {["Professor", "Associate Professor", "Assistant Professor", "Lab Assistant"].map(deg => {
                            const count = staff.filter(s => s.designation === deg).length;
                            return (
                                <div key={deg} className="bg-gray-50 p-4 rounded-2xl text-center border border-transparent hover:border-green-100 transition-all">
                                    <p className="text-2xl font-black text-gray-800">{count}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">{deg}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 transition-all hover:shadow-xl hover:-translate-y-1">
        <div className={`text-4xl ${color} bg-gray-50 w-16 h-16 rounded-2xl flex items-center justify-center`}>{icon}</div>
        <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{title}</p>
            <p className={`text-3xl font-black ${color}`}>{value}</p>
        </div>
    </div>
);

export default Dashboard;
