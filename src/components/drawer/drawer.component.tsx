import { Inbox } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText, Typography, useTheme, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';

import type { DrawerComponentProps } from './types';
import style from './drawer.module.css';
import { config } from './config';
import { Fragment } from 'react';
import { useThemeContext } from '../../providers/theme-context.provider';

export const DrawerComponent = ({ open, ...rest }: DrawerComponentProps) => {
   const { palette } = useTheme();
   const { mode } = useThemeContext();


   const isDarkMode = mode === 'dark';

   return (
      <Drawer
         open={open}
         sx={{
            '& .MuiDrawer-paper': {
               width: '250px',
               bgcolor: 'background.default',
               color: 'text.primary',
               transition: palette.mode === 'dark'
                  ? 'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease'
                  : 'background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease',
               borderRight: `1px solid ${mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'}`,
               // Custom scrollbar styling
               '&::-webkit-scrollbar': {
                  width: '6px',
                  backgroundColor: 'transparent',
               },
               '&::-webkit-scrollbar-thumb': {
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                  borderRadius: '3px',
                  '&:hover': {
                     backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
                  },
               },
               '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
               },
            }
         }}
         {...rest}
      >
         <Box sx={{ borderBottom: 1, borderColor: 'divider', py: 1.5, px: 2 }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
               CubeX
            </Typography>
         </Box>
         <List sx={{ pt: 1 }}>
            {config.map(({ id, name, path, category }) => (
               <Fragment key={id}>
                  {category ? (
                     <Typography
                        sx={{
                           color: 'text.secondary',
                           fontSize: '0.75rem',
                           fontWeight: 500,
                           padding: '8px 16px 4px',
                           textTransform: 'uppercase',
                           letterSpacing: '0.08em'
                        }}
                     >
                        {category}
                     </Typography>
                  ) : null}
                  <ListItem disablePadding sx={{ cursor: 'pointer' }}>
                     <NavLink
                        end
                        to={path}
                        className={style.navlink}
                        style={({ isActive }) => ({
                           background: isActive
                              ? (isDarkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(69, 153, 191, 0.08)')
                              : 'transparent',
                           color: isActive
                              ? palette.primary.main
                              : (isDarkMode ? palette.text.primary : palette.text.primary),
                           borderLeft: isActive ? `3px solid ${palette.primary.main}` : '3px solid transparent',
                           borderRadius: '0 4px 4px 0',
                           paddingLeft: '13px',
                        })}
                     >
                        <Inbox
                           sx={{
                              color: 'inherit',
                              opacity: isDarkMode ? 0.7 : 0.6
                           }}
                        />
                        <ListItemText
                           primary={name}
                           primaryTypographyProps={{
                              fontSize: '0.875rem',
                              fontWeight: 500
                           }}
                        />
                     </NavLink>
                  </ListItem>
               </Fragment>
            ))}
         </List>
      </Drawer>
   );
};
