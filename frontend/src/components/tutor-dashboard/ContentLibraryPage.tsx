
import { FileQuestion, FileText, Pencil } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import apiClient from '../../lib/apiClient';
import Button from '../ui/Button';
import CreateAssignmentModal from './CreateAssignmentModal';
import CreateQuizModal from './CreateQuizModal';
import EditAssignmentModal from './EditAssignmentModal';
import EditQuizModal from './EditQuizModal';

/* =========================
   TYPES (API RESPONSE)
========================= */

type Assignment = {
  id: string;
  title: string;
  subject: string;
  class_grade: string;
  due_date: string;
  allow_submission_online: boolean;
  status: string;
};

type Quiz = {
  id: string;
  title: string;
  subject: string;
  class_grade: string;
  due_date: string | null;
  total_questions: number;
  status: string;
};

/* =========================
   MAPPERS (API → MODAL)
========================= */

const mapAssignmentForEdit = (a: Assignment) => ({
  id: a.id,
  title: a.title,
  subject: a.subject,
  classGrade: a.class_grade,
  instructions: '',
  attachments: [],
  dueDate: a.due_date,
  allowOnlineSubmissions: a.allow_submission_online,
});

const mapQuizForEdit = (q: Quiz) => ({
  id: q.id,
  title: q.title,
  subject: q.subject,
  classGrade: q.class_grade,
  instructions: '',
  questions: [],
});

/* =========================
   TABLE COMPONENT
========================= */

const ContentTable = ({
  data,
  onEdit,
}: {
  data: any[];
  onEdit: (item: any) => void;
}) => (
  <div className="overflow-hidden rounded-md border border-[#1C2B22]/10 bg-white">
    
    <table className="w-full text-sm">
      <thead className="bg-[#F7F2E9] text-left">
        <tr>
          <th className="p-4 font-medium text-[#58646C]">Title</th>
          <th className="p-4 font-medium text-[#58646C]">Subject</th>
          <th className="p-4 font-medium text-[#58646C]">Grade</th>
          <th className="p-4 font-medium text-[#58646C]">Due date</th>
          <th className="p-4 font-medium text-[#58646C]">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={5} className="p-8 text-center text-sm text-[#58646C]">
              No content found.
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id} className="border-t border-[#1C2B22]/10">
              <td className="p-4 font-medium text-[#1C2B22]">{item.title}</td>
              <td className="p-4 text-[#58646C]">{item.subject}</td>
              <td className="p-4 text-[#58646C]">{item.class_grade}</td>
              <td className="p-4 text-[#58646C]">
                {item.due_date
                  ? new Date(item.due_date).toLocaleDateString()
                  : '-'}
              </td>
              <td className="p-4">
                <button
                  onClick={() => onEdit(item)}
                  className="text-[#9AA3AB] hover:text-[#8a5f18]"
                >
                  <Pencil size={18} />
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

/* =========================
   MAIN PAGE
========================= */

const ContentLibraryPage = () => {
  const [activeTab, setActiveTab] = useState<'Assignments' | 'Quizzes'>(
    'Assignments'
  );

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isEditAssignmentModalOpen, setIsEditAssignmentModalOpen] =
    useState(false);
  const [isEditQuizModalOpen, setIsEditQuizModalOpen] = useState(false);

  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  /* =========================
     FETCH DATA
  ========================= */

  const fetchContent = async () => {
    setIsLoading(true);
    try {
      const [assignRes, quizRes] = await Promise.all([
        apiClient.get('/tutor/assignments'),
        apiClient.get('/tutor/quizzes'),
      ]);

      setAssignments(assignRes.data?.data ?? []);
      setQuizzes(quizRes.data?.data ?? []);
    } catch (error) {
      console.error('Failed to fetch content library:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  /* =========================
     HANDLERS
  ========================= */

  const handleEditAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsEditAssignmentModalOpen(true);
  };

  const handleEditQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setIsEditQuizModalOpen(true);
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <>
      <div className="flex flex-col gap-6">
        {/* ================= CONTENT LIBRARY HEADER ================= */}
<div className="mb-6 rounded-md border border-[#1C2B22]/10 bg-[#0E211C] p-5 text-[#F7F2E9]">
  <h1 className="text-xl font-semibold">
    Content library
  </h1>
  <p className="mt-1 text-sm text-[#AAB6A2]">
    Manage, organize, and share your teaching materials with
    students easily.
  </p>
</div>

{/* ================= INFO / GUIDELINES ================= */}
<div className="mb-6 rounded-md border border-[#1C2B22]/10 bg-white p-4 text-sm text-[#1C2B22]">
  <p className="mb-1 font-semibold text-[#1C2B22]">
    Library guidelines
  </p>
  <ul className="list-disc pl-5 space-y-1 text-[#58646C]">
    <li>
      Upload study materials such as notes, PDFs, videos, and
      practice worksheets.
    </li>
    <li>
      Organize content by subject, class, or topic for quick
      access.
    </li>
    <li>
      Shared materials are visible only to your assigned
      students.
    </li>
    <li>
      Please upload original or licensed content to maintain
      quality and copyright compliance.
    </li>
  </ul>
</div>

        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-semibold text-[#1C2B22]">
              Content library
            </h1>
            <p className="mt-1 text-sm text-[#58646C]">
              Create, manage, and send assignments and quizzes.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsAssignmentModalOpen(true)}
              variant="dark"
              className="h-10 border border-[#1C2B22]/15 bg-white text-sm text-[#1C2B22] hover:bg-[#F7F2E9]"
            >
              <FileText className="mr-2 size-4" /> Create assignment
            </Button>
            <Button onClick={() => setIsQuizModalOpen(true)}>
              <FileQuestion className="mr-2 size-4" /> Create quiz
            </Button>
          </div>
        </div>

        <div className="border-b border-[#1C2B22]/10">
          <nav className="-mb-px flex space-x-6">
            {['Assignments', 'Quizzes'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-[#D79A2C] text-[#1C2B22]'
                    : 'border-transparent text-[#58646C] hover:text-[#1C2B22]'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-4">
          {isLoading ? (
            <div className="p-8 text-center text-sm text-[#58646C]">Loading content...</div>
          ) : activeTab === 'Assignments' ? (
            <ContentTable
              data={assignments}
              onEdit={handleEditAssignment}
            />
          ) : (
            <ContentTable data={quizzes} onEdit={handleEditQuiz} />
          )}
        </div>
      </div>

      {/* CREATE MODALS */}
      <CreateAssignmentModal
        isOpen={isAssignmentModalOpen}
        setIsOpen={setIsAssignmentModalOpen}
      />
      <CreateQuizModal
        isOpen={isQuizModalOpen}
        setIsOpen={setIsQuizModalOpen}
      />

      {/* EDIT MODALS */}
      <EditAssignmentModal
        isOpen={isEditAssignmentModalOpen}
        setIsOpen={setIsEditAssignmentModalOpen}
        assignment={
          selectedAssignment
            ? mapAssignmentForEdit(selectedAssignment)
            : null
        }
      />

      <EditQuizModal
        isOpen={isEditQuizModalOpen}
        setIsOpen={setIsEditQuizModalOpen}
        quiz={selectedQuiz ? mapQuizForEdit(selectedQuiz) : null}
      />
    </>
  );
};

export default ContentLibraryPage;
