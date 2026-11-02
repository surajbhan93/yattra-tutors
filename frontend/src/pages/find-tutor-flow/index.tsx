import Head from 'next/head';

import CreateAccount from '@/pages/find-tutor-flow/create-account';

export default function FindTutorIndexPage() {
  return (
    <>
      <Head>
        <title>Create account – Yattra Tutors</title>
      </Head>
      <main className="mx-auto max-w-6xl bg-[#F7F2E9] p-6">
        <CreateAccount />
      </main>
    </>
  );
}
