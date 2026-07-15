import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalFiltered: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | 'ellipsis')[] = [1];

  if (current > 3) {
    pages.push('ellipsis');
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) {
    pages.push('ellipsis');
  }

  pages.push(total);

  return pages;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  totalFiltered,
  onPageChange,
  onPageSizeChange,
}) => {
  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalFiltered);
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="pagination-bar">
      <div className="pagination-info">
        <span>
          Showing <strong>{totalFiltered > 0 ? rangeStart : 0}–{rangeEnd}</strong> of <strong>{totalFiltered}</strong>
        </span>
        <span>·</span>
        <label>
          Rows
          <select
            className="page-size-select"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            style={{ marginLeft: 4 }}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </label>
      </div>

      <nav className="pagination-nav" aria-label="Pagination">
        <button
          className="page-btn"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          «
        </button>
        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ‹
        </button>

        {pageNumbers.map((item, idx) =>
          item === 'ellipsis' ? (
            <span key={`e-${idx}`} className="page-ellipsis">…</span>
          ) : (
            <button
              key={item}
              className={`page-btn ${item === currentPage ? 'is-active' : ''}`}
              onClick={() => onPageChange(item)}
              aria-current={item === currentPage ? 'page' : undefined}
            >
              {item}
            </button>
          )
        )}

        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          ›
        </button>
        <button
          className="page-btn"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          »
        </button>
      </nav>
    </div>
  );
};
