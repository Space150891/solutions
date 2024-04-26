import { useCallback, useEffect, useState } from 'react';
import Filter, { FilterCriteria } from './components/filter.component';
import PatientListTable from './components/table.component';
import { patients } from './mock';
import { IPatient } from './types';

export default function PatientListPage() {
   const [filteredList, setFilteredList] = useState<IPatient[]>([]);
   const [filters, setFilters] = useState<FilterCriteria>({});

   const applyFilters = useCallback((array: IPatient[], filters: FilterCriteria): IPatient[] => {
      return array.filter((item) => {
         return Object.keys(filters).every((k) => {
            const key = k as keyof IPatient;
            const filterValue = filters[key];
            const itemValue: unknown = item[key];

            // Check if the filter value is an array
            if (Array.isArray(filterValue) && filterValue !== null) {
               return filterValue.indexOf(itemValue) !== -1;
            }

            // Check if the filter value is an object, indicating a nested filter
            if (typeof filterValue === 'object' && filterValue !== null) {
               return applyFilters([itemValue as IPatient], filterValue).length > 0;
            }

            // Apply your filter logic here. This example checks for strict equality.
            return itemValue === filterValue;
         });
      });
   }, []);

   useEffect(() => {
      if (patients) setFilteredList(patients);
   }, []);

   useEffect(() => {
      setFilteredList(applyFilters(patients, filters));
   }, [applyFilters, filters]);

   return (
      <>
         <Filter setFilters={setFilters} />
         <PatientListTable patients={filteredList} />
      </>
   );
}
