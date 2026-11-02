import React from 'react';

interface RatingStarsProps {
  rating: number; // e.g., 4.5
  maxStars?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({ rating, maxStars = 5 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center text-[#D79A2C]">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`}>&#9733;</span>
      ))}
      {halfStar && <span>&#189;</span>}
      {[...Array(maxStars - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <span key={`empty-${i}`} className="text-[#1C2B22]/15">
          &#9733;
        </span>
      ))}
      <span className="ml-1.5 text-[#58646C]">{rating.toFixed(1)}</span>
    </div>
  );
};

export default RatingStars;
