import { Box, Button, TextField } from '@mui/material';
import { FormWrapper } from './form-wrapper.component';

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
            <label>First Name</label>
            <TextField
               autoFocus
               type='text'
               value={firstName}
               onChange={(e) => updateFields({ firstName: e.target.value })}
            />
            <label>Last Name</label>
            <TextField
               type='text'
               value={lastName}
               onChange={(e) => updateFields({ lastName: e.target.value })}
            />
            <label>Age</label>
            <TextField type='number' value={age} onChange={(e) => updateFields({ age: e.target.value })} />
         </FormWrapper>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '1rem' }}>
            <Button>Next</Button>
         </Box>
      </>
   );
};
