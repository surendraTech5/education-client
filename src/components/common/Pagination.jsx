import React, { useEffect, useState } from "react";
import { FaGreaterThan, FaLessThan } from "react-icons/fa";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    const rows = document.querySelectorAll("tbody tr");
    setHasData(rows.length > 0);
  }, [currentPage]);

  return (
    <div className="flex justify-center mt-8 mb-6">
      <div className="flex items-center space-x-3">
        <button
          className={`w-10 h-10 flex items-center justify-center rounded-full 
          ${currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-blue-100 text-blue-600"} 
          hover:bg-opacity-80 disabled:opacity-40 transition-all shadow-sm`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <FaLessThan className="text-sm" />
        </button>

        {hasData && (
          <span className="min-w-[40px] h-10 flex items-center justify-center px-4 text-blue-700 bg-white border border-blue-200 rounded-full text-base font-semibold shadow-sm">
            {currentPage}
          </span>
        )}

        <button
          className={`w-10 h-10 flex items-center justify-center rounded-full 
          ${currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-blue-100 text-blue-600"} 
          hover:bg-opacity-80 disabled:opacity-40 transition-all shadow-sm`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          <FaGreaterThan className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
