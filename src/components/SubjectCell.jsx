// src/components/SubjectCell.jsx

export default function SubjectCell({ cell, onClick }) {
  const isBreak = cell.type === "break";

  return (
    <td
      onClick={onClick}
      className={`border p-2 text-center cursor-pointer ${
        isBreak
          ? "bg-yellow-100 text-gray-700 font-semibold"
          : "hover:bg-blue-100 bg-white"
      }`}
    >
      {cell.subject || "—"}
    </td>
  );
}
