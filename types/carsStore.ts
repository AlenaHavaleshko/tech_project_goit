import { Car } from "./car";
import { CarFilters } from "./filters";

export type CarsStore = {
  cars: Car[];
  filters: CarFilters;
  page: number;
  favorites: string[];

  setCars: (cars: Car[]) => void;
  addCars: (cars: Car[]) => void;
  setFilters: (filters: Partial<CarFilters>) => void;
  setPage: (page: number) => void;
  toggleFavorite: (id: string) => void;
};