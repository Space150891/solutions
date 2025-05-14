import InsuranceForm from './components/insurance-form.component';
import { useState } from 'react';
import { CountryType } from './mock';
// Import the updated component
import InsuranceView from './components/insurance-view-updated.component';

export default function InsuranceInformation() {
   const [country, setCountry] = useState<CountryType | null>(null);
   const [ssn, setSsn] = useState('');
   const [open, setOpen] = useState(false);

   const toggleOpen = () => {
      setOpen((prev) => !prev);
   };

   return (
      <>
         {!open && (
            <InsuranceForm
               setCountry={setCountry}
               country={country}
               ssn={ssn}
               setSsn={setSsn}
               toggleOpen={toggleOpen}
            />
         )}
         {open && <InsuranceView ssn={ssn} toggleOpen={toggleOpen} country={country} />}
      </>
   );
}
