import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { AppbarComponent } from '../../components/app-bar/app-bar.component';
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { appbarState, handleDrawer } from '../../components/app-bar/app-bar.store';

export default function CubexPage() {
   const dispatch = useAppDispatch();
   const { isDrawer } = useAppSelector(appbarState);

   return (
      <Stack component='main'>
         <AppbarComponent />
         <DrawerComponent open={isDrawer} onClose={() => dispatch(handleDrawer(false))} />
         <Outlet />
      </Stack>
   );
}
