'use client'

import React, { useState } from 'react'
import './layout.scss'
import { Header } from '@/components/Header/Header'
import { BurgerMenu } from '@/components/BurgerMenu/BurgeMenu'

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  const [burger, setBurger] = useState(false);

  const toggleBurger = () => {
    setBurger(prevState => !prevState);
  }

  if (burger) {
    return (
      <div className={'burgerMenu'}>
        <BurgerMenu handleBurger={toggleBurger}/>
      </div>
    )
  }

  return (
    <div className='layout'>
      <Header handleBurger={toggleBurger}/>
      <div className='contentContainer'>
        {children}
      </div>
    </div>
  )
}
