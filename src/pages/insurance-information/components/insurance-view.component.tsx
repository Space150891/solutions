import { Box, Button, Card, Divider, Typography } from '@mui/material';
import { CountryType } from '../mock';
import { MonitorHeart } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

export default function InsuranceView({
   country,
   ssn,
   toggleOpen,
}: {
   country: CountryType | null;
   ssn: string;
   toggleOpen: () => void;
}) {
   return (
      <Box width={'100%'} display={'flex'} flexDirection='column' justifyContent={'center'}>
         <Box width={'100%'} p={10} display={'flex'} justifyContent={'center'}>
            <Card
               sx={{
                  backgroundColor: 'white',
                  height: '100%',
                  minWidth: '60%',
                  maxHeight: '40%',
                  borderRadius: '16px',
               }}
            >
               <Box sx={{ width: '100%', height: '16px', backgroundColor: 'palevioletred' }}></Box>
               <Box>
                  <Typography variant='h4' px={6} py={3} display={'flex'} alignItems={'center'}>
                     <MonitorHeart fontSize='large' sx={{ marginRight: '1rem' }} />
                     Medical Health Insurance
                     <img
                        loading='lazy'
                        style={{ marginLeft: 'auto' }}
                        width='40'
                        srcSet={`https://flagcdn.com/w160/${(country?.code || 'US').toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w80/${(country?.code || 'US').toLowerCase()}.png`}
                        alt='country flag'
                     />
                  </Typography>

                  <Divider></Divider>
                  <Box p={6}>
                     <Grid2 container spacing={4}>
                        <Grid2 xs={6} spacing={4}>
                           <Box display='flex' height='100%' flexDirection='column' gap={4}>
                              <Box>
                                 <Typography
                                    variant='caption'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    color='gray'
                                    fontSize='0.65rem'
                                 >
                                    Name of Beneficiary
                                 </Typography>
                                 <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    fontSize='1.2rem'
                                 >
                                    John Doe
                                 </Typography>
                              </Box>
                              <Box>
                                 <Typography
                                    variant='caption'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    color='gray'
                                    fontSize='0.65rem'
                                 >
                                    MEDICARE CLAIM NUMBER
                                 </Typography>
                                 <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    fontSize='1.2rem'
                                 >
                                    123-54-6534-A
                                 </Typography>
                              </Box>
                           </Box>
                        </Grid2>
                        <Grid2 xs={6} spacing={4}>
                           <Box
                              display='flex'
                              flexDirection='column'
                              height='100%'
                              gap={4}
                              justifyContent='flex-end'
                           >
                              <Box>
                                 <Typography
                                    variant='caption'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    color='gray'
                                    fontSize='0.65rem'
                                 >
                                    Sex
                                 </Typography>
                                 <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    fontSize='1.2rem'
                                 >
                                    Male
                                 </Typography>
                              </Box>
                           </Box>
                        </Grid2>
                        <Grid2 xs={12} spacing={4}>
                           <Box
                              display='flex'
                              height='100%'
                              gap={4}
                              alignItems='flex-end'
                              justifyContent='space-between'
                              maxWidth='740px'
                           >
                              <Box>
                                 <Typography
                                    variant='caption'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    color='gray'
                                    fontSize='0.65rem'
                                 >
                                    Is Entitled to
                                 </Typography>
                                 <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    fontSize='1.2rem'
                                 >
                                    HOSPITAL
                                 </Typography>
                                 <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    fontSize='1.2rem'
                                 >
                                    MEDICAL
                                 </Typography>
                              </Box>
                              <Box>
                                 <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    fontSize='1.2rem'
                                 >
                                    (Part A)
                                 </Typography>
                                 <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    fontSize='1.2rem'
                                 >
                                    (Part B)
                                 </Typography>
                              </Box>
                              <Box>
                                 <Typography
                                    variant='caption'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    color='gray'
                                    fontSize='0.65rem'
                                 >
                                    Effective Date
                                 </Typography>
                                 <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    fontSize='1.2rem'
                                 >
                                    01-01-2024
                                 </Typography>
                                 <Typography
                                    variant='body1'
                                    fontWeight='bold'
                                    textTransform='uppercase'
                                    fontSize='1.2rem'
                                 >
                                    01-01-2024
                                 </Typography>
                              </Box>
                           </Box>
                        </Grid2>
                     </Grid2>
                  </Box>
               </Box>
               <Box sx={{ width: '100%', height: '16px', backgroundColor: 'lightblue' }}></Box>
            </Card>
         </Box>
         <Box width={'100%'} p={10} display={'flex'} justifyContent={'center'}>
            <Button variant='contained' onClick={toggleOpen}>
               Close
            </Button>
         </Box>
      </Box>
   );
}
