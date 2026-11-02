import { Dialog } from '@headlessui/react';
import { GripVertical, Pencil, Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import Button from '../ui/Button';

// --- Types ---
// I've expanded on the types from your CreateQuizModal
type Question = {
  id: string;
  questionText: string;
  type: 'Multiple Choice' | 'True/False' | 'Short Answer';
  options?: string[];
  correctAnswerIndex?: number;
};

type Quiz = {
  id: string;
  title: string;
  subject: string;
  classGrade: string;
  instructions: string;
  questions: Question[];
};

// --- Component Props ---
interface EditQuizModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  quiz: Quiz | null;
}

const EditQuizModal: React.FC<EditQuizModalProps> = ({
  isOpen,
  setIsOpen,
  quiz,
}) => {
  // Local state for form
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [instructions, setInstructions] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);

  // Hydrate local state when quiz prop changes
  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setSubject(quiz.subject);
      setClassGrade(quiz.classGrade);
      setInstructions(quiz.instructions);
      setQuestions(quiz.questions);
    }
  }, [quiz]);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // API call to UPDATE quiz
    console.log('Saving quiz changes...', { title, questions });
    setIsOpen(false);
  };

  const handleDeleteQuiz = () => {
    // API call to DELETE quiz
    console.warn('Deleting quiz...');
    setIsOpen(false);
  };

  const handleAddQuestion = () => {
    // In a real app, this might open a new "Question Editor" modal
    // For now, let's just add a blank one
    setQuestions([
      ...questions,
      {
        id: `new-${Date.now()}`,
        questionText: 'New Question',
        type: 'Multiple Choice',
        options: ['', '', '', ''],
      },
    ]);
  };

  // In a real app, this would open a modal to edit the specific question
  const handleEditQuestion = (id: string) => {
    console.log('Editing question:', id);
  };

  if (!quiz) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl rounded-md border border-[#1C2B22]/10 bg-white p-8">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-[#1C2B22]">
              Edit quiz
            </Dialog.Title>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#58646C] hover:text-[#1C2B22]"
            >
              <X />
            </button>
          </div>

          <form onSubmit={handleSaveChanges}>
            <div className="mt-6 max-h-[70vh] space-y-5 overflow-y-auto pr-2">
              {/* Quiz Details Form */}
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-[#1C2B22]">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1C2B22]">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-[#1C2B22]">
                    Class/Grade
                  </label>
                  <input
                    type="text"
                    value={classGrade}
                    onChange={(e) => setClassGrade(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-[#1C2B22]">
                    Instructions/Description
                  </label>
                  <textarea
                    rows={3}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
                  ></textarea>
                </div>
              </div>

              <hr className="border-[#1C2B22]/10" />

              {/* Manage Questions Section */}
              <div>
                <h3 className="text-base font-semibold text-[#1C2B22]">
                  Manage questions
                </h3>
                <div className="mt-4 space-y-3">
                  {questions.map((q) => (
                    <div
                      key={q.id}
                      className="flex items-center justify-between rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-3"
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className="size-5 cursor-move text-[#9AA3AB]" />
                        <div>
                          <p className="text-sm font-medium text-[#1C2B22]">
                            {q.questionText}
                          </p>
                          <p className="text-xs text-[#58646C]">{q.type}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleEditQuestion(q.id)}
                        className="text-[#9AA3AB] hover:text-[#8a5f18]"
                      >
                        <Pencil className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={handleAddQuestion}
                  variant="dark"
                  className="mt-4 border border-[#1C2B22]/15 bg-white text-sm text-[#1C2B22] hover:bg-[#F7F2E9]"
                >
                  <Plus className="mr-2 size-4" /> Add new question
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-between border-t border-[#1C2B22]/10 pt-6">
              <Button
                type="button"
                variant="dark"
                onClick={handleDeleteQuiz}
                className="text-[#b23b2e] hover:bg-[#b23b2e]/10"
              >
                Delete quiz
              </Button>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="dark"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#F7F2E9] text-[#1C2B22] hover:bg-[#EFE8D7]"
                >
                  Cancel
                </Button>
                <Button type="submit">Save changes</Button>
              </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default EditQuizModal;
