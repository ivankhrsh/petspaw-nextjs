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
      <p>page {params.id}</p>
      {isLoading && (<LoadingSpinner/>)}
      {error && (<div className={cn('error')}>{error}</div>)}
      <div className={cn('breadCrumbs')}>
      </div>
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
      <div className={cn('breedInfo')}>
        <p>{breed?.name}</p>
        <p>{breed?.description}</p>
        <p>{breed?.temperament}</p>
        <p>Origin: {breed?.origin}</p>
        <p>Weight: {breed?.weight.metric}</p>
        <p>Life span: {breed?.life_span}</p>
      </div>
    </div>
  );
}
