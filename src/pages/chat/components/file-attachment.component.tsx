import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  alpha,
  Tooltip,
} from '@mui/material';
import {
  Download as DownloadIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  VideoFile as VideoIcon,
  AudioFile as AudioIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
} from '@mui/icons-material';
import { FileAttachment, FileType } from '../types';

interface FileAttachmentProps {
  attachment: FileAttachment;
  isOwn: boolean;
}

export const FileAttachmentComponent: React.FC<FileAttachmentProps> = ({
  attachment,
  isOwn,
}) => {
  const theme = useTheme();

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    const iconProps = { fontSize: 'large' as const, color: 'primary' as const };
    
    if (attachment.type.startsWith('image/')) return <ImageIcon {...iconProps} />;
    if (attachment.type.startsWith('video/')) return <VideoIcon {...iconProps} />;
    if (attachment.type.startsWith('audio/')) return <AudioIcon {...iconProps} />;
    if (attachment.type === 'application/pdf') return <PdfIcon {...iconProps} />;
    if (attachment.type.includes('document') || attachment.type.includes('word')) return <DocIcon {...iconProps} />;
    return <FileIcon {...iconProps} />;
  };

  const getFileTypeCategory = (): string => {
    if (attachment.type.startsWith('image/')) return FileType.IMAGE;
    if (attachment.type.startsWith('video/')) return FileType.VIDEO;
    if (attachment.type.startsWith('audio/')) return FileType.AUDIO;
    if (attachment.type === 'application/pdf' || attachment.type.includes('document') || attachment.type.includes('word')) {
      return FileType.DOCUMENT;
    }
    return FileType.OTHER;
  };

  const handleDownload = () => {
    // In a real app, this would handle secure file downloads
    const link = document.createElement('a');
    link.href = attachment.url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isImage = attachment.type.startsWith('image/');
  const fileCategory = getFileTypeCategory();

  return (
    <Card
      sx={{
        maxWidth: 300,
        mb: 1,
        bgcolor: isOwn 
          ? alpha(theme.palette.primary.main, 0.1)
          : alpha(theme.palette.background.paper, 0.8),
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {/* Image Preview */}
      {isImage && attachment.thumbnailUrl && (
        <CardMedia
          component="img"
          height="200"
          image={attachment.thumbnailUrl}
          alt={attachment.name}
          sx={{
            objectFit: 'cover',
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8,
            },
          }}
          onClick={() => window.open(attachment.url, '_blank')}
        />
      )}

      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* File Icon */}
          {!isImage && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {getFileIcon()}
            </Box>
          )}

          {/* File Info */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              fontWeight={500}
              noWrap
              sx={{ color: 'text.primary' }}
            >
              {attachment.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {formatFileSize(attachment.size)} • {fileCategory}
            </Typography>
          </Box>

          {/* Download Button */}
          <Tooltip title="Download file">
            <IconButton
              size="small"
              onClick={handleDownload}
              sx={{
                color: 'primary.main',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <DownloadIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Upload Time */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: 'block' }}
        >
          Uploaded {attachment.uploadedAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Typography>
      </CardContent>
    </Card>
  );
}; 