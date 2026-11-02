import Button from "../ui/Button";
import { CheckCircle2, Info, PartyPopper, XCircle } from "lucide-react";

/* ======================
   TYPES
====================== */
interface Request {
  _id: string; // ✅ FIX: Mongo ID
  status:
    | "pending"
    | "contacted"
    | "assigned"
    | "completed"
    | "cancelled";
}

interface Props {
  request: Request;
  onRequestToTeach: (id: string) => void;
}

/* ======================
   COMPONENT
====================== */
export default function TutorRequestStatusCard({
  request,
  onRequestToTeach,
}: Props) {
  // 🟡 Pending → tutor can apply
  if (request.status === "pending") {
    return (
      <Button onClick={() => onRequestToTeach(request._id)}>
        Request to teach
      </Button>
    );
  }

  // 🟠 Tutor already contacted admin
  if (request.status === "contacted") {
    return (
      <div className="flex items-start gap-2 rounded-md border border-[#D79A2C]/30 bg-[#D79A2C]/10 p-4 text-sm text-[#8a5f18]">
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          <b>Your request has been sent to admin.</b>
          <br />
          Admin is reviewing your profile.
        </span>
      </div>
    );
  }

  // 🔵 Assigned to another tutor
  if (request.status === "assigned") {
    return (
      <div className="flex items-start gap-2 rounded-md border border-[#3E5C83]/25 bg-[#3E5C83]/10 p-4 text-sm text-[#3E5C83]">
        <Info className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          <b>This request is currently assigned to another tutor.</b>
          <br />
          If the assigned tutor rejects or is unavailable,
          <br />
          <b>you may be contacted for a demo.</b>
        </span>
      </div>
    );
  }

  // 🟢 Completed
  if (request.status === "completed") {
    return (
      <div className="flex items-start gap-2 rounded-md border border-[#1F6F54]/25 bg-[#1F6F54]/10 p-4 text-sm text-[#1F6F54]">
        <PartyPopper className="mt-0.5 h-4 w-4 shrink-0" />
        <span>
          <b>This request has been completed.</b>
          <br />
          Demo session already conducted.
        </span>
      </div>
    );
  }

  // 🔴 Cancelled
  if (request.status === "cancelled") {
    return (
      <div className="flex items-start gap-2 rounded-md border border-[#b23b2e]/25 bg-[#b23b2e]/10 p-4 text-sm text-[#b23b2e]">
        <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <b>This request has been cancelled by admin.</b>
      </div>
    );
  }

  return null;
}
