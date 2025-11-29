'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Car } from '@/types/car';
import { useCarsStore } from '@/store/carsStore';
import styles from './CarCard.module.css';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  const { favorites, toggleFavorite } = useCarsStore(state => ({
    favorites: state.favorites,
    toggleFavorite: state.toggleFavorite,
  }));

  const isFavorite = favorites.includes(car.id);

  // Extract city and country from address
  const getLocation = (address: string) => {
    const parts = address.split(',').map(part => part.trim());
    return parts.slice(-2).join(' | ');
  };

  // Get first item from accessories or functionalities
  const getFirstAccessory = () => {
    return 'Luxury Car Rentals';
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.make} ${car.model}`}
          width={274}
          height={268}
          className={styles.image}
        />
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.active : ''}`}
          onClick={() => toggleFavorite(car.id)}
          aria-label="Add to favorites"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M15.63 3.4575C15.2469 3.07425 14.7921 2.77023 14.2915 2.56281C13.7908 2.35539 13.2543 2.24863 12.7125 2.24863C12.1706 2.24863 11.6341 2.35539 11.1335 2.56281C10.6329 2.77023 10.1781 3.07425 9.79497 3.4575L8.99997 4.2525L8.20497 3.4575C7.43134 2.68388 6.38186 2.24903 5.28747 2.24903C4.19308 2.24903 3.1436 2.68388 2.36997 3.4575C1.59635 4.23113 1.1615 5.28061 1.1615 6.375C1.1615 7.46939 1.59635 8.51887 2.36997 9.2925L3.16497 10.0875L8.99997 15.9225L14.835 10.0875L15.63 9.2925C16.0132 8.90938 16.3172 8.45464 16.5247 7.95398C16.7321 7.45332 16.8388 6.91683 16.8388 6.375C16.8388 5.83317 16.7321 5.29668 16.5247 4.79602C16.3172 4.29536 16.0132 3.84062 15.63 3.4575Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </svg>
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {car.make} <span className={styles.model}>{car.model}</span>,{' '}
            {car.year}
          </h3>
          <span className={styles.price}>${car.price}</span>
        </div>

        <div className={styles.details}>
          <span>{getLocation(car.address)}</span>
          <span>{getFirstAccessory()}</span>
          <span>{car.type}</span>
          <span>{car.model}</span>
          <span>{car.id}</span>
          <span>{car.fuelConsumption}</span>
        </div>

        <Link href={`/catalog/${car.id}`} className={styles.readMoreBtn}>
          Read more
        </Link>
      </div>
    </div>
  );
}
