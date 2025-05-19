import { Box, Typography } from '@mui/material';

interface DrawerHeaderProps {
  title: string;
}

export const DrawerHeader = ({ title }: DrawerHeaderProps) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', py: 1.5, px: 2 }}>
      <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
    </Box>
  );
};
