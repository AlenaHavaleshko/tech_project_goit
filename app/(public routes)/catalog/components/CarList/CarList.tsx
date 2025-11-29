'use client';

import { Car } from '@/types/car';
import CarCard from '@/app/(public routes)/catalog/components/CarCard/CarCard';
import styles from './CarList.module.css';

type CarsListProps = {
  cars: Car[];
  fetchNextPage?: () => void;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  isLoading?: boolean;
};

const CarsList = ({
  cars,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  isLoading,
}: CarsListProps) => {
  return (
    <>
      <ul className={styles.carsList}>
        {cars.length > 0
          ? cars.map(car => <CarCard key={car.id} car={car} />)
          : !isLoading}
      </ul>
      {fetchNextPage && hasNextPage && (
        <button
          className={styles.loadMoreButton}
          onClick={fetchNextPage}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </>
  );
};

export default CarsList;
