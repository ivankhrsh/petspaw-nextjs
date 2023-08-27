'use client'

import { getData } from '@/utils/getData';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import classNames from 'classnames/bind';
import styles from './page.module.scss';
import { type CatImage } from '@/types/CatData';
import { filterToQuery } from '@/utils/filterToQuery';
import { type BreedFullInfo } from '@/types/breed';
import { BreadCrumbs } from '@/components/BreadCrumbs/BreadCrumbs';

const cn = classNames.bind(styles);

export default function BreedPage ({ params }: { params: { id: string } }) {
  const [images, setImages] = useState<CatImage[] | null>(null);
  const [breed, setBreed] = useState<BreedFullInfo | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const filters = {
    limit: 1,
    breed_ids: params.id
  };

  useEffect(() => {
    const fetchBreedData = async () => {
      setIsLoading(true);
      try {
        const [imagesResponse, breedData] = await Promise.all([
          getData<CatImage[]>(`images/search?${filterToQuery(filters)}`),
          getData<BreedFullInfo>(`breeds/${params.id}`)
        ]);
        setImages(imagesResponse);
        setBreed(breedData);
      } catch (error) {
        setError(error as string);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreedData().catch((error) => {
      setError(error);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className={cn('content')}>
      <div className={cn('breadCrumbs')}>
        <BreadCrumbs/>
      </div>
      {isLoading && (<LoadingSpinner/>)}
      {error && (<div className={cn('error')}>{error}</div>)}
      <div className={cn('imageContainer')}>
        {
          images?.map(item => (
            <Image
              className={cn('image')}
              src={item.url}
              alt='cat'
              width={item.width}
              height={item.height}
              key={item.id}
             />
          ))
        }
      </div>
      <article className={cn('breed')}>
        <h1 className={cn('breedTitle')}>{breed?.name}</h1>
        <div className={cn('breedInfo')}>
          <div className={cn('breedBlock', 'breedTemp')}>
            <p className={cn('breedSubTitle')}>Temperament:</p>
            <p className={cn('breedText')}>{breed?.temperament}</p>
          </div>
          <div className={cn('breedBlock', 'breedOrigin')}>
            <p className={cn('breedSubTitle')}>Origin:</p>
            <p className={cn('breedText')}>{breed?.origin}</p>
          </div>
          <div className={cn('breedBlock', 'breedWeight')}>
            <p className={cn('breedSubTitle')}>Weight:</p>
            <p className={cn('breedText')}>{breed?.weight.metric}</p>
          </div>
          <div className={cn('breedBlock', 'breedLife')}>
            <p className={cn('breedSubTitle')}>Life span:</p>
            <p className={cn('breedText')}>{breed?.life_span}</p>
          </div>
        </div>
      </article>

    </div>
  );
}
