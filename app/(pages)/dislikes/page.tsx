'use client'

import { BreadCrumbs } from '@/components/BreadCrumbs/BreadCrumbs';
import React, { useEffect, useState } from 'react';
import styles from './page.module.scss';
import classNames from 'classnames/bind';
import { LoadingSpinner } from '@/components/LoadingSpinner/LoadingSpinner';
import { type CatVote } from '@/types/votes';
import { getData } from '@/utils/getData';
import { VotesLayout } from '@/components/ImagesLayout/VotesLayout';

const cn = classNames.bind(styles);

export default function Dislikes () {
  const [votes, setVotes] = useState<CatVote[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getData<CatVote[]>('votes')
      .then((data) => {
        setVotes(data.filter((item) => item.value === -1));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const filterVotes = (id: number) => {
    setVotes(prevState => prevState.filter(item => item.id !== id));
  };

  return (
    <div>
      <div className={cn('contentContainer')}>
        <div className={cn('breadCrumbs')}>
          <BreadCrumbs/>
        </div>
        {isLoading && (<LoadingSpinner/>)}
        {error && (<div className={cn('error')}>{error}</div>)}
        {!isLoading && votes.length === 0 && (
          <p className={cn('emptyMessage')}>No item found</p>
        )}
        <VotesLayout breeds={votes.slice(0, 25)} filter={filterVotes}/>
      </div>
    </div>
  )
}
