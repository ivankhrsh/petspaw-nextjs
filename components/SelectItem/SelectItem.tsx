import styles from './SelectItem.module.scss'
import classNames from 'classnames/bind';
import { FC } from 'react';

const cn = classNames.bind(styles);

interface Option {
  title: string;
  value: string;
}

interface Props {
  options: Option[];
  onChange: (value: React.ChangeEvent<HTMLSelectElement>) => void;
  title: string;
}

export const SelectItem: FC<Props> = ({ options, onChange, title}) =>{


  return (
    <div className={cn('selectItem')} >
     <label className={cn('selectLabel')} htmlFor="orderSelect">{title}</label>
      <select className={cn('selectMenu')} id="orderSelect" onChange={(event) => onChange(event)}>
        {options.map((option, index) => {
            return <option key={index} >
                {option.title}
            </option>
        })}
      </select>
    </div>
  )
}