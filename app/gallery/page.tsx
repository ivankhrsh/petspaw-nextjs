'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/Button/Button'
import styles from './page.module.scss'
import classNames from 'classnames/bind'
import { SelectItem } from '@/components/SelectItem/SelectItem'
import { getData } from '@/utils/getData'
import { ActionButton } from '@/components/ActionButton/ActionButton'
import { Header } from '@/components/Header/Header'
import { type CatImage } from '@/types/CatImage'
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner'

interface Breed {
  id: number
  name: string
}

interface Filter {
  order?: string
  mime_types?: string
  breed_ids?: string
  limit: number
}

const cn = classNames.bind(styles)

const filterToQuery = (filters: Filter): string => {
  const queryParams = new URLSearchParams()

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      queryParams.append(key, value.toString())
    }
  })

  return queryParams.toString()
}

export default function Gallery () {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<Filter>({
    limit: 5
  });

  useEffect(() => {
    getData<CatImage[]>(`images/search?${filterToQuery(filters)}`)
      .then((data) => { setCats(data) }).catch((error) => { setError(error) })

    getData<Breed[]>('breeds')
      .then((data) => { setBreeds(data) }).catch((error) => { setError(error) })
  }, [])

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>, filterType: string) => {
    const { value } = event.target
    setFilters(prevFilters => {
      return { ...prevFilters, [filterType]: value }
    })
  }

  const handleReload = async () => {
    const data = await getData<CatImage[]>(`images/search?${filterToQuery(filters)}`);
    setCats(data);
  }

  return (
  <div>
    <div className={cn('pageContent')}>
    <Header/>
      <div className={cn('contentContainer')}>
        <div className={cn('filterParams')}>
        <div className={cn('breadCrumbs')}>
          <div className={cn('backButton')}>
            <Button link='/' btnType='button' backBtn={true}/>
          </div>

          <div className={cn('currentPageButton')}>
            <Button link='/gallery' text='Gallery' btnType='active'/>
          </div>
        </div>

        <div className={cn('uploadButton')}>
          <Button link='/upload' text='Upload' btnType='button' />
        </div>

          <SelectItem
            options={[
              { title: 'Random', value: 'RAND' },
              { title: 'Ascending', value: 'ASC' },
              { title: 'Descending', value: 'DESC' }
            ]}
            title={'Order'}
            onChange={(event) => { handleFilterChange(event, 'order') }}
            />

          <SelectItem
            options={[
              { title: 'All', value: 'jpg,gif,png' },
              { title: 'Static', value: 'jpg,png' },
              { title: 'Animated', value: 'gif' }
            ]}
            title={'Type'}
            onChange={(event) => { handleFilterChange(event, 'mime_types') }}
            />

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
          <div className={cn('reloadButton')}>
            <ActionButton btnType='button' onClick={handleReload}/>
          </div>
        </div>

        <div className={cn('photosContainer')}>
          {error && (<div className={cn('error')}>{error}</div>)}
          {((cats.length > 0)
            ? (cats.map(item => (
            <div className={cn('imageContainer')} key={item.id}>
              <img className={cn('catImage')} src={item.url} alt='cat'/>
              <div className={cn('customOverlay')}></div>

              <div className={cn('likeContainer')}>
                <div className={cn('likeButton')}>Like</div>
              </div>
            </div>
              )))
            : (
              <div className="loading-spinner">
                <LoadingSpinner />
              </div>
              ))}
        </div>
      </div>
    </div>
  </div>
  )
}
