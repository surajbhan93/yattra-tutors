export interface CityData {
  slug: string;
  name: string;
  shortName: string;
  state: string;
  tagline: string;
  activeTutors: number;
  studentsHelped: number;
  rating: number;
  reviewsCount: number;
  popularAreas: string[];
}

export interface ServiceData {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  iconName: string;
  gradeLevel: string;
  overview: string;
  benefits: string[];
  syllabusTopics: string[];
  faqs: { q: string; a: string }[];
}

export type CityKey =
  | 'lucknow'
  | 'allahabad'
  | 'kanpur'
  | 'varanasi'
  | 'noida'
  | 'delhi'
  | 'gurugram'
  | 'agra'
  | 'meerut'
  | 'jaipur';

export type ServiceKey =
  | 'home-tutor'
  | 'maths-tutor'
  | 'science-tutor'
  | 'physics-tutor'
  | 'chemistry-tutor'
  | 'biology-tutor'
  | 'english-tutor'
  | 'class-10-tutor'
  | 'class-12-tutor'
  | 'jee-neet-tutor';

export const CITIES_DATA: Record<CityKey, CityData> & Record<string, CityData | undefined> = {
  lucknow: {
    slug: 'lucknow',
    name: 'Lucknow',
    shortName: 'Lucknow',
    state: 'Uttar Pradesh',
    tagline: "Lucknow's #1 Trusted Home Tutor Bureau",
    activeTutors: 1250,
    studentsHelped: 5400,
    rating: 4.9,
    reviewsCount: 840,
    popularAreas: [
      'Gomti Nagar', 'Hazratganj', 'Indira Nagar', 'Aliganj', 'Alambagh',
      'Vikas Nagar', 'Mahanagar', 'Aashiana', 'Jankipuram', 'Vibhuti Khand'
    ],
  },
  allahabad: {
    slug: 'allahabad',
    name: 'Prayagraj (Allahabad)',
    shortName: 'Prayagraj',
    state: 'Uttar Pradesh',
    tagline: "Prayagraj's Premier Home Tuition Network",
    activeTutors: 1100,
    studentsHelped: 4800,
    rating: 4.9,
    reviewsCount: 790,
    popularAreas: [
      'Civil Lines', 'Katra', 'George Town', 'Tagore Town', 'Naini',
      'Jhusi', 'Dhoomanganj', 'Rajapur', 'Govindpur', 'Teliyarganj'
    ],
  },
  kanpur: {
    slug: 'kanpur',
    name: 'Kanpur',
    shortName: 'Kanpur',
    state: 'Uttar Pradesh',
    tagline: "Kanpur's Leading Verified Private Tutor Provider",
    activeTutors: 980,
    studentsHelped: 4100,
    rating: 4.8,
    reviewsCount: 650,
    popularAreas: [
      'Civil Lines', 'Kakadeo', 'Kalyanpur', 'Swaroop Nagar', 'Govind Nagar',
      'Kidwai Nagar', 'Arya Nagar', 'Shastri Nagar', 'Yashoda Nagar', 'Panki'
    ],
  },
  varanasi: {
    slug: 'varanasi',
    name: 'Varanasi (Banaras)',
    shortName: 'Varanasi',
    state: 'Uttar Pradesh',
    tagline: "Varanasi's Most Trusted Home Tutor Agency",
    activeTutors: 850,
    studentsHelped: 3700,
    rating: 4.9,
    reviewsCount: 580,
    popularAreas: [
      'Lanka', 'Sigra', 'Bhelupur', 'Mahmoorganj', 'Shivpur',
      'Orderly Bazar', 'Durgakund', 'Pandeypur', 'Sunderpur', 'Cantt'
    ],
  },
  noida: {
    slug: 'noida',
    name: 'Noida & Greater Noida',
    shortName: 'Noida',
    state: 'Uttar Pradesh',
    tagline: "Top Rated Home & Online Tutors in Noida",
    activeTutors: 1400,
    studentsHelped: 6200,
    rating: 4.9,
    reviewsCount: 920,
    popularAreas: [
      'Sector 62', 'Sector 18', 'Sector 137', 'Sector 50', 'Sector 76',
      'Greater Noida West', 'Sector 128', 'Sector 93', 'Sector 15', 'Knowledge Park'
    ],
  },
  delhi: {
    slug: 'delhi',
    name: 'Delhi NCR',
    shortName: 'Delhi',
    state: 'Delhi',
    tagline: "Capital's Largest Verified Home Tutor Network",
    activeTutors: 2500,
    studentsHelped: 12000,
    rating: 4.9,
    reviewsCount: 1650,
    popularAreas: [
      'South Delhi', 'Rohini', 'Dwarka', 'Janakpuri', 'Saket',
      'Greater Kailash', 'Laxmi Nagar', 'Karol Bagh', 'Model Town', 'Mayur Vihar'
    ],
  },
  gurugram: {
    slug: 'gurugram',
    name: 'Gurugram (Gurgaon)',
    shortName: 'Gurugram',
    state: 'Haryana',
    tagline: "Gurugram's Premium IB, Cambridge & CBSE Home Tutors",
    activeTutors: 1350,
    studentsHelped: 5800,
    rating: 4.9,
    reviewsCount: 890,
    popularAreas: [
      'DLF Phase 1-5', 'Sohna Road', 'Golf Course Road', 'Sushant Lok', 'Sector 14',
      'Sector 56', 'Palam Vihar', 'Nirvana Country', 'South City', 'MG Road'
    ],
  },
  agra: {
    slug: 'agra',
    name: 'Agra',
    shortName: 'Agra',
    state: 'Uttar Pradesh',
    tagline: "Agra's Most Trusted Home Tuition Network",
    activeTutors: 780,
    studentsHelped: 3200,
    rating: 4.8,
    reviewsCount: 490,
    popularAreas: [
      'Kamla Nagar', 'Civil Lines', 'Dayalbagh', 'Sadar Bazaar', 'Sanjay Place',
      'Shahganj', 'Khandari', 'Fatehabad Road', 'Bodla', 'Vijay Nagar'
    ],
  },
  meerut: {
    slug: 'meerut',
    name: 'Meerut',
    shortName: 'Meerut',
    state: 'Uttar Pradesh',
    tagline: "Meerut's Premier Academic Home Tutor Bureau",
    activeTutors: 720,
    studentsHelped: 2900,
    rating: 4.8,
    reviewsCount: 430,
    popularAreas: [
      'Shastri Nagar', 'Civil Lines', 'Jagriti Vihar', 'Begum Bridge', 'Modipuram',
      'Kanker Khera', 'Mangal Pandey Nagar', 'Saket', 'Pallavpuram', 'Ganga Nagar'
    ],
  },
  jaipur: {
    slug: 'jaipur',
    name: 'Jaipur',
    shortName: 'Jaipur',
    state: 'Rajasthan',
    tagline: "Pink City's Leading Home Tutor Bureau",
    activeTutors: 890,
    studentsHelped: 3900,
    rating: 4.9,
    reviewsCount: 610,
    popularAreas: [
      'Malviya Nagar', 'Vaishali Nagar', 'Mansarovar', 'C-Scheme', 'Raja Park',
      'Tonk Road', 'Jagatpura', 'Vidhyadhar Nagar', 'Bani Park', 'Ajmer Road'
    ],
  },
};

