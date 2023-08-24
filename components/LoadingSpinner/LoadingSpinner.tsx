import React from 'react';
import styles from './LoadingSpinner.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles)

export const LoadingSpinner = () => (
  <div className={cn('loadingSpinner')}>
  </div>
);
