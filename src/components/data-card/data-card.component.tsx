import {
   Card,
   CardContent,
   CardActions,
   Typography,
   Box,
   Avatar,
   Chip,
   IconButton,
   Menu,
   MenuItem,
   useTheme
} from '@mui/material';
import { useState, ReactNode } from 'react';

// Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

export interface CardAction {
   label: string;
   icon: ReactNode;
   onClick: () => void;
   color?: string;
}

export interface DataField {
   label: string;
   value: string | number;
}

export interface DetailChip {
   label: string;
   color?: 'primary' | 'secondary' | 'warning' | 'error' | 'info' | 'success';
   variant?: 'filled' | 'outlined';
}

interface DataCardProps {
   title: string;
   subtitle?: string;
   avatar?: {
      src?: string;
      alt?: string;
      outlined?: boolean;
      outlineColor?: string;
   };
   gender?: 'Male' | 'Female';
   fields: DataField[];
   chips?: DetailChip[];
   actions?: CardAction[];
   icon?: ReactNode;
}

export const DataCard = ({
   title,
   subtitle,
   avatar,
   gender,
   fields,
   chips = [],
   actions = [],
   icon
}: DataCardProps) => {
   const theme = useTheme();
   const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

   const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
      setMenuAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setMenuAnchorEl(null);
   };

   const avatarSrc = avatar?.src || `/assets/${gender === 'Male' ? 'patient_m.png' : 'doctor_f.png'}`;

   return (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
         <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
               {(avatar || gender) && (
                  <Avatar
                     src={avatarSrc}
                     alt={avatar?.alt || title}
                     sx={{
                        width: 56,
                        height: 56,
                        mr: 2,
                        ...(avatar?.outlined && {
                           border: `2px solid ${avatar.outlineColor || theme.palette.primary.main}`
                        })
                     }}
                  />
               )}
               <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" sx={{ lineHeight: 1.2 }}>
                     {title}
                  </Typography>
                  {subtitle && (
                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                        {icon && (
                           <Box component="span" sx={{ mr: 0.5, display: 'flex', alignItems: 'center' }}>
                              {icon}
                           </Box>
                        )}
                        <Typography variant="body2" color="text.secondary">
                           {subtitle}
                        </Typography>
                        {gender && (
                           <>
                              <Box component="span" sx={{ mx: 0.5 }}>•</Box>
                              {gender === 'Male' ?
                                 <MaleIcon fontSize="small" color="info" /> :
                                 <FemaleIcon fontSize="small" color="secondary" />
                              }
                           </>
                        )}
                     </Box>
                  )}
               </Box>
               {actions.length > 0 && (
                  <IconButton
                     onClick={handleMenuOpen}
                     size="small"
                     aria-label="more options"
                  >
                     <MoreVertIcon />
                  </IconButton>
               )}
            </Box>

            {fields.map((field, index) => (
               <Box sx={{ mb: 1 }} key={index}>
                  <Typography variant="caption" color="text.secondary" display="block">
                     {field.label}
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                     {field.value}
                  </Typography>
               </Box>
            ))}
         </CardContent>

         {chips.length > 0 && (
            <CardActions sx={{ mt: 'auto', p: 2, pt: 0 }}>
               {chips.map((chip, index) => (
                  <Chip
                     key={index}
                     label={chip.label}
                     size="small"
                     color={chip.color || 'default'}
                     variant={chip.variant || 'outlined'}
                     sx={{ mr: 1 }}
                  />
               ))}
            </CardActions>
         )}

         {/* Card-specific Menu */}
         {actions.length > 0 && (
            <Menu
               anchorEl={menuAnchorEl}
               open={Boolean(menuAnchorEl)}
               onClose={handleMenuClose}
               anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
               }}
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
               }}
            >
               {actions.map((action, index) => (
                  <MenuItem key={index} onClick={() => {
                     action.onClick();
                     handleMenuClose();
                  }} sx={action.color ? { color: action.color } : {}}>
                     <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        {action.icon}
                     </Box>
                     {action.label}
                  </MenuItem>
               ))}
            </Menu>
         )}
      </Card>
   );
};
