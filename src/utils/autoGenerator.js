import { periods, weekDays } from "./periods";

// Safe shuffle
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const normalizeSubjects = (rows) => {
  if (!rows || rows.length === 0) {
    return [{ subject: "Subject", code: "S01", type: "Theory", hours: 4, teacher: "Teacher", teacherCode: "TC" }];
  }
  return rows.map((r) => ({
    subject: r.subject || "Subject",
    code: r.code || "S01",
    type: r.type || "Theory",
    hours: r.hours || 4,
    teacher: r.teacher || "Teacher",
    teacherCode: r.teacherCode || "TC"
  }));
};

const teacherConflict = (full, day, periodId, teacher) => {
  if (!teacher) return false;
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

export const autoGenerateTimetable = (subjectsByYear, allYears) => {
  const result = {};

  // Pre-initialize table
  for (const year of allYears) {
    result[year] = { A: {}, B: {} };
    for (const section of ["A", "B"]) {
      for (const day of weekDays) {
        result[year][section][day] = {};
      }
    }
  }

  // Generation Logic
  for (const year of allYears) {
    const rawSubjects = subjectsByYear[`year${year}`];
    const normalized = normalizeSubjects(rawSubjects);

    for (const section of ["A", "B"]) {
      // Build weekly pool for this section
      let weeklyPool = [];
      normalized.forEach(sub => {
        for (let i = 0; i < sub.hours; i++) {
          weeklyPool.push({ ...sub });
        }
      });

      // Fill pool up to 35 (7 periods * 5 days) using existing subjects if short
      if (normalized.length > 0) {
        let i = 0;
        while (weeklyPool.length < 35) {
          weeklyPool.push({ ...normalized[i % normalized.length] });
          i++;
        }
      }
      weeklyPool = shuffle(weeklyPool.slice(0, 35));

      let poolIdx = 0;
      for (const day of weekDays) {
        for (const p of periods) {
          if (p.type === "break") {
            result[year][section][day][p.id] = { type: "break", subject: p.name, teacher: null };
          } else {
            let chosen = weeklyPool[poolIdx];

            // Conflict avoidance with simple look-ahead swap
            let tries = 0;
            let currentIdx = poolIdx;
            while (teacherConflict(result, day, p.id, chosen.teacher) && tries < 10 && currentIdx < weeklyPool.length - 1) {
              // Try to find a later subject in the pool that doesn't have a conflict
              currentIdx++;
              [weeklyPool[poolIdx], weeklyPool[currentIdx]] = [weeklyPool[currentIdx], weeklyPool[poolIdx]];
              chosen = weeklyPool[poolIdx];
              tries++;
            }

            result[year][section][day][p.id] = {
              type: "class",
              subject: chosen.subject,
              code: chosen.code,
              teacher: chosen.teacher,
              teacherCode: chosen.teacherCode,
              subjectType: chosen.type
            };
            poolIdx++;
          }
        }
      }
    }
  }

  return result;
};
