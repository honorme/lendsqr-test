'use client'

import { ArrowDownIcon } from '@/public/assets/svg/sidebar'
import React from 'react'
import styles from '@/public/scss/components/table/pagination.module.scss'

export type PaginationProps = {
  currentPage: number
  pageSize: number
  totalPages: number
  totalCount: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  pageSize,
  totalPages,
  totalCount,
  onPageChange,
}: PaginationProps) {
  currentPage = Number(currentPage)

  const pages = Array.from({ length: totalPages }, (_x, i) => i + 1)
  const [pageJumpMargin, setPageJumpMargin] = React.useState(0)

  React.useEffect(() => {
    setPageJumpMargin(
      Math.ceil(Number(currentPage) / pageSize) * pageSize - pageSize
    )
  }, [pageSize, currentPage])

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.showingBody}>
        <div className={styles.showingText}>
          Showing <span className={styles.dropdown}>{pageSize}</span> out of{' '}
          {totalCount}
        </div>
        <p>.</p>
        <div className={styles.showingText}>Page {currentPage}</div>
      </div>

      <div className={styles.paginationControls}>
        <button
          type="button"
          className={styles.navButton}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ArrowDownIcon size={16} className={styles.rl90deg} />
        </button>

        <div className={styles.pageNumbers}>
          {pages.slice(pageJumpMargin, pageJumpMargin + 5).map((page) => (
            <button
              key={page}
              type="button"
              className={`${styles.pageButton} ${
                page === currentPage ? styles.active : ''
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          {totalPages > pageJumpMargin + 5 && (
            <>
              <span className={styles.ellipsis}>...</span>
              <button
                type="button"
                className={styles.pageButton}
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className={styles.navButton}
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ArrowDownIcon size={16} className={styles.rr90deg} />
        </button>
      </div>
    </div>
  )
}
