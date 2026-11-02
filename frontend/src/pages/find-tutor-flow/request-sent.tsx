import Head from 'next/head';

import RequestSent from '@/pages/find-tutor-flow/RequestSent';

export default function RequestSentPage() {
  return (
    <>
      <Head>
        <title>Request sent – Yattra Tutors</title>
      </Head>
      <main className="mx-auto max-w-6xl bg-[#F7F2E9] p-6">
        <RequestSent />
      </main>
    </>
  );
}
