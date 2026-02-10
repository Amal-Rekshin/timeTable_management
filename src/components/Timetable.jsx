// src/components/Timetable.jsx

import { periods, weekDays } from "../utils/periods";
import PeriodRow from "./PeriodRow";
import { autoGenerateTimetable } from "../utils/autoGenerator";
import { useEffect, useState } from "react";
import { saveToStorage, loadFromStorage } from "../utils/storage";
import EditModal from "./EditModal";
import SectionTabs from "./SectionTabs";

export default function Timetable({ subjects, activeYear, activeSection, setActiveSection }) {
  const [fullTable, setFullTable] = useState({});
  const [currentTable, setCurrentTable] = useState({});
  const [editingCell, setEditingCell] = useState(null);

  // LOAD FULL TIMETABLE OR GENERATE NEW ONE
  useEffect(() => {
    const stored = loadFromStorage();

    if (stored) {
      setFullTable(stored);
      setCurrentTable(stored[activeYear]?.[activeSection] || {});
    } else {
      generateAllYears();
    }
  }, []);

  // When switching year/section — update displayed table
  useEffect(() => {
    if (fullTable[activeYear]?.[activeSection]) {
      setCurrentTable(fullTable[activeYear][activeSection]);
    } else {
      setCurrentTable({});
    }
  }, [activeYear, activeSection, fullTable]);

  // LOAD FULL TIMETABLE OR GENERATE NEW ONE
  useEffect(() => {
    const stored = loadFromStorage();

    if (stored) {
      setFullTable(stored);
      setCurrentTable(stored[activeYear]?.[activeSection] || {});
    } else {
      generateAllYears();
    }
  }, []);



  // FULL GENERATION: ALL YEARS + BOTH SECTIONS
  const generateAllYears = () => {
    const generated = autoGenerateTimetable(
      subjects,
      [1, 2, 3, 4] // all years included
    );

    saveToStorage(generated);
    setFullTable(generated);
    setCurrentTable(generated[activeYear]?.[activeSection] || {});
  };

  // REGENERATE ONLY CURRENT YEAR & SECTION
  const regenerateCurrent = () => {
    const all = autoGenerateTimetable(subjects, [1, 2, 3, 4]);

    saveToStorage(all);
    setFullTable(all);
    setCurrentTable(all[activeYear]?.[activeSection] || {});
  };

  // RESET FUNCTION - Clear storage and regenerate
  const resetTimetable = () => {
    if (window.confirm("Are you sure you want to reset the timetable? All changes will be lost.")) {
      saveToStorage(null);
      setFullTable({});
      setCurrentTable({});
      // Force regeneration
      generateAllYears();
    }
  };

  // EDIT CELL: Updates fullTable not just current table
  // const updateSubject = (day, periodId, newSubj, newTeach) => {
  //   const updated = { ...fullTable };

  //   if (updated[activeYear]?.[activeSection]?.[day]?.[periodId]) {
  //     updated[activeYear][activeSection][day][periodId].subject = newSubj;
  //     updated[activeYear][activeSection][day][periodId].teacher = newTeach;

  //     saveToStorage(updated);
  //     setFullTable(updated);
  //     setCurrentTable(updated[activeYear]?.[activeSection] || {});
  //   }
  // };

  const updateSubject = (day, periodId, newSubj, newTeach) => {
    const updated = { ...fullTable };

    const cell =
      updated?.[activeYear]?.[activeSection]?.[day]?.[periodId] || null;

    if (cell) {
      cell.subject = newSubj;
      cell.teacher = newTeach;

      saveToStorage(updated);
      setFullTable(updated);
      setCurrentTable(updated[activeYear]?.[activeSection] || {});
    } else {
      console.warn("❌ Cell not found for editing:", { day, periodId });
    }
  };


  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">
          Timetable — Year {activeYear}, Section {activeSection}
        </h2>

        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={regenerateCurrent}
          >
            Re-Generate (This Section)
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={resetTimetable}
          >
            Reset All
          </button>
        </div>
      </div>

      {/* Section Tabs */}
      <SectionTabs
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Timetable */}
      <table className="w-full border shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Day</th>
            {periods?.map((p) => (
              <th key={p.id} className="border p-2">
                {p.name}
                <br />
                <span className="text-xs text-gray-500">
                  {p.start} - {p.end}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {weekDays?.map((day) => (
            <PeriodRow
              key={day}
              day={day}
              data={currentTable[day] || {}}
              onEdit={(periodId) => setEditingCell({ day, periodId })}
            />
          ))}
        </tbody>
      </table>

      {editingCell && (
        <EditModal
          timetable={currentTable}
          editingCell={editingCell}
          onClose={() => setEditingCell(null)}
          onSave={updateSubject}
        />
      )}

      {/* Teacher Class Counts */}
      <div className="mt-12 bg-gray-50 p-8 rounded-3xl border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <span className="w-2 h-8 bg-green-500 rounded-full"></span>
          <div>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">📊 Section Workload Analysis</h3>
            <p className="text-gray-500 text-sm">Distribution of teaching hours across faculty for Year {activeYear} Sect {activeSection}.</p>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border">
          <table className="min-w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b">
                <th className="py-4 px-6 text-left">Teacher Name</th>
                <th className="py-4 px-6 text-center">Staff Code</th>
                <th className="py-4 px-6 text-center">Total Hours/Wk</th>
                <th className="py-4 px-6 text-right">Utilization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {Object.entries(
                Object.values(currentTable || {}).reduce((acc, dayData) => {
                  Object.values(dayData).forEach((period) => {
                    if (period.type === "class" && period.teacher && period.teacher !== "Free") {
                      if (!acc[period.teacher]) {
                        acc[period.teacher] = {
                          code: period.teacherCode || "-",
                          count: 0,
                        };
                      }
                      acc[period.teacher].count += 1;
                      if (acc[period.teacher].code === "-" && period.teacherCode) {
                        acc[period.teacher].code = period.teacherCode;
                      }
                    }
                  });
                  return acc;
                  // Sort by highest workload
                }, {})
              ).sort((a, b) => b[1].count - a[1].count).map(([teacher, { code, count }]) => (
                <tr key={teacher} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="py-4 px-6 font-bold text-gray-800 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-150 transition-transform"></div>
                    {teacher}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-gray-500 text-xs">{code}</span>
                  </td>
                  <td className="py-4 px-6 text-center font-black text-blue-600 text-lg">
                    {count} hrs
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-3 text-sm font-medium text-gray-400">
                      <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-500 h-full"
                          style={{ width: `${Math.min(count * 5, 100)}%` }}
                        ></div>
                      </div>
                      <span>{Math.round(count * 2.8)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
