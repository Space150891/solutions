import { useCallback, useEffect, useState } from 'react';
import Filter from './components/filter.component';
import PatientListTable from './components/table.component';
import { patients } from './mock';
import { IPatient } from './types';

export default function PatientListPage() {
   interface FilterCriteria {
      [key: string]: any;
   }
   const applyFilters = useCallback((array: IPatient[], filters: FilterCriteria): IPatient[] => {
      return array.filter((item) => {
         return Object.keys(filters).every((key) => {
            const filterValue = filters[key];
            const itemValue = item[key];

            // Check if the filter value is an array
            if (Array.isArray(filterValue) && filterValue !== null) {
               console.log('ArrayFilter:', filterValue);

               return filterValue.indexOf(itemValue) !== -1;
            }

            // Check if the filter value is an object, indicating a nested filter
            if (typeof filterValue === 'object' && filterValue !== null) {
               // Recursively apply filters to nested objects
               console.log('filterValue:', filterValue);

               return applyFilters([itemValue], filterValue).length > 0;
            }

            // Apply your filter logic here. This example checks for strict equality.
            return itemValue === filterValue;
         });
      });
   }, []);

   const [filteredList, setFilteredList] = useState<IPatient[]>([]);
   const [filters, setFilters] = useState<FilterCriteria>({});

   useEffect(() => {
      if (patients) setFilteredList(patients);
   }, []);

   useEffect(() => {
      setFilteredList(applyFilters(patients, filters));
   }, [applyFilters, filters]);

   console.log('filteredList:', filteredList);
   return (
      <>
         <Filter setFilters={setFilters} />
         <PatientListTable patients={filteredList} />
      </>
   );
}
