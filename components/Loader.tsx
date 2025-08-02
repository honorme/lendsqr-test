'use client'

import loaderStyles from '@/public/scss/components/loaders/def.module.scss'
import { LendsqrLogo } from '@/public/assets/svg'

function Loader() {
  return (
    <div className={loaderStyles.loaderContainer}>
      <div className={loaderStyles.logoWrapper}>
        <div className={loaderStyles.slinkyRoll}>
          <LendsqrLogo />
        </div>
        <div className={loaderStyles.shadowElement} />
      </div>
    </div>
  )
}

export default Loader
