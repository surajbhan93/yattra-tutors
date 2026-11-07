'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CircleUserRound,
  Menu,
  X,
  ChevronDown,
  MapPin,
  Globe,
  GraduationCap,
  Users,
  Search,
  Sparkles,
  BookOpen,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  Calendar,
  LogOut,
  LayoutDashboard,
  Layers,
  ChevronRight,
  Atom,
  Calculator,
  Compass,
  Award,
  LogIn
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { useAuthStore } from '@/stores/useAuthStore';
import {
  CITIES_DATA,
  SERVICES_DATA,
  ORDERED_CITIES,
  ORDERED_SERVICES,
  CityData,
  ServiceData
} from '@/lib/cityServicesData';

const navLinks = [
  {
    href: '/subjects',
    label: 'Subjects',
  },
  {
    href: '/how-it-works',
    label: 'How it Works',
  },
  {
    href: '/pricing',
    label: 'Pricing',
  },
];

const onlineGlobal = [
  {
    region: '🌐 Online India (Pan-India)',
    desc: 'Live 1-on-1 Interactive Classes',
    links: [
      { label: 'Online Tuition India', href: '/find-tutor-flow' },
      { label: 'Maths Online Tutor', href: '/delhi/maths-tutor' },
      { label: 'Science Online Specialist', href: '/lucknow/science-tutor' },
      { label: 'IIT-JEE & NEET Live', href: '/kanpur/jee-neet-tutor' },
      { label: 'CBSE & ICSE Special', href: '/noida/class-10-tutor' },
    ],
  },
  {
    region: '🇬🇧 United Kingdom',
    desc: 'GCSE & A-Levels Expert Tutors',
    links: [
      { label: 'UK Online Tutoring', href: '/find-tutor-flow' },
      { label: 'GCSE Maths Tutor', href: '/delhi/maths-tutor' },
      { label: 'A-Level Physics & Chemistry', href: '/gurugram/physics-tutor' },
      { label: 'Biology & Medical Prep', href: '/allahabad/biology-tutor' },
    ],
  },
  {
    region: '🇦🇪 UAE & Gulf',
    desc: 'CBSE / ICSE / IB Indian Curriculum',
    links: [
      { label: 'UAE & Dubai Tutoring', href: '/find-tutor-flow' },
      { label: 'Dubai CBSE Class 10 & 12', href: '/noida/class-12-tutor' },
      { label: 'Abu Dhabi Home & Online Tutors', href: '/find-tutor-flow' },
      { label: 'IIT-JEE & NEET Gulf Prep', href: '/lucknow/jee-neet-tutor' },
    ],
  },
  {
    region: '🇨🇦 Canada & 🇺🇸 USA',
    desc: 'Grade 1-12 STEM & Calculus',
    links: [
      { label: 'North America Tutoring', href: '/find-tutor-flow' },
      { label: 'Maths Grade 1-12 & AP Calculus', href: '/delhi/maths-tutor' },
      { label: 'Physics & STEM Coaching', href: '/gurugram/physics-tutor' },
      { label: '1-on-1 Customized Learning', href: '/pricing' },
    ],
  },
  {
    region: '🇸🇬 Singapore & 🇦🇺 Australia',
    desc: 'Olympiad & Primary-Secondary Prep',
    links: [
      { label: 'Singapore & Sydney Online', href: '/find-tutor-flow' },
      { label: 'Maths Olympiad Specialist', href: '/jaipur/maths-tutor' },
      { label: 'Chemistry & Science Prep', href: '/kanpur/chemistry-tutor' },
      { label: 'English & Grammar', href: '/varanasi/english-tutor' },
    ],
  },
];

