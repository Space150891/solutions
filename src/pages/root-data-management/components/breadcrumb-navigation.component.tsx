import { FC } from 'react';
import { Breadcrumbs, Link, Typography, Box, useTheme } from '@mui/material';
import { Home as HomeIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { Folder } from '../../../store/slices/rootDataManagementSlice';

interface BreadcrumbNavigationProps {
  currentFolderId: string | null;
  onNavigate: (folderId: string | null) => void;
  breadcrumbPath?: Folder[]; // Optional prop for Redux implementation
}

const BreadcrumbNavigation: FC<BreadcrumbNavigationProps> = ({
  currentFolderId,
  onNavigate,
  breadcrumbPath,
}) => {
  const theme = useTheme();

  // If breadcrumbPath is provided, use it directly (Redux implementation)
  // Otherwise, build it from mockFolders (original implementation)
  const path = breadcrumbPath || [];

  return (
    <Box sx={{ mb: 2 }}>
      <Breadcrumbs 
        separator={<ChevronRightIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
            cursor: 'pointer',
          }}
          color="inherit"
          onClick={() => onNavigate(null)}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Root
        </Link>

        {path.map((folder, index) => {
          const isLast = index === path.length - 1;
          
          return isLast ? (
            <Typography
              key={folder.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 500,
              }}
              color="text.primary"
            >
              {folder.name}
            </Typography>
          ) : (
            <Link
              key={folder.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                color: theme.palette.primary.main,
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
                cursor: 'pointer',
              }}
              color="inherit"
              onClick={() => onNavigate(folder.id)}
            >
              {folder.name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbNavigation;
export { BreadcrumbNavigation }; 