// src/components/EditModal.jsx

import { useState } from "react";

export default function EditModal({
  timetable,
  editingCell,
  onClose,
  onSave,
}) {
  const { day, periodId } = editingCell;
  const current = timetable[day][periodId];

  const [value, setValue] = useState(current.subject);

  const save = () => {
    onSave(day, periodId, value);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-bold mb-3">Edit Subject</h2>

        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={save}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
