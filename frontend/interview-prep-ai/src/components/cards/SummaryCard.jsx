import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper";

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group"
      onClick={onSelect}
    >
      <div className="rounded-lg p-4 cursor-pointer relative">
        {/* Highlighted Role Section */}
        <div
          style={{
            background: colors?.bgcolor,
            filter: "brightness(93%)", // Slight darkening
          }}
          className="rounded-md px-4 py-3 mb-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-bold">
              <span className="text-lg font-semibold text-black">
                {getInitials(role)}
              </span>
            </div>
            <div>
              <h2 className="text-[17px] font-medium text-black">{role}</h2>
              <p className="text-xs text-medium text-gray-900">
                {topicsToFocus}
              </p>
            </div>
          </div>
        </div>

        {/* Delete button */}
        <div className="absolute top-3 right-4">
          <button
            className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <LuTrash2 />
          </button>
        </div>

        {/* Remaining Card Details */}
        <div className="px-3 pb-3 mt-2 space-y-2">
          <div className="flex flex-wrap gap-2">
            <div className="text-[9px] font-medium text-black px-2 py-[2px] border border-gray-900 rounded-full">
              Experience: {experience} {experience === 1 ? "Year" : "Years"}
            </div>

            <div className="text-[9px] font-medium text-black px-2 py-[2px] border border-gray-900 rounded-full">
              {Array.isArray(questions) ? questions.length : questions || 0} Q&A
            </div>

            <div className="text-[9px] font-medium text-black px-2 py-[2px] border border-gray-900 rounded-full">
              Last Updated: {lastUpdated}
            </div>
          </div>

          <p className="text-[12px] text-gray-500 font-medium line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
