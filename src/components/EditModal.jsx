// src/components/EditModal.jsx

import { useState, useEffect } from "react";

export default function EditModal({
  timetable,
  editingCell,
  onClose,
  onSave,
}) {
  const { day, periodId } = editingCell;
  const current = timetable?.[day]?.[periodId] || null;

  // Initialize with current values (handle undefined safely)
  const [subject, setSubject] = useState(current?.subject || "");
  const [teacher, setTeacher] = useState(current?.teacher || "");

  // Update state if timetable changes while modal is open
  useEffect(() => {
    if (current) {
      setSubject(current.subject || "");
      setTeacher(current.teacher || "");
    }
  }, [current]);

  const save = () => {
    onSave(day, periodId, subject, teacher);
    onClose();
  };

  // Don't render if cell is invalid
  if (!current || current.type === "break") {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Cell</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter subject name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teacher
          </label>
          <input
            type="text"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter teacher name"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
