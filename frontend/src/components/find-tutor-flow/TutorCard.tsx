import React from 'react';
import { lora } from "@/lib/fonts";

interface Tutor {
  id: string;
  name: string;
  profession: string;
  rating: number;
  reviews: number;
  description: string;
  avatarUrl?: string;
  onClick?: () => void;
}

const TutorCard: React.FC<Tutor> = ({
  name,
  profession,
  rating,
  reviews,
  description,
  onClick,
  avatarUrl,
}) => {
  return (
    <div
      onClick={onClick}
      className={`max-w-[220px] rounded-md border border-[#1C2B22]/10 bg-white p-4 transition-colors ${
        onClick ? 'cursor-pointer hover:border-[#D79A2C]/50' : ''
      }`}
    >
      {avatarUrl && (
        <img src={avatarUrl} alt={name} className="mb-2 h-[60px] w-[60px] rounded-full object-cover" />
      )}
      <h4 className={`${lora.className} my-2 text-sm font-semibold text-[#1C2B22]`}>{name}</h4>
      <p className="text-sm text-[#58646C]">{profession}</p>
      <p className="my-2 text-sm font-semibold text-[#D79A2C]">
        {rating} ★ ({reviews} reviews)
      </p>
      <p className="text-xs text-[#58646C]">{description}</p>
    </div>
  );
};

export default TutorCard;
