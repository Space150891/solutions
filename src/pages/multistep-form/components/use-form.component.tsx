import { TextField } from '@mui/material';
import { FormWrapper } from './form-wrapper.component';
import './form.css';

type UserData = {
   firstName: string;
   lastName: string;
   age: string;
};

type UserFormProps = UserData & {
   updateFields: (fields: Partial<UserData>) => void;
};

export const UserForm = ({ firstName, lastName, age, updateFields }: UserFormProps) => {
   return (
      <>
         <FormWrapper title='User Details'>
            <label className='label-form'>First Name</label>
            <TextField
               autoFocus
               type='text'
               value={firstName}
               onChange={(e) => updateFields({ firstName: e.target.value })}
            />
            <label className='label-form'>Last Name</label>
            <TextField
               type='text'
               value={lastName}
               onChange={(e) => updateFields({ lastName: e.target.value })}
            />
            <label className='label-form'>Age</label>
            <TextField
               type='number'
               value={age}
               onChange={(e) => updateFields({ age: e.target.value })}
               inputProps={{ min: 0 }}
            />
         </FormWrapper>
      </>
   );
};
