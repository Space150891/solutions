import { Drawer, useTheme } from '@mui/material';
import { useState, useMemo } from 'react';

import type { DrawerComponentProps } from './types';
import { config } from './config';
import { useThemeContext } from '../../providers/theme-context.provider';

// Import the new components
import { DrawerHeader } from './drawer-header.component';
import { DrawerSearch } from './drawer-search.component';
import { DrawerList } from './drawer-list.component';

export const DrawerComponent = ({ open, ...rest }: DrawerComponentProps) => {
   const { palette } = useTheme();
   const { mode } = useThemeContext();
   const [searchTerm, setSearchTerm] = useState('');

   const isDarkMode = mode === 'dark';

   const filteredConfig = useMemo(() => {
      if (!searchTerm.trim()) return config;

      const lowerSearchTerm = searchTerm.toLowerCase();
      return config.filter(item =>
         item.name.toLowerCase().includes(lowerSearchTerm)
      );
   }, [searchTerm]); return (
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
         {/* Header Component */}
         <DrawerHeader title="CubeX" />

         {/* Search Component */}
         <DrawerSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isDarkMode={isDarkMode}
         />

         {/* List Component */}
         <DrawerList items={filteredConfig} />
      </Drawer>
   );
};
