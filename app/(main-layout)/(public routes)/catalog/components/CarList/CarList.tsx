'use client';

import fetchCars from '@/services/carsService';
import { useEffect } from 'react';
import { CarSearchParams } from '@/types/filters';
import { useCarsStore } from '@/store/carsStore';
import CarCard from '../CarCard/CarCard';
import styles from './CarList.module.css';

export default function CarList() {
  const carsFromStore = useCarsStore(state => state?.cars);
  const cars = Array.isArray(carsFromStore) ? carsFromStore : [];
  const filters = useCarsStore(state => state?.filters);
  const setCars = useCarsStore(state => state?.setCars);
  const page = useCarsStore(state => state?.page ?? 1);
  const setPage = useCarsStore(state => state?.setPage);
  const addCars = useCarsStore(state => state?.addCars);

  // fetch cars on filters change
  useEffect(() => {
    if (!setCars || !setPage || !filters) return;

    const loadCars = async () => {
      setCars([]);
      const params: CarSearchParams = { ...filters, page: 1 };
      const data = await fetchCars(params);
      setPage(1);
      setCars(Array.isArray(data) ? data : []);
    };

    loadCars();
  }, [filters, setCars, setPage]);

  // upload more cars
  const loadMore = async () => {
    if (!addCars || !setPage || !filters) return;

    const nextPage = page + 1;
    const params: CarSearchParams = { ...filters, page: nextPage };
    const data = await fetchCars(params);
    setPage(nextPage);
    addCars(Array.isArray(data) ? data : []);
  };

  return (
    <div className={styles.wrapper}>
      {cars.length === 0 && (
        <p className={styles.noResults}>No cars available</p>
      )}

      <ul className={styles.list}>
        {cars.map(car => (
          <li key={car.id}>
            <CarCard car={car} />
          </li>
        ))}
      </ul>

      {/* Load More */}
      {cars.length > 0 && (
        <button className={styles.loadMore} onClick={loadMore}>
          Load more
        </button>
      )}
    </div>
  );
}
