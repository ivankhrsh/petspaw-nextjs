'use client'

import { NavigationButton } from '@/components/NavigationButton/NavigationButton';
import styles from './page.module.scss'
import classNames from 'classnames/bind';
import { SelectItem } from '@/components/SelectItem/SelectItem';

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const cn = classNames.bind(styles);

async function getData() {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5');
 
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
 
  const data: CatImage[] = await response.json();
  return data;
}

export default async function Gallery() {
  const data = await getData();

  return (
  <div>
    <div className={cn('pageContent')}>

      <div className={cn('breadCrumbs')}>
        <div className={cn('backButton')}>
          <NavigationButton link='/' text='<'/>
        </div>

        <div className={cn('currentPageButton')}>
          <NavigationButton link='/gallery' text='Gallery'/>
        </div>
      </div>

      <div className={cn('uploadButton')}>
        <NavigationButton link='/' text='Upload'/>
      </div>

      <div className={cn('contentContainer')}>
        <div className={cn('filterParams')}>
          <SelectItem
            options={[
              { title: 'Random', value: 'RAND' },
              { title: 'Ascending', value: 'ASC' },
              { title: 'Descending', value: 'DESC' },
            ]}
            onChange={
              (event: React.ChangeEvent<HTMLSelectElement>) => {
                console.log("User Selected Value - ", event.target.value)
            }}
            title={'Order'}
          />

          <SelectItem
            options={[
              { title: 'All', value: 'jpg,gif,png' },
              { title: 'Static', value: 'jpg,png' },
              { title: 'Animated', value: 'gif' },
            ]}
            onChange={
              (event: React.ChangeEvent<HTMLSelectElement>) => {
                console.log("User Selected Value - ", event.target.value)
            }}
            title={'Type'}
          />

          <SelectItem
            options={[
              { title: 'TODO API', value: '' },
            ]}
            onChange={
              (event: React.ChangeEvent<HTMLSelectElement>) => {
                console.log("User Selected Value - ", event.target.value)
            }}
            title={'Breed'}
          />

          <SelectItem
            options={[
              { title: '5 items per page', value: '5' },
              { title: '10 items per page', value: '10' },
              { title: '15 items per page', value: '15' },
              { title: '20 items per page', value: '20' },
            ]}
            onChange={
              (event: React.ChangeEvent<HTMLSelectElement>) => {
                console.log("User Selected Value - ", event.target.value)
            }}
            title={'Breed'}
          />
          Refresh
        </div>

        {data.length && data.map(item => (
          <img className={cn('catImage')} key={item.id} src={item.url} alt='cat'/>
        ))}
      </div>
    </div>
  </div>
  )
}
