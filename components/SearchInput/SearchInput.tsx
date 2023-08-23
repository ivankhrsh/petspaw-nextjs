'use client'

import { FC, useState } from "react"
import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss'
import { getData } from "@/utils/getData";
import { CatData } from "@/types/CatData";
import { useRouter } from 'next/navigation';


const cn = classNames.bind(styles);


export const Search: FC = () => {
  const [searchParams, setSearchParams] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
   setSearchParams(e.target.value);
  }

  const handleKeyPress = async  (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchParams.length > 0) {
      console.log('Search submitted:', searchParams);
      const params = new URLSearchParams({q: searchParams});
      try {
        const res = await getData<CatData[]>(`breeds/search?q=${params}`);
        router.push(`/search/${searchParams}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  } 

  return (
      <input 
        type="text" 
        placeholder="Search for breeds by name" 
        className={cn('searchItem')}
        value={searchParams}
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
      />
  )
};