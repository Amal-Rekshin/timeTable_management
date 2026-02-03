import { periods, weekDays } from "./periods";

// Shuffle helper
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Teacher conflict checker ACROSS ALL YEARS + SECTIONS
const teacherConflict = (full, day, periodId, teacher) => {
  for (const y of Object.keys(full)) {
    for (const sec of Object.keys(full[y])) {
      const cell = full?.[y]?.[sec]?.[day]?.[periodId];
      if (cell && cell.type === "class" && cell.teacher === teacher) {
        return true;
      }
    }
  }
  return false;
};

// Rule: All subjects appear >=1 and <=2
const buildStrictRow = (subjects) => {
  const total = 7;
  const N = subjects.length;

  let base = [...subjects];         // all appear once
  let extraNeeded = total - N;    // how many more to fill

  const extra = shuffle(subjects).slice(0, extraNeeded);

  // Build pool
  let pool = [...base, ...extra];

  return shuffle(pool);
};

export const autoGenerateTimetable = (subjectsByYear, allYears) => {
  const result = {};

  // STEP 1: Pre-initialize all years & sections to avoid undefined
  for (const year of allYears) {
    result[year] = { A: {}, B: {} };

    for (const section of ["A", "B"]) {
      for (const day of weekDays) {
        result[year][section][day] = {};
      }
    }
  }

  // STEP 2: Now safely fill all sections with conflict checking
  for (const year of allYears) {
    for (const section of ["A", "B"]) {
      for (const day of weekDays) {
        const subjects = subjectsByYear[`year${year}`];
        const row = buildStrictRow(subjects);

        let idx = 0;

        periods.forEach((p) => {
          if (p.type === "break") {
            result[year][section][day][p.id] = {
              type: "break",
              subject: p.name,
              teacher: null,
            };
          } else {
            let chosen = row[idx];
            let tries = 0;

            // Strict teacher conflict
            while (
              teacherConflict(result, day, p.id, chosen.teacher) &&
              tries < 20
            ) {
              chosen = row[Math.floor(Math.random() * row.length)];
              tries++;
            }

            result[year][section][day][p.id] = {
              type: "class",
              subject: chosen.subject,
              teacher: chosen.teacher,
            };

            idx++;
          }
        });
      }
    }
  }

  return result;
};
