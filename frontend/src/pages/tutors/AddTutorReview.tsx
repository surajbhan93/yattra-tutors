import { useState } from "react";
import apiClient from "@/lib/apiClient";
import { motion } from "framer-motion";
import { lora } from "@/lib/fonts";

export default function AddTutorReview({ tutorId }: { tutorId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!comment.trim()) {
      setMsg("Please write a review before submitting.");
      return;
    }

    try {
      setLoading(true);
      await apiClient.post(`/tutors/${tutorId}/reviews`, {
        tutorId,
        rating,
        comment,
      });
      setMsg("Review submitted successfully.");
      setComment("");
      setRating(5);
    } catch (e: any) {
      setMsg(e?.response?.data?.error || "Could not submit the review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="max-w-xl rounded-2xl border border-[#1C2B22]/10 bg-[#F7F2E9] p-6"
    >
      <p className={`${lora.className} italic text-sm text-[#8a5f18] mb-1`}>Share your experience</p>
      <h3 className={`${lora.className} text-lg font-semibold text-[#1C2B22] mb-4`}>Rate this tutor</h3>

      {/* Star Rating */}
      <div className="flex gap-1.5 mb-4">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setRating(s)}
            aria-label={`${s} star${s > 1 ? "s" : ""}`}
            className="text-2xl leading-none transition-transform hover:scale-110"
            style={{ color: s <= rating ? "#D79A2C" : "#1C2B22", opacity: s <= rating ? 1 : 0.15 }}
          >
            ★
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        placeholder="Share your experience with this tutor..."
        className="w-full rounded-md border border-[#1C2B22]/15 bg-white px-4 py-3 text-sm text-[#1C2B22] placeholder:text-[#9AA3AB] resize-none focus:outline-none focus:ring-2 focus:ring-[#D79A2C]/40"
      />

      {/* Submit */}
      <button
        onClick={submit}
        disabled={loading}
        className="mt-4 w-full py-2.5 rounded-md bg-[#D79A2C] text-sm font-semibold text-[#17261D] transition-colors hover:bg-[#c4891f] disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit review"}
      </button>

      {/* Message */}
      {msg && <p className="text-sm mt-3 text-center text-[#58646C]">{msg}</p>}
    </motion.div>
  );
}
