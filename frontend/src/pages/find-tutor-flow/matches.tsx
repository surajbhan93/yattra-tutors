import Head from 'next/head';

import TutorMatches from '@/pages/find-tutor-flow/tutor-matches';
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';
export default function MatchesPage() {
  return (
    <>
    <NavBar />
      <Head>
        <title>Your matches – Yattra Tutors</title>
      </Head>
      <main className="mx-auto max-w-6xl bg-[#F7F2E9] p-6">
        <TutorMatches />
      </main>
      <Footer />
    </>
  );
}
