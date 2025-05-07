import { TextField } from '@mui/material';
import { FormWrapper } from './form-wrapper.component';
import './form.css';

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
         <label className='label-form'>Street</label>
         <TextField
            autoFocus
            type='text'
            value={street}
            onChange={(e) => updateFields({ street: e.target.value })}
         />
         <label className='label-form'>City</label>
         <TextField type='text' value={city} onChange={(e) => updateFields({ city: e.target.value })} />
         <label className='label-form'>State</label>
         <TextField type='text' value={state} onChange={(e) => updateFields({ state: e.target.value })} />
         <label className='label-form'>Zip</label>
         <TextField type='text' value={zip} onChange={(e) => updateFields({ zip: e.target.value })} />
      </FormWrapper>
   );
}
