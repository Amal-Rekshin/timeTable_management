import React, { useState } from 'react';

const StaffManager = ({ staff, setStaff, departments }) => {
    const [newStaff, setNewStaff] = useState({
        name: "",
        code: "",
        dept: departments[0]?.name || "CSE",
        designation: "Assistant Professor",
        maxHours: 18,
        subjects: []
    });

    const [isAdding, setIsAdding] = useState(false);

    const designations = [
        "Professor",
        "Associate Professor",
        "Assistant Professor",
        "Guest Lecturer",
        "Lab Assistant"
    ];

    const handleAdd = () => {
        if (!newStaff.name.trim() || !newStaff.code.trim()) return;
        setStaff([...staff, { ...newStaff, id: Date.now() }]);
        setNewStaff({
            name: "",
            code: "",
            dept: departments[0]?.name || "CSE",
            designation: "Assistant Professor",
            maxHours: 18,
            subjects: []
        });
        setIsAdding(false);
    };

    const handleRemove = (id) => {
        setStaff(staff.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">👥 Staff Management</h2>
                    <p className="text-gray-500">Maintain faculty profiles, eligibility, and maximum workload hours.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${isAdding ? 'bg-gray-100 text-gray-600' : 'bg-green-600 text-white shadow-green-200 hover:bg-green-700'
                        }`}
                >
                    {isAdding ? 'Cancel' : '+ Add Staff Member'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 animate-in zoom-in-95 duration-300">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">New Faculty Profile</h3>
                    <div className="grid md:grid-cols-5 gap-6">
                        <div className="space-y-2 col-span-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Dr. Anand Kumar"
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-green-500 transition-all font-bold text-gray-700"
                                value={newStaff.name}
                                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Staff Code</label>
                            <input
                                type="text"
                                placeholder="AK01"
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-green-500 transition-all font-bold text-gray-700"
                                value={newStaff.code}
                                onChange={(e) => setNewStaff({ ...newStaff, code: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Department</label>
                            <select
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-green-500 transition-all font-bold text-gray-700 appearance-none"
                                value={newStaff.dept}
                                onChange={(e) => setNewStaff({ ...newStaff, dept: e.target.value })}
                            >
                                {departments.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Max Hrs/Week</label>
                            <input
                                type="number"
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-green-500 transition-all font-bold text-gray-700"
                                value={newStaff.maxHours}
                                onChange={(e) => setNewStaff({ ...newStaff, maxHours: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-1 mt-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Designation</label>
                            <div className="flex flex-wrap gap-2">
                                {designations.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setNewStaff({ ...newStaff, designation: d })}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${newStaff.designation === d
                                                ? 'bg-green-600 text-white border-green-600'
                                                : 'bg-white text-gray-500 border-gray-200 hover:border-green-300'
                                            }`}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleAdd}
                            className="bg-green-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-green-200 hover:bg-green-700 transition-all"
                        >
                            Add to Faculty Database
                        </button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50">
                        <tr className="text-xs font-black text-gray-400 uppercase tracking-widest">
                            <th className="p-6">Staff Member</th>
                            <th className="p-6">Department</th>
                            <th className="p-6">Designation</th>
                            <th className="p-6 text-center">Workload Limit</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {staff.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-black">
                                            {member.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">{member.name}</p>
                                            <p className="text-xs text-gray-400 font-mono tracking-widest">{member.code}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-black">
                                        {member.dept}
                                    </span>
                                </td>
                                <td className="p-6 font-medium text-gray-600">{member.designation}</td>
                                <td className="p-6 text-center">
                                    <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-1 rounded-full text-sm font-black">
                                        {member.maxHours} hrs
                                    </div>
                                </td>
                                <td className="p-6 text-right">
                                    <button
                                        onClick={() => handleRemove(member.id)}
                                        className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {staff.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 font-medium italic">No staff members added yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaffManager;
