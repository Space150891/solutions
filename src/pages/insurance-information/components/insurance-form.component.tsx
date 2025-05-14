import { Autocomplete, Box, Button, Card, TextField, Typography, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { CountryType, countries } from '../mock';
import { useEffect, useState } from 'react';
import { useThemeContext } from '../../../providers/theme-context.provider';

export default function InsuranceForm({
   country,
   setCountry,
   ssn,
   setSsn,
   toggleOpen,
}: {
   country: CountryType | null;
   setCountry: React.Dispatch<React.SetStateAction<CountryType | null>>;
   ssn: string;
   setSsn: React.Dispatch<React.SetStateAction<string>>;
   toggleOpen: () => void;
}) {
   const [filedText, setFieldText] = useState('Social Security Number');
   const theme = useTheme();
   const { mode } = useThemeContext();
   const isDarkMode = mode === 'dark';

   useEffect(() => {
      if (country && country.code !== 'US') {
         setFieldText('Passport Number');
      } else {
         setFieldText('Social Security Number');
      }
   }, [country]);

   return (
      <Box
         sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
         }}
         gap={2}
         height={'100svh'}
         p={2}
      >
         <Typography variant="h4" mb={4} fontWeight="medium">
            Insurance Information
         </Typography>
         
         <Card
            elevation={isDarkMode ? 4 : 1}
            sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               padding: '24px',
               gap: '30px',
               width: '100%',
               maxWidth: '700px',
               borderRadius: '16px',
               bgcolor: 'background.paper',
               transition: theme.transitions.create(['box-shadow', 'background-color'], {
                  duration: theme.transitions.duration.standard,
               }),
            }}
         >
            <Grid2 container columnSpacing={1} columns={12} rowSpacing={2} width={'100%'}>
               <Grid2 xs={4}>
                  <Autocomplete
                     id='country-select'
                     options={countries}
                     autoHighlight
                     value={country}
                     onChange={(_, value) => setCountry(value)}
                     fullWidth
                     getOptionLabel={(option) => option.label}
                     renderOption={(props, option) => (
                        <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                           <img
                              loading='lazy'
                              width='20'
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              alt=''
                           />
                           {option.label}
                        </Box>
                     )}
                     renderInput={(params) => (
                        <TextField
                           {...params}
                           label='Choose a country'
                           variant='outlined'
                           inputProps={{
                              ...params.inputProps,
                              autoComplete: 'new-password', // disable autocomplete and autofill
                           }}
                        />
                     )}
                  />
               </Grid2>
               <Grid2 xs={8}>
                  <TextField
                     label={filedText}
                     variant='outlined'
                     fullWidth
                     value={ssn}
                     onChange={(e) => setSsn(e.target.value)}
                     sx={{
                        '& .MuiInputBase-root': { height: 'initiaL !important' },
                     }}
                  />
               </Grid2>
            </Grid2>            <Button 
               variant='contained' 
               onClick={toggleOpen}
               sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  minWidth: '150px',
                  boxShadow: isDarkMode ? '0 4px 8px rgba(255, 255, 255, 0.05)' : 'none',
               }}
            >
               Proceed
            </Button>
         </Card>
      </Box>
   );
}
