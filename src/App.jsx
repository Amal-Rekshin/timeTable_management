// src/App.jsx

import { useState } from "react";
import Header from "./components/Header";
import SubjectsForm from "./components/SubjectsForm";
import YearTabs from "./components/YearTabs";
import SectionTabs from "./components/SectionTabs";
import Timetable from "./components/Timetable";
import { exportTimetablePDF } from "./pdf/exportPDF";

export default function App() {
  const [subjects, setSubjects] = useState(null);
  const [activeYear, setActiveYear] = useState(1);
  const [activeSection, setActiveSection] = useState("A");

  if (!subjects) {
    return (
      <>
        <Header />
        <SubjectsForm onSave={setSubjects} />
      </>
    );
  }

  return (
    <div>
      <Header />

      <div className="p-6">
        <YearTabs activeYear={activeYear} setActiveYear={setActiveYear} />
        <SectionTabs
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <div id="timetable-area">
          <Timetable
            subjects={subjects}
            activeYear={activeYear}
            activeSection={activeSection}
          />
        </div>

        <button
          onClick={() => exportTimetablePDF("timetable-area")}
          className="px-6 py-3 bg-purple-600 text-white rounded mt-4"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}
