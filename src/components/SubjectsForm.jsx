// src/components/SubjectsForm.jsx

import { useState, useMemo } from "react";

export default function SubjectsForm({ onSave, staff = [], departments = [] }) {
  const [subjects, setSubjects] = useState({
    year1: [{ subject: "", code: "", type: "Theory", hours: 4, teacher: "", teacherCode: "", dept: "" }],
    year2: [{ subject: "", code: "", type: "Theory", hours: 4, teacher: "", teacherCode: "", dept: "" }],
    year3: [{ subject: "", code: "", type: "Theory", hours: 4, teacher: "", teacherCode: "", dept: "" }],
    year4: [{ subject: "", code: "", type: "Theory", hours: 4, teacher: "", teacherCode: "", dept: "" }],
  });

  // Calculate real-time workload per staff
  const staffWorkload = useMemo(() => {
    const counts = {};
    Object.values(subjects).flat().forEach(sub => {
      if (sub.teacher) {
        counts[sub.teacher] = (counts[sub.teacher] || 0) + (sub.hours || 0);
      }
    });
    return counts;
  }, [subjects]);

  const addRow = (year) => {
    setSubjects({
      ...subjects,
      [year]: [...subjects[year], { subject: "", code: "", type: "Theory", hours: 4, teacher: "", teacherCode: "", dept: "" }],
    });
  };

  const updateRow = (year, index, field, value) => {
    const updated = [...subjects[year]];

    if (field === "teacher") {
      const selectedStaff = staff.find(s => s.name === value);
      if (selectedStaff) {
        updated[index]["teacherCode"] = selectedStaff.code;
        updated[index]["dept"] = selectedStaff.dept;
      } else {
        updated[index]["teacherCode"] = "";
        updated[index]["dept"] = "";
      }
    }

    updated[index][field] = value;
    setSubjects({ ...subjects, [year]: updated });
  };

  const removeRow = (year, index) => {
    const updated = subjects[year].filter((_, i) => i !== index);
    setSubjects({ ...subjects, [year]: updated });
  };

  const submit = () => {
    const cleaned = {};
    Object.keys(subjects).forEach((yearKey) => {
      const validRows = subjects[yearKey].filter(
        (row) => row.subject.trim() !== "" && row.teacher.trim() !== ""
      );
      cleaned[yearKey] = validRows.length > 0 ? validRows : [
        { subject: "Sample Subject", code: "S01", type: "Theory", hours: 4, teacher: "Sample Teacher", teacherCode: "TC", dept: "GEN" }
      ];
    });
    onSave(cleaned);
  };

  const renderYear = (label, key) => {
    const totalHours = subjects[key].reduce((acc, s) => acc + (parseInt(s.hours) || 0), 0);
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-gray-800 tracking-tight flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
              {label}
            </h2>
            <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">
              {totalHours} Total Credits
            </span>
          </div>
          <button
            onClick={() => addRow(key)}
            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-all text-xs"
          >
            + Add Subject
          </button>
        </div>

        <div className="space-y-2">
          {subjects[key].map((row, index) => {
            const currentStaff = staff.find(s => s.name === row.teacher);
            const totalAssigned = staffWorkload[row.teacher] || 0;
            const isOverloaded = currentStaff && totalAssigned > currentStaff.maxHours;

            return (
              <div key={index} className={`grid grid-cols-12 gap-2 p-3 rounded-2xl group transition-all items-center border ${isOverloaded
                  ? "bg-rose-50 border-rose-200 shadow-rose-50"
                  : "bg-gray-50 border-transparent hover:bg-white hover:shadow-md hover:border-blue-100"
                }`}>
                {/* Subject Info */}
                <div className="col-span-2">
                  <input
                    value={row.subject}
                    onChange={(e) => updateRow(key, index, "subject", e.target.value)}
                    className="w-full bg-white border-0 p-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700 shadow-sm"
                    placeholder="Subject Name"
                  />
                </div>

                <div className="col-span-1">
                  <input
                    value={row.code}
                    onChange={(e) => updateRow(key, index, "code", e.target.value)}
                    className="w-full bg-white border-0 p-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700 shadow-sm"
                    placeholder="Code"
                  />
                </div>

                <div className="col-span-2">
                  <select
                    value={row.type}
                    onChange={(e) => updateRow(key, index, "type", e.target.value)}
                    className="w-full bg-white border-0 p-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700 shadow-sm"
                  >
                    <option value="Theory">Theory</option>
                    <option value="Lab">Lab</option>
                    <option value="Elective">Elective</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <input
                    type="number"
                    value={row.hours}
                    onChange={(e) => updateRow(key, index, "hours", parseInt(e.target.value) || 0)}
                    className="w-full bg-white border-0 p-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-bold text-center text-gray-700 shadow-sm"
                  />
                </div>

                {/* Teacher Info */}
                <div className="col-span-3">
                  <select
                    value={row.teacher}
                    onChange={(e) => updateRow(key, index, "teacher", e.target.value)}
                    className={`w-full bg-white border-0 p-2 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 transition-all font-bold text-gray-700 shadow-sm appearance-none ${isOverloaded ? "text-rose-600 ring-1 ring-rose-200" : ""
                      }`}
                  >
                    <option value="">Assign Staff...</option>
                    {staff.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <div className={`px-3 py-1.5 rounded-lg border-0 text-[9px] font-black uppercase flex flex-col justify-center h-[36px] items-center ${isOverloaded ? "bg-rose-600 text-white animate-pulse" : "bg-white text-blue-600"
                    }`}>
                    {isOverloaded ? (
                      <span>Overload: {totalAssigned}h</span>
                    ) : (
                      <>
                        <div className="truncate">{row.dept || "DEPT"}</div>
                        <div className="text-gray-400">{row.teacherCode || "CODE"}</div>
                      </>
                    )}
                  </div>
                </div>

                <div className="col-span-1 flex justify-end">
                  <button
                    onClick={() => removeRow(key, index)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-300 hover:bg-red-50 hover:text-red-500 rounded-lg transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 pb-20">
      <div className="flex-1 space-y-8">
        <div className="flex justify-between items-end border-b pb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">📅 Timetable Data Entry</h1>
            <p className="text-gray-500 font-medium tracking-tight">Gathering subject syllabus and staff allocation across departments.</p>
          </div>
          <button
            onClick={submit}
            className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            Generate Timetable ⚡
          </button>
        </div>

        <div className="grid grid-cols-1">
          {renderYear("First Year (Sem 1 & 2)", "year1")}
          {renderYear("Second Year (Sem 3 & 4)", "year2")}
          {renderYear("Third Year (Sem 5 & 6)", "year3")}
          {renderYear("Fourth Year (Sem 7 & 8)", "year4")}
        </div>
      </div>

      {/* Real-time Workload Monitor Sidebar */}
      <aside className="w-full lg:w-80 lg:sticky lg:top-8 h-fit">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-blue-50 space-y-6">
          <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
            <span className="text-blue-600">📊</span>
            Live Workload
          </h3>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {staff.map(s => {
              const hours = staffWorkload[s.name] || 0;
              const percent = (hours / s.maxHours) * 100;
              const isOver = hours > s.maxHours;

              return (
                <div key={s.id} className="space-y-1.5 p-3 rounded-2xl bg-gray-50 border border-transparent hover:border-blue-100 transition-all">
                  <div className="flex justify-between items-end">
                    <p className="text-sm font-bold text-gray-700 truncate w-32">{s.name}</p>
                    <span className={`text-[10px] font-black ${isOver ? 'text-rose-600' : 'text-blue-600'}`}>
                      {hours} / {s.maxHours} hrs
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${isOver ? 'bg-rose-500' : 'bg-blue-600'}`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    ></div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="pt-4 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center">
              Automatic synchronization enabled
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
