import { FC } from 'react';
import { Breadcrumbs, Link, Typography, Box, useTheme } from '@mui/material';
import { Home as HomeIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import { Folder, mockFolders } from '../mock';

interface BreadcrumbNavigationProps {
  currentFolderId: string | null;
  onNavigate: (folderId: string | null) => void;
}

const BreadcrumbNavigation: FC<BreadcrumbNavigationProps> = ({
  currentFolderId,
  onNavigate,
}) => {
  const theme = useTheme();

  // Build breadcrumb path by traversing up the folder hierarchy
  const buildBreadcrumbPath = (folderId: string | null): Folder[] => {
    if (!folderId) return [];

    const folder = mockFolders.find(f => f.id === folderId);
    if (!folder) return [];

    const parentPath = buildBreadcrumbPath(folder.parentId);
    return [...parentPath, folder];
  };

  const breadcrumbPath = buildBreadcrumbPath(currentFolderId);

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
          }}
          color="inherit"
          onClick={() => onNavigate(null)}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="small" />
          Root
        </Link>

        {breadcrumbPath.map((folder, index) => {
          const isLast = index === breadcrumbPath.length - 1;
          
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