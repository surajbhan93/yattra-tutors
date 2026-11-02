import React from 'react';
import { Lora } from 'next/font/google';

const lora = Lora({ subsets: ['latin'], weight: ['500', '600'] });

interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  change: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  change,
}) => {
  return (
    <div className="rounded-lg border border-[#1C2B22]/10 bg-white p-5">
      <div className="flex items-center">
        <div className={`rounded-md p-2.5 ${color}`}>
          <Icon className="size-5 text-white" />
        </div>
        <div className="ml-3.5">
          <p className="text-xs text-[#9AA3AB]">{title}</p>
          <p className={`${lora.className} text-xl font-semibold text-[#1C2B22]`}>{value}</p>
        </div>
      </div>
      <div className="mt-3">
        <span className="text-xs font-medium text-[#3f8a5f]">{change} from last month</span>
      </div>
    </div>
  );
};

export default StatsCard;
