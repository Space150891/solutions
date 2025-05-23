import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Paper,
  Tabs,
  Tab
} from '@mui/material';
import { ReactNode, ReactElement } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';

// Icons
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface TabOption {
  icon?: ReactElement;
  label: string;
  value: string;
}

interface PageLayoutProps {
  title: string;
  subtitle: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onAddClick?: () => void;
  addButtonText?: string;
  addButtonIcon?: ReactNode;
  tabValue?: string;
  tabOptions?: TabOption[];
  onTabChange?: (value: string) => void;
  statsCards?: ReactNode;
  children: ReactNode;
}

export const PageLayout = ({
  title,
  subtitle,
  searchQuery = '',
  onSearchChange,
  onAddClick,
  addButtonText,
  addButtonIcon,
  tabValue,
  tabOptions,
  onTabChange,
  statsCards,
  children
}: PageLayoutProps) => {
  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      {/* Header section */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'stretch', md: 'center' },
        mb: 4
      }}>
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>

        {(onSearchChange || onAddClick) && (
          <Box sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: { xs: 'space-between', sm: 'flex-end' }
          }}>
            {onSearchChange && (
              <TextField
                placeholder={`Search ${title.toLowerCase()}...`}
                size="small"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery ? (
                    <InputAdornment position="end">
                      <IconButton size="small" onClick={() => onSearchChange('')}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }}
              />
            )}

            {onAddClick && (
              <Button
                variant="contained"
                startIcon={addButtonIcon}
                onClick={onAddClick}
              >
                {addButtonText || 'Add New'}
              </Button>
            )}
          </Box>
        )}
      </Box>

      {/* Stats section */}
      {statsCards && (
        <Box sx={{ mb: 4 }}>
          <Grid2 container spacing={2}>
            {statsCards}
          </Grid2>
        </Box>
      )}

      {/* Tabs section */}
      {tabOptions && tabValue && onTabChange && (
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={(_, value) => onTabChange(value)}
            indicatorColor="primary"
            textColor="primary"
          >
            {tabOptions.map((tab) => (
              <Tab
                key={tab.value}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Paper>
      )}

      {/* Content section */}
      {children}
    </Box>
  );
};
