import { ArrowDownIcon } from '@/public/assets/svg/sidebar'
import React, { useState, useEffect, Fragment } from 'react'
import styles from '@/public/scss/components/table/filter.module.scss'
import { fcase } from '../helper/textFormat'
import { useUrlQuery } from '../hooks/urlQuery'

type FilterType = 'text' | 'boolean' | 'select' | 'date'
export type FilterOption<K extends string> = {
  key: K
  label?: string
  type: FilterType
  selectOptions?: Array<string>
}

const FilterPopup = <K extends string>({
  children,
  filterOptions,
}: {
  children: React.ReactNode
  filterOptions: FilterOption<K>[]
}) => {
  const [q, setQuery] = useUrlQuery<Partial<{ [T in keyof K]: string }>>()
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState<Partial<{ [T in keyof K]: string }>>({})

  const handleReset = () => {
    setValues({})
    setQuery({ options: { removeAll: true } })
  }

  const handleFilter = () => {
    setQuery({ query: values })
    setIsOpen(false)
  }

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest(`.${FILTER_POPUP_ID}`)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const onChangeValue = ({
    k,
    type,
    value: rawValue,
  }: {
    k: K
    type: FilterType
    value: string
  }) => {
    let value = rawValue
    if (type === 'date') {
      value = new Date(rawValue).toISOString()
    }
    setValues((prev) => ({ ...prev, [k]: value }))
  }

  return (
    <>
      <div onClick={() => setIsOpen((prev) => !prev)}>{children}</div>
      <div
        className={`${styles.popup} ${
          isOpen ? styles.open : styles.closed
        } ${FILTER_POPUP_ID}`}
      >
        {/* Form */}
        <div className={styles.form}>
          {filterOptions.map((option) => (
            <Fragment key={option.key}>
              {/* Text */}
              {option.type === 'text' && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    {option.label || fcase(option.key)}
                  </label>
                  <input
                    type="text"
                    value={q[option.key]}
                    onChange={(e) => {
                      onChangeValue({
                        k: option.key,
                        value: e.target.value,
                        type: option.type,
                      })
                    }}
                    placeholder={option.label || fcase(option.key)}
                    className={styles.input}
                  />
                </div>
              )}

              {/* Date */}
              {option.type === 'date' && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    {option.label || fcase(option.key)}
                  </label>
                  <input
                    type="date"
                    value={
                      q[option.key as keyof K]
                        ? new Date(q[option.key]!).toISOString().split('T')[0]
                        : ''
                    }
                    onChange={(e) => {
                      onChangeValue({
                        k: option.key,
                        value: e.target.value,
                        type: option.type,
                      })
                    }}
                    className={styles.input}
                  />
                </div>
              )}

              {/* Select */}
              {option.type === 'select' && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>
                    {option.label || fcase(option.key)}
                  </label>
                  <div className={styles.inputWrapper}>
                    <select
                      value={q[option.key]}
                      onChange={(e) => {
                        onChangeValue({
                          k: option.key,
                          value: e.target.value,
                          type: option.type,
                        })
                      }}
                      className={styles.select}
                    >
                      <option value="">Select</option>
                      {option.selectOptions?.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <ArrowDownIcon className={styles.selectIcon} />
                  </div>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Footer */}
        <div className={styles.whiteFadeaway} />
        <div className={styles.footer}>
          <button onClick={handleReset} className={styles.resetButton}>
            Reset
          </button>
          <button onClick={handleFilter} className={styles.filterButton}>
            Filter
          </button>
        </div>
      </div>
    </>
  )
}

const FILTER_POPUP_ID = 'filterPopup'

export default FilterPopup
