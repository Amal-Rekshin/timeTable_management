import { useState, useEffect } from "react";
import Header from "./components/Header";
import SubjectsForm from "./components/SubjectsForm";
import YearTabs from "./components/YearTabs";
import Timetable from "./components/Timetable";
import ProjectOverview from "./components/ProjectOverview";
import Dashboard from "./components/Dashboard";
import DepartmentManager from "./components/DepartmentManager";
import StaffManager from "./components/StaffManager";
import ResourceManager from "./components/ResourceManager";
import StaffMapping from "./components/StaffMapping";
import { exportTimetablePDF } from "./pdf/exportPDF";

export default function App() {
  // --- ADVANCED STATE SCHEMA ---
  const [departments, setDepartments] = useState([
    { id: 1, name: "CSE", semesters: 8, sections: 2, students: 120 },
    { id: 2, name: "ECE", semesters: 8, sections: 2, students: 110 },
    { id: 3, name: "AIDS", semesters: 8, sections: 1, students: 60 },
    { id: 4, name: "EEE", semesters: 8, sections: 1, students: 55 },
  ]);

  const [staff, setStaff] = useState([
    { id: 101, name: "Dr. Anand Kumar", code: "AK01", dept: "CSE", designation: "Professor", maxHours: 18 },
    { id: 102, name: "Prof. Meena S", code: "MS02", dept: "ECE", designation: "Associate Professor", maxHours: 16 }
  ]);
  const [subjects, setSubjects] = useState(null);
  const [rooms, setRooms] = useState([
    { id: 201, number: "L-101", type: "Theory", capacity: 60 },
    { id: 202, number: "Lab-CSE-01", type: "Lab", capacity: 30 }
  ]);
  const [mappings, setMappings] = useState([]);

  const [activeYear, setActiveYear] = useState(1);
  const [activeSection, setActiveSection] = useState("A");
  const [activeTab, setActiveTab] = useState("overview");

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '📖' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'depts', label: 'Departments', icon: '🏢' },
    { id: 'staff', label: 'Staff Profile', icon: '👥' },
    { id: 'mapping', label: 'Mapping', icon: '🔗' },
    { id: 'rooms', label: 'Classrooms', icon: '🏫' },
    { id: 'manage', label: 'Timetable', icon: '🗓️' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r hidden lg:flex flex-col p-4 space-y-2 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-4 mb-2 font-mono">Management</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                : 'text-gray-500 hover:bg-gray-100'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            {activeTab === "overview" && <ProjectOverview />}
            {activeTab === "dashboard" && (
              <Dashboard
                subjects={subjects}
                departments={departments}
                staff={staff}
                rooms={rooms}
              />
            )}

            {activeTab === "depts" && (
              <DepartmentManager
                departments={departments}
                setDepartments={setDepartments}
              />
            )}

            {activeTab === "staff" && (
              <StaffManager
                staff={staff}
                setStaff={setStaff}
                departments={departments}
              />
            )}

            {activeTab === "mapping" && (
              <StaffMapping
                staff={staff}
                subjects={subjects}
                setMappings={setMappings}
              />
            )}

            {activeTab === "rooms" && (
              <ResourceManager
                rooms={rooms}
                setRooms={setRooms}
              />
            )}

            {activeTab === "manage" && (
              !subjects ? (
                <SubjectsForm
                  onSave={setSubjects}
                  staff={staff}
                  departments={departments}
                />
              ) : (
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border flex justify-between items-center">
                    <YearTabs activeYear={activeYear} setActiveYear={setActiveYear} />
                    <button
                      onClick={() => exportTimetablePDF("timetable-area")}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-purple-200"
                    >
                      📥 Export PDF
                    </button>
                  </div>

                  <div id="timetable-area">
                    <Timetable
                      subjects={subjects}
                      activeYear={activeYear}
                      activeSection={activeSection}
                      setActiveSection={setActiveSection}
                    />
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => setSubjects(null)}
                      className="text-gray-400 hover:text-red-500 text-sm font-medium transition-colors"
                    >
                      ← Reset All Subjects and Back to Setup
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
