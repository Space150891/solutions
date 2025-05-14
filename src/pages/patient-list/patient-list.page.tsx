import { useCallback, useEffect, useState } from 'react';
import Filter, { FilterCriteria } from './components/filter.component';
import { isDateInRange } from '../../utils/date.util';
import PatientListTable from './components/table.component';
import { patients } from './mock';
import { IPatient } from './types';

export default function PatientListPage() {
   const [filteredList, setFilteredList] = useState<IPatient[]>([]);
   const [filters, setFilters] = useState<FilterCriteria>({});

   const applyFilters = useCallback((array: IPatient[], filters: FilterCriteria): IPatient[] => {

      return array.filter((item) => {
         return Object.entries(filters).every(([k, filterValue]) => {
            const key = k as keyof IPatient;

            if (key === 'dateOfBirth' && typeof filterValue === 'object') {
               const { from, to } = filterValue;
               if (!from && !to) return true;

               return isDateInRange(item.dateOfBirth, from, to);
            }

            const itemValue: unknown = item[key];

            if (Array.isArray(filterValue) && filterValue !== null) {
               return filterValue.indexOf(itemValue) !== -1;
            }

            if (typeof filterValue === 'object' && filterValue !== null) {
               return applyFilters([itemValue as IPatient], filterValue).length > 0;
            }

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