export const SERVICES_DATA: Record<ServiceKey, ServiceData> & Record<string, ServiceData | undefined> = {
  'home-tutor': {
    slug: 'home-tutor',
    title: 'Best Home Tutor',
    shortTitle: 'Home Tutor',
    category: 'General Tutoring',
    iconName: 'Home',
    gradeLevel: 'Class 1 to 12 (All Boards)',
    overview: 'Personalized 1-on-1 home tuition by verified and experienced teachers at your doorstep. We customize teaching methods to your child’s pace and learning style.',
    benefits: [
      '100% Background-verified & experienced male/female teachers',
      'Complete attention without distractions of group coaching',
      'Regular weekly mock tests, revision and doubt solving',
      'Free demo trial session before final tutor allotment'
    ],
    syllabusTopics: [
      'All school subjects: Maths, Science, English, Hindi, SST',
      'CBSE, ICSE, ISC, State Board & International Curriculum',
      'Concept strengthening, homework support & daily school exam prep',
      'Individualized doubt clearing sessions with real-time feedback'
    ],
    faqs: [
      {
        q: 'How does Yattra Tutors assign a home tutor?',
        a: 'We evaluate your child’s grade, board, subject requirements, and locality, then match you with a verified top-rated tutor within 24 hours.'
      },
      {
        q: 'Can I take a free demo class?',
        a: 'Yes, we provide a free 1-on-1 demo trial class with your matched tutor before confirming the monthly tuition.'
      },
      {
        q: 'What if we want to replace the tutor?',
        a: 'We offer an instant, free tutor replacement guarantee if you are not 100% satisfied with the tutor’s teaching style.'
      }
    ]
  },
  'maths-tutor': {
    slug: 'maths-tutor',
    title: 'Mathematics Home Tutor',
    shortTitle: 'Maths Tutor',
    category: 'Mathematics',
    iconName: 'Calculator',
    gradeLevel: 'Class 1 to 12 & Competitive Exams',
    overview: 'Master mathematics with step-by-step formula derivations, problem solving strategies, and arithmetic to calculus mastery by expert maths tutors.',
    benefits: [
      'Eliminate maths phobia through patient, step-by-step concept explanations',
      'Extensive NCERT, RD Sharma, RS Aggarwal & ML Aggarwal practice',
      'Short tricks, mental calculation & formula sheets for quick revision',
      'Regular topic-wise quizzes and chapter tests'
    ],
    syllabusTopics: [
      'Primary: Arithmetic, Fractions, Decimals, Word Problems',
      'Middle School: Algebra, Geometry, Mensuration, Rational Numbers',
      'Secondary: Trigonometry, Coordinate Geometry, Statistics, Quadratic Equations',
      'Higher Secondary: Calculus, Vectors, 3D Geometry, Matrices, Probability'
    ],
    faqs: [
      {
        q: 'How do tutors help students weak in Mathematics?',
        a: 'Our tutors begin by identifying foundational gaps from previous classes, rebuilding core concepts, and giving structured daily practice.'
      },
      {
        q: 'Do you cover reference books like RD Sharma & RS Aggarwal?',
        a: 'Yes, tutors solve all standard reference books along with NCERT and past 10-year board question papers.'
      }
    ]
  },
  'science-tutor': {
    slug: 'science-tutor',
    title: 'Science Home Tutor',
    shortTitle: 'Science Tutor',
    category: 'General Science',
    iconName: 'Atom',
    gradeLevel: 'Class 6 to 10 (Physics, Chem, Bio)',
    overview: 'Develop deep curiosity and analytical skills in science. Our tutors use real-world examples, diagrams, and practical applications to make concepts stick.',
    benefits: [
      'Integrated teaching for Physics, Chemistry, and Biology',
      'Diagram practice, chemical equations balancing, and numerical mastery',
      'In-depth coverage of NCERT science activities and experiments',
      'Board exam targeted question-answer formulation techniques'
    ],
    syllabusTopics: [
      'Physics: Light, Electricity, Magnetic Effects, Motion, Gravitation',
      'Chemistry: Chemical Reactions, Acids & Bases, Metals & Non-metals, Carbon',
      'Biology: Life Processes, Control & Coordination, Reproduction, Heredity',
      'Environmental Science & Natural Resources conservation'
    ],
    faqs: [
      {
        q: 'Do you provide separate tutors for Physics, Chemistry, and Biology?',
        a: 'For Class 9-10, we provide specialized science educators proficient in all three branches, or individual subject experts as per parent preference.'
      }
    ]
  },
  'physics-tutor': {
    slug: 'physics-tutor',
    title: 'Physics Home Tutor',
    shortTitle: 'Physics Tutor',
    category: 'Science & Engineering',
    iconName: 'Zap',
    gradeLevel: 'Class 11, 12, JEE & NEET',
    overview: 'Master complex derivations, numerical problems, and theoretical concepts with senior physics faculty and IITian mentors at your home.',
    benefits: [
      'Deep conceptual grounding in mechanics, electrodynamics, and modern physics',
      'Numerical problem solving drills with shortcut techniques',
      'Derivations and circuit diagram mastery for 95%+ in Board exams',
      'Targeted practice from HC Verma, DC Pandey & Irodov for JEE/NEET'
    ],
    syllabusTopics: [
      'Mechanics: Kinematics, Laws of Motion, Work Energy Power, Rotational Dynamics',
      'Thermodynamics, Waves & Oscillations',
      'Electrodynamics: Electrostatics, Current Electricity, Magnetism, EMI & AC',
      'Optics (Ray & Wave) and Modern Physics (Dual Nature, Atoms, Nuclei, Semiconductors)'
    ],
    faqs: [
      {
        q: 'Can the physics tutor prepare my child for both CBSE Boards and JEE/NEET?',
        a: 'Yes, our tutors synchronize the board syllabus derivations with competitive level multiple-choice numericals.'
      }
    ]
  },
  'chemistry-tutor': {
    slug: 'chemistry-tutor',
    title: 'Chemistry Home Tutor',
    shortTitle: 'Chemistry Tutor',
    category: 'Science & Medical',
    iconName: 'FlaskConical',
    gradeLevel: 'Class 11, 12, NEET & JEE',
    overview: 'Overcome chemistry challenges with clear reaction mechanisms, inorganic memory aids, and physical chemistry numerical formulas.',
    benefits: [
      'Step-by-step organic reaction mechanisms & named reactions',
      'Inorganic periodic table trends and coordination compounds shortcuts',
      'Physical chemistry calculations with formula sheets and unit conversions',
      'Complete NCERT line-by-line coverage for maximum score'
    ],
    syllabusTopics: [
      'Physical Chemistry: Mole Concept, Thermodynamics, Equilibrium, Electrochemistry, Kinetics',
      'Inorganic Chemistry: Chemical Bonding, p-block, d & f-block, Coordination Compounds',
      'Organic Chemistry: Hydrocarbons, Haloalkanes, Alcohols, Aldehydes, Amines, Biomolecules'
    ],
    faqs: [
      {
        q: 'How does the tutor help remember Organic and Inorganic reactions?',
        a: 'Tutors provide memory flowcharts, reaction roadmap sheets, and spaced repetition drills for permanent recall.'
      }
    ]
  },
  'biology-tutor': {
    slug: 'biology-tutor',
    title: 'Biology Home Tutor',
    shortTitle: 'Biology Tutor',
    category: 'Medical Science',
    iconName: 'Dna',
    gradeLevel: 'Class 9 to 12 & NEET Medical',
    overview: 'Score 350+ in NEET Biology and 95%+ in Board exams with experienced biology teachers who master NCERT lines, diagrams, and medical terminology.',
    benefits: [
      'NCERT line-by-line decoding and keyword retention techniques',
      'Neat, labeled diagram practice for Board exam full marks',
      'High-yield NEET botany and zoology question practice',
      'Doubt clearing for human physiology and genetics'
    ],
    syllabusTopics: [
      'Human Physiology & Plant Physiology',
      'Genetics, Molecular Basis of Inheritance & Evolution',
      'Cell Biology, Biomolecules & Cell Division',
      'Reproduction, Biotechnology & Ecology'
    ],
    faqs: [
      {
        q: 'Are the biology tutors experienced in NEET Medical syllabus?',
        a: 'Yes, our senior biology tutors have years of track record in guiding students into top medical colleges (AIIMS, GMC).'
      }
    ]
  },
  'english-tutor': {
    slug: 'english-tutor',
    title: 'English & Communication Tutor',
    shortTitle: 'English Tutor',
    category: 'Languages & Humanities',
    iconName: 'BookA',
    gradeLevel: 'Class 1 to 12 & Spoken English',
    overview: 'Improve spoken fluency, grammar accuracy, literature comprehension, and creative writing skills under certified English educators.',
    benefits: [
      'Command over English grammar rules, tenses, and sentence structure',
      'Literature analysis, poem appreciation, and question formulation',
      'Essay writing, letter drafting, report writing, and comprehension skills',
      'Confidence building in public speaking and interview presentation'
    ],
    syllabusTopics: [
      'Applied Grammar: Tenses, Prepositions, Active/Passive Voice, Direct/Indirect',
      'Reading Comprehension & Critical Analysis',
      'Writing Skills: Articles, Notices, Formal Letters, Essays, Speeches',
      'CBSE / ICSE / ISC prescribed literature books and drama analysis'
    ],
    faqs: [
      {
        q: 'Can the tutor help with ICSE English literature (Shakespeare etc.)?',
        a: 'Yes, our ICSE English specialists provide scene-by-scene drama analysis, theme breakdowns, and character sketches.'
      }
    ]
  },
  'class-10-tutor': {
    slug: 'class-10-tutor',
    title: 'Class 10 Board Exam Tutor',
    shortTitle: 'Class 10 Boards',
    category: 'Board Examination Special',
    iconName: 'GraduationCap',
    gradeLevel: 'Class 10 (CBSE, ICSE, State Boards)',
    overview: 'Strategic preparation for the crucial Class 10 Board examinations. We ensure timely syllabus completion, intensive revision, and answer-writing mastery.',
    benefits: [
      'Coverage of all subjects: Maths, Science, Social Studies, English, Hindi',
      'Solving previous 10 years board question papers with marking scheme insights',
      'Time management training for 3-hour examination halls',
      'Doubt clarification sessions and continuous parent progress reporting'
    ],
    syllabusTopics: [
      'Mathematics: High-weightage chapters, proofs, and application word problems',
      'Science: Concept clarity, formula derivations, chemical balancing, diagrams',
      'Social Studies: History timelines, Geography maps, Civics & Economics answers',
      'Languages: Grammar scoring sections, precise writing, and textbook questions'
    ],
    faqs: [
      {
        q: 'When should we start Class 10 Board preparation tutoring?',
        a: 'Starting from the beginning of the academic year ensures stress-free syllabus completion by November, leaving 3 months for full revision.'
      }
    ]
  },
  'class-12-tutor': {
    slug: 'class-12-tutor',
    title: 'Class 12 Senior Secondary Tutor',
    shortTitle: 'Class 12 Boards',
    category: 'Senior Secondary Special',
    iconName: 'Award',
    gradeLevel: 'Class 12 (Science, Commerce & Arts)',
    overview: 'Expert mentors for Class 12 Boards and College Entrance exams. We provide individual attention for complex theory, practical files, and board scoring techniques.',
    benefits: [
      'Specialized mentors for Science (PCM/PCB) and Commerce (Accounts/Eco/BST)',
      'Practical examination guidance, project file preparation, and viva training',
      'Pre-board mock exams evaluated strictly on official CBSE/ISC criteria',
      'Simultaneous alignment with CUET and college admission entrance syllabi'
    ],
    syllabusTopics: [
      'Science Stream: Physics, Chemistry, Maths, Biology, Computer Science',
      'Commerce Stream: Accountancy, Business Studies, Economics, Applied Maths',
      'Past 10 years sample papers, assertion-reasoning, and case-study questions'
    ],
    faqs: [
      {
        q: 'Do you have tutors for Commerce stream Class 12 as well?',
        a: 'Yes, we have specialized chartered accountants and M.Com educators for Class 12 Accountancy, Economics, and Business Studies.'
      }
    ]
  },
  'jee-neet-tutor': {
    slug: 'jee-neet-tutor',
    title: 'IIT-JEE & NEET Foundation Tutor',
    shortTitle: 'JEE / NEET Prep',
    category: 'Competitive Entrances',
    iconName: 'Rocket',
    gradeLevel: 'Class 9 to 12 & Droppers',
    overview: 'High-intensity 1-on-1 coaching for IIT-JEE (Main + Advanced) and NEET-UG with experienced mentors, Daily Practice Problems (DPPs), and doubt clearance.',
    benefits: [
      '1-on-1 mentorship by top engineers, doctors & national coaching veterans',
      'Daily practice problems (DPPs) with timed solving techniques',
      'Negative marking avoidance strategies and speed enhancement drills',
      'Personal analysis of mock tests to fix weak topics systematically'
    ],
    syllabusTopics: [
      'JEE Physics: Advanced Mechanics, Electromagnetism, Modern Physics',
      'JEE Maths: Coordinate Geometry, Advanced Calculus, Vectors 3D, Algebra',
      'JEE/NEET Chemistry: Complete Physical, Organic, and Inorganic syllabus',
      'NEET Biology: 360/360 roadmap with high-yield chapter drills'
    ],
    faqs: [
      {
        q: 'Is 1-on-1 home tutoring better than large coaching batches for JEE/NEET?',
        a: 'Yes! In crowded batches, individual doubts remain unanswered. A dedicated 1-on-1 tutor focuses 100% on student weaknesses, dramatically boosting ranks.'
      }
    ]
  }
};

export const ORDERED_CITIES: CityKey[] = [
  'lucknow', 'allahabad', 'kanpur', 'varanasi', 'noida',
  'delhi', 'gurugram', 'agra', 'meerut', 'jaipur'
];

export const ORDERED_SERVICES: ServiceKey[] = [
  'home-tutor', 'maths-tutor', 'science-tutor', 'physics-tutor', 'chemistry-tutor',
  'biology-tutor', 'english-tutor', 'class-10-tutor', 'class-12-tutor', 'jee-neet-tutor'
];
