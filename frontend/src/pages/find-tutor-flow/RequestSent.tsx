import { useRouter } from 'next/router';
import React from 'react';
import { lora } from "@/lib/fonts";

import Button from '../../components/find-tutor-flow/Button';

const RequestSent: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex h-[80vh] flex-col items-center justify-center bg-[#F7F2E9] px-6 text-center">
      <h2 className={`${lora.className} mb-4 text-2xl font-semibold text-[#1C2B22]`}>Request sent successfully</h2>
      <p className="mb-10 max-w-md text-sm leading-relaxed text-[#58646C]">
        Thank you for your request. A member of our admissions team will look over your information and contact you
        shortly with a demo or to set a date.
      </p>
      <Button onClick={() => router.push('/')} variant="primary">
        Back to dashboard
      </Button>
    </div>
  );
};

export default RequestSent;
