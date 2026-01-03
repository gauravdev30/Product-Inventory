import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination-wrapper mt-4">
      <button
        className="page-btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        <FaChevronLeft />
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          className={`page-btn ${page === i + 1 ? 'active' : ''}`}
          onClick={() => onChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="page-btn"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
