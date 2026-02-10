// src/components/SubjectCell.jsx

export default function SubjectCell({ cell, onClick }) {
  if (!cell) {
    return <td className="border p-2 text-center bg-white text-gray-200">—</td>;
  }

  const isBreak = cell.type === "break";
  const isLab = cell.subjectType === "Lab";

  return (
    <td
      onClick={onClick}
      className={`border p-2 text-center cursor-pointer transition-all ${isBreak
          ? "bg-amber-50 text-amber-800 font-bold italic"
          : isLab
            ? "hover:bg-purple-50 bg-white border-l-4 border-l-purple-500"
            : "hover:bg-blue-50 bg-white"
        }`}
    >
      {isBreak ? (
        <span className="text-xs uppercase tracking-widest">{cell.subject || "Break"}</span>
      ) : (
        <div className="space-y-1">
          <div className="flex justify-between items-start gap-1">
            <span className="text-[9px] font-black text-blue-500 bg-blue-50 px-1 rounded">{cell.code}</span>
            {isLab && <span className="text-[9px] font-black text-purple-500 bg-purple-50 px-1 rounded uppercase">Lab</span>}
          </div>
          <div className="font-bold text-gray-800 text-sm leading-tight">{cell.subject}</div>
          {cell.teacher && (
            <div className="text-[10px] text-gray-500 font-medium">
              {cell.teacher} <span className="opacity-50">({cell.teacherCode})</span>
            </div>
          )}
        </div>
      )}
    </td>
  );
}
