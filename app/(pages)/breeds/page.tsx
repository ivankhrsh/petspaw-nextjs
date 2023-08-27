'use client'

import { BreadCrumbs } from '@/components/BreadCrumbs/BreadCrumbs';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { type CatData } from '@/types/CatData';
import { getData } from '@/utils/getData';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { BreedsLayout } from '@/components/ImagesLayout/BreedsLayout';

const cn = classNames.bind(styles)

export default function Breeds () {
  const [breeds, setBreeds] = useState<CatData[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData<CatData[]>('breeds')
      .then((data) => {
        setBreeds((data.map((item) => ({
          ...item,
          image: item.image || {
            url: 'https://images.emojiterra.com/google/noto-emoji/unicode-15/color/svg/1f431.svg',
            width: 500,
            height: 500
          }
        }))))
      }).catch((error) => { setError(error) })
      .finally(() => { setIsLoading(false) })
  }, [])

  return (
    <div className={cn('contentContainer')}>
      <div className={cn('breadCrumbs')}>
        <BreadCrumbs/>
      </div>
      {isLoading && (<LoadingSpinner/>)}
      {error && (<div className={cn('error')}>{error}</div>)}
      {!isLoading && breeds.length === 0 && (
        <p className={cn('emptyMessage')}>No item found</p>
      )}
      <BreedsLayout breeds={breeds}/>
    </div>
  )
}
