import React from 'react'
import styles from '@/public/scss/components/table/capsule.module.scss'
import { CapsuleAccent, capsuleAccent } from './accents'

export const capsule = (
  value: string,
  dot?: boolean,
  customAccent?: CapsuleAccent,
  size: 'small' | 'normal' = 'normal'
) => {
  const accent = customAccent || capsuleAccent(value as string)

  const getAccentClass = () => {
    switch (accent) {
      case 'recova':
        return { capsule: styles.recova, dot: styles.recovaDot }
      case 'amber':
        return { capsule: styles.amber, dot: styles.amberDot }
      case 'pink':
        return { capsule: styles.pink, dot: styles.pinkDot }
      case 'purple':
        return { capsule: styles.purple, dot: styles.purpleDot }
      case 'blue':
        return { capsule: styles.blue, dot: styles.blueDot }
      case 'sky-blue':
        return { capsule: styles.skyBlue, dot: styles.skyBlueDot }
      case 'red':
        return { capsule: styles.red, dot: styles.redDot }
      case 'green':
        return { capsule: styles.green, dot: styles.greenDot }
      case 'indigo':
        return { capsule: styles.indigo, dot: styles.indigoDot }
      case 'grey':
        return { capsule: styles.grey, dot: styles.greyDot }
      default:
        return { capsule: styles.default, dot: styles.defaultDot }
    }
  }

  const accentClass = getAccentClass()

  return (
    <div className={styles.wrapper}>
      <div
        className={`${styles.capsule} ${styles[size]} ${accentClass.capsule}`}
      >
        {!!dot && <div className={`${styles.dot} ${accentClass.dot}`} />}
        {value}
      </div>
    </div>
  )
}
