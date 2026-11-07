import React from 'react';
import { lora } from "@/lib/fonts";

interface CalendarProps {
  month: number; // 1-12
  year: number;
  availableDates: string[]; // dates in 'YYYY-MM-DD'
  selectedDates: string[];
  onSelectDate: (date: string) => void;
}

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const Calendar: React.FC<CalendarProps> = ({
  month,
  year,
  availableDates,
  selectedDates,
  onSelectDate,
}) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekDay = new Date(year, month - 1, 1).getDay();

  const dates: (string | null)[] = [
    ...Array(firstWeekDay).fill(null),
    ...Array(daysInMonth)
      .fill(null)
      .map(
        (_, i) =>
          `${year}-${month.toString().padStart(2, '0')}-${(i + 1).toString().padStart(2, '0')}`,
      ),
  ];

  return (
    <div className="w-[250px] rounded-md border border-[#1C2B22]/10 bg-white p-3">
      <h4 className={`${lora.className} text-center text-sm font-semibold text-[#1C2B22]`}>
        {new Date(year, month - 1).toLocaleString('default', {
          month: 'long',
          year: 'numeric',
        })}
      </h4>
      <div className="mt-3 grid grid-cols-7 gap-1">
        {weekDays.map((wd) => (
          <div key={wd} className="text-center text-xs font-semibold text-[#9AA3AB]">
            {wd}
          </div>
        ))}
        {dates.map((date, i) => {
          if (!date) return <div key={i}></div>;

          const isAvailable = availableDates.includes(date);
          const isSelected = selectedDates.includes(date);

          const textClass = isSelected ? 'text-white' : isAvailable ? 'text-[#1C2B22]' : 'text-[#1C2B22]/25';

          return (
            <div
              key={date}
              onClick={() => isAvailable && onSelectDate(date)}
              className={`select-none rounded-md py-1.5 text-center text-sm ${textClass} ${
                isSelected ? 'bg-[#D79A2C]' : ''
              } ${isAvailable ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {parseInt(date.split('-')[2] || '0', 10)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
