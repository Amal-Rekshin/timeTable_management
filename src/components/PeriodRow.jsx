// src/components/PeriodRow.jsx

import SubjectCell from "./SubjectCell";
import { periods } from "../utils/periods";

export default function PeriodRow({ day, data = {}, onEdit }) {
  // Ensure data is always an object
  const safeData = data || {};

  // Get period IDs from the periods configuration to maintain order
  const periodIds = periods.map(p => p.id);

  return (
    <tr>
      <td className="border p-2 font-semibold bg-gray-50">{day}</td>

      {periodIds.map((periodId) => {
        const cell = safeData[periodId];
        
        return (
          <SubjectCell
            key={periodId}
            periodId={periodId}
            cell={cell}
            onClick={() => {
              if (cell?.type === "class") {
                onEdit(periodId);
              }
            }}
          />
        );
      })}
    </tr>
  );
}
