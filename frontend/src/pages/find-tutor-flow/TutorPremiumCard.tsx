import { motion } from "framer-motion";
import { Star, Users, IndianRupee } from "lucide-react";
import { lora } from "@/lib/fonts";

interface Props {
  tutor: any;
  onOpenProfile: () => void;
}

export default function TutorPremiumCard({ tutor, onOpenProfile }: Props) {
  // Build-time safety
  if (!tutor) return null;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className="relative rounded-lg border border-[#1C2B22]/10 bg-white transition-colors hover:border-[#D79A2C]/40"
    >
      <div className="space-y-5 p-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <img
            src={`https://avatar.vercel.sh/${tutor?.email || "tutor"}`}
            className="h-14 w-14 rounded-full border border-[#1C2B22]/10 object-cover"
            alt={tutor.fullName}
          />

          <div>
            <h3 className={`${lora.className} text-base font-semibold text-[#1C2B22]`}>{tutor.fullName}</h3>
            <p className="text-sm text-[#58646C]">{tutor.subjects?.join(", ")}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-[#58646C]">
          <span className="flex items-center gap-1">
            <Star className="text-[#D79A2C]" fill="#D79A2C" size={15} />
            {tutor.rating || 4.8}
          </span>

          <span className="flex items-center gap-1">
            <Users size={15} />
            {tutor.totalStudents || 0} students
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-0.5 text-lg font-semibold text-[#1C2B22]">
          <IndianRupee size={16} />
          {tutor.price}/month
        </div>

        {/* CTA */}
        <button
          onClick={onOpenProfile}
          className="w-full rounded-md bg-[#D79A2C] py-2.5 text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f]"
        >
          View full profile
        </button>
      </div>
    </motion.div>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
