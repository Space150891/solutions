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
      const isDark = theme.palette.mode === 'dark';
      boxShadow = isDark ? boxShadow || true : boxShadow;

      return (
         <Card
            component='div'
            elevation={elevation || 0}
            ref={ref}
            sx={{
               border: border ? '1px solid' : 'none',
               borderRadius: 2,
               borderColor: theme.palette.divider,
               bgcolor: theme.palette.background.paper,
               boxShadow: boxShadow && (!border || isDark)
                  ? shadow || (isDark ? '0 4px 8px rgba(0, 0, 0, 0.4)' : theme.shadows[1])
                  : 'inherit',
               ':hover': {
                  boxShadow: boxShadow 
                     ? shadow || (isDark ? '0 6px 12px rgba(0, 0, 0, 0.5)' : theme.shadows[2])
                     : 'inherit',
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
                  titleTypographyProps={{ 
                     variant: 'subtitle1',
                     color: isDark ? 'text.primary' : 'text.secondary'
                  }}
                  title={title}
                  action={secondary}
               />
            )}
            {darkTitle && title && (
               <CardHeader
                  sx={headerSX}
                  title={
                     <Typography 
                        variant='h3' 
                        color={isDark ? 'text.primary' : 'inherit'}
                     >
                        {title}
                     </Typography>
                  }
                  action={secondary}
               />
            )}
            
            {/* card content */}
            {content && (
               <CardContent 
                  component="div" 
                  sx={{
                     ...contentSX,
                     color: isDark ? 'text.primary' : 'inherit'
                  }}
               >
                  {children}
               </CardContent>
            )}
            {!content && children}

            {/* card footer - clipboard & highlighter  */}
            {codeHighlight && (
               <>
                  <Divider 
                     sx={{ 
                        borderStyle: 'dashed',
                        borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
                     }} 
                  />
                  {children}
               </>
            )}
         </Card>
      );
   },
);
