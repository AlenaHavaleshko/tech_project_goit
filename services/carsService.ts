import { CarSearchParams } from "@/types/filters";
import { Car } from "@/types/car";
import { api } from "./api"; // Подключение к API

interface FetchCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

interface FetchCarsParams {
  page: number;
  limit: number;
  make?: string;
  price?: number;
  mileageFrom?: number;
  mileageTo?: number;
}

export default async function fetchCars(
  filters: CarSearchParams,
  page: number = 1
): Promise<FetchCarsResponse> {
  const params: FetchCarsParams = {
    page,
    limit: 12,
    make: filters.brand || undefined,
    price: filters.price ? Number(filters.price) : undefined,
    mileageFrom: filters.mileage?.from ?? undefined,
    mileageTo: filters.mileage?.to ?? undefined,
  };

  try {
    const response = await api.get("cars", { params });
    return {
      cars: response.data.cars,
      totalCars: response.data.totalCars,
      page: response.data.page || page,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching cars:", error);
    return {
      cars: [],
      totalCars: 0,
      page,
      totalPages: 0,
    };
  }
}