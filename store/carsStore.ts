import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CarsStore } from "@/types/carsStore";
import { CarFilters } from "@/types/filters";
import { Car } from "@/types/car";

export const useCarsStore = create<CarsStore>()(
  persist(
    (set, get) => ({
      cars: [],
      filters: {
        brand: null,
        price: null,
        mileage: { from: null, to: null }
      } as CarFilters,
      page: 1,
      favorites: [],

      setCars: (cars: Car[]) => set({ cars }),

      addCars: (cars: Car[]) =>
        set((state) => ({
          cars: [...state.cars, ...cars],
        })),

      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
          cars: [],
          page: 1,
        })),

      setPage: (page) => set({ page }),

      toggleFavorite: (id: string) => {
        const favorites = get().favorites;
        const updated = favorites.includes(id)
          ? favorites.filter((f) => f !== id)
          : [...favorites, id];

        set({ favorites: updated });
      },
    }),
    {
      name: "cars-store",
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);