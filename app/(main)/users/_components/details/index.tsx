'use client'

import { Fragment, useState } from 'react'
import styles from '@/public/scss/customers/users/userDetail.module.scss'
import {
  ArrowLeftLongIcon,
  StarEmptyIcon,
  StarFilledIcon,
  UserProfileIcon,
} from '@/public/assets/svg/random'
import { useStoredUser } from '../useStoredUser'
import { useRouter } from 'next/navigation'
import { User } from '@/components/types/user'

function UserDetail() {
  const router = useRouter()
  const { remove, storedUser: user } = useStoredUser()

  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          remove()
          router.back()
        }}
        className={styles.backTextBody}
      >
        <ArrowLeftLongIcon />
        <p className={styles.backText}>Back to Users</p>
      </div>
      <div className={styles.titleBody}>
        <h1 className={styles.title}>User Details</h1>
        <div className="flex-row gap-2">
          <button className={styles.dangerButton}>Blacklist User</button>
          <button className={styles.goodButton}>Activate User</button>
        </div>
      </div>
      <UserProfile user={user} />
    </div>
  )
}

const UserProfile = ({ user }: { user: User | null }) => {
  const [activeTab, setActiveTab] = useState('General Details')

  const navItems = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System',
  ]

  const renderStars = (total = 3) => {
    return Array.from({ length: total }, (_, index) => (
      <Fragment key={index}>
        {index === 0 ? <StarFilledIcon /> : <StarEmptyIcon />}
      </Fragment>
    ))
  }
  const userInformation: {
    title: string
    data: {
      label: string
      value: string | undefined
    }[]
  }[] = [
    {
      title: 'Personal Information',
      data: [
        { label: 'Full Name', value: user?.fullName },
        { label: 'Phone Number', value: user?.phone },
        { label: 'Email Address', value: user?.email },
        { label: 'BVN', value: user?.bvn },
        { label: 'Gender', value: user?.gender },
        { label: 'Marital Status', value: user?.maritalStatus },
        { label: 'Children', value: 'None' },
        { label: 'Type of Residence', value: user?.residence },
      ],
    },
    {
      title: 'Education and Employment',
      data: [
        { label: 'Level of Education', value: user?.levelOfEducation },
        { label: 'Employment Status', value: user?.employmentStatus },
        { label: 'Sector of Employment', value: user?.sectorOfEmployment },
        { label: 'Duration of Employment', value: user?.durationOfEmplyment },
        { label: 'Office Email', value: user?.officeEmail },
        { label: 'Monthly Income', value: user?.monthlyIncome },
        { label: 'Loan Repayment', value: user?.loanRepayment },
      ],
    },
    {
      title: 'Socials',
      data: [
        { label: 'Twitter', value: user?.twitterUrl },
        { label: 'Facebook', value: user?.facebookUrl },
        { label: 'Instagram', value: user?.instagramUrl },
      ],
    },
    {
      title: 'Guarantor',
      data: [
        { label: 'Full Name', value: user?.guarantorFullName },
        { label: 'Phone Number', value: user?.guarantorPhoneNumber },
        { label: 'Email Address', value: user?.guarantorEmailAddress },
        { label: 'Relationship', value: user?.guarantorRelationship },
      ],
    },
  ]
  const formatCurrency = (number: number) => {
    return 'NGN ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  }
  return (
    <div className="flex-col gap-8">
      <div className={styles.shadowCard}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileInfo}>
            <div className={styles.avatar}>
              <UserProfileIcon />
            </div>

            <div className={styles.userDetails}>
              <div>
                <h1 className={styles.userName}>{user?.fullName}</h1>
                <p className={styles.userId}>
                  {user?.id?.toString().slice(0, 1) +
                    '_' +
                    Math.random().toString(36).substring(2, 9)}
                </p>
              </div>

              {/* <div className={styles.metaInfo}> */}
              <div className={styles.metaItem}>
                <div className={styles.metaLabel}>Users Tier</div>
                <div className={styles.metaValue}>
                  <div className={styles.tierStars}>{renderStars(3)}</div>
                </div>
              </div>

              <div className={styles.metaItem}>
                <div className={`${styles.metaValue} ${styles.amount}`}>
                  {formatCurrency(Number(user?.monthlyIncome))}
                </div>
                <div className={`${styles.metaValue} ${styles.bankInfo}`}>
                  9912345678/Providus Bank
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <div className={styles.navList}>
            {navItems.map((item) => (
              <div
                key={item}
                className={`${styles.navItem} ${
                  activeTab === item
                    ? styles.navItemActive
                    : styles.navItemInactive
                }`}
                onClick={() => setActiveTab(item)}
              >
                <span className={styles.navText}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.shadowCard}>
        <div className={styles.informationSection}>
          {userInformation.map(({ title, data }) => (
            <div key={title} className={styles.section}>
              <p className={styles.mainText}>{title}</p>

              <div className={styles.sectionContent}>
                {data.map(({ label, value }) => (
                  <div key={label} className={styles.group}>
                    <p className={styles.label}>{label}</p>
                    <p className={styles.value}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserDetail
