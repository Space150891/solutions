import { usePageWrapperStyle } from './page-wrapper.style';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import { PropsWithChildren } from 'react';

type Props = PropsWithChildren & {
   heading: string;
   headerButton?: { label: string; onClick: () => void };
};

const PageWrapper = (props: Props) => {
   const { heading, headerButton, children } = props;
   const sx = usePageWrapperStyle();

   return (
      <Card>
         <CardContent sx={sx.cardContent}>
            <Box sx={sx.header}>
               <Typography variant='h5'>{heading}</Typography>
               {headerButton ? (
                  <Button onClick={headerButton.onClick} variant='contained'>
                     {headerButton.label}
                  </Button>
               ) : null}
            </Box>

            {children}
         </CardContent>
      </Card>
   );
};

export default PageWrapper;
