import Link from 'next/link'; // Ensure Link is imported
import { useRouter } from 'next/router';
import React from 'react';
import { Lora, DM_Sans } from 'next/font/google';

import Footer from '../../components/landing/Footer'; // Adjust path if needed
import NavBar from '../../components/navbar/NavBar'; // Adjust path if needed

const lora = Lora({ subsets: ['latin'], weight: ['500', '600'] });
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600'] });

// --- Data for Sub-Areas (Keep this updated or fetch from backend) ---
const subAreasByCity: Record<string, string[]> = {
  varanasi: [
    'Lanka',
    'Sigra',
    'Shivpur',
    'Sunderpur',
    'DLW',
    'Mahmorganj',
    'Laharata',
  ],
  prayagraj: [
    'Civil Lines',
    'Ashok Nagar',
    'Darbhanga',
    'Georgetown',
    'Tagore Town',
    'Rambagh',
    'Chauk',
    'Baluaghat',
    'Meerapur',
    'Sohbatiyabagh',
    'Allapur',
    'Bairhna',
    'Alopibagh',
    'Jhusi',
    'Shantipuram',
    'Lukergunj',
    'Sulem sarai',
    'Bamraul',
    'Jhalwa',
    'Transport nagar',
    'Beniganj',
    'Chauftka',
    'Chakiya',
    'Karelabagh',
    'Kalindipuran',
    'Kareli',
    'Agnipath Colony',
    'PWD colony',
    'Professor colony',
    'Mahatma Gandhi Marg',
    'Sardar Patel Marg',
    'Patrika Marg',
  ],
  lucknow: [
    'Gomti Nagar',
    'Hazratganj',
    'Indira Nagar',
    'Aliganj',
    'Mahanagar',
    'Amar Shaheed Path',
    'Vibhuti Khand',
    'Jankipuram',
    'Rajajipuram',
    'Sushant Golf City',
    'Faizabad Road',
    'Shaheed Path',
    'Jopling Road',
    'Civil Lines',
    'New Hyderabad',
    'Aashiana',
    'Alambagh',
    'Charbagh',
    'Chinhat',
    'Daliganj',
    'Kursi Road',
    'Nirala Nagar',
    'Vrindavan Yojana',
    'LDA Colony',
    'Jal Vayu Vihar',
    'Vikas Nagar',
    'Sahara States',
  ],
};

// --- Helper Functions ---
// Updated parseSlug to handle potential undefined or string array
const parseSlug = (
  slug: string | string[] | undefined,
): { service: string; city: string } | null => {
  if (typeof slug !== 'string') {
    // Ensure slug is a single string
    return null;
  }
  const parts = slug.split('-in-');
  const part0 = parts[0];
  const part1 = parts[1];
  if (parts.length !== 2 || !part0 || !part1) {
    return null;
  }
  const service = part0.replace(/-/g, ' ');
  const city = part1;

  return { service, city };
};

const generateTitle = (service: string, city: string): string => {
  const capitalize = (str: string) =>
    str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  return `${capitalize(service)} in ${capitalize(city)}`;
};

// Basic content template - consider fetching unique content later
const generateContent = (service: string, city: string): string => {
  const capitalizedService = service
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);
  return `
    Studies have become challenging for students without proper assistance. If you are seeking ${capitalizedService} in ${capitalizedCity} to make studies easy and enjoyable, then Yattra Tutors home tutors is your destination. We take responsibility to fulfill your needs by providing professional home tutors who make learning easy through personalized guidance.
    <br/><br/>
    We understand you might be hesitant to trust an online tutor. We have built a platform allowing you to connect with home tutors, chat, meet, and even schedule demo classes. These features help build trust between you and your ${capitalizedService} in ${capitalizedCity}.
    <br/><br/>
    We have many skilled home tutors proficient in their subjects. All registered tutors are verified and have mastery in their field. Whatever your requirement, feel free to connect with us to hire one of the best home tutors without sacrificing comfort and convenience. Stop thinking and take a step towards success by registering with us.
  `;
};

// --- The Dynamic Page Component ---
const ServicePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Parse the slug safely
  const parsed = parseSlug(slug);

  // Handle loading state or invalid slug
  if (!parsed) {
    return (
      <>
        <NavBar />
        <div className={`mx-auto max-w-2xl p-6 py-24 text-center ${dmSans.className}`}>
          <h1 className={`${lora.className} text-2xl font-semibold text-[#1C2B22]`}>Loading...</h1>
          <p className="mt-3 text-sm text-[#58646C]">
            If this persists, the requested service may not exist.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-md bg-[#D79A2C] px-6 py-3 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
          >
            Go back home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  // If parsed is valid, proceed with rendering
  const { service, city } = parsed;
  const title = generateTitle(service, city);
  const content = generateContent(service, city);
  const subAreas = subAreasByCity[city.toLowerCase()] || [];
  const capitalizedCity = city.charAt(0).toUpperCase() + city.slice(1);

  return (
    <>
      <NavBar />
      <main className={`mx-auto max-w-3xl p-6 py-16 sm:py-20 ${dmSans.className}`}>
        <h1 className={`${lora.className} mb-6 text-3xl sm:text-4xl font-semibold text-[#1C2B22]`}>{title}</h1>
        {/* Use dangerouslySetInnerHTML for the basic HTML content */}
        <div
          className="max-w-none text-sm sm:text-base text-[#58646C] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Display sub-areas if they exist for the city */}
        {subAreas.length > 0 && (
          <div className="mt-12 pt-10 border-t border-[#1C2B22]/10">
            <h2 className={`${lora.className} mb-5 text-xl font-semibold text-[#1C2B22]`}>
              Find tutors in specific areas of {capitalizedCity}:
            </h2>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2.5 text-sm md:grid-cols-3">
              {subAreas.map((area) => (
                <li key={area}>
                  {/* Link these to a search page pre-filtered by area */}
                  <Link
                    href={`/search?city=${city}&area=${area}`}
                    className="text-[#8a5f18] hover:underline"
                  >
                    Best home tutors at {area}, {capitalizedCity}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default ServicePage;
