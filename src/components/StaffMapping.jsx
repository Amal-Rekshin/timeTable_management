import React, { useState } from 'react';

const StaffMapping = ({ staff = [], subjects, setMappings }) => {
    const [selectedStaffId, setSelectedStaffId] = useState(staff[0]?.id || "");
    const [showSuccess, setShowSuccess] = useState(false);

    const selectedStaff = staff.find(s => s.id === parseInt(selectedStaffId));
    const allSubjects = subjects ? Object.values(subjects).flat() : [];

    const handleUpdate = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Premium Header */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-blue-50/50 border border-blue-50 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden">
                <div className="relative z-10 text-center md:text-left">
                    <h2 className="text-4xl font-black text-gray-800 tracking-tighter mb-2">🔗 Eligibility Mapping</h2>
                    <p className="text-gray-500 font-medium tracking-tight whitespace-pre-wrap">Assign subjects to faculty and set teaching constraints.</p>
                </div>

                {selectedStaff && (
                    <div className="bg-blue-600 px-8 py-4 rounded-3xl text-white shadow-lg shadow-blue-200 flex items-center gap-4 animate-in zoom-in duration-300">
                        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl font-bold">
                            {selectedStaff.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-black text-lg leading-tight">{selectedStaff.name}</p>
                            <p className="text-blue-100 text-xs font-bold uppercase tracking-widest">{selectedStaff.dept} • {selectedStaff.code}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left: Configuration Panel */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-gray-50 space-y-8">
                        <div className="space-y-3">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Select Professor</label>
                            <select
                                className="w-full bg-gray-50 border-0 p-5 rounded-2xl focus:ring-4 focus:ring-blue-100 transition-all font-bold text-gray-700 appearance-none shadow-inner"
                                value={selectedStaffId}
                                onChange={(e) => setSelectedStaffId(e.target.value)}
                            >
                                {staff.map(s => <option key={s.id} value={s.id}>{s.name} ({s.code})</option>)}
                            </select>
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] pl-1">Constraints</label>

                            <div className="p-5 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-200 transition-all group">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-bold text-gray-700">Max Workload</span>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black">18 hrs/wk</span>
                                </div>
                                <input type="range" className="w-full accent-blue-600" defaultValue={18} max={30} />
                            </div>

                            <div className="p-5 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-200 transition-all flex items-center justify-between">
                                <span className="font-bold text-gray-700">Handle Lab Sessions</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                        </div>

                        <button
                            onClick={handleUpdate}
                            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-black transition-all transform active:scale-95"
                        >
                            {showSuccess ? "✅ Updated Successfully" : "Sync Profile"}
                        </button>
                    </div>
                </div>

                {/* Right: Subject Matrix */}
                <div className="lg:col-span-8 bg-white p-10 rounded-[2.5rem] shadow-lg border border-gray-50">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-black text-gray-800 tracking-tight">Subject Selection</h3>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Theory</span>
                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Lab</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {allSubjects.length > 0 ? (
                            allSubjects.map((sub, idx) => (
                                <div key={idx} className="flex items-center gap-6 p-5 rounded-3xl border-2 border-gray-50 hover:border-blue-500 hover:bg-blue-50/10 transition-all cursor-pointer group">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-sm ${sub.type === "Lab" ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>
                                        {sub.type === "Lab" ? "🧪" : "📚"}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-black text-gray-800 truncate">{sub.subject}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{sub.code} • {sub.type}</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-200 group-hover:bg-green-500 group-hover:border-green-500 group-hover:text-white transition-all">
                                        <span className="text-sm">✓</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                                <div className="text-4xl mb-4 opacity-30">📂</div>
                                <p className="text-gray-400 font-bold tracking-tight">No subjects defined in the Timetable section yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffMapping;
