'use client'

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import classNames from 'classnames/bind';
import { type CatFavourite } from '@/types/favourites';
import { getFav } from '@/utils/favourites';
import { BreadCrumbs } from '@/components/BreadCrumbs/BreadCrumbs';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { ImagesLayout } from '@/components/ImagesLayout/ImagesLayout';

const cn = classNames.bind(styles)

export default function Favourites () {
  const [favourites, setFavourites] = useState<CatFavourite[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFav<CatFavourite[]>('favourites')
      .then((data) => { setFavourites(data) })
      .catch((error) => { setError(error) })
      .finally(() => { setIsLoading(false) });
  }, [])

  const filterFav = (id: number) => {
    setFavourites(prevState => prevState.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className={cn('contentContainer')}>
      <div className={cn('breadCrumbs')}>
        <BreadCrumbs text='Favourites'/>
      </div>
      {isLoading && (<LoadingSpinner/>)}
      {error && (<div className={cn('error')}>{error}</div>)}
      {!isLoading && favourites.length === 0 && (
        <p className={cn('emptyMessage')}>No item found</p>
      )}
      <ImagesLayout cats={favourites} filter={filterFav}/>
      </div>
    </div>
  )
}
