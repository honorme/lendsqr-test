'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '@/public/scss/header.module.scss'
import { LendsqrLogo, LendsqrText } from '@/public/assets/svg'
import Avatar from '@/public/assets/images/avatar.png'
import {
  CaretDownIcon,
  NotificationIcon,
  SearchIcon,
} from '@/public/assets/svg/topbar'
import { useRouter } from 'next/navigation'

const AppHeader = () => {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoSearchBody}>
          {/* Logo */}
          <div className={styles.logo}>
            <LendsqrLogo />
            <LendsqrText />
          </div>

          {/* Search Bar */}
          <div className={styles.searchSection}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
              <input
                type="text"
                placeholder="Search for anything"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>
                <SearchIcon />
              </button>
            </form>
          </div>
        </div>

        <div className={styles.rightSection}>
          <Link href="#" className={styles.docsLink}>
            Docs
          </Link>

          <button className={styles.notificationButton}>
            <NotificationIcon />
          </button>

          <div
            className={styles.userProfile}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className={styles.userInfo}>
              <div className={styles.avatar}>
                <Image src={Avatar} alt="Adedeji" width={40} height={40} />
              </div>
              <span className={styles.userName}>Adedeji</span>
              <div className={styles.dropdownToggle}>
                <CaretDownIcon />
              </div>
            </div>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className={styles.dropdown}>
                <Link href="#" className={styles.dropdownItem}>
                  Profile
                </Link>
                <Link href="#" className={styles.dropdownItem}>
                  Settings
                </Link>
                <button
                  onClick={() => router.push('/signin')}
                  className={styles.dropdownItem}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
