import { forwardRef } from 'react';
import { Card, CardContent, CardHeader, Divider, Typography, useTheme } from '@mui/material';

import type { MainCardProps } from './types';

const headerSX = {
   p: 2.5,
   '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

export const MainCard = forwardRef<HTMLDivElement, MainCardProps>(
   (
      {
         border = true,
         boxShadow = false,
         children,
         content = true,
         contentSX = {},
         darkTitle = false,
         elevation,
         secondary,
         shadow,
         sx = {},
         title,
         codeHighlight = false,
         ...rest
      },
      ref,
   ) => {
      const theme = useTheme();
      boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

      return (
         <Card
            component='div'
            elevation={elevation || 0}
            ref={ref}
            sx={{
               border: border ? '1px solid' : 'none',
               borderRadius: 2,
               borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.divider,
               boxShadow:
                  boxShadow && (!border || theme.palette.mode === 'dark')
                     ? shadow || theme.shadows['1']
                     : 'inherit',
               ':hover': {
                  boxShadow: boxShadow ? shadow || theme.shadows['1'] : 'inherit',
               },
               '& pre': {
                  m: 0,
                  p: '16px !important',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: '0.75rem',
               },
               ...sx,
               ...rest,
            }}
         >
            {/* card header and action */}
            {!darkTitle && title && (
               <CardHeader
                  sx={headerSX}
                  titleTypographyProps={{ variant: 'subtitle1' }}
                  title={title}
                  action={secondary}
               />
            )}
            {darkTitle && title && (
               <CardHeader
                  sx={headerSX}
                  title={<Typography variant='h3'>{title}</Typography>}
                  action={secondary}
               />
            )}            {/* card content */}
            {content && <CardContent component="div" sx={contentSX}>{children}</CardContent>}
            {!content && children}

            {/* card footer - clipboard & highlighter  */}
            {codeHighlight && (
               <>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  {children}
               </>
            )}
         </Card>
      );
   },
);
