import { 
   TextField, 
   Grid, 
   Box, 
   InputAdornment,
   Autocomplete,
   Chip,
} from '@mui/material';
import { 
   Home as HomeIcon, 
   LocationCity as CityIcon, 
   Public as StateIcon,
   LocalPostOffice as ZipIcon,
} from '@mui/icons-material';

type AddressData = {
   street: string;
   city: string;
   state: string;
   zip: string;
};

type AddressFormProps = AddressData & {
   updateFields: (fields: Partial<AddressData>) => void;
   errors?: Partial<AddressData>;
};

// Sample US states for autocomplete
const US_STATES = [
   'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
   'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
   'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
   'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
   'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
   'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
   'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
   'Wisconsin', 'Wyoming'
];

export function AddressForm({ street, city, state, zip, updateFields, errors = {} }: AddressFormProps) {
   return (
      <Box>
         <Grid container spacing={3}>
            {/* Street Address */}
            <Grid item xs={12}>
               <TextField
                  fullWidth
                  label="Street Address"
                  value={street}
                  onChange={(e) => updateFields({ street: e.target.value })}
                  error={!!errors.street}
                  helperText={errors.street}
                  placeholder="Enter your full street address"
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <HomeIcon color="action" />
                        </InputAdornment>
                     ),
                  }}
                  variant="outlined"
                  sx={{
                     '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                           borderColor: 'primary.main',
                        },
                     },
                  }}
               />
            </Grid>

            {/* City */}
            <Grid item xs={12} sm={6}>
               <TextField
                  fullWidth
                  label="City"
                  value={city}
                  onChange={(e) => updateFields({ city: e.target.value })}
                  error={!!errors.city}
                  helperText={errors.city}
                  placeholder="Enter your city"
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <CityIcon color="action" />
                        </InputAdornment>
                     ),
                  }}
                  variant="outlined"
                  sx={{
                     '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                           borderColor: 'primary.main',
                        },
                     },
                  }}
               />
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={6}>
               <Autocomplete
                  options={US_STATES}
                  value={state}
                  onChange={(_, newValue) => updateFields({ state: newValue || '' })}
                  renderInput={(params) => (
                     <TextField
                        {...params}
                        fullWidth
                        label="State"
                        error={!!errors.state}
                        helperText={errors.state}
                        placeholder="Select or type your state"
                        InputProps={{
                           ...params.InputProps,
                           startAdornment: (
                              <InputAdornment position="start">
                                 <StateIcon color="action" />
                              </InputAdornment>
                           ),
                        }}
                        variant="outlined"
                        sx={{
                           '& .MuiOutlinedInput-root': {
                              '&:hover fieldset': {
                                 borderColor: 'primary.main',
                              },
                           },
                        }}
                     />
                  )}
                  renderTags={(value, getTagProps) =>
                     value.map((option, index) => (
                        <Chip
                           variant="outlined"
                           label={option}
                           {...getTagProps({ index })}
                           key={option}
                        />
                     ))
                  }
                  freeSolo
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
               />
            </Grid>

            {/* ZIP Code */}
            <Grid item xs={12} sm={6}>
               <TextField
                  fullWidth
                  label="ZIP Code"
                  value={zip}
                  onChange={(e) => {
                     // Only allow digits and limit to 5 characters
                     const value = e.target.value.replace(/\D/g, '').slice(0, 5);
                     updateFields({ zip: value });
                  }}
                  error={!!errors.zip}
                  helperText={errors.zip || 'Enter 5-digit ZIP code'}
                  placeholder="12345"
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <ZipIcon color="action" />
                        </InputAdornment>
                     ),
                  }}
                  variant="outlined"
                  inputProps={{
                     maxLength: 5,
                     pattern: '[0-9]{5}',
                  }}
                  sx={{
                     '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                           borderColor: 'primary.main',
                        },
                     },
                  }}
               />
            </Grid>
         </Grid>
      </Box>
   );
}
