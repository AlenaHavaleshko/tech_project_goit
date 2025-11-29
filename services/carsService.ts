import { api } from "./api";
import { CarSearchParams } from "@/types/filters";
import { Car } from "@/types/car";

export default async function fetchCars(filters: CarSearchParams): Promise<Car[]> {
  const response = await api.get('cars', {
    params: filters,
  });
  return response.data;
}