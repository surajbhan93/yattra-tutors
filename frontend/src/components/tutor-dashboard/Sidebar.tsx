"use client";

import {
  Calendar,
  DollarSign,
  Home,
  Library,
  Search,
  Users,
  LogOut,
  ClipboardCheck,
  ClipboardList,
  Menu,
  X,
  Target,
  FileCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import api from "@/lib/apiClient";
import { resolveImage } from "@/lib/resolveImage";
import { lora } from "@/lib/fonts";

/* ======================
   NAV LINKS
====================== */
const navLinks = [
  {
    href: "/tutor/dashboard",
    label: "Dashboard",
    icon: Home,
  },
    {
    href: "/tutor/profile",
    label: "Edit or complete profile",
    icon: Home,
  },
  {
    href: "/tutor/leads/my-leads",
    label: "My Leads",
    icon: Users,
  },
  {
    href: "/tutor/leads",
    label: "Leads MarketPlace",
    icon: Search,
    badge: "New"
  },
  {
    href: "/tutor/schedule",
    label: "Schedule & Availability",
    icon: Calendar,
  },
  {
    href: "/tutor/library",
    label: "Content Library",
    icon: Library,
  },
  {
    href: "/tutor/assign-assignments",
    label: "Assign Assignment",
    icon: FileCheck,
  },
  {
    href: "/tutor/assign-quiz",
    label: "Assign Quiz",
    icon: ClipboardCheck,
  },
  {
    href: "/tutor/submissions",
    label: "Submissions",
    icon: ClipboardList,
  },
  {
    href: "/tutor/earnings",
    label: "Earnings",
    icon: DollarSign,
  },
];

type TutorMiniProfile = {
  fullName: string;
  profileImage?: string;
};

// const BACKEND_URL =
//   process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// const resolveImage = (path?: string) => {
//   if (!path) return "/images/default-avatar.png";
//   if (path.startsWith("http")) return path;
//   return `${BACKEND_URL}${path}`;
// };

export default function Sidebar() {
  const router = useRouter();

  const [tutor, setTutor] = useState<TutorMiniProfile | null>(null);
  const [open, setOpen] = useState(false);        // mobile drawer
  const [collapsed, setCollapsed] = useState(false); // desktop mini mode

  /* ======================
     FETCH PROFILE
  ====================== */
  useEffect(() => {
    const fetchTutor = async () => {
      const res = await api.get("/tutor/me");
      setTutor(res.data.data);
    };
    fetchTutor();
  }, []);

  /* ======================
     SWIPE (MOBILE ONLY)
  ====================== */
  useEffect(() => {
    let startX = 0;

    const onTouchStart = (e: any) => {
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e: any) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (diff > 80) setOpen(true);
      if (diff < -80) setOpen(false);
    };

    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchend", onTouchEnd);

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

// DEBUG (temporary)

  return (
    <>
      {/* ======================
         MOBILE TOP BAR
      ====================== */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50
        flex items-center justify-between px-4 py-3 border-b border-[#1C2B22]/10 bg-[#0E211C]">
        <button onClick={() => setOpen(true)} className="text-[#F7F2E9]">
          <Menu className="h-6 w-6" />
        </button>

        <span className={`${lora.className} text-[#F7F2E9] font-semibold text-sm`}>Tutor dashboard</span>

        <div className="w-6" /> {/* Spacer for centering */}
      </div>

      {/* ======================
         MOBILE OVERLAY
      ====================== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* ======================
         SIDEBAR
      ====================== */}
      <aside
        className={`
          fixed md:static
          left-0 top-12 bottom-0 md:top-0
          z-40 bg-white border-r border-[#1C2B22]/10
          transition-all duration-300 ease-in-out

          w-72
          ${collapsed ? "md:w-20" : "md:w-72"}

          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* DESKTOP collapse toggle ONLY */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex absolute -right-4 top-8
          h-8 w-8 items-center justify-center
          rounded-full border border-[#1C2B22]/10 bg-[#0E211C]
          text-[#D79A2C] transition-transform hover:scale-105"
        >
          {collapsed ? "➤" : "◀"}
        </button>

        <div className="flex h-full flex-col">
          {/* HEADER */}
          <div className="bg-[#0E211C] p-6 text-[#F7F2E9]">
            {!collapsed && (
              <>
                <h1 className={`${lora.className} text-lg font-semibold hidden md:block`}>
                  Tutor dashboard
                </h1>
                <p className="text-sm text-[#AAB6A2] hidden md:block">
                  Teaching · Assignments · Quizzes
                </p>
              </>
            )}

            <button
              onClick={() => setOpen(false)}
              className="md:hidden absolute top-4 right-4 p-1 hover:bg-white/10 rounded-md transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex flex-1 flex-col p-4 overflow-y-auto">
            {/* PROFILE */}
            <Link
              href="/tutor/profile"
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 rounded-md border border-[#1C2B22]/10 p-3
              hover:border-[#D79A2C]/40 bg-white transition-colors"
            >
              <div className="relative">
                {tutor?.profileImage && tutor.profileImage.startsWith('data:') ? (
                  // Base64 image - use regular img tag
                  <img
                    src={tutor.profileImage}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-[#1C2B22]/10"
                    alt="Tutor"
                  />
                ) : (
                  // URL image - use Next.js Image component
                  <Image
                    src={resolveImage(tutor?.profileImage)}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-[#1C2B22]/10"
                    alt="Tutor"
                  />
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#3f8a5f] rounded-full border-2 border-white"></div>
              </div>

              <div className={collapsed ? "hidden md:block md:hidden" : "block"}>
                <p className="text-sm font-semibold text-[#1C2B22]">
                  {tutor?.fullName || "Loading..."}
                </p>
                <p className="text-xs font-medium text-[#8a5f18]">View profile →</p>
              </div>
            </Link>

            {/* NAV */}
            <nav className="mt-4 flex-1 space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = router.pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`group relative flex items-center gap-3 rounded-md px-3.5 py-2.5
                    text-sm font-medium transition-colors
                    ${
                      active
                        ? "bg-[#0E211C] text-white"
                        : "text-[#1C2B22] hover:bg-[#F7F2E9]"
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#D79A2C]" : "text-[#58646C] group-hover:text-[#8a5f18]"}`} />

                    <span className={collapsed ? "hidden md:block md:hidden" : "inline flex-1"}>
                      {link.label}
                    </span>

                    {/* Badge */}
                    {link.badge && !collapsed && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold bg-[#D79A2C] text-[#17261D] rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* LOGOUT */}
            <Link
              href="/tutor/logout"
              onClick={() => setOpen(false)}
              className="mt-4 flex items-center gap-3 rounded-md px-3.5 py-2.5
              text-sm font-medium text-[#b23b2e] hover:bg-[#b23b2e]/10 transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span className={collapsed ? "hidden md:block md:hidden" : "inline"}>
                Logout
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