// ─── Mega Dropdown Component for "Our Services" ──────────────────────────────
const ServicesMegaDropdown = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'cities' | 'online'>('cities');
  const [selectedCitySlug, setSelectedCitySlug] = useState<string>('lucknow');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentCity = CITIES_DATA[selectedCitySlug] || CITIES_DATA['lucknow'];

  return (
    <div ref={ref} className="relative">
      <button
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 relative text-sm font-bold text-slate-700 hover:text-emerald-600 transition-all duration-200 group px-3 py-1.5 rounded-full hover:bg-emerald-50/70"
      >
        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-sm">
          <Layers size={13} />
        </span>
        <span className="tracking-tight">Our Services</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${
            open ? 'rotate-180 text-emerald-600' : 'text-slate-400 group-hover:text-emerald-600'
          }`}
        />
        <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 w-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full transition-all group-hover:w-[calc(100%-24px)]" />
      </button>

      {open && (
        <div
          onMouseLeave={() => setOpen(false)}
          className="absolute left-1/2 -translate-x-1/2 top-[calc(100%+12px)] w-[920px] xl:w-[980px] rounded-3xl border border-emerald-100/80 bg-white/95 backdrop-blur-2xl shadow-2xl shadow-emerald-500/10 z-50 overflow-hidden"
          style={{ animation: 'megaFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          {/* Arrow pointer */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-l border-t border-emerald-100" />

          {/* Top Header / Mode Switcher */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-slate-50 via-emerald-50/40 to-teal-50/40 px-6 py-3.5">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-sm shadow-emerald-500/30">
                <Sparkles size={12} />
                Verified Home Tuition
              </span>
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                Select your city to browse 10 verified tutoring services
              </span>
            </div>

            <div className="flex rounded-full bg-slate-200/80 p-0.5">
              <button
                onClick={() => setActiveTab('cities')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'cities'
                    ? 'bg-white text-emerald-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin size={12} />
                10 City Hubs
              </button>
              <button
                onClick={() => setActiveTab('online')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === 'online'
                    ? 'bg-white text-teal-700 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe size={12} />
                Online &amp; Global
              </button>
            </div>
          </div>

          {/* Body Content */}
          {activeTab === 'cities' ? (
            <div className="grid grid-cols-12 min-h-[440px]">
              {/* Left Column: 10 Cities List */}
              <div className="col-span-4 bg-slate-50/60 border-r border-slate-100 p-3.5 space-y-1 overflow-y-auto max-h-[480px]">
                <div className="px-3 py-1.5 mb-1">
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Choose Your City
                  </span>
                </div>
                {ORDERED_CITIES.map((slug) => {
                  const city = CITIES_DATA[slug];
                  if (!city) return null;
                  const isActive = selectedCitySlug === slug;
                  return (
                    <button
                      key={slug}
                      onMouseEnter={() => setSelectedCitySlug(slug)}
                      onClick={() => setSelectedCitySlug(slug)}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all ${
                        isActive
                          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 scale-[1.02]'
                          : 'text-slate-700 hover:bg-emerald-50/80 hover:text-emerald-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-white text-emerald-700 border border-emerald-100'
                          }`}
                        >
                          {city.name.charAt(0)}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-bold truncate leading-tight">
                            {city.name}
                          </p>
                          <p
                            className={`text-[11px] truncate leading-tight ${
                              isActive ? 'text-emerald-100' : 'text-slate-400'
                            }`}
                          >
                            {city.activeTutors}+ tutors · {city.state}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={14}
                        className={`shrink-0 transition-transform ${
                          isActive ? 'text-white translate-x-0.5' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right Column: 10 SEO Services for Selected City */}
              <div className="col-span-8 p-5 flex flex-col justify-between overflow-y-auto max-h-[480px]">
                <div>
                  {/* City Header Strip */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-black text-slate-900">
                          {currentCity.name} Tutoring Services
                        </h4>
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200/80 text-[11px] font-bold">
                          ★ {currentCity.rating} ({currentCity.reviewsCount} reviews)
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {currentCity.tagline}
                      </p>
                    </div>

                    <Link
                      href={`/${currentCity.slug}`}
                      onClick={() => setOpen(false)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 group/hub"
                    >
                      <span>City Overview Hub</span>
                      <ArrowRight size={13} className="group-hover/hub:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  {/* 10 Services Grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {ORDERED_SERVICES.map((servSlug) => {
                      const serv = SERVICES_DATA[servSlug];
                      if (!serv) return null;
                      const serviceUrl = `/${currentCity.slug}/${serv.slug}`;
                      return (
                        <Link
                          key={servSlug}
                          href={serviceUrl}
                          onClick={() => setOpen(false)}
                          className="group/serv flex items-start gap-2.5 p-2.5 rounded-2xl border border-slate-100 hover:border-emerald-200 bg-slate-50/40 hover:bg-emerald-50/40 transition-all hover:-translate-y-0.5 hover:shadow-sm"
                        >
                          <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/60 group-hover/serv:border-emerald-300 group-hover/serv:bg-emerald-600 text-slate-700 group-hover/serv:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                            <BookOpen size={14} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 group-hover/serv:text-emerald-800 truncate">
                              {serv.shortTitle}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {serv.gradeLevel}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Popular Localities Bar */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-1.5">
                    <MapPin size={11} className="text-emerald-600" />
                    <span>Popular {currentCity.shortName} Areas:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCity.popularAreas.slice(0, 6).map((area) => (
                      <span
                        key={area}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-medium"
                      >
                        {area}
                      </span>
                    ))}
                    <Link
                      href={`/${currentCity.slug}`}
                      onClick={() => setOpen(false)}
                      className="px-2 py-0.5 rounded-lg text-emerald-700 hover:bg-emerald-50 text-[11px] font-bold"
                    >
                      +more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Online & Global Tab */
            <div className="p-6">
              <div className="grid grid-cols-3 gap-4">
                {onlineGlobal.map((section) => (
                  <div
                    key={section.region}
                    className="rounded-2xl bg-gradient-to-br from-emerald-50/60 to-teal-50/40 p-4 border border-emerald-100/70 hover:border-emerald-300 transition-all shadow-xs"
                  >
                    <p className="text-sm font-black text-slate-900 mb-0.5">{section.region}</p>
                    <p className="text-[11px] text-emerald-700 font-medium mb-3">{section.desc}</p>
                    <ul className="space-y-1.5">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-700 font-medium hover:translate-x-1 transition-all py-0.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Banner Strip */}
          <div className="border-t border-slate-100 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-3 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-white text-xs">
                ✓
              </span>
              <span className="text-xs font-semibold">
                100% Background Verified Tutors · 1-on-1 Personalized Attention · Free Demo Class
              </span>
            </div>

            <Link
              href="/find-tutor-flow"
              onClick={() => setOpen(false)}
              className="px-4 py-1.5 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Book Free Demo</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main NavBar Component ───────────────────────────────────────────────────
export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileActiveCity, setMobileActiveCity] = useState<string>('lucknow');
  const [mobileTab, setMobileTab] = useState<'cities' | 'online'>('cities');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [localUser, setLocalUser] = useState<any>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { user: storeUser, isLoggedIn: storeLoggedIn, logout: storeLogout, hasHydrated } = useAuthStore();

  // Read authentication from both useAuthStore and localStorage safely
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        setLocalUser(JSON.parse(stored));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Use storeUser if available, else fallback to localStorage parsed user
  const currentUser = storeUser || localUser;
  const isAuthenticated = Boolean(currentUser && (storeLoggedIn || localStorage.getItem('token') || localStorage.getItem('user')));

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const getDashboardUrl = () => {
    if (!currentUser) return '/';
    const role = currentUser.role?.toLowerCase();
    if (role === 'admin') return '/admin/dashboard';
    if (role === 'tutor') return '/tutor/dashboard';
    if (role === 'parent') return '/parent/dashboard';
    return '/parent/dashboard';
  };

  const handleLogout = () => {
    try {
      storeLogout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
      setLocalUser(null);
    } catch (err) {
      console.error(err);
    }
    window.location.href = '/';
  };

  return (
    <>
      <style jsx global>{`
        @keyframes megaFadeIn {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        @keyframes slideDown {
          from {
            transform: translateY(-12px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slideDown 0.22s ease-out forwards;
        }

        .nav-glass {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
        }
      `}</style>

      <header className="nav-glass sticky top-0 z-50 w-full border-b border-slate-100 transition-all duration-200">
        <div className="w-full flex items-center justify-between px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-2.5">
          
          {/* ── Brand Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-slate-950 via-emerald-950 to-teal-950 border border-emerald-500/40 flex items-center justify-center shadow-lg shadow-emerald-500/10 group-hover:scale-105 group-hover:border-emerald-400 transition-all">
              <span className="font-black text-white text-base sm:text-lg tracking-tighter">
                Y<span className="text-emerald-400">T</span>
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-wider bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent group-hover:from-emerald-600 group-hover:to-teal-500 transition-all">
                YATTRA TUTORS
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase leading-none">
                India's Home Tutor Bureau
              </span>
            </div>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden md:flex items-center justify-center gap-1.5 lg:gap-3 xl:gap-5 text-slate-700">
            {/* Our Services Mega Dropdown */}
            <ServicesMegaDropdown />

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors px-3 py-1.5 rounded-full hover:bg-emerald-50/60 group"
              >
                {link.label}
                <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 w-0 bg-emerald-600 rounded-full transition-all group-hover:w-[calc(100%-24px)]" />
              </Link>
            ))}
          </nav>

          {/* ── Desktop CTA Buttons ── */}
          <div className="hidden md:flex items-center gap-2 lg:gap-2.5 flex-shrink-0">
            {/* WhatsApp Click-to-Chat */}
            <a
              href="https://wa.me/916363453870"
              target="_blank"
              rel="noopener noreferrer"
              title="Chat with us on WhatsApp"
              aria-label="Chat with us on WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/25 hover:bg-[#25D366] hover:text-white transition-all"
            >
              <FaWhatsapp size={18} />
            </a>

            {/* Find Tutor CTA */}
            <Link href="/tutors">
              <button
                type="button"
                className="h-10 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 px-4 sm:px-5 text-sm font-black text-white shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5"
              >
                <Search size={14} />
                <span>Find a Tutor</span>
              </button>
            </Link>

            {/* Find Students CTA */}
            <Link href="/find-students">
              <button
                type="button"
                className="h-10 rounded-full bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/90 px-3.5 sm:px-4 text-sm font-bold text-emerald-700 hover:shadow-xs transition-all flex items-center gap-1.5"
              >
                <Users size={15} className="text-emerald-600" />
                <span>Find Students</span>
              </button>
            </Link>

            {/* Account Icon / Login Button depending on Auth state */}
            {mounted && isAuthenticated ? (
              <div ref={userMenuRef} className="relative ml-0.5">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200/80 hover:bg-emerald-100 hover:border-emerald-400 hover:shadow-sm transition-all group"
                  title="My Account"
                >
                  <CircleUserRound size={22} className="group-hover:scale-105 transition-transform" />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-60 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {currentUser?.name || 'User'}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                      <span className="inline-block mt-1.5 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                        {currentUser?.role || 'Member'}
                      </span>
                    </div>

                    <Link href={getDashboardUrl()}>
                      <button
                        type="button"
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full px-4 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2"
                      >
                        <LayoutDashboard size={15} className="text-slate-500" />
                        <span>Dashboard</span>
                      </button>
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm font-bold text-red-600 hover:bg-red-50 transition-colors border-t border-slate-100 mt-1 flex items-center gap-2"
                    >
                      <LogOut size={15} />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" title="Login to your Account" className="ml-0.5">
                <button
                  type="button"
                  className="h-10 rounded-full bg-slate-900 hover:bg-emerald-600 text-white border border-slate-800 hover:border-emerald-500 px-4 text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
                >
                  <LogIn size={15} />
                  <span>Login</span>
                </button>
              </Link>
            )}
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <button
            type="button"
            className="md:hidden p-2 rounded-2xl hover:bg-slate-100 text-slate-700 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/98 border-t border-slate-100 shadow-2xl animate-slide-down max-h-[85vh] overflow-y-auto">
            <nav className="flex flex-col px-5 pt-3 pb-2">
              {/* "Our Services" Mobile Accordion */}
              <button
                type="button"
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="flex items-center justify-between py-3.5 text-sm font-black text-slate-800 border-b border-slate-100 transition-colors w-full"
              >
                <span className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Layers size={13} />
                  </span>
                  <span>Our Services</span>
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    mobileServicesOpen ? 'rotate-180 text-emerald-600' : 'text-slate-400'
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="py-3 animate-slide-down border-b border-slate-100">
                  {/* Tab switch */}
                  <div className="flex rounded-xl bg-slate-100 p-1 mb-3">
                    <button
                      type="button"
                      onClick={() => setMobileTab('cities')}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                        mobileTab === 'cities'
                          ? 'bg-white shadow-xs text-emerald-700'
                          : 'text-slate-500'
                      }`}
                    >
                      📍 10 Cities
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileTab('online')}
                      className={`flex-1 rounded-lg py-1.5 text-xs font-bold transition-all ${
                        mobileTab === 'online'
                          ? 'bg-white shadow-xs text-teal-700'
                          : 'text-slate-500'
                      }`}
                    >
                      🌐 Online / Global
                    </button>
                  </div>

                  {mobileTab === 'cities' ? (
                    <div>
                      {/* Horizontal City selector pill */}
                      <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
                        {ORDERED_CITIES.map((slug) => {
                          const c = CITIES_DATA[slug];
                          if (!c) return null;
                          const active = mobileActiveCity === slug;
                          return (
                            <button
                              key={slug}
                              type="button"
                              onClick={() => setMobileActiveCity(slug)}
                              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                                active
                                  ? 'bg-emerald-600 text-white shadow-sm'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {c.name}
                            </button>
                          );
                        })}
                      </div>

                      {/* 10 Services for selected city */}
                      <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                        {ORDERED_SERVICES.map((sSlug) => {
                          const s = SERVICES_DATA[sSlug];
                          const c = CITIES_DATA[mobileActiveCity] || CITIES_DATA['lucknow'];
                          if (!s || !c) return null;
                          return (
                            <Link
                              key={sSlug}
                              href={`/${c.slug}/${s.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-colors"
                            >
                              <span className="truncate">{s.title} in {c.shortName}</span>
                              <ChevronRight size={13} className="text-slate-400 shrink-0" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Mobile Online section */
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {onlineGlobal.map((sec) => (
                        <div key={sec.region} className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100/60">
                          <p className="text-xs font-bold text-emerald-900 mb-1">{sec.region}</p>
                          <div className="flex flex-wrap gap-1">
                            {sec.links.map((l) => (
                              <Link
                                key={l.label}
                                href={l.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="px-2 py-0.5 rounded-md bg-white text-[11px] font-semibold text-slate-600 border border-emerald-100"
                              >
                                {l.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-sm font-bold text-slate-700 hover:text-emerald-600 border-b border-slate-50 last:border-0 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-2.5 px-5 py-4 border-t border-slate-100 bg-slate-50/50">
              <a
                href="https://wa.me/916363453870"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full h-11 rounded-full bg-[#25D366] text-white font-bold shadow-xs hover:bg-[#1fb855] transition-all flex items-center justify-center gap-1.5 text-sm"
              >
                <FaWhatsapp size={17} />
                <span>Chat on WhatsApp</span>
              </a>

              <Link href="/tutors" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <button
                  type="button"
                  className="w-full h-11 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white font-black shadow-md hover:from-emerald-700 hover:to-teal-700 transition-all text-sm flex items-center justify-center gap-1.5"
                >
                  <Search size={15} />
                  <span>Find a Tutor</span>
                </button>
              </Link>

              <Link href="/find-students" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <button
                  type="button"
                  className="w-full h-11 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold shadow-xs hover:bg-emerald-100 transition-all flex items-center justify-center gap-1.5 text-sm"
                >
                  <Users size={16} />
                  <span>Find Students</span>
                </button>
              </Link>

              {mounted && isAuthenticated ? (
                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href={getDashboardUrl()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <CircleUserRound size={15} />
                    <span>Go to Dashboard &rarr;</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold text-red-600 hover:underline"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full pt-1">
                  <button
                    type="button"
                    className="w-full h-10 rounded-full bg-slate-900 hover:bg-emerald-600 text-white font-bold transition-all text-xs flex items-center justify-center gap-1.5"
                  >
                    <LogIn size={14} />
                    <span>Login to Account</span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
