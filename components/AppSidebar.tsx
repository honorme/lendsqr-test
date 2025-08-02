'use client'

import {
  ArrowDownIcon,
  DashboardIcon,
  SwitchOrganisationIcon,
} from '@/public/assets/svg/sidebar'
import {
  FeesAndChargesIcon,
  LoanProductsIcon,
  OrganisationIcon,
  ReportsIcon,
  SavingsProductsIcon,
  ServiceAccountsIcon,
  ServicesIcon,
  SettlementsIcon,
  TransactionsIcon,
} from '@/public/assets/svg/sidebar/businesses'
import {
  DecisionModelIcon,
  GuarantorsIcon,
  KarmaIcon,
  LoanRequestsIcon,
  LoansIcon,
  SavingsIcon,
  UsersIcon,
  WhiteListIcon,
} from '@/public/assets/svg/sidebar/customers'
import {
  AuditLogsIcon,
  FeesAndPricingIcon,
  PreferencesIcon,
} from '@/public/assets/svg/sidebar/settings'
import styles from '@/public/scss/sidebar.module.scss'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function AppSidebar() {
  const pathname = usePathname()

  type MenuItem = {
    title?: string
    options: {
      label: string
      href: string
      icon: React.FunctionComponent
    }[]
  }

  const menuItems: MenuItem[] = [
    {
      options: [{ label: 'Dashboard', icon: DashboardIcon, href: '#' }],
    },
    {
      title: 'CUSTOMERS',
      options: [
        { label: 'Users', icon: UsersIcon, href: '/users' },
        { label: 'Guarantors', icon: GuarantorsIcon, href: '#' },
        { label: 'Loans', icon: LoansIcon, href: '#' },
        { label: 'Decision Models', icon: DecisionModelIcon, href: '#' },
        { label: 'Savings', icon: SavingsIcon, href: '#' },
        { label: 'Loan Requests', icon: LoanRequestsIcon, href: '#' },
        { label: 'Whitelist', icon: WhiteListIcon, href: '#' },
        { label: 'Karma', icon: KarmaIcon, href: '#' },
      ],
    },
    {
      title: 'BUSINESSES',
      options: [
        { label: 'Organization', icon: OrganisationIcon, href: '#' },
        { label: 'Loan Products', icon: LoanProductsIcon, href: '#' },
        { label: 'Savings Products', icon: SavingsProductsIcon, href: '#' },
        { label: 'Fees and Charges', icon: FeesAndChargesIcon, href: '#' },
        { label: 'Transactions', icon: TransactionsIcon, href: '#' },
        { label: 'Services', icon: ServicesIcon, href: '#' },
        { label: 'Service Account', icon: ServiceAccountsIcon, href: '#' },
        { label: 'Settlements', icon: SettlementsIcon, href: '#' },
        { label: 'Reports', icon: ReportsIcon, href: '#' },
      ],
    },
    {
      title: 'SETTINGS',
      options: [
        { label: 'Preferences', icon: PreferencesIcon, href: '#' },
        { label: 'Fees and Pricing', icon: FeesAndPricingIcon, href: '#' },
        { label: 'Audit Logs', icon: AuditLogsIcon, href: '#' },
      ],
    },
  ]

  return (
    <div className={styles.sidebar}>
      <div className={styles.switchOrg}>
        <SwitchOrganisationIcon />
        <p>Switch Organization</p>
        <ArrowDownIcon />
      </div>

      <div className={styles.menuItemsContainer}>
        <div className={styles.menuItems}>
          <div className={styles.whiteFadeaway} />

          {menuItems.map((item, index) => (
            <div className={styles.menuItem} key={index}>
              {item.title && <p className={styles.itemTitle}>{item.title}</p>}

              <div className={styles.options}>
                {item.options.map((option) => {
                  const IconComponent = option.icon

                  const isActive = pathname.startsWith(option.href)

                  return (
                    <Link
                      key={option.label}
                      href={option.href}
                      className={`${styles.item} ${
                        isActive ? styles.active : ''
                      }`}
                    >
                      <div className={styles.itemIcon}>
                        <IconComponent />
                      </div>
                      <p>{option.label}</p>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AppSidebar
