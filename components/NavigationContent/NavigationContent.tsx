import React from 'react'
import styles from './NavigationContent.module.scss'
import classNames from 'classnames/bind';
import { NavigationButton } from '../Button/NavigationButton';

const cn = classNames.bind(styles);

export default function NavigationContent () {
  return (
    <div className={cn('navigationLinks')}>
      <NavigationButton link="/voting" text="Votes" type="nav" imgType='vote'/>
      <NavigationButton link="/breeds" text="Breeds" type="nav" imgType='breed'/>
      <NavigationButton link="/gallery" text="Gallery" type="nav" imgType='gallery'/>
  </div>
  );
}
