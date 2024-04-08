import { Button, ButtonProps } from '@mui/material';

interface LoginServiceButtonProps extends ButtonProps {}

export const LoginServiceButton = ({ children, ...rest }: LoginServiceButtonProps) => {
   return (
      <Button
         variant='outlined'
         sx={{
            textTransform: 'capitalize',
            '& .MuiButton-startIcon': { position: 'absolute', left: '20px' },
         }}
         {...rest}
      >
         {children}
      </Button>
   );
};
