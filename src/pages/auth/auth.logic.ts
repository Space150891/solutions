import { useForm } from 'react-hook-form';
import { FormEvent } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { paths } from '../../routes/paths';
import { type ILoginFields, loginSchema } from './auth.schemas';

export const useAuthLogic = () => {
   const navigate = useNavigate();
   const { control: loginFormControl, handleSubmit: handleLoginSubmit } = useForm<ILoginFields>({
      shouldFocusError: false,
      reValidateMode: 'onChange',
      defaultValues: {
         email: '',
         password: '',
      },
      resolver: zodResolver(loginSchema),
      mode: 'onSubmit',
   });

   const onSubmitLoginData = (data: ILoginFields) => {
      console.log('login-data:', data);
      navigate(paths.cubex);
   };

   const handleSubmitLoginData = (e: FormEvent<HTMLFormElement>) => {
      e.stopPropagation();
      e.preventDefault();
      handleLoginSubmit(onSubmitLoginData)(e);
   };

   return {
      handlers: {
         loginFormControl,
         handleSubmitLoginData,
      },
   };
};
