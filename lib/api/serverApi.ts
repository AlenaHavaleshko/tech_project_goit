import { Car, CarsResponse } from '@/types/car';
import {nextServer} from './nextServer';
import {CarsParams} from './clientApi';

export const fetchServerCars = async (
  params?: CarsParams
): Promise<CarsResponse> => {
  const queryParams = {
    ...(params?.brand && { brand: params.brand }),
    ...(params?.rentalPrice && { rentalPrice: params.rentalPrice }),
    ...(params?.minMileage && { minMileage: params.minMileage }),
    ...(params?.maxMileage && { maxMileage: params.maxMileage }),
    limit: params?.limit || '12',
    page: params?.page || '1',
  };
  const response = await nextServer.get<CarsResponse>(`/cars`, {
    params: queryParams,
  });
  return response.data;
};

export const fetchCarByIdServer = async (id: string): Promise<Car> => {
  const response = await nextServer.get<Car>(`/cars/${id}`);
  return response.data;
};

export const fetchCarBrandsServer = async (): Promise<string[]> => {
  const response = await nextServer.get<string[]>('/brands');
  return response.data;
};