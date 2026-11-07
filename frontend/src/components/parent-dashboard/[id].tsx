import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ParentDashboardLayout from '@/layouts/ParentDashboardLayout';
import { lora } from "@/lib/fonts";

export default function TutorDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ParentDashboardLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>Tutor profile</h1>
          <p className="text-sm text-[#58646C]">Tutor ID: {id}</p>
        </div>
        <Link href="/parent/tutors" className="text-sm font-medium text-[#8a5f18] hover:underline">
          Back to tutors
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6 md:col-span-2">
          <div className="flex items-start gap-4">
            <div className="relative size-24 overflow-hidden rounded-full">
              <Image src="/images/tutors/tutor-1.jpg" alt="Tutor avatar" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <div className={`${lora.className} text-xl font-semibold text-[#1C2B22]`}>Ananya Gupta</div>
              <div className="text-sm text-[#58646C]">Mathematics · 4.9★</div>
              <p className="mt-3 text-sm text-[#1C2B22]">
                Experienced Math tutor focusing on concepts, problem-solving, and exam readiness. Sessions are
                interactive with practice sheets and weekly assessments.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="mb-2 text-base font-semibold text-[#1C2B22]">About</h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-[#1C2B22]">
              <li>8+ years teaching grades 6–12</li>
              <li>Specializes in Algebra, Geometry, and Calculus</li>
              <li>Available for weekend doubt-clearing</li>
            </ul>
          </div>
        </div>

        <div className="rounded-md border border-[#1C2B22]/10 bg-white p-6">
          <h2 className="mb-2 text-base font-semibold text-[#1C2B22]">Request session</h2>
          <div className="text-sm text-[#58646C]">Select a date and time.</div>
          <div className="mt-3 rounded-md border border-[#1C2B22]/10 bg-[#F7F2E9] p-3 text-sm text-[#58646C]">
            Calendar placeholder
          </div>
          <Link
            href="/parent/booking-success"
            className="mt-4 inline-block rounded-md bg-[#D79A2C] px-4 py-2 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
          >
            Request demo
          </Link>
        </div>
      </div>
    </ParentDashboardLayout>
  );
}
