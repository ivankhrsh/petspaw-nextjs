'use client'

import { BreadCrumbs } from '@/components/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import classNames from 'classnames/bind';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { getData } from '@/utils/getData';
import { type CatImage } from '@/types/CatData';
import Image from 'next/image';
import { ActionButton } from '@/components/Button';
import { Dislike, Heart, Like } from '@/public/svg';
import { addNegativeVote, addPositiveVote } from '@/utils/votes';
import { addFav } from '@/utils/favourites';

const cn = classNames.bind(styles);

export default function Voting () {
  const [cat, setCat] = useState<CatImage | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    void fetchCatData();
  }, []);

  const fetchCatData = async () => {
    setIsLoading(true);
    try {
      const data = await getData<CatImage[]>('images/search');
      setCat(data[0]);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePositiveVote = async () => {
    if (cat) {
      try {
        await addPositiveVote(cat.id);
        setCat(null);
        await fetchCatData();
      } catch (error) {
        setError(error as string);
      }
    }
  };

  const handleAddToFavorites = async () => {
    if (cat) {
      try {
        await addFav('favourites', { image_id: cat.id });
        setCat(null);
        await fetchCatData();
      } catch (error) {
        setError(error as string);
      }
    }
  };

  const handleNegativeVote = async () => {
    if (cat) {
      try {
        await addNegativeVote(cat.id);
        setCat(null);
        await fetchCatData();
      } catch (error) {
        setError(error as string);
      }
    }
  };

  return (
    <div>
      <div className={cn('contentContainer')}>
        <div className={cn('breadCrumbs')}>
          <BreadCrumbs />
        </div>
        {isLoading && <LoadingSpinner />}
        {error && <div className={cn('error')}>{error}</div>}
        {cat && (
          <div className={cn('voteContent')}>
            <div className={cn('imageContainer')}>
              <Image
                className={cn('catImage')}
                src={cat.url}
                alt='cat'
                width={cat.width}
                height={cat.height}
              />
              <div className={cn('voteButtons')}>
                <ActionButton
                  text={<Like />}
                  onClick={handlePositiveVote}
                  type='voteUp'
                />
                <ActionButton
                  text={<Heart />}
                  onClick={handleAddToFavorites}
                  type='voteLike'
                />
                <ActionButton
                  text={<Dislike />}
                  onClick={handleNegativeVote}
                  type='voteDown'
                 />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
