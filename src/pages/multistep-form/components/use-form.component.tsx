import { 
   TextField, 
   Grid, 
   Box, 
   InputAdornment, 
   FormHelperText,
   Slider,
   Typography,
   Paper,
   useTheme,
} from '@mui/material';
import { 
   Person as PersonIcon, 
   Badge as BadgeIcon, 
   Cake as CakeIcon 
} from '@mui/icons-material';

type UserData = {
   firstName: string;
   lastName: string;
   age: string;
};

type UserFormProps = UserData & {
   updateFields: (fields: Partial<UserData>) => void;
   errors?: Partial<UserData>;
};

export const UserForm = ({ firstName, lastName, age, updateFields, errors = {} }: UserFormProps) => {
   const theme = useTheme();
   const ageValue = parseInt(age) || 18;

   const handleAgeSliderChange = (_: Event, newValue: number | number[]) => {
      updateFields({ age: (newValue as number).toString() });
   };

   return (
      <Box>
         <Grid container spacing={3}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
               <TextField
                  fullWidth
                  label="First Name"
                  value={firstName}
                  onChange={(e) => updateFields({ firstName: e.target.value })}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <PersonIcon color="action" />
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

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
               <TextField
                  fullWidth
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => updateFields({ lastName: e.target.value })}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <BadgeIcon color="action" />
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

            {/* Age */}
            <Grid item xs={12}>
               <Paper 
                  elevation={0} 
                  sx={{ 
                     p: 3, 
                     bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50', 
                     borderRadius: 2,
                     border: theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none'
                  }}
               >
                  <Box display="flex" alignItems="center" gap={1} mb={2}>
                     <CakeIcon color="primary" />
                     <Typography variant="h6" fontWeight="medium">
                        Age
                     </Typography>
                  </Box>
                  
                  <Grid container spacing={3} alignItems="center">
                     <Grid item xs={12} sm={8}>
                        <Slider
                           value={ageValue}
                           onChange={handleAgeSliderChange}
                           min={1}
                           max={120}
                           step={1}
                           marks={[
                              { value: 18, label: '18' },
                              { value: 30, label: '30' },
                              { value: 50, label: '50' },
                              { value: 70, label: '70' },
                              { value: 100, label: '100+' },
                           ]}
                           valueLabelDisplay="auto"
                           sx={{
                              '& .MuiSlider-thumb': {
                                 width: 20,
                                 height: 20,
                              },
                              '& .MuiSlider-track': {
                                 height: 6,
                              },
                              '& .MuiSlider-rail': {
                                 height: 6,
                                 opacity: 0.3,
                              },
                              '& .MuiSlider-valueLabel': {
                                 backgroundColor: theme.palette.primary.main,
                              },
                              '& .MuiSlider-markLabel': {
                                 color: theme.palette.text.secondary,
                              },
                              '& .MuiSlider-mark': {
                                 backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[400],
                                 width: 4,
                                 height: 4,
                                 borderRadius: '50%',
                              },
                              '& .MuiSlider-markActive': {
                                 backgroundColor: theme.palette.primary.main,
                              }
                           }}
                        />
                     </Grid>
                     <Grid item xs={12} sm={4}>
                        <TextField
                           fullWidth
                           label="Age"
                           type="number"
                           value={age}
                           onChange={(e) => updateFields({ age: e.target.value })}
                           error={!!errors.age}
                           inputProps={{ min: 1, max: 120 }}
                           variant="outlined"
                           size="small"
                           sx={{
                              '& .MuiOutlinedInput-root': {
                                 bgcolor: theme.palette.mode === 'dark' ? 'background.default' : 'white',
                                 '&:hover fieldset': {
                                    borderColor: 'primary.main',
                                 },
                              },
                           }}
                        />
                        {errors.age && (
                           <FormHelperText error sx={{ mt: 1 }}>
                              {errors.age}
                           </FormHelperText>
                        )}
                     </Grid>
                  </Grid>
               </Paper>
            </Grid>
         </Grid>
      </Box>
   );
};
