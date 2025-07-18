import { FC, MouseEvent } from 'react';
import { Folder as FolderIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Box, Typography, Paper, useTheme, IconButton, Tooltip, Grid } from '@mui/material';
import { Folder } from '../../../store/slices/rootDataManagementSlice';

interface FolderItemProps {
  folder: Folder;
  onClick: (folderId: string) => void;
  onDelete: (folderId: string, e: MouseEvent<HTMLButtonElement>) => void;
  viewMode?: 'grid' | 'list';
}

const FolderItem: FC<FolderItemProps> = ({ folder, onClick, onDelete, viewMode = 'grid' }) => {
  const theme = useTheme();

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(folder.id, e);
  };

  return (
    <Paper
      elevation={1}
      sx={{
        display: 'flex',
        flexDirection: viewMode === 'list' ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: viewMode === 'list' ? 'flex-start' : 'center',
        padding: 2,
        cursor: 'pointer',
        height: '100%',
        transition: 'all 0.2s ease-in-out',
        position: 'relative',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.05)' 
            : 'rgba(0, 0, 0, 0.02)',
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[3],
          '& .delete-button': {
            opacity: 1,
          },
        }
      }}
      onClick={() => onClick(folder.id)}
    >
      <Tooltip title="Delete folder">
        <IconButton
          size="small"
          className="delete-button"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
            backgroundColor: theme.palette.error.light,
            color: theme.palette.error.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.error.main,
            },
          }}
          onClick={handleDelete}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <FolderIcon 
        sx={{ 
          fontSize: viewMode === 'list' ? 32 : 48, 
          color: theme.palette.primary.main,
          mb: viewMode === 'list' ? 0 : 1,
          mr: viewMode === 'list' ? 2 : 0
        }} 
      />
      <Box sx={{ textAlign: viewMode === 'list' ? 'left' : 'center', flexGrow: viewMode === 'list' ? 1 : 0 }}>
        <Typography 
          variant="subtitle1" 
          noWrap 
          sx={{ 
            fontWeight: 500,
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {folder.name}
        </Typography>
        <Typography 
          variant="caption" 
          color="text.secondary"
        >
          {new Date(folder.updatedAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Paper>
  );
};

export default FolderItem;
export type { FolderItemProps };
export { FolderItem }; 