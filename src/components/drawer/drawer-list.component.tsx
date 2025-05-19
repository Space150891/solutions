import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Inbox } from '@mui/icons-material';
import { List, ListItem, ListItemText, Typography, useTheme } from '@mui/material';

import style from './drawer.module.css';
import { useThemeContext } from '../../providers/theme-context.provider';

interface DrawerListProps {
  items: Array<{
    id: number;
    name: string;
    path: string;
    category?: string;
  }>;
}

export const DrawerList = ({ items }: DrawerListProps) => {
  const { palette } = useTheme();
  const { mode } = useThemeContext();
  const isDarkMode = mode === 'dark';

  return (
    <List sx={{ pt: 1 }}>
      {items.map(({ id, name, path, category }) => (
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
  );
};
