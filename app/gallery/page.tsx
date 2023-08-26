'use client'

import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import classNames from 'classnames/bind';
import { SelectItem } from '@/components/SelectItem/SelectItem';
import { getData } from '@/utils/getData';
import { Header } from '@/components/Header/Header';
import { type Breed, type CatImage } from '@/types/CatData';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { Heart, Reload } from '@/public/svg';
import { addFav, deleteFav, getFav } from '@/utils/favourites';
import { type CatFavourite } from '@/types/favourites';
import { BurgerMenu } from '@/components/BurgerMenu/BurgeMenu';
import Image from 'next/image';
import { type Filter } from '@/types/filter';
import { filterToQuery } from '@/utils/filterToQuery';
import { ActionButton, Button } from '@/components/Button';

const cn = classNames.bind(styles)

export default function Gallery () {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<Filter>({
    limit: 5
  });
  const [burger, setBurger] = useState(false);
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

  const toggleLike = async (id: string) => {
    const data: CatFavourite[] = await getFav('favourites');
    const currentItem = data.find((item) => item.image_id === id);
    if (currentItem) {
      await deleteFav(`favourites/${currentItem.id}`);
      return;
    }

    await addFav('favourites', { image_id: id });
  }

  const toggleBurger = () => {
    setBurger(prevState => !prevState);
  }

  if (burger) {
    return (
      <div className={cn('burgerMenu')}>
        <BurgerMenu onClick={toggleBurger}/>
      </div>
    )
  }

  return (
    <div>
      <div className={cn('pageContent')}>
        <Header onClick={toggleBurger}/>
        <div className={cn('contentContainer')}>
        <div className={cn('serviceContent')}>
        <div className={cn('breadCrumbs')}>
          <div className={cn('backButton')}>
            <Button link='/' type='button' backBtn={true}/>
          </div>

          <div className={cn('currentPageButton')}>
            <Button link='/gallery' text='Gallery' type='active'/>
          </div>
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
            <div className={cn(
              'photosContainer',
              { photosContainer5: cats.length === 5 },
              { photosContainer10: cats.length === 10 },
              { photosContainer15: cats.length === 15 },
              { photosContainer20: cats.length === 20 })}
            >
            {error && (<div className={cn('error')}>{error}</div>)}
            {(cats.length > 0) && (cats.map((item, index) => (
              <div className={cn('imageContainer', `img${index + 1}`)} key={item.id}>
                <Image
                  className={cn('catImage')}
                  src={item.url}
                  alt='cat'
                  width={item.width}
                  height={item.height}
                />
                <div className={cn('customOverlay')}></div>

                <div className={cn('likeContainer')}>
                  <ActionButton
                  text={<Heart/>}
                  onClick={async () => { await toggleLike(item.id); }}
                  type='nav'/>
                </div>
              </div>
            )))}
            </div>
        </div>
      </div>
    </div>
  )
}
