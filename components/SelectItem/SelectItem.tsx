import styles from './SelectItem.module.scss'
import classNames from 'classnames/bind';
import React, { type FC } from 'react';

const cn = classNames.bind(styles);

interface Option {
  title: string
  value: string | number
}

interface Props {
  options: Option[]
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void
  title: string
  defaultOption?: string
  showTitle?: boolean
  gray?: boolean
}

export const SelectItem: FC<Props> = ({ options, onChange, title, defaultOption, showTitle = true, gray }) => {
  return (
    <div className={cn('selectItem')} >
     {showTitle && <label className={cn('selectLabel')} htmlFor={title}>{title}</label>}
      <select
        className={cn('selectMenu', { selectMenuGray: gray })}
        id={title}
        onChange={(event) => { onChange(event); }}
      >
      {defaultOption && <option value="none" hidden>{defaultOption}</option>}
        {options.map((option: Option) => {
          return (
              <option value={option.value} key={option.value} className={cn('optionItem')}>
                {option.title}
              </option>
          )
        })}
      </select>
    </div>
  )
}
