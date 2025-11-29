'use client';
import { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { SingleValue } from 'react-select';
import { useCarsStore } from '@/store/carsStore';
import { fetchBrands } from '@/services/filtersService';
import SelectInput from '@/components/SelectInput/SelectInput';
import styles from './Filters.module.css';

interface OptionType {
  value: string | null;
  label: string;
  _id: string | null;
}

interface FormValues {
  brand: OptionType;
  price: OptionType;
  mileageFrom: string;
  mileageTo: string;
}

export default function Filters() {
  const setFilters = useCarsStore(state => state.setFilters);

  const [brandOptions, setBrandOptions] = useState<OptionType[]>([
    { value: null, label: 'Choose a brand', _id: null },
  ]);

  const priceOptions: OptionType[] = [
    { value: null, label: 'Choose a price', _id: null },
    { value: '10', label: '10', _id: '10' },
    { value: '20', label: '20', _id: '20' },
    { value: '30', label: '30', _id: '30' },
    { value: '40', label: '40', _id: '40' },
    { value: '50', label: '50', _id: '50' },
    { value: '60', label: '60', _id: '60' },
    { value: '70', label: '70', _id: '70' },
    { value: '80', label: '80', _id: '80' },
    { value: '90', label: '90', _id: '90' },
    { value: '100', label: '100', _id: '100' },
  ];

  useEffect(() => {
    const loadFiltersData = async () => {
      const brandsData = await fetchBrands();
      const options: OptionType[] = [
        { value: null, label: 'Choose a brand', _id: null },
        ...brandsData.map((brand: string) => ({
          value: brand,
          label: brand,
          _id: brand,
        })),
      ];
      setBrandOptions(options);
    };

    loadFiltersData();
  }, []);

  const initialValues: FormValues = {
    brand: brandOptions[0],
    price: priceOptions[0],
    mileageFrom: '',
    mileageTo: '',
  };

  const handleSubmit = (values: FormValues) => {
    setFilters({
      brand: values.brand.value,
      price: values.price.value,
      mileage: {
        from: values.mileageFrom ? Number(values.mileageFrom) : null,
        to: values.mileageTo ? Number(values.mileageTo) : null,
      },
    });
  };

  return (
    <div className={styles.filtersWrapper}>
      <h3>Filters</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className={styles.form}>
            <div className={styles.selectWrapper}>
              <label htmlFor="brand">Car brand</label>
              <SelectInput
                options={brandOptions}
                value={values.brand}
                instanceId="brand-select"
                onChange={(option: SingleValue<OptionType>) => {
                  if (option) {
                    setFieldValue('brand', option);
                  }
                }}
              />
            </div>

            <div className={styles.selectWrapper}>
              <label htmlFor="price">Price / hour</label>
              <SelectInput
                options={priceOptions}
                value={values.price}
                instanceId="price-select"
                onChange={(option: SingleValue<OptionType>) => {
                  if (option) {
                    setFieldValue('price', option);
                  }
                }}
              />
            </div>

            <div className={styles.inputWrapper} suppressHydrationWarning>
              <label htmlFor="mileageFrom">Car mileage / km</label>
              <Field
                id="mileageFrom"
                type="number"
                name="mileageFrom"
                placeholder="From"
                className={styles.input}
                suppressHydrationWarning
              />
              <Field
                id="mileageTo"
                type="number"
                name="mileageTo"
                placeholder="To"
                className={styles.input}
                suppressHydrationWarning
              />
            </div>

            <button
              type="submit"
              className={styles.searchButton}
              suppressHydrationWarning
            >
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
