import { Button } from '@/components/Button/Button';
import styles from './page.module.scss'
import classNames from 'classnames/bind';
import { SelectItem } from '@/components/SelectItem/SelectItem';
import { Reload } from '@/public/svg';

interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

const cn = classNames.bind(styles);

async function getData() {
  const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=5', 
  {cache: 'no-store'});
 
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
          <Button link='/' text='Upload' btnType='button' />
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
            options={[
              { title: 'TODO API', value: '' },
            ]}
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
          {data.length > 0 && data.map(item => (
            <img className={cn('catImage')} key={item.id} src={item.url} alt='cat'/>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
