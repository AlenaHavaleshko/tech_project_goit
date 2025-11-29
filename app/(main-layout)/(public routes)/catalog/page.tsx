'use client';

import React from 'react';
import Filters from './components/Filters/Filters';
import CarList from './components/CarList/CarList';
import LoadMore from './components/LoadMore/LoadMore';

export default function CatalogPage() {
  return (
    <>
      <Filters />
      <CarList />
      <LoadMore />
    </>
  );
}