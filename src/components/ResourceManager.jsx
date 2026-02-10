import React, { useState } from 'react';

const ResourceManager = ({ rooms, setRooms }) => {
    const [newRoom, setNewRoom] = useState({
        number: "",
        type: "Theory",
        capacity: 40
    });

    const [isAdding, setIsAdding] = useState(false);

    const handleAdd = () => {
        if (!newRoom.number.trim()) return;
        setRooms([...rooms, { ...newRoom, id: Date.now() }]);
        setNewRoom({ number: "", type: "Theory", capacity: 40 });
        setIsAdding(false);
    };

    const handleRemove = (id) => {
        setRooms(rooms.filter(r => r.id !== id));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">🏫 Resource Management</h2>
                    <p className="text-gray-500">Manage classrooms, specialized labs, and seating capacities.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all shadow-lg ${isAdding ? 'bg-gray-100 text-gray-600' : 'bg-purple-600 text-white shadow-purple-200 hover:bg-purple-700'
                        }`}
                >
                    {isAdding ? 'Cancel' : '+ Add Resource'}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-purple-100 animate-in zoom-in-95 duration-300">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">New Resource Details</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Room Number / ID</label>
                            <input
                                type="text"
                                placeholder="e.g. L-101 or Lab-A"
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all font-bold text-gray-700"
                                value={newRoom.number}
                                onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Resource Type</label>
                            <select
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all font-bold text-gray-700 appearance-none"
                                value={newRoom.type}
                                onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                            >
                                <option value="Theory">Theory Classroom</option>
                                <option value="Lab">Specialized Lab</option>
                                <option value="Workshop">Workshop</option>
                                <option value="Auditorium">Auditorium</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Seating Capacity</label>
                            <input
                                type="number"
                                className="w-full bg-gray-50 border-0 p-4 rounded-2xl focus:ring-2 focus:ring-purple-500 transition-all font-bold text-gray-700"
                                value={newRoom.capacity}
                                onChange={(e) => setNewRoom({ ...newRoom, capacity: parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleAdd}
                            className="bg-purple-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-purple-200 hover:bg-purple-700 transition-all"
                        >
                            Register Resource
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {rooms.map((room) => (
                    <div key={room.id} className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 group">
                        <div className="flex justify-between items-center mb-4">
                            <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${room.type === 'Lab' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                                }`}>
                                {room.type}
                            </span>
                            <button
                                onClick={() => handleRemove(room.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                                title="Remove Resource"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>
                        <p className="text-sm font-bold text-gray-400 uppercase tracking-tighter">Room Identifier</p>
                        <h3 className="text-3xl font-black text-gray-800 mb-4">{room.number}</h3>

                        <div className="flex items-center gap-2 text-gray-500 font-bold">
                            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                            <span>{room.capacity} Students</span>
                        </div>
                    </div>
                ))}

                {rooms.length === 0 && !isAdding && (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 italic">No rooms or labs registered yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResourceManager;
