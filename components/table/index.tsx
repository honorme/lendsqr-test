'use client'

import type { ColumnDef, Table } from '@tanstack/react-table'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React, { useImperativeHandle } from 'react'

import styles from '@/public/scss/components/table/table.module.scss'
import { Pagination } from './pagination'
import { useUrlQuery } from '../hooks/urlQuery'
import { ViewIcon } from '@/public/assets/svg/sidebar/table'

export interface TableRef {
  setPage: React.Dispatch<React.SetStateAction<number>>
}

type DataTableProps<Data, TValue> = {
  ref?: React.ForwardedRef<TableRef>
  columns: ColumnDef<Data, TValue>[]
  data: Data[]
  pageSize?: number
  cellHeight?: number
  empty?: React.ReactNode
  pagination?: boolean | 'api'
  paginationOptions?: {
    totalPages: number
  }
  onView?: (a: { data: Data; index: number }) => void
}

export function Table<Data extends object>({
  ref,
  columns,
  data,
  pageSize = 10,
  cellHeight = 50,
  empty,
  pagination = data?.length > 10,
  paginationOptions,
  onView,
}: DataTableProps<Data, object>) {
  const [q, setUrl] = useUrlQuery<{ page: number }>()
  const [pg, setPage] = React.useState(1)

  const page = q.page ? Number(q.page) || 1 : pg

  const table = useReactTable({
    data,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
  })

  const totalPages =
    pagination === 'api'
      ? paginationOptions?.totalPages || 1
      : Math.ceil(table.getRowCount() / pageSize)

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paginatedRows = table.getCoreRowModel().rows.slice(start, end)

  const onPageChange = (p: number) => {
    if (pagination === 'api' || q.page) {
      setUrl({ query: { page: p } })
    } else {
      setPage(p)
    }
  }

  useImperativeHandle(ref, () => ({
    setPage,
  }))

  return (
    <div>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className={styles.headerRow}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className={styles.headerCell}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <tr
                  key={row.id}
                  className={
                    row.getIsSelected() ? styles.selected : styles.bodyRow
                  }
                  style={{ height: `${cellHeight}px` }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className={styles.bodyCell}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  {onView && (
                    <td
                      onClick={() =>
                        onView?.({ data: row.original, index: row.index })
                      }
                      className={styles.menuTriggerBody}
                    >
                      <ViewIcon className={styles.menuTrigger} />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.noResults}>
                  {empty || 'No results.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className={styles.pagination}>
          <Pagination
            currentPage={pagination === 'api' ? q.page || 1 : page}
            pageSize={pageSize}
            totalPages={totalPages}
            totalCount={data?.length}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  )
}
