import { Box, Button, Card, Divider, Typography, useTheme } from '@mui/material';
import { CountryType } from '../mock';
import { MonitorHeart } from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { useThemeContext } from '../../../providers/theme-context.provider';

export default function InsuranceView({
  country,
  ssn, // SSN could be displayed in a real implementation
  toggleOpen,
}: {
  country: CountryType | null;
  ssn: string;
  toggleOpen: () => void;
}) {
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isDarkMode = mode === 'dark';

  const cardBg = '#ffffff'; // Keep white for both themes for the card itself
  const headerColor = '#db7093'; // palevioletred
  const footerColor = '#add8e6'; // lightblue
  const labelColor = 'rgba(0, 0, 0, 0.6)';
  const textColor = 'rgba(0, 0, 0, 0.87)';

  return (
    <Box
      width={'100%'}
      display={'flex'}
      flexDirection='column'
      justifyContent={'center'}
      sx={{ bgcolor: 'transparent' }}
    >
      <Box
        width={'100%'}
        p={{ xs: 2, sm: 6, md: 10 }}
        display={'flex'}
        justifyContent={'center'}
      >
        <Card
          elevation={isDarkMode ? 8 : 2}
          sx={{
            backgroundColor: cardBg,
            height: '100%',
            width: '100%',
            maxWidth: '800px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: isDarkMode
              ? '0 8px 16px rgba(255, 255, 255, 0.1)'
              : theme.shadows[2],
          }}
        >
          <Box sx={{ width: '100%', height: '16px', backgroundColor: headerColor }}></Box>
          <Box sx={{ backgroundColor: cardBg }}>
            <Typography
              variant='h4'
              px={{ xs: 3, md: 6 }}
              py={3}
              display={'flex'}
              alignItems={'center'}
              color={textColor}
            >
              <MonitorHeart
                fontSize='large'
                sx={{
                  marginRight: '1rem',
                  color: headerColor
                }}
              />
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

            <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.12)' }} />
            <Box p={{ xs: 3, md: 6 }}>
              <Grid2 container spacing={{ xs: 2, md: 4 }}>
                <Grid2 xs={12} md={6}>
                  <Box display='flex' height='100%' flexDirection='column' gap={{ xs: 2, md: 4 }}>
                    <Box>
                      <Typography
                        variant='caption'
                        fontWeight='bold'
                        textTransform='uppercase'
                        color={labelColor}
                        fontSize='0.65rem'
                      >
                        Name of Beneficiary
                      </Typography>
                      <Typography
                        variant='body1'
                        fontWeight='bold'
                        textTransform='uppercase'
                        fontSize='1.2rem'
                        color={textColor}
                      >
                        John Doe
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant='caption'
                        fontWeight='bold'
                        textTransform='uppercase'
                        color={labelColor}
                        fontSize='0.65rem'
                      >
                        MEDICARE CLAIM NUMBER
                      </Typography>
                      <Typography
                        variant='body1'
                        fontWeight='bold'
                        textTransform='uppercase'
                        fontSize='1.2rem'
                        color={textColor}
                      >
                        123-54-6534-A
                      </Typography>
                    </Box>
                  </Box>
                </Grid2>
                <Grid2 xs={12} md={6}>
                  <Box
                    display='flex'
                    flexDirection='column'
                    height='100%'
                    gap={{ xs: 2, md: 4 }}
                    justifyContent='flex-end'
                  >
                    <Box>
                      <Typography
                        variant='caption'
                        fontWeight='bold'
                        textTransform='uppercase'
                        color={labelColor}
                        fontSize='0.65rem'
                      >
                        Sex
                      </Typography>
                      <Typography
                        variant='body1'
                        fontWeight='bold'
                        textTransform='uppercase'
                        fontSize='1.2rem'
                        color={textColor}
                      >
                        Male
                      </Typography>
                    </Box>
                  </Box>
                </Grid2>
                <Grid2 xs={12}>
                  <Box
                    display='flex'
                    flexWrap="wrap"
                    gap={{ xs: 2, md: 4 }}
                    alignItems='flex-end'
                    justifyContent={{ xs: 'flex-start', md: 'space-between' }}
                    sx={{ width: '100%' }}
                  >
                    <Box>
                      <Typography
                        variant='caption'
                        fontWeight='bold'
                        textTransform='uppercase'
                        color={labelColor}
                        fontSize='0.65rem'
                      >
                        Is Entitled to
                      </Typography>
                      <Typography
                        variant='body1'
                        fontWeight='bold'
                        textTransform='uppercase'
                        fontSize='1.2rem'
                        color={textColor}
                      >
                        HOSPITAL
                      </Typography>
                      <Typography
                        variant='body1'
                        fontWeight='bold'
                        textTransform='uppercase'
                        fontSize='1.2rem'
                        color={textColor}
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
                        color={textColor}
                      >
                        (Part A)
                      </Typography>
                      <Typography
                        variant='body1'
                        fontWeight='bold'
                        textTransform='uppercase'
                        fontSize='1.2rem'
                        color={textColor}
                      >
                        (Part B)
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant='caption'
                        fontWeight='bold'
                        textTransform='uppercase'
                        color={labelColor}
                        fontSize='0.65rem'
                      >
                        Effective Date
                      </Typography>
                      <Typography
                        variant='body1'
                        fontWeight='bold'
                        textTransform='uppercase'
                        fontSize='1.2rem'
                        color={textColor}
                      >
                        01-01-2024
                      </Typography>
                      <Typography
                        variant='body1'
                        fontWeight='bold'
                        textTransform='uppercase'
                        fontSize='1.2rem'
                        color={textColor}
                      >
                        01-01-2024
                      </Typography>
                    </Box>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Box>
          <Box sx={{ width: '100%', height: '16px', backgroundColor: footerColor }}></Box>
        </Card>
      </Box>
      <Box
        width={'100%'}
        p={{ xs: 2, sm: 6, md: 10 }}
        display={'flex'}
        justifyContent={'center'}
      >
        <Button
          variant='contained'
          onClick={toggleOpen}
          sx={{
            py: 1.5,
            px: 4,
            borderRadius: 2,
            boxShadow: isDarkMode ? '0 4px 8px rgba(255, 255, 255, 0.1)' : 'none',
          }}
        >
          Close
        </Button>
      </Box>
    </Box>
  );
}
