import React from 'react'
import styles from '@/public/scss/auth.module.scss'
import LoginImage from '@/public/assets/images/login.png'
import Image from 'next/image'
import { LendsqrLogo, LendsqrText } from '@/public/assets/svg'

async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.auth}>
      <div className={styles.logoBody}>
        <LendsqrLogo />
        <LendsqrText className={styles.lendsqrText} />
      </div>
      <div className={styles.leftSide}>
        <Image src={LoginImage} alt="login" className={styles.fadingEdge} />
      </div>
      <div className={styles.rightSide}>{children}</div>
    </div>
  )
}

export default Layout
