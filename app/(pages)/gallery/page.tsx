'use client'

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import classNames from 'classnames/bind';
import { SelectItem } from '@/components/SelectItem/SelectItem';
import { getData } from '@/utils/getData';
import { type Breed, type CatImage } from '@/types/CatData';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { Reload } from '@/public/svg';
import { type Filter } from '@/types/filter';
import { filterToQuery } from '@/utils/filterToQuery';
import { ActionButton, Button } from '@/components/Button';
import { BreadCrumbs } from '@/components/BreadCrumbs/BreadCrumbs';
import { GalleryLayout } from '@/components/ImagesLayout/GalleryLayout';

const cn = classNames.bind(styles)

export default function Gallery () {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<Filter>({
    limit: 5
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData<CatImage[]>(`images/search?${filterToQuery(filters)}`)
      .then((data) => { setCats(data) }).catch((error) => { setError(error) })

    getData<Breed[]>('breeds')
      .then((data) => { setBreeds(data) }).catch((error) => { setError(error) })
      .finally(() => { setIsLoading(false) })
  }, [])

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    filterType: string
  ) => {
    const { value } = event.target
    setFilters(prevFilters => {
      return { ...prevFilters, [filterType]: value }
    })
  }

  const handleReload = async () => {
    setIsLoading(true);
    setCats([]);
    const data = await getData<CatImage[]>(`images/search?${filterToQuery(filters)}`);
    setIsLoading(false);
    setCats(data);
  }

  return (
    <div>
      <div className={cn('serviceContent')}>
      <div className={cn('breadCrumbs')}>
        <BreadCrumbs text='Gallery'/>
        </div>
        <div className={cn('uploadButton')}>
          <Button link='/upload' text='Upload' type='button' />
        </div>
        </div>
        <div className={cn('filterParams')}>
          <div className={cn('filterOrder')}>
            <SelectItem
              options={[
                { title: 'Random', value: 'RAND' },
                { title: 'Ascending', value: 'ASC' },
                { title: 'Descending', value: 'DESC' }
              ]}
              title={'Order'}
              onChange={(event) => { handleFilterChange(event, 'order') }}
              />
          </div>
          <div className={cn('filterType')}>
            <SelectItem
              options={[
                { title: 'All', value: 'jpg,gif,png' },
                { title: 'Static', value: 'jpg,png' },
                { title: 'Animated', value: 'gif' }
              ]}
              title={'Type'}
              onChange={(event) => { handleFilterChange(event, 'mime_types') }}
              />
          </div>
          <div className={cn('filterBreed')}>
            <SelectItem
              options={
                (breeds.map(({ name, id }) =>
                  ({
                    title: name,
                    value: id.toString()
                  })))
              }
              title={'Breed'}
              onChange={(event) => { handleFilterChange(event, 'breed_ids') }}
              defaultOption='None'
              />
          </div>
          <div className={cn('filterLimit')}>
            <SelectItem
              options={[
                { title: '5 items per page', value: 5 },
                { title: '10 items per page', value: 10 },
                { title: '15 items per page', value: 15 },
                { title: '20 items per page', value: 20 }
              ]}
              title={'Limit'}
              onChange={(event) => { handleFilterChange(event, 'limit') }}
              />
          </div>
          <div className={cn('reloadButton')}>
            <ActionButton
              type='nav'
              text={<Reload/>}
              onClick={handleReload}
            />
          </div>
        </div>
          {isLoading && (<LoadingSpinner/>)}
          {error && (<div className={cn('error')}>{error}</div>)}
            <GalleryLayout cats={cats} />
      </div>
  )
}
