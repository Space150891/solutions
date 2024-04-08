import { TextField } from '@mui/material';
import { FormWrapper } from './form-wrapper.component';

type AddressData = {
   street: string;
   city: string;
   state: string;
   zip: string;
};

type AddressFormProps = AddressData & {
   updateFields: (fields: Partial<AddressData>) => void;
};

export function AddressForm({ street, city, state, zip, updateFields }: AddressFormProps) {
   return (
      <FormWrapper title='Address'>
         <label>Street</label>
         <TextField
            autoFocus
            type='text'
            value={street}
            onChange={(e) => updateFields({ street: e.target.value })}
         />
         <label>City</label>
         <TextField type='text' value={city} onChange={(e) => updateFields({ city: e.target.value })} />
         <label>State</label>
         <TextField type='text' value={state} onChange={(e) => updateFields({ state: e.target.value })} />
         <label>Zip</label>
         <TextField type='text' value={zip} onChange={(e) => updateFields({ zip: e.target.value })} />
      </FormWrapper>
   );
}
