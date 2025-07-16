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
import { Document, formatFileSize } from '../mock';

interface DocumentItemProps {
  document: Document;
  onClick: (documentId: string) => void;
  onDelete: (documentId: string, e: MouseEvent<HTMLButtonElement>) => void;
}

const DocumentItem: FC<DocumentItemProps> = ({ document, onClick, onDelete }) => {
  const theme = useTheme();

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(document.id, e);
  };

  const getFileIcon = () => {
    const { fileType } = document;
    const iconStyle = { fontSize: 48, mb: 1 };
    
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
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
      <Box sx={{ textAlign: 'center', width: '100%' }}>
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 0.5 }}>
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
export { DocumentItem }; 