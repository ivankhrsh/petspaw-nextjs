'use client'

import { Button } from '@/components/Button/Button';
import styles from './page.module.scss'
import classNames from 'classnames/bind';
import { SelectItem } from '@/components/SelectItem/SelectItem';
import { Loader, Reload } from '@/public/svg';
import { getData } from '@/utils/getData';
import { useEffect, useState } from 'react';
import { ReloadButton } from '@/components/ReloadButton/ReloadButton';

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

interface Breed {
  id: number;
  name: string;
}

interface Filter {
  [title: string]: string | number;
}

const cn = classNames.bind(styles);

const filterToQuery = (filters: Filter[]) => {
  const queryParams = new URLSearchParams();

  filters.forEach(filter => {
    const [key, value] = Object.entries(filter)[0];
    queryParams.append(key, value.toString());
  });

  return queryParams.toString();
}

export default function Gallery() {
  const [cats, setCats] = useState<CatImage[]>([]);
  const [breeds, setBreeds]= useState<Breed[]>([]);
  const [filters, setFilters] = useState<Filter[]>([{
    limit: 5,
  }])

  useEffect(() => {
    getData<CatImage[]>(`images/search?${filterToQuery(filters)}`)
        .then((data) => setCats(data))

    getData<Breed[]>('breeds')
      .then((data) => setBreeds(data))
}, []); 

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>, filterType: string) => {
    const { value } = event.target;
    const newFilter = { [filterType]: value };
    setFilters(prevFilters => {
      const updatedFilters = prevFilters.filter(filter => !filter.hasOwnProperty(filterType));
      return [...updatedFilters, newFilter];
    });
  }

  const handleReload = () => {
    getData<CatImage[]>(`images/search?${filterToQuery(filters)}`)
    .then((data) => setCats(data));
  }

  return (
  <div>
    <div className={cn('pageContent')}>

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
              { title: 'Descending', value: 'DESC' },
            ]}
            title={'Order'}
            onChange={(event) => handleFilterChange(event, 'order')}
            />

          <SelectItem
            options={[
              { title: 'All', value: 'jpg,gif,png' },
              { title: 'Static', value: 'jpg,png' },
              { title: 'Animated', value: 'gif' },
            ]}
            title={'Type'}
            onChange={(event) => handleFilterChange(event, 'mime_types')}
            />

          <SelectItem
            options={
              (breeds.map(({ name, id }) => 
              ({ title: name,
                value: id.toString(),
              })))
            }
            title={'Breed'}
            onChange={(event) => handleFilterChange(event, 'breed')}
            defaultOption='None'
            />
          <SelectItem
            options={[
              { title: '5 items per page', value: '5' },
              { title: '10 items per page', value: '10' },
              { title: '15 items per page', value: '15' },
              { title: '20 items per page', value: '20' },
            ]}
            title={'Limit'}
            onChange={(event) => handleFilterChange(event, 'limit')}
            />
          <div className={cn('reloadButton')}>
            <ReloadButton text={<Reload/>} btnType='nav' onClick={handleReload}/>
          </div>
        </div>

        <div className={cn('photosContainer')}>
          {(cats.length > 0) ? (cats.map(item => (
            <img className={cn('catImage')} key={item.id} src={item.url} alt='cat'/>
          )))
            : <Loader/>}
        </div>
      </div>
    </div>
  </div>
  )
}
