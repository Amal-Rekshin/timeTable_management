// src/components/SubjectsForm.jsx

import { useState } from "react";

export default function SubjectsForm({ onSave }) {
  const [subjects, setSubjects] = useState({
    year1: [{ subject: "", teacher: "" }],
    year2: [{ subject: "", teacher: "" }],
    year3: [{ subject: "", teacher: "" }],
    year4: [{ subject: "", teacher: "" }],
  });

  const addRow = (year) => {
    setSubjects({
      ...subjects,
      [year]: [...subjects[year], { subject: "", teacher: "" }],
    });
  };

  const updateRow = (year, index, field, value) => {
    const updated = [...subjects[year]];
    updated[index][field] = value;

    setSubjects({
      ...subjects,
      [year]: updated,
    });
  };

  const removeRow = (year, index) => {
    const updated = subjects[year].filter((_, i) => i !== index);

    setSubjects({
      ...subjects,
      [year]: updated,
    });
  };

  const submit = () => {
    // Clean whitespace-only rows
    const cleaned = {};
    Object.keys(subjects).forEach((yearKey) => {
      cleaned[yearKey] = subjects[yearKey].filter(
        (row) => row.subject.trim() !== "" && row.teacher.trim() !== ""
      );
    });

    onSave(cleaned);
  };

  const renderYear = (label, key) => (
    <div className="border p-4 rounded-lg mb-6 bg-white shadow">
      <h2 className="text-xl font-semibold mb-3">{label}</h2>

      {subjects[key].map((row, index) => (
        <div key={index} className="grid grid-cols-2 gap-3 mb-3">
          {/* Subject Input */}
          <input
            value={row.subject}
            onChange={(e) => updateRow(key, index, "subject", e.target.value)}
            className="border p-2 rounded bg-gray-50"
            placeholder="Enter subject"
          />

          {/* Teacher Input */}
          <div className="flex gap-2">
            <input
              value={row.teacher}
              onChange={(e) => updateRow(key, index, "teacher", e.target.value)}
              className="border p-2 rounded bg-gray-50 flex-1"
              placeholder="Enter teacher name"
            />
            <button
              onClick={() => removeRow(key, index)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              -
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={() => addRow(key)}
        className="px-4 py-2 mt-2 bg-green-600 text-white rounded"
      >
        + Add Subject
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Enter Subjects & Teachers for Each Year
      </h1>

      {renderYear("1st Year", "year1")}
      {renderYear("2nd Year", "year2")}
      {renderYear("3rd Year", "year3")}
      {renderYear("4th Year", "year4")}

      <button
        onClick={submit}
        className="px-6 py-3 bg-blue-600 text-white rounded text-lg mt-4"
      >
        Save & Continue
      </button>
    </div>
  );
}
