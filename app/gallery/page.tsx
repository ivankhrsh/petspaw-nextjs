'use client'

import { Button } from '@/components/Button/Button';
import styles from './page.module.scss'
import classNames from 'classnames/bind';
import { SelectItem } from '@/components/SelectItem/SelectItem';
import { Reload } from '@/public/svg';
import { getData } from '@/utils/getData';

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

const cn = classNames.bind(styles);

export default async function Gallery() {
  const [cats, breeds] = await Promise.all([
    getData<CatImage[]>('images/search?limit=5'), 
    getData<Breed[]>('breeds')
  ]);

  const modifiedBreeds = breeds.map(({ name, id }) => ({
    title: name,
    value: id.toString(),
  }));

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
            title={'Type'}
          />

          <SelectItem
            options={modifiedBreeds}
            title={'Breed'}
          />

          <SelectItem
            options={[
              { title: '5 items per page', value: '5' },
              { title: '10 items per page', value: '10' },
              { title: '15 items per page', value: '15' },
              { title: '20 items per page', value: '20' },
            ]}
            title={'Limit'}
          />
          <div className={cn('reloadButton')}>
            <Button link='/gallery' text={<Reload/>} btnType='nav'/>
          </div>
        </div>

        <div className={cn('photosContainer')}>
          {cats.length > 0 && cats.map(item => (
            <img className={cn('catImage')} key={item.id} src={item.url} alt='cat'/>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
