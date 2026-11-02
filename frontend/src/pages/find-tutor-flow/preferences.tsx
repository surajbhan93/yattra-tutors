import Head from 'next/head';

import TutorPreferences from '@/pages/find-tutor-flow/tutor-preferences';
import NavBar from '@/components/navbar/NavBar';
import Footer from '@/components/landing/Footer';
export default function PreferencesPage() {
  return (
    <>
    <NavBar />
      <Head>
        <title>Preferences – Yattra Tutors</title>
      </Head>
      <main className="mx-auto max-w-6xl bg-[#F7F2E9] p-6">
        <TutorPreferences />
      </main>
      <Footer />
    </>
  );
}
