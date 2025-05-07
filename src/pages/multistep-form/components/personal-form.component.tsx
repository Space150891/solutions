import { TextField } from '@mui/material';
import { FormWrapper } from './form-wrapper.component';
import './form.css';

type UserData = {
   email: string;
   phone: string;
   gender: string;
   nationality: string;
   occupation: string;
   updateFields: (fields: Partial<UserData>) => void;
};

export const PersonalForm = ({ email, phone, gender, nationality, occupation, updateFields }: UserData) => {
   return (
      <FormWrapper title='Personal Information'>
         <label className='label-form'>Email</label>
         <TextField
            autoFocus
            type='email'
            value={email}
            onChange={(e) => updateFields({ email: e.target.value })}
         />
         <label className='label-form'>Phone</label>
         <TextField type='tel' value={phone} onChange={(e) => updateFields({ phone: e.target.value })} />
         <label className='label-form'>Gender</label>
         <TextField type='text' value={gender} onChange={(e) => updateFields({ gender: e.target.value })} />
         <label className='label-form'>Nationality</label>
         <TextField
            type='text'
            value={nationality}
            onChange={(e) => updateFields({ nationality: e.target.value })}
         />
         <label className='label-form'>Occupation</label>
         <TextField
            type='text'
            value={occupation}
            onChange={(e) => updateFields({ occupation: e.target.value })}
         />
      </FormWrapper>
   );
};
