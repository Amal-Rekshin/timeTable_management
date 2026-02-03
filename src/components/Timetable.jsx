// src/components/Timetable.jsx

import { periods, weekDays } from "../utils/periods";
import PeriodRow from "./PeriodRow";
import { autoGenerateTimetable } from "../utils/autoGenerator";
import { useEffect, useState } from "react";
import { saveToStorage, loadFromStorage } from "../utils/storage";
import EditModal from "./EditModal";

export default function Timetable({ subjects, activeYear, activeSection }) {
  const [fullTable, setFullTable] = useState({});
  const [currentTable, setCurrentTable] = useState({});
  const [editingCell, setEditingCell] = useState(null);

  // LOAD FULL TIMETABLE OR GENERATE NEW ONE
  useEffect(() => {
    const stored = loadFromStorage();

    if (stored) {
      setFullTable(stored);
      setCurrentTable(stored[activeYear][activeSection]);
    } else {
      generateAllYears();
    }
  }, []);

  // When switching year/section — update displayed table
  useEffect(() => {
    if (fullTable[activeYear]) {
      setCurrentTable(fullTable[activeYear][activeSection]);
    }
  }, [activeYear, activeSection, fullTable]);

  // FULL GENERATION: ALL YEARS + BOTH SECTIONS
  const generateAllYears = () => {
    const generated = autoGenerateTimetable(
      subjects,
      [1, 2, 3, 4] // all years included
    );

    saveToStorage(generated);
    setFullTable(generated);
    setCurrentTable(generated[activeYear][activeSection]);
  };

  // REGENERATE ONLY CURRENT YEAR & SECTION
  const regenerateCurrent = () => {
    const all = autoGenerateTimetable(subjects, [1, 2, 3, 4]);

    saveToStorage(all);
    setFullTable(all);
    setCurrentTable(all[activeYear][activeSection]);
  };

  // EDIT CELL: Updates fullTable not just current table
  const updateSubject = (day, periodId, newSubj, newTeach) => {
    const updated = { ...fullTable };

    updated[activeYear][activeSection][day][periodId].subject = newSubj;
    updated[activeYear][activeSection][day][periodId].teacher = newTeach;

    saveToStorage(updated);
    setFullTable(updated);
    setCurrentTable(updated[activeYear][activeSection]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-bold">
          Timetable — Year {activeYear}, Section {activeSection}
        </h2>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={regenerateCurrent}
        >
          Re-Generate (This Section)
        </button>
      </div>

      {/* Timetable */}
      <table className="w-full border shadow rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Day</th>
            {periods.map((p) => (
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
          {weekDays.map((day) => (
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
    </div>
  );
}
