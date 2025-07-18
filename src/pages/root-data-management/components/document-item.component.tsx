import { FC, MouseEvent } from 'react';
import { 
  InsertDriveFile as FileIcon,
  PictureAsPdf as PdfIcon,
  Image as ImageIcon,
  Description as DocIcon,
  TableChart as SpreadsheetIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { Box, Typography, Paper, useTheme, Chip, IconButton, Tooltip } from '@mui/material';
import { Document } from '../../../store/slices/rootDataManagementSlice';

// Helper function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

interface DocumentItemProps {
  document: Document;
  onClick: (documentId: string) => void;
  onDelete: (documentId: string, e: MouseEvent<HTMLButtonElement>) => void;
  viewMode?: 'grid' | 'list';
}

const DocumentItem: FC<DocumentItemProps> = ({ document, onClick, onDelete, viewMode = 'grid' }) => {
  const theme = useTheme();

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(document.id, e);
  };

  const getFileIcon = () => {
    const { fileType } = document;
    const iconStyle = { 
      fontSize: viewMode === 'list' ? 32 : 48, 
      mb: viewMode === 'list' ? 0 : 1,
      mr: viewMode === 'list' ? 2 : 0
    };
    
    if (fileType.includes('pdf')) {
      return <PdfIcon sx={iconStyle} color="error" />;
    }
    if (fileType.includes('image')) {
      return <ImageIcon sx={iconStyle} color="info" />;
    }
    if (fileType.includes('word') || fileType.includes('document')) {
      return <DocIcon sx={iconStyle} color="primary" />;
    }
    if (fileType.includes('sheet') || fileType.includes('excel')) {
      return <SpreadsheetIcon sx={iconStyle} color="success" />;
    }
    
    return <FileIcon sx={iconStyle} color="action" />;
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
        position: 'relative',
        transition: 'all 0.2s ease-in-out',
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
      onClick={() => onClick(document.id)}
    >
      <Tooltip title="Delete document">
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

      {getFileIcon()}
      <Box sx={{ 
        textAlign: viewMode === 'list' ? 'left' : 'center', 
        width: viewMode === 'list' ? 'auto' : '100%',
        flexGrow: viewMode === 'list' ? 1 : 0
      }}>
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
          {document.name}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: viewMode === 'list' ? 'flex-start' : 'center', 
          alignItems: 'center', 
          gap: 1, 
          mt: 0.5 
        }}>
          <Typography variant="caption" color="text.secondary">
            {formatFileSize(document.size)}
          </Typography>
          <Chip 
            label={document.source} 
            size="small" 
            color={document.source === 'internal' ? 'primary' : 'secondary'}
            sx={{ height: 20, '& .MuiChip-label': { px: 1, py: 0, fontSize: '0.625rem' } }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default DocumentItem;
export type { DocumentItemProps };
export { DocumentItem }; 