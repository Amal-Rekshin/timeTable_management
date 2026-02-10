import React, { useState } from 'react';

const DepartmentManager = ({ departments, setDepartments }) => {
    const [newDept, setNewDept] = useState({
        name: "",
        semesters: 8,
        sections: 2,
        students: 60
    });

    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = () => {
        if (!newDept.name.trim()) return;
        setDepartments([...departments, { ...newDept, id: Date.now() }]);
        setNewDept({ name: "", semesters: 8, sections: 2, students: 60 });
        setIsAdding(false);
    };

    const handleRemove = (id) => {
        setDepartments(departments.filter(d => d.id !== id));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">🏢 Department Management</h2>
                    <p className="text-gray-500">Configure and manage college departments and their structure.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${isAdding ? 'bg-gray-100 text-gray-600' : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
                        }`}
                >
                    {isAdding ? 'Cancel' : '+ Add Department'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 animate-in zoom-in-95 duration-300">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">New Department Details</h3>
                    <div className="grid md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dept Name</label>
                            <input
                                type="text"
                                placeholder="e.g. CSE"
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700"
                                value={newDept.name}
                                onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Semesters</label>
                            <input
                                type="number"
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700"
                                value={newDept.semesters}
                                onChange={(e) => setNewDept({ ...newDept, semesters: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sections</label>
                            <input
                                type="number"
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700"
                                value={newDept.sections}
                                onChange={(e) => setNewDept({ ...newDept, sections: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg. Students</label>
                            <input
                                type="number"
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700"
                                value={newDept.students}
                                onChange={(e) => setNewDept({ ...newDept, students: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleAdd}
                            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                        >
                            Confirm & Save
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {departments.map((dept) => (
                    <div key={dept.id} className="bg-white p-6 rounded-3xl shadow-md border border-gray-50 group hover:shadow-xl transition-all relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black">
                                {dept.name[0]}
                            </div>
                            <button
                                onClick={() => handleRemove(dept.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors p-2"
                                title="Remove Department"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                        <h3 className="text-2xl font-black text-gray-800 mb-1 relative z-10">{dept.name}</h3>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 relative z-10">Engineering Division</p>

                        <div className="grid grid-cols-3 gap-2 relative z-10">
                            <div className="bg-gray-50 p-3 rounded-2xl text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Sems</p>
                                <p className="font-black text-gray-700">{dept.semesters}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-2xl text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Secs</p>
                                <p className="font-black text-gray-700">{dept.sections}</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-2xl text-center">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Size</p>
                                <p className="font-black text-gray-700">{dept.students}</p>
                            </div>
                        </div>

                        {/* Sub-decorative element */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-50/50 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                    </div>
                ))}
            </div>

            {departments.length === 0 && !isAdding && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium italic">No departments configured yet.</p>
                </div>
            )}
        </div>
    );
};

export default DepartmentManager;
