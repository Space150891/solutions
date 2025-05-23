import {
  Card,
  CardContent,
  Box,
  Typography,
  useTheme
} from '@mui/material';
import { ReactNode } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';


interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export const StatCard = ({ title, value, icon }: StatCardProps) => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      }}>
        <Box sx={{
          width: 60,
          height: 60,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.palette.mode === 'light'
            ? theme.palette.primary.light
            : theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          mr: 2
        }}>
          {icon}
        </Box>
        <Box>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
  searchQuery?: string;
}

export const EmptyState = ({ message, icon, searchQuery }: EmptyStateProps) => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    {icon}
    <Typography variant="h6" color="text.secondary">
      {message}
    </Typography>
    <Typography variant="body2" color="text.disabled" sx={{ mt: 1 }}>
      {searchQuery ? "Try adjusting your search or add new data." : "Add some data to get started."}
    </Typography>
  </Box>
);

interface GridLayoutProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  emptyState: ReactNode;
  getItemKey?: (item: T) => string | number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
}
export const GridLayout = <T,>({
  items,
  renderItem,
  emptyState,
  getItemKey,
  xs = 12,
  sm = 6,
  md = 4,
  lg = 3
}: GridLayoutProps<T>) => {
  return items.length > 0 ? (
    <Grid2 container spacing={2}>
      {items.map((item, index) => (
        <Grid2 xs={xs} sm={sm} md={md} lg={lg} key={getItemKey ? getItemKey(item) : index}>
          {renderItem(item, index)}
        </Grid2>
      ))}
    </Grid2>
  ) : emptyState;
};
