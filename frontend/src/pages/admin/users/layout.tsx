import { usePathname, useRouter } from "next/navigation";

export default function UsersTabs() {
  const pathname = usePathname();
  const router = useRouter();

  const active = pathname.includes("/tutors") ? "tutors" : "parent";

  return (
    <div className="relative w-fit rounded-md border border-[#1C2B22]/10 bg-white p-1 flex">
      <button
        onClick={() => router.push("/admin/users/parent")}
        className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors ${
          active === "parent" ? "text-[#17261D]" : "text-[#58646C]"
        }`}
      >
        Parents
      </button>

      <button
        onClick={() => router.push("/admin/users/tutors")}
        className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors ${
          active === "tutors" ? "text-[#17261D]" : "text-[#58646C]"
        }`}
      >
        Tutors
      </button>

      {/* Slider */}
      <span
        className={`absolute top-1 h-[calc(100%-8px)] w-1/2 rounded-md bg-[#D79A2C] transition-all duration-300 ${
          active === "parent" ? "left-1" : "left-1/2"
        }`}
      />
    </div>
  );
}
