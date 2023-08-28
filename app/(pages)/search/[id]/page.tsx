'use client'

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import classNames from 'classnames/bind';
import { BreadCrumbs } from '@/components/BreadCrumbs/BreadCrumbs';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { BreedsLayout } from '@/components/ImagesLayout/BreedsLayout';
import { getData } from '@/utils/getData';
import { type CatData } from '@/types/CatData';

const cn = classNames.bind(styles);

export default function Search ({ params }: { params: { id: string } }) {
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
  }, []);

  const filteredBreeds = breeds.filter((breed) => {
    const searchParams = params.id?.toLowerCase().trim();
    const breedName = breed.name?.toLowerCase();
    const breedId = breed.id?.toLowerCase();
    return breedName.includes(searchParams) || breedId.includes(searchParams);
  });

  return (
    <div>
      <div className={cn('contentContainer')}>
        <div className={cn('breadCrumbs')}>
          <BreadCrumbs/>
        </div>
        {isLoading && (<LoadingSpinner/>)}
        {error && (<div className={cn('error')}>{error}</div>)}
        {!isLoading && (
          <p className={cn('resultMessage')}>{`Search results for: ${params.id}`}</p>
        )}
        {(!isLoading && filteredBreeds.length === 0) &&
          (<p className={cn('emptyMessage')}>No item found</p>)
        }
        <BreedsLayout breeds={filteredBreeds.slice(0, 25)}/>
      </div>
    </div>
  )
}
