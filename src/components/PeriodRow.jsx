// src/components/PeriodRow.jsx

import SubjectCell from "./SubjectCell";

export default function PeriodRow({ day, data = {}, onEdit }) {
  // If no data yet, render empty cells
  const periodIds = Object.keys(data || {});

  return (
    <tr>
      <td className="border p-2 font-semibold bg-gray-50">{day}</td>

      {periodIds.length > 0 ? (
        periodIds.map((periodId) => (
          <SubjectCell
            key={periodId}
            periodId={periodId}
            cell={data[periodId]}
            onClick={() => {
              if (data[periodId].type === "class") {
                onEdit(periodId);
              }
            }}
          />
        ))
      ) : (
        // Render placeholders while timetable loads for the first time
        <td className="text-center p-2 text-gray-400" colSpan={8}>
          Loading...
        </td>
      )}
    </tr>
  );
}
