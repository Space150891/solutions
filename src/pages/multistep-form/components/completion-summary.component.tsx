import {
   Card,
   CardContent,
   Typography,
   Box,
   Divider,
   Button,
   Chip,
   List,
   ListItem,
   ListItemIcon,
   ListItemText,
   Avatar,
   useTheme,
} from '@mui/material';
import {
   CheckCircle as CheckIcon,
   Person as PersonIcon,
   Home as HomeIcon,
   Email as EmailIcon,
   Phone as PhoneIcon,
   Edit as EditIcon,
   Download as DownloadIcon,
} from '@mui/icons-material';
import { FormData } from '../types';

interface CompletionSummaryProps {
   data: FormData;
   onEdit: () => void;
}

export const CompletionSummary = ({ data, onEdit }: CompletionSummaryProps) => {
   const theme = useTheme();

   const handleDownload = () => {
      const content = `
Registration Summary
===================

Personal Information:
- Name: ${data.firstName} ${data.lastName}
- Age: ${data.age}
- Gender: ${data.gender}

Address:
- Street: ${data.street}
- City: ${data.city}
- State: ${data.state}
- ZIP: ${data.zip}

Contact Information:
- Email: ${data.email}
- Phone: ${data.phone}
- Nationality: ${data.nationality}
- Occupation: ${data.occupation}

Generated on: ${new Date().toLocaleDateString()}
      `;

      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'registration-summary.txt';
      a.click();
      window.URL.revokeObjectURL(url);
   };

   return (
      <Box>
         {/* Success Header */}
         <Box textAlign="center" mb={4}>
            <Avatar
               sx={{
                  width: 80,
                  height: 80,
                  bgcolor: 'success.main',
                  mx: 'auto',
                  mb: 2,
               }}
            >
               <CheckIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
               Registration Complete!
            </Typography>
            <Typography variant="h6" color="text.secondary">
               Thank you for completing your registration. Here's a summary of your information.
            </Typography>
         </Box>

         <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
               {/* Personal Information */}
               <Box mb={4}>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                     <PersonIcon color="primary" />
                     <Typography variant="h6" fontWeight="bold">
                        Personal Information
                     </Typography>
                  </Box>
                  <List dense>
                     <ListItem>
                        <ListItemText 
                           primary="Full Name" 
                           secondary={`${data.firstName} ${data.lastName}`}
                        />
                     </ListItem>
                     <ListItem>
                        <ListItemText 
                           primary="Age" 
                           secondary={`${data.age} years old`}
                        />
                     </ListItem>
                     <ListItem>
                        <ListItemText 
                           primary="Gender" 
                           secondary={data.gender}
                        />
                     </ListItem>
                     <ListItem>
                        <ListItemText 
                           primary="Nationality" 
                           secondary={data.nationality}
                        />
                     </ListItem>
                     <ListItem>
                        <ListItemText 
                           primary="Occupation" 
                           secondary={data.occupation}
                        />
                     </ListItem>
                  </List>
               </Box>

               <Divider sx={{ my: 3 }} />

               {/* Address Information */}
               <Box mb={4}>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                     <HomeIcon color="primary" />
                     <Typography variant="h6" fontWeight="bold">
                        Address Information
                     </Typography>
                  </Box>
                  <List dense>
                     <ListItem>
                        <ListItemText 
                           primary="Street Address" 
                           secondary={data.street}
                        />
                     </ListItem>
                     <ListItem>
                        <ListItemText 
                           primary="City" 
                           secondary={data.city}
                        />
                     </ListItem>
                     <ListItem>
                        <ListItemText 
                           primary="State" 
                           secondary={data.state}
                        />
                     </ListItem>
                     <ListItem>
                        <ListItemText 
                           primary="ZIP Code" 
                           secondary={data.zip}
                        />
                     </ListItem>
                  </List>
               </Box>

               <Divider sx={{ my: 3 }} />

               {/* Contact Information */}
               <Box mb={4}>
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                     <EmailIcon color="primary" />
                     <Typography variant="h6" fontWeight="bold">
                        Contact Information
                     </Typography>
                  </Box>
                  <List dense>
                     <ListItem>
                        <ListItemIcon>
                           <EmailIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                           primary="Email Address" 
                           secondary={data.email}
                        />
                     </ListItem>
                     <ListItem>
                        <ListItemIcon>
                           <PhoneIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                           primary="Phone Number" 
                           secondary={data.phone}
                        />
                     </ListItem>
                  </List>
               </Box>

               {/* Action Buttons */}
               <Box 
                  display="flex" 
                  gap={2} 
                  justifyContent="center" 
                  flexWrap="wrap"
                  pt={3}
                  borderTop={1}
                  borderColor="divider"
               >
                  <Button
                     variant="outlined"
                     startIcon={<EditIcon />}
                     onClick={onEdit}
                     size="large"
                  >
                     Edit Information
                  </Button>
                  <Button
                     variant="contained"
                     startIcon={<DownloadIcon />}
                     onClick={handleDownload}
                     size="large"
                  >
                     Download Summary
                  </Button>
               </Box>

               {/* Success Badge */}
               <Box textAlign="center" mt={3}>
                  <Chip 
                     icon={<CheckIcon />}
                     label="Successfully Registered"
                     color="success"
                     variant="outlined"
                     size="medium"
                     sx={{
                        fontSize: '0.875rem',
                        fontWeight: 'medium',
                     }}
                  />
               </Box>
            </CardContent>
         </Card>
      </Box>
   );
};
