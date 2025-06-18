import React from "react";
// import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./Pagination.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {

  const createPageButton = (page: number) => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      className={`p-4 border rounded-circle d-flex justify-content-center align-items-center pagBtn ${currentPage === page ? "bg-orange text-white" : "bg-white"}`}
    >
      {page}
    </button>
  );

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages < 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(createPageButton(i));
      }
      return pages;
    }

    pages.push(createPageButton(1));

    if (currentPage > 4) {
      pages.push(<span key="dots-start" className="p-4">...</span>);
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(createPageButton(i));
    }

    if (currentPage < totalPages - 3) {
      pages.push(<span key="dots-end" className="p-4">...</span>);
    }

    if (totalPages > 1) {
      pages.push(createPageButton(totalPages));
    }

    return pages;
  };

  return (
    <div className="d-flex justify-content-center mt-5 gap-2 flex-wrap">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        className="p-4 border rounded-circle bg-white d-flex justify-content-center align-items-center pagBtn"
        disabled={currentPage === 1}
      >
        <img src="/task5/images/Home/Pagination/Prev.svg" alt="" />
        {/* <IoIosArrowBack /> */}
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        className="p-4 border rounded-circle bg-white d-flex justify-content-center align-items-center pagBtn"
        disabled={currentPage === totalPages}
      >
        <img src="/task5/images/Home/Pagination/Next.svg" alt="" />

        {/* <IoIosArrowForward /> */}
      </button>
    </div>
  );
};

export default Pagination;
