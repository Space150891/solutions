import { Box, Typography, useTheme, Card, CardContent, Chip, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';

export default function LocationInfo() {
  const theme = useTheme();
  
  return (
    <Card 
      elevation={0}
      sx={{ 
        border: `1px solid ${theme.palette.divider}`,
        borderLeft: `4px solid ${theme.palette.primary.main}`,
        borderRadius: 2,
        height: '100%',
        bgcolor: theme.palette.mode === 'dark' 
          ? 'rgba(66, 153, 225, 0.08)' 
          : 'rgba(66, 153, 225, 0.04)'
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" mb={1}>
          <BusinessIcon 
            fontSize="small" 
            sx={{ color: theme.palette.primary.main, mr: 1 }} 
          />
          <Typography variant="subtitle1" fontWeight="600">
            DEMO CLINIC
          </Typography>
          <Chip 
            label="Active" 
            size="small" 
            color="success" 
            sx={{ ml: 'auto', height: 20, fontSize: '0.75rem' }} 
          />
        </Box>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Box display="flex" alignItems="center" mt={2}>
          <LocationOnIcon 
            fontSize="small" 
            sx={{ color: theme.palette.text.secondary, mr: 1 }} 
          />
          <Box>
            <Typography variant="body2" color="text.primary">
              123 Main Street
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Portrock, NC 34204
            </Typography>
          </Box>
        </Box>
        
        <Box display="flex" alignItems="center" mt={2}>
          <PhoneIcon 
            fontSize="small" 
            sx={{ color: theme.palette.text.secondary, mr: 1 }} 
          />
          <Typography variant="body2" color="text.primary">
            (093) 435-6493
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
