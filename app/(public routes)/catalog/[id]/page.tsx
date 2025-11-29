import { notFound } from 'next/navigation';
import { api } from '@/services/api';
import { Car } from '@/types/car';

interface CarDetailPageProps {
  params: Promise<{ id: string }>;
}

async function getCarById(id: string): Promise<Car | null> {
  try {
    const response = await api.get(`cars/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching car:', error);
    return null;
  }
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { id } = await params;
  const car = await getCarById(id);

  if (!car) {
    notFound();
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>
        {car.brand} {car.model}
      </h1>
      <p>Year: {car.year}</p>
      <p>Price: ${car.rentalPrice}</p>
      <p>Type: {car.type}</p>
      <p>Mileage: {car.mileage.toLocaleString()} km</p>
      <p>Address: {car.address}</p>
      <p>Company: {car.rentalCompany}</p>
      {car.description && <p>Description: {car.description}</p>}
      <img
        src={car.img}
        alt={`${car.brand} ${car.model}`}
        style={{ maxWidth: '100%' }}
      />
    </div>
  );
}
