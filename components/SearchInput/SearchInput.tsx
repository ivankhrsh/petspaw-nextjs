'use client'

import React, { type FC, useState } from 'react'
import classNames from 'classnames/bind';
import styles from './SearchInput.module.scss'
import { getData } from '@/utils/getData';
import { type CatData } from '@/types/CatData';
import { usePathname, useRouter } from 'next/navigation';
import { SearchButton } from '../Button/SearchButton';

const cn = classNames.bind(styles);

export const Search: FC = () => {
  const [searchParams, setSearchParams] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(e.target.value);
  }

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchParams.length > 0) {
      const params = new URLSearchParams({ q: searchParams });
      try {
        await getData<CatData[]>(`breeds/search?q=${params.toString()}`);
        router.push(`/search/${searchParams}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  const handleClick = async () => {
    if (searchParams.length > 0) {
      const params = new URLSearchParams({ q: searchParams });
      try {
        await getData<CatData[]>(`breeds/search?q=${params.toString()}`);
        router.push(`/search/${searchParams}`);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search for breeds by name"
        className={cn('searchItem', { active: pathname.includes('/search') })}
        value={searchParams}
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
      />
        <SearchButton onClick={handleClick} btnType="search"/>
    </>
  )
};
