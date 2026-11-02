import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

interface Props {
  title: string;
  items: string[];
  activeValue?: string;
  onSelect: (value: string) => void;
  collapsible?: boolean;
}

export default function FilterSection({
  title,
  items,
  activeValue,
  onSelect,
  collapsible = true,
}: Props) {
  const [open, setOpen] = useState(true);

  return (
    <section className="space-y-3">
      {/* ======================
          HEADER
      ====================== */}
      {title && (
        <button
          type="button"
          onClick={() => collapsible && setOpen(!open)}
          className="
            flex w-full items-center justify-between
            text-left text-sm font-semibold text-gray-900
            focus:outline-none
          "
        >
          <span>{title}</span>

          {collapsible && (
            <ChevronDown
              size={16}
              className={`
                transition-transform
                ${open ? "rotate-180" : ""}
              `}
            />
          )}
        </button>
      )}

      {/* ======================
          ITEMS
      ====================== */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              space-y-1
              overflow-hidden
              text-sm
            "
          >
            {items.map((item) => {
              const slug = item
                .toLowerCase()
                .replace(/\s+/g, "-");

              const isActive = activeValue === slug;

              return (
                <li
                  key={item}
                  onClick={() => onSelect(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === "Enter" && onSelect(item)
                  }
                  className={`
                    group relative cursor-pointer
                    rounded-lg px-3 py-2
                    transition-all
                    ${
                      isActive
                        ? "bg-[#D79A2C]/10 text-[#8a5f18] font-medium"
                        : "text-[#1C2B22] hover:bg-[#1C2B22]/[.04]"
                    }
                  `}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <span
                      className="
                        absolute left-0 top-1/2
                        h-5 w-1 -translate-y-1/2
                        rounded-r bg-[#D79A2C]
                      "
                    />
                  )}

                  <div className="flex items-center justify-between">
                    <span>{item}</span>

                    {isActive && (
                      <Check
                        size={14}
                        className="text-[#D79A2C]"
                      />
                    )}
                  </div>
                </li>
              );
            })}

            {/* Empty state */}
            {!items.length && (
              <li className="px-3 py-2 text-gray-500 text-xs">
                No options found
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </section>
  );
}
