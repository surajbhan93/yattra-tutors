import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import SectionHeader from "@/components/common/SectionHeader";
import TeamCard from "@/components/common/TeamCard";

/* ======================
   TYPES
====================== */
interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  linkedin?: string;
  isFounder?: boolean;
}

/* ======================
   COMPONENT
====================== */
export default function TeamSection() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ======================
     FETCH TEAM
  ====================== */
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await apiClient.get("/team");
        setTeam(res.data.data || []);
      } catch {
        setError("Failed to load team");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  /* ======================
     SPLIT FOUNDER / MEMBERS
  ====================== */
  const founder = team.find((m) => m.isFounder === true);
  const members = team.filter((m) => !m.isFounder);

  return (
    <section id="team" className="relative py-16 sm:py-20 bg-white border-y border-[#1C2B22]/10">
      <div className="relative max-w-5xl mx-auto px-4">
        <SectionHeader
          title="Meet Our Team"
          subtitle="A passionate group of educators, technologists, and mentors building the future of learning."
        />

        {/* Loading */}
        {loading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-[#1C2B22]/10 p-6 animate-pulse">
                <div className="h-24 w-24 rounded-full bg-[#1C2B22]/[.06] mb-4" />
                <div className="h-4 bg-[#1C2B22]/[.06] rounded w-3/4 mb-2" />
                <div className="h-3 bg-[#1C2B22]/[.06] rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {/* Founder */}
        {!loading && founder && (
          <div className="flex justify-center mb-20">
            <div className="max-w-md">
              {/* 👇 ALWAYS pass member */}
              <TeamCard member={founder} />
            </div>
          </div>
        )}

        {/* Members */}
        {!loading && !error && members.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {members.map((m) => (
              <TeamCard key={m._id} member={m} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && team.length === 0 && (
          <p className="text-center text-gray-500">
            No team members found
          </p>
        )}
      </div>
    </section>
  );
}
