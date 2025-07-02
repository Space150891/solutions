import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Alert,
  useTheme,
  alpha,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  VideoFile as VideoIcon,
  AudioFile as AudioIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
} from '@mui/icons-material';
import { FileAttachment } from '../types';

interface FileUploadProps {
  open: boolean;
  onClose: () => void;
  onFilesUpload: (attachments: FileAttachment[]) => void;
  maxFileSize?: number; // in MB
  allowedTypes?: string[];
}

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  error?: string;
}

export const FileUploadComponent: React.FC<FileUploadProps> = ({
  open,
  onClose,
  onFilesUpload,
  maxFileSize = 10, // 10MB default
  allowedTypes = [
    'image/*',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/*',
    'video/*',
    'audio/*',
  ],
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const getFileIcon = (type: string) => {
    const iconProps = { color: 'primary' as const };
    
    if (type.startsWith('image/')) return <ImageIcon {...iconProps} />;
    if (type.startsWith('video/')) return <VideoIcon {...iconProps} />;
    if (type.startsWith('audio/')) return <AudioIcon {...iconProps} />;
    if (type === 'application/pdf') return <PdfIcon {...iconProps} />;
    if (type.includes('document') || type.includes('word')) return <DocIcon {...iconProps} />;
    return <FileIcon {...iconProps} />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit`;
    }

    // Check file type
    const isAllowed = allowedTypes.some(type => {
      if (type.endsWith('*')) {
        return file.type.startsWith(type.slice(0, -1));
      }
      return file.type === type;
    });

    if (!isAllowed) {
      return 'File type not supported';
    }

    return null;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    const newUploadFiles: UploadFile[] = files.map(file => {
      const error = validateFile(file);
      return {
        file,
        id: `${Date.now()}-${Math.random()}`,
        progress: 0,
        error: error || undefined,
      };
    });

    setUploadFiles(prev => [...prev, ...newUploadFiles]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (id: string) => {
    setUploadFiles(prev => prev.filter(f => f.id !== id));
  };

  const simulateUpload = (uploadFile: UploadFile): Promise<FileAttachment> => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setUploadFiles(prev => prev.map(f => 
          f.id === uploadFile.id 
            ? { ...f, progress: Math.min(f.progress + 10, 100) }
            : f
        ));
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        
        // Create mock URL (in real app, this would be the uploaded file URL)
        const mockUrl = URL.createObjectURL(uploadFile.file);
        
        const attachment: FileAttachment = {
          id: uploadFile.id,
          name: uploadFile.file.name,
          type: uploadFile.file.type,
          size: uploadFile.file.size,
          url: mockUrl,
          thumbnailUrl: uploadFile.file.type.startsWith('image/') ? mockUrl : undefined,
          uploadedAt: new Date(),
        };

        resolve(attachment);
      }, 2000);
    });
  };

  const handleUpload = async () => {
    const validFiles = uploadFiles.filter(f => !f.error);
    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      const attachments = await Promise.all(
        validFiles.map(file => simulateUpload(file))
      );

      onFilesUpload(attachments);
      setUploadFiles([]);
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      setUploadFiles([]);
      onClose();
    }
  };

  const validFiles = uploadFiles.filter(f => !f.error);
  const hasErrors = uploadFiles.some(f => f.error);

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={allowedTypes.join(',')}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'background.paper',
            backgroundImage: 'none',
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight={600}>
            Upload Files
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Select files to share in the conversation
          </Typography>
        </DialogTitle>

        <DialogContent>
          {/* Upload Area */}
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              border: `2px dashed ${theme.palette.divider}`,
              borderRadius: 2,
              p: 4,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: alpha(theme.palette.primary.main, 0.02),
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderColor: theme.palette.primary.main,
              },
              transition: theme.transitions.create(['background-color', 'border-color']),
            }}
          >
            <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Click to select files
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Max file size: {maxFileSize}MB • Supported: Images, Documents, Videos, Audio
            </Typography>
          </Box>

          {/* File List */}
          {uploadFiles.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Selected Files ({uploadFiles.length})
              </Typography>
              
              <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                {uploadFiles.map((uploadFile) => (
                  <ListItem
                    key={uploadFile.id}
                    sx={{
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1,
                      mb: 1,
                      bgcolor: uploadFile.error 
                        ? alpha(theme.palette.error.main, 0.05)
                        : 'background.paper',
                    }}
                  >
                    <ListItemIcon>
                      {getFileIcon(uploadFile.file.type)}
                    </ListItemIcon>
                    
                    <ListItemText
                      primary={uploadFile.file.name}
                      secondary={
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            {formatFileSize(uploadFile.file.size)}
                          </Typography>
                          {uploadFile.error && (
                            <Typography variant="caption" color="error" display="block">
                              {uploadFile.error}
                            </Typography>
                          )}
                          {uploadFile.progress > 0 && uploadFile.progress < 100 && (
                            <LinearProgress
                              variant="determinate"
                              value={uploadFile.progress}
                              sx={{ mt: 1 }}
                            />
                          )}
                        </Box>
                      }
                    />
                    
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => removeFile(uploadFile.id)}
                        disabled={isUploading}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Error Alert */}
          {hasErrors && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Some files have errors and will not be uploaded. Please check file size and type restrictions.
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleUpload}
            disabled={validFiles.length === 0 || isUploading}
            startIcon={<UploadIcon />}
          >
            {isUploading ? 'Uploading...' : `Upload ${validFiles.length} file${validFiles.length !== 1 ? 's' : ''}`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}; 