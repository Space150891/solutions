import { Box, Chip, Grid, Stack, Typography, useTheme } from '@mui/material';
import { TrendingUpOutlined, TrendingDownOutlined } from '@mui/icons-material';
import { type AnalyticEcommerceProps } from './types';
import { MainCard } from './main-card.component';

export const AnalyticEcommerce = ({
   color = 'primary',
   count,
   extra,
   percentage,
   title,
   isLoss,
}: AnalyticEcommerceProps) => {
   const theme = useTheme();
   const isDark = theme.palette.mode === 'dark';

   const chipColor = isLoss ? 'error' : 'success';
   const iconColor = isLoss ? theme.palette.error.main : theme.palette.success.main;

   return (
      <MainCard contentSX={{ p: 2.25, bgcolor: theme.palette.background.paper }}>
         <Stack spacing={0.5}>
            <Typography 
               variant='h6' 
               color={isDark ? 'text.primary' : 'text.secondary'}
            >
               {title}
            </Typography>
            <Grid container alignItems='center' spacing={1}>
               <Grid item>
                  <Typography 
                     variant='h4' 
                     color="text.primary"
                     sx={{ fontWeight: 600 }}
                  >
                     {count}
                  </Typography>
               </Grid>
               {percentage && (
                  <Grid item>
                     <Chip
                        variant={isDark ? 'filled' : 'outlined'}
                        color={chipColor}
                        icon={
                           <>
                              {!isLoss && (
                                 <TrendingUpOutlined 
                                    sx={{ 
                                       fontSize: '0.75rem',
                                       color: isDark ? 'inherit' : iconColor 
                                    }} 
                                 />
                              )}
                              {isLoss && (
                                 <TrendingDownOutlined 
                                    sx={{ 
                                       fontSize: '0.75rem', 
                                       color: isDark ? 'inherit' : iconColor
                                    }} 
                                 />
                              )}
                           </>
                        }
                        label={`${percentage}%`}
                        sx={{ 
                           pl: 1,
                           '& .MuiChip-label': {
                              color: isDark ? 'inherit' : iconColor,
                           }
                        }}
                        size='small'
                     />
                  </Grid>
               )}
            </Grid>
         </Stack>
         <Box sx={{ pt: 2.25 }}>
            <Typography 
               variant='caption' 
               color={isDark ? 'text.secondary' : 'text.primary'}
               sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
            >
               You made an extra
               <Typography 
                  component='span' 
                  variant='caption' 
                  sx={{ 
                     color: theme.palette[color === 'warning' ? 'warning' : 'primary'].main,
                     fontWeight: 600 
                  }}
               >
                  {extra}
               </Typography>
               this year
            </Typography>
         </Box>
      </MainCard>
   );
};
