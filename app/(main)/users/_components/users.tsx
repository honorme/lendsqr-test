'use client'

import { Table, TableRef } from '@/components/table'
import {
  ActiveUsersIcon,
  UsersIcon,
  UsersWithLoansIcon,
  UsersWithSavingsIcon,
} from '@/public/assets/svg/sidebar/customers/users'
import styles from '@/public/scss/customers/users/users.module.scss'
import { useUsers } from './api'
import { formatColumns } from '@/components/helper/columnFormat'
import { User } from '@/components/types/user'
import Loader from '@/components/Loader'
import { capsule } from '@/components/table/capsule'
import { FilterIcon, RemoveFilterIcon } from '@/public/assets/svg/sidebar/table'
import FilterPopup, {
  FilterOption,
  FilterType,
} from '@/components/table/filter'
import { useCallback, useMemo, useRef } from 'react'
import { useUrlQuery } from '@/components/hooks/urlQuery'
import { useStoredUser } from './useStoredUser'
import { useRouter } from 'next/navigation'

function Users() {
  const router = useRouter()
  const [q, setQuery] = useUrlQuery<User>()
  const { data: usersUnfiltered, isLoading } = useUsers()

  const { store } = useStoredUser()

  const tableRef = useRef<TableRef>(null)

  const onFilter = useCallback(
    (users: User[] | undefined, query: Partial<User>) => {
      let queryExists = false

      const key_filtertype: Partial<{ [K in keyof User]: FilterType }> = {}

      filterOptions.forEach((option) => {
        if (q[option.key]) {
          queryExists = true
          key_filtertype[option.key] = option.type
        }
      })

      return users?.filter((item) => {
        if (!queryExists) return true

        return Object.entries(query).every(([key, value]) => {
          if (key_filtertype[key as K] === 'date') {
            const a = new Date(value).toLocaleDateString('en-CA')
            const b = new Date(item[key as K]).toLocaleDateString('en-CA')

            return a === b
          }
          return value ? fs(item[key as K]) === fs(value) : true
        })
      })
    },
    [q]
  )

  const users = useMemo(() => {
    return onFilter(usersUnfiltered, q)
  }, [onFilter, q, usersUnfiltered])

  type StatCard = {
    title: string
    value: string
    icon: React.FunctionComponent
  }

  const statsCard: StatCard[] = [
    {
      title: 'USERS',
      value: '2,453',
      icon: UsersIcon,
    },
    {
      title: 'ACTIVE USERS',
      value: '2,453',
      icon: ActiveUsersIcon,
    },
    {
      title: 'USERS WITH LOANS',
      value: '12,453',
      icon: UsersWithLoansIcon,
    },
    {
      title: 'USERS WITH SAVINGS',
      value: '12,453',
      icon: UsersWithSavingsIcon,
    },
  ]

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.container}>
      <p className={styles.title}>Users</p>

      <div className={styles.cardSection}>
        {statsCard.map((card) => (
          <div key={card.title} className={styles.card}>
            <div className={styles.icon}>
              <card.icon />
            </div>
            <p className={styles.title}>{card.title}</p>
            <p className={styles.value}>{card.value}</p>
          </div>
        ))}
      </div>

      <Table<User>
        ref={tableRef}
        data={users || []}
        columns={formatColumns({
          data: users,
          dataKeys: [
            'organization',
            'username',
            'email',
            'phone',
            'createdAt',
            'status',
          ],
          changeHeader: (x) =>
            x.reduce(
              (acc, curr) => ({
                ...acc,
                [curr]: (
                  <HeaderCell
                    value={curr as keyof User}
                    hasFilter={!!q[curr]}
                    onClearFilter={() => setQuery({ remove: [curr] })}
                    tableRef={tableRef}
                  />
                ),
              }),
              {}
            ),
          render(x) {
            return {
              status: capsule(x.status!),
              createdAt: new Date(x.createdAt!).toDateString(),
            }
          },
        })}
        onView={({ data }) => {
          store(data)
          router.push('/users/details')
        }}
      />
    </div>
  )
}
type K = keyof User

function fs(a: string) {
  return a ? a?.trim()?.toLowerCase() : ''
}

const filterOptions: FilterOption<K>[] = [
  {
    key: 'organization',
    type: 'text',
  },
  {
    key: 'username',
    type: 'text',
  },
  {
    key: 'email',
    type: 'text',
  },
  {
    key: 'phone',
    type: 'text',
  },
  {
    key: 'createdAt',
    label: 'Date Joined',
    type: 'date',
  },
  {
    key: 'status',
    type: 'select',
    selectOptions: ['Active', 'Inactive'],
  },
]

const header: Partial<{ [K in keyof User]: string }> = {
  organization: 'ORGANIZATION',
  username: 'USERNAME',
  email: 'EMAIL',
  phone: 'PHONE NUMBER',
  createdAt: 'DATE JOINED',
  status: 'STATUS',
}

const HeaderCell = ({
  value,
  hasFilter,
  onClearFilter,
  tableRef,
}: {
  value: keyof User
  hasFilter: boolean
  onClearFilter: (e: React.MouseEvent) => void
  tableRef: React.RefObject<TableRef | null>
}) => {
  return (
    <div className={styles.headerCell}>
      <p>{header[value]}</p>
      <FilterPopup<keyof User>
        filterOptions={filterOptions}
        tableRef={tableRef}
      >
        <div
          className={styles.filter}
          onClick={(e) => {
            if (hasFilter) {
              e.stopPropagation()
              onClearFilter(e)
            }
          }}
        >
          {hasFilter ? <RemoveFilterIcon /> : <FilterIcon />}
        </div>
      </FilterPopup>
    </div>
  )
}

export default Users
