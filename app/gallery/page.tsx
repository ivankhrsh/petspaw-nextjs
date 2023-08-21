import { NavigationButton } from '@/components/NavigationButton/NavigationButton';
import styles from './page.module.scss'
import classNames from 'classnames/bind';

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

      <div className={cn('imagesContainer')}>
        <ul className={cn('filterParams')}>
          <li>Order</li>
          <li>Type</li>
          <li>Breed</li>
          <li>Limit</li>
          Refresh
        </ul>

        {data.length && data.map(item => (
          <img className={cn('catImage')} key={item.id} src={item.url} alt='cat'/>
        ))}
      </div>
    </div>
  </div>
  )
}
