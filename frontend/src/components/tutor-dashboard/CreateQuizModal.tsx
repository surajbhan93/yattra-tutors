

import { Dialog } from '@headlessui/react';
import { Plus, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';

import apiClient from '../../lib/apiClient';
import Button from '../ui/Button';

interface CreateQuizModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

/* =========================
   TYPES
========================= */

type Question = {
  id: number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
};

const CreateQuizModal: React.FC<CreateQuizModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  /* =========================
     FORM STATE
  ========================= */

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);

  /* =========================
     QUESTION HANDLERS
  ========================= */

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        questionText: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
      },
    ]);
  };

  const removeQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestionText = (id: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, questionText: value } : q,
      ),
    );
  };

  const updateOption = (
    qId: number,
    optIndex: number,
    value: string,
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === optIndex ? value : opt,
              ),
            }
          : q,
      ),
    );
  };

  const updateCorrectAnswer = (qId: number, index: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === qId
          ? { ...q, correctAnswerIndex: index }
          : q,
      ),
    );
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async () => {
    if (!title || !subject || !classGrade || questions.length === 0) {
      alert('Please fill all required fields and add at least one question');
      return;
    }

    try {
      setLoading(true);

      await apiClient.post('/tutor/create-quiz', {
  title,
  subject,
  class_grade: classGrade,
  description,
  questions: questions.map((q) => ({
    question: q.questionText,
    options: q.options,
    correct_answer: q.options[q.correctAnswerIndex],
  })),
});


      // reset
      setTitle('');
      setSubject('');
      setClassGrade('');
      setDescription('');
      setQuestions([]);
      setIsOpen(false);
    } catch (err) {
      console.error('Create quiz failed:', err);
      alert('Failed to create quiz');
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================= */

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl rounded-md border border-[#1C2B22]/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-[#1C2B22]">
              Create new quiz
            </Dialog.Title>
            <button onClick={() => setIsOpen(false)}>
              <X className="text-[#58646C] hover:text-[#1C2B22]" />
            </button>
          </div>

          <div className="mt-6 max-h-[70vh] space-y-4 overflow-y-auto pr-2">
            {/* Quiz Info */}
            <div>
              <label className="text-sm font-medium text-[#1C2B22]">
                Quiz Title *
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
                Subject *
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#1C2B22]">
                Class / Grade *
              </label>
              <input
                type="text"
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#1C2B22]">
                Description / Instructions
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />
            </div>

            <hr className="border-[#1C2B22]/10" />

            {/* Questions */}
            <h3 className="font-semibold text-[#1C2B22]">Questions</h3>

            {questions.map((q, qIndex) => (
              <div
                key={q.id}
                className="rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-[#1C2B22]">
                    Question {qIndex + 1}
                  </p>
                  <button onClick={() => removeQuestion(q.id)}>
                    <Trash2 className="size-4 text-[#9AA3AB] hover:text-[#b23b2e]" />
                  </button>
                </div>

                <textarea
                  placeholder="Enter question"
                  value={q.questionText}
                  onChange={(e) =>
                    updateQuestionText(q.id, e.target.value)
                  }
                  rows={2}
                  className="mt-2 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
                />

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="flex items-center gap-2">
                      <input
                        type="radio"
                        checked={q.correctAnswerIndex === oIndex}
                        onChange={() =>
                          updateCorrectAnswer(q.id, oIndex)
                        }
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          updateOption(
                            q.id,
                            oIndex,
                            e.target.value,
                          )
                        }
                        placeholder={`Option ${oIndex + 1}`}
                        className="w-full rounded-md border border-[#1C2B22]/15 px-2 py-1.5 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <Button
              type="button"
              onClick={addQuestion}
              variant="dark"
              className="border border-[#1C2B22]/15 bg-white text-[#1C2B22] hover:bg-[#F7F2E9]"
            >
              <Plus className="mr-2 size-4" /> Add question
            </Button>
          </div>

          <div className="mt-6 flex justify-end gap-2 border-t border-[#1C2B22]/10 pt-4">
            <Button
              type="button"
              variant="dark"
              onClick={() => setIsOpen(false)}
              className="bg-[#F7F2E9] text-[#1C2B22] hover:bg-[#EFE8D7]"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Creating...' : 'Create quiz'}
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateQuizModal;
