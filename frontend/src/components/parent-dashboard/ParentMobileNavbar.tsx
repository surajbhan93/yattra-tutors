import { Home, Bell, BookOpen, User } from "lucide-react";
import { useRouter } from "next/router";

const navItems = [
  {
    label: "Home",
    icon: Home,
    path: "/parent/dashboard",
  },
  {
    label: "Classes",
    icon: BookOpen,
    path: "/parent/classes",
  },
  {
    label: "Alerts",
    icon: Bell,
    path: "/parent/notifications",
  },
  {
    label: "Profile",
    icon: User,
    path: "/parent/profile",
  },
];

export default function ParentMobileNavbar() {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1C2B22]/10 bg-white md:hidden">
      <div className="flex h-14 items-center justify-around">
        {navItems.map((item) => {
          const isActive = router.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center text-xs transition-colors
                ${isActive ? "text-[#D79A2C]" : "text-[#58646C]"}
              `}
            >
              <Icon size={20} />
              <span className="mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
