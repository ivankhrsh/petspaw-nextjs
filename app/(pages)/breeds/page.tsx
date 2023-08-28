'use client'

import { BreadCrumbs } from '@/components/BreadCrumbs/BreadCrumbs';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import { type CatData } from '@/types/CatData';
import { getData } from '@/utils/getData';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { BreedsLayout } from '@/components/ImagesLayout/BreedsLayout';
import { SelectItem } from '@/components/SelectItem/SelectItem';

const cn = classNames.bind(styles)

export default function Breeds () {
  const [breeds, setBreeds] = useState<CatData[]>([]);
  const [breedsList, setBreedsList] = useState<CatData[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [selectedBreed, setSelectedBreed] = useState<string | null>(null);

  const fetchBreeds = (path: string) => {
    setIsLoading(true);
    getData<CatData[]>(path)
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
  }

  useEffect(() => {
    fetchBreeds('breeds');
    getData<CatData[]>('breeds')
      .then((data) => { setBreedsList(data) }).catch((error) => { setError(error) })
      .finally(() => { setIsLoading(false) })
  }, []);

  const handleBreedChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedBreed(value);
  }

  const handleLimitChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setLimit(+value);
  }

  const filteredBreeds = breeds.filter((item) => (
    selectedBreed ? item.id === selectedBreed : item
  )).slice(0, limit);

  return (
    <div className={cn('contentContainer')}>
      <div className={cn('breadCrumbs')}>
        <BreadCrumbs/>
      </div>
      <div className={cn('filterParams')}>
      <div className={cn('filter', 'filterBreed')}>
            <SelectItem
                options={
                  (breedsList.map(({ name, id }) =>
                    ({
                      title: name,
                      value: id.toString()
                    })))
                }
                title={'Breed'}
                showTitle={false}
                onChange={(event) => { handleBreedChange(event) }}
                defaultOption='All breeds'
                gray={true}
              />
          </div>
          <div className={cn('filter', 'filterLimit')}>
            <SelectItem
                options={[
                  { title: '5 items per page', value: 5 },
                  { title: '10 items per page', value: 10 },
                  { title: '15 items per page', value: 15 },
                  { title: '20 items per page', value: 20 }
                ]}
                title={'Limit'}
                showTitle={false}
                onChange={(event) => { handleLimitChange(event) }}
                gray={true}
              />
          </div>
      </div>
      {isLoading && (<LoadingSpinner/>)}
      {error && (<div className={cn('error')}>{error}</div>)}
      {!isLoading && breeds.length === 0 && (
        <p className={cn('emptyMessage')}>No item found</p>
      )}
      <BreedsLayout breeds={filteredBreeds}/>
    </div>
  )
}
