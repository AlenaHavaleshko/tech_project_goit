import { Car } from '@/types/car';
import CarDetails from './CarDetails';
import { fetchCarByIdServer } from '@/lib/api/serverApi';

type CarDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: CarDetailsPageProps) {
  const { id } = await params;
  const car = await fetchCarByIdServer(id);

  return {
    title: `${car.brand} ${car.model} - Rent Your Next Car Easily`,
    description: 'Discover seamless car rental solutions for every journey.',
    icons: {
      icon: '/favicon.ico',
    },
    openGraph: {
      title: 'Easy Car Rentals - Rent Your Perfect Ride',
      description:
        'Explore a hassle-free car rental experience with our platform.',
      url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
      images: [
        {
          url: '/home/home-image.webp',
          width: 1200,
          height: 630,
          alt: `Rent a ${car.brand} ${car.model} - Easy and Convenient Car Rentals`,
        },
      ],
    },
  };
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = await params;
  const car = await fetchCarByIdServer(id);

  return <CarDetails vehicle={car} />;
}
