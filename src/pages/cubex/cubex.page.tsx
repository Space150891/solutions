import { Box, Stack, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppbarComponent } from '../../components/app-bar/app-bar.component';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { appbarState, handleDrawer } from '../../components/app-bar/app-bar.store';
import { useThemeContext } from '../../providers/theme-context.provider';
import { PageScrollContainer } from '../../components/common';

export default function CubexPage() {
   const dispatch = useAppDispatch();
   const { isDrawer } = useAppSelector(appbarState);
   // We use theme context to ensure the component re-renders when theme changes
   useThemeContext();
   const theme = useTheme();

   return (
      <Stack
         component='main'
         sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            color: 'text.primary',
            transition: theme.transitions.create(['background-color', 'color'], {
               duration: theme.transitions.duration.standard,
            }),
         }}
      >
         <AppbarComponent />
         <DrawerComponent
            open={isDrawer}
            onClose={() => dispatch(handleDrawer(false))}
         />
         <Box
            sx={{
               flexGrow: 1,
               p: 1,
               transition: theme.transitions.create(['background-color', 'color'], {
                  duration: theme.transitions.duration.standard,
               }),            }}
         >
            <PageScrollContainer>
              <Outlet />
            </PageScrollContainer>
         </Box>
      </Stack>
   );
}
