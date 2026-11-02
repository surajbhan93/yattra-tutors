"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import apiClient from "@/lib/apiClient";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  GraduationCap,
  Phone,
  Mail,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

/* ======================
   TYPES
====================== */
interface Requirement {
  requestId: string;
  subject: string;
  class: string;
  description?: string;
  location: string;
  urgency: string;
  createdAt: string;
}

interface Student {
  _id: string;
  full_name: string;
  class: string;
  board: string;
  institution_name: string;
  subjects_required: string[];
  additional_notes?: string;
  createdAt: string;
  requirements: Requirement[];
}

interface ParentData {
  parent: {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    totalStudents: number;
  };
  students: Student[];
}

/* ======================
   HELPERS
====================== */
const urgencyColor = (urgency: string) => {
  switch (urgency) {
    case "within_24_hours":
      return "bg-[#b23b2e]/10 text-[#b23b2e]";
    case "within_3_days":
      return "bg-[#D79A2C]/15 text-[#8a5f18]";
    case "within_a_week":
      return "bg-[#1F6F54]/10 text-[#1F6F54]";
    default:
      return "bg-[#F7F2E9] text-[#58646C]";
  }
};

const urgencyLabel = (u: string) => u.replaceAll("_", " ");

/* ======================
   COMPONENT
====================== */
export default function ParentDetailPage() {
  const { parentId } = useParams<{ parentId: string }>();
  const [data, setData] = useState<ParentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get(`/auth/tutor/parent/${parentId}`)
      .then((res) => setData(res.data.data))
      .finally(() => setLoading(false));
  }, [parentId]);

  if (loading) {
    return <Card className="p-6">Loading...</Card>;
  }

  if (!data) {
    return <Card className="p-6 text-red-500">Failed to load parent details</Card>;
  }

  const { parent, students } = data;

  const allRequests = students.flatMap((s) => s.requirements);

  return (
    <div className="space-y-8">
      {/* ================= PARENT HEADER ================= */}
      <Card className="relative overflow-hidden border-[#1C2B22]/10">
        <div className="absolute inset-0 bg-[#0E211C]" />
        <CardContent className="relative z-10 p-8 text-[#F7F2E9]">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback>
                  {parent.fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{parent.fullName}</h1>
                <p className="flex items-center gap-2 text-sm">
                  <Mail size={14} /> {parent.email}
                </p>
                <p className="flex items-center gap-2 text-sm">
                  <Phone size={14} /> {parent.phone}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold">{students.length}</p>
              <p className="text-sm">Students</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ================= TABS ================= */}
      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">
            <Users className="mr-2 size-4" /> Students
          </TabsTrigger>
          <TabsTrigger value="requests">
            <Clock className="mr-2 size-4" /> Requests
          </TabsTrigger>
        </TabsList>

        {/* ================= STUDENTS ================= */}
        <TabsContent value="students">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {students.map((s) => (
              <motion.div key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap size={16} /> {s.full_name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <Badge>Class {s.class}</Badge>
                    <Badge variant="outline">{s.board}</Badge>
                    <p><b>School:</b> {s.institution_name}</p>
                    <div className="flex flex-wrap gap-2">
                     {Array.isArray(s.subjects_required) &&
  s.subjects_required.map((sub) => (
    <Badge key={sub}>{sub}</Badge>
  ))}

                    </div>
                    {s.additional_notes && (
                      <p className="text-xs italic text-gray-500">
                        “{s.additional_notes}”
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* ================= REQUESTS ================= */}
        <TabsContent value="requests">
          <div className="space-y-4 mt-4">
            {allRequests.map((r) => (
              <Card key={r.requestId}>
                <CardContent className="space-y-3 p-5">
                  <Badge>{r.subject}</Badge>
                  <Separator />
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {r.location}
                    </span>
                    <span className={`px-2 py-1 rounded ${urgencyColor(r.urgency)}`}>
                      <Clock size={12} /> {urgencyLabel(r.urgency)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
