'use client'

import { ColumnDef } from '@tanstack/react-table'
import { fcase } from './textFormat'

const validValue = (v: string) => {
  switch (true) {
    case v === undefined:
      return '-'
    case v === null:
      return '-'
    case v === '':
      return '-'
    default:
      return v
  }
}

type Others = 'a' | 'b' | 'c' | 'x' | 'y' | 'z'

type DataToColumns<T extends Record<string, string>> = {
  data: T[] | undefined | null
  dataKeys?: (keyof T | Others)[]
  changeHeader?: (
    value: (keyof T)[]
  ) => Partial<Record<keyof T | Others, string | React.ReactNode>>
  render?: (x: Partial<T>) => Partial<Record<keyof T | Others, React.ReactNode>>
}

export const formatColumns = <T extends { [K in keyof T]: string }>({
  data,
  dataKeys,
  changeHeader,
  render,
}: DataToColumns<T>): ColumnDef<T>[] => {
  const keys = (
    dataKeys?.length
      ? dataKeys
      : data?.length
      ? Object.keys(data[0])
      : ['a', 'b', 'c']
  ) as (keyof T)[]

  const cols = keys?.map(
    (key) =>
      ({
        accessorKey: key,
        header: () => {
          if (!!changeHeader && changeHeader(keys)[key]) {
            return changeHeader(keys)[key]
          } else {
            return fcase(key as string)
          }
        },
        cell: ({ row, getValue: v }) =>
          render && !!render(row.original!)[key]
            ? render!(row.original)[key]
            : validValue(v() as string),
      } as ColumnDef<T>)
  )

  return cols
}
