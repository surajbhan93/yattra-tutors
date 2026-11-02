
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import React, { useState } from 'react';

import apiClient from '../../lib/apiClient';
import Button from '../ui/Button';

interface CreateAssignmentModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CreateAssignmentModal: React.FC<CreateAssignmentModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  /* =========================
     FORM STATE
  ========================= */

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [classGrade, setClassGrade] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  /* =========================
     SUBMIT HANDLER
  ========================= */

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!title || !subject || !classGrade || !dueDate) {
    alert('Please fill all required fields');
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('class_grade', classGrade);
    formData.append('instructions', instructions);

    const formattedDueDate = new Date(dueDate)
      .toISOString()
      .slice(0, 10);

    formData.append('due_date', formattedDueDate);
    formData.append('allow_submission_online', 'true');

    if (file) {
      formData.append('file', file);
    }

    await apiClient.post('/tutor/create-assignment', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setIsOpen(false);
  } catch (err) {
    console.error('Create assignment failed:', err);
    alert('Failed to create assignment');
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
        <Dialog.Panel className="w-full max-w-lg rounded-md border border-[#1C2B22]/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold text-[#1C2B22]">
              Create new assignment
            </Dialog.Title>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#58646C] hover:text-[#1C2B22]"
            >
              <X />
            </button>
          </div>

          <Dialog.Description className="mt-1 text-sm text-[#58646C]">
            Fill out the details below and attach any necessary files.
          </Dialog.Description>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-[#1C2B22]">
                Assignment title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />
            </div>

            {/* Subject */}
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

            {/* Class / Grade */}
            <div>
              <label className="text-sm font-medium text-[#1C2B22]">
                Class / grade *
              </label>
              <input
                type="text"
                value={classGrade}
                onChange={(e) => setClassGrade(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />
            </div>

            {/* Instructions */}
            <div>
              <label className="text-sm font-medium text-[#1C2B22]">
                Instructions
              </label>
              <textarea
                rows={4}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />
            </div>

            {/* File */}
            <div>
              <label className="text-sm font-medium text-[#1C2B22]">
                Attach file (PDF, DOCX)
              </label>
              <input
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setFile(e.target.files?.[0] || null)
  }
                className="mt-1 w-full text-sm text-[#58646C]
                  file:mr-4 file:rounded-full file:border-0
                  file:bg-[#D79A2C]/15 file:px-4 file:py-2
                  file:text-sm file:font-semibold file:text-[#8a5f18]
                  hover:file:bg-[#D79A2C]/25"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="text-sm font-medium text-[#1C2B22]">
                Due date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1 w-full rounded-md border border-[#1C2B22]/15 px-3 py-2 text-sm text-[#1C2B22] outline-none focus:border-[#D79A2C]"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="dark"
                onClick={() => setIsOpen(false)}
                className="bg-[#F7F2E9] text-[#1C2B22] hover:bg-[#EFE8D7]"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create assignment'}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateAssignmentModal;
