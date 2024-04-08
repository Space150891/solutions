import { Inbox } from '@mui/icons-material';
import { Drawer, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';
import { NavLink } from 'react-router-dom';

import type { DrawerComponentProps } from './types';
import style from './drawer.module.css';
import { config } from './config';
import { Fragment } from 'react';

export const DrawerComponent = ({ open, ...rest }: DrawerComponentProps) => {
   const { palette } = useTheme();

   return (
      <Drawer open={open} sx={{ '& .MuiDrawer-paper': { width: '250px' } }} {...rest}>
         <List>
            {config.map(({ id, name, path, category }) => (
               <Fragment key={id}>
                  {category ? (
                     <Typography
                        sx={{
                           color: 'rgb(140, 140, 140)',
                           fontSize: '0.75rem',
                           padding: '0 8px',
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
                           background: isActive ? 'rgb(245, 245, 245, 1)' : '#fff',
                           color: palette.primary.main,
                           borderRight: isActive ? `3px solid ${palette.primary.main}` : 'none',
                        })}
                     >
                        <Inbox />
                        <ListItemText primary={name} />
                     </NavLink>
                  </ListItem>
               </Fragment>
            ))}
         </List>
      </Drawer>
   );
};
