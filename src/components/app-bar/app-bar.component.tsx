import { AccountCircle, Menu as MenuIcon, Brightness4, Brightness7 } from '@mui/icons-material';
import { AppBar, Box, IconButton, Menu, MenuItem, DialogTitle, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { paths } from '../../routes/paths';
import { handleDrawer } from './app-bar.store';
import { useAppDispatch } from '../../store/hooks';
import { useThemeContext } from '../../providers/theme-context.provider';

export const AppbarComponent = () => {
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const { mode, toggleTheme } = useThemeContext();

   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

   const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   const handleLogout = () => {
      setAnchorEl(null);
      navigate(paths.login);
   };

   return (
      <AppBar
         position='static'
         sx={{
            height: '60px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0 16px',
            boxShadow: 'none',
         }}
      >
         <Box display='flex' alignItems='center' gap={1.25}>
            <IconButton color='inherit' onClick={() => dispatch(handleDrawer(true))}>
               <MenuIcon />
            </IconButton>
            <Link to={paths.cubex}>C U B E X</Link>
            <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
               <IconButton 
                  color='inherit' 
                  onClick={toggleTheme} 
                  sx={{ ml: 1 }}
                  aria-label="toggle theme"
               >
                  {mode === 'light' ? <Brightness4 /> : <Brightness7 />}
               </IconButton>
            </Tooltip>
         </Box>
         <Box>
            <IconButton
               size='large'
               aria-label='account of current user'
               aria-controls='menu-appbar'
               aria-haspopup='true'
               onClick={handleMenu}
               color='inherit'
            >
               <AccountCircle sx={{ width: 32, height: 32 }} />
            </IconButton>
            <Menu
               id='menu-appbar'
               anchorEl={anchorEl}
               anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
               }}
               open={Boolean(anchorEl)}
               onClose={handleClose}
            >
               <DialogTitle style={{ textAlign: 'center', padding: '0 12px' }}>
                  {localStorage.getItem('userEmail')?.split('@')[0]}
               </DialogTitle>
               <MenuItem onClick={handleClose}>Profile</MenuItem>
               <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
         </Box>
      </AppBar>
   );
};
