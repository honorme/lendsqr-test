'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type Props<T> = {
  query?: T
  remove?: (keyof T)[]
  options?: {
    removeAll?: boolean
  }
}

export const useUrlQuery = <T extends object>() => {
  const router = useRouter()
  const pathName = usePathname()

  const searchParams = useSearchParams()

  const routerQuery: Partial<T> = {}
  searchParams?.forEach((value, key) => {
    routerQuery[key as keyof T] = value as T[keyof T]
  })

  let derivedeParams: Partial<T> = {} as object
  const setUrl = ({ query, remove, options }: Props<T>) => {
    const defaultParams = !!options?.removeAll ? {} : routerQuery
    derivedeParams = { ...defaultParams, ...derivedeParams }

    remove?.forEach((k) => {
      delete derivedeParams[k]
      return derivedeParams
    })

    for (const key in query) {
      const k: keyof T = key as keyof T
      if (!!query[k]) {
        derivedeParams[k] = query[k]
      }
    }
    const params = { ...derivedeParams }

    const paramString = Object.entries(params).reduce((acc, curr) => {
      const [a, b] = curr
      return `${acc}${a}=${b}&`
    }, '')
    const extension = !!paramString ? `?${paramString}` : ''
    const url = pathName + extension.slice(0, -1)

    router.replace(url)
  }

  const query: Partial<T> = Object.keys(routerQuery).length ? routerQuery : {}

  return [query, setUrl, { pathName }] as const
}
