import { FC, useRef, useState } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  PictureAsPdf as PdfIcon,
  Description as DocIcon,
  TableChart as SpreadsheetIcon,
} from '@mui/icons-material';
import { Document, Folder, formatFileSize, mockFolders } from '../mock';

interface FileUploadModalProps {
  open: boolean;
  onClose: () => void;
  onFilesUpload: (files: Document[]) => void;
  currentFolderId: string | null;
  maxFileSize?: number;
}

interface UploadFile {
  file: File;
  id: string;
  progress: number;
  error?: string;
  folderId: string | null;
  source: 'internal' | 'external';
}

const FileUploadModal: FC<FileUploadModalProps> = ({
  open,
  onClose,
  onFilesUpload,
  currentFolderId,
  maxFileSize = 10, // 10MB default
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(currentFolderId);
  const [fileSource, setFileSource] = useState<'internal' | 'external'>('internal');

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) {
      return <PdfIcon color="error" />;
    }
    if (type.includes('image')) {
      return <ImageIcon color="info" />;
    }
    if (type.includes('word') || type.includes('document')) {
      return <DocIcon color="primary" />;
    }
    if (type.includes('sheet') || type.includes('excel')) {
      return <SpreadsheetIcon color="success" />;
    }
    return <FileIcon color="action" />;
  };

  const validateFile = (file: File): string | null => {
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size exceeds ${maxFileSize}MB limit`;
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
        folderId: selectedFolderId,
        source: fileSource,
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

  const handleFolderChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSelectedFolderId(value === 'null' ? null : value);
    
    // Update all files to use the new folder
    setUploadFiles(prev => prev.map(file => ({
      ...file,
      folderId: value === 'null' ? null : value,
    })));
  };

  const handleSourceChange = (event: SelectChangeEvent) => {
    const value = event.target.value as 'internal' | 'external';
    setFileSource(value);
    
    // Update all files to use the new source
    setUploadFiles(prev => prev.map(file => ({
      ...file,
      source: value,
    })));
  };

  const simulateUpload = (uploadFile: UploadFile): Promise<Document> => {
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
        
        const mockUrl = URL.createObjectURL(uploadFile.file);
        
        const document: Document = {
          id: uploadFile.id,
          name: uploadFile.file.name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          folderId: uploadFile.folderId,
          type: 'document',
          source: uploadFile.source,
          fileType: uploadFile.file.type,
          size: uploadFile.file.size,
          url: mockUrl,
        };

        resolve(document);
      }, 2000);
    });
  };

  const handleUpload = async () => {
    const validFiles = uploadFiles.filter(f => !f.error);
    if (validFiles.length === 0) return;

    setIsUploading(true);

    try {
      const documents = await Promise.all(
        validFiles.map(file => simulateUpload(file))
      );

      onFilesUpload(documents);
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
            Select files to add to the system
          </Typography>
        </DialogTitle>

        <DialogContent>
          {/* Folder and Source Selection */}
          <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <FormControl sx={{ mt: 1 }} fullWidth size="small">
              <InputLabel>Destination Folder</InputLabel>
              <Select
                value={selectedFolderId || 'null'}
                label="Destination Folder"
                onChange={handleFolderChange}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300
                    }
                  }
                }}
                sx={{
                  '& .MuiSelect-select': {
                    paddingRight: '32px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }
                }}
              >
                <MenuItem value="null">Root (No Folder)</MenuItem>
                {mockFolders.map(folder => (
                  <MenuItem key={folder.id} value={folder.id}>
                    {folder.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl sx={{ mt: 1 }} fullWidth size="small">
              <InputLabel>Source</InputLabel>
              <Select
                value={fileSource}
                label="Source"
                onChange={handleSourceChange}
                sx={{
                  '& .MuiSelect-select': {
                    paddingRight: '32px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }
                }}
              >
                <MenuItem value="internal">Internal</MenuItem>
                <MenuItem value="external">External</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
              Max file size: {maxFileSize}MB • Supported: Images, Documents, PDFs
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
                        size="small"
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
              Some files have errors and will not be uploaded. Please check file size restrictions.
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

export default FileUploadModal;
export { FileUploadModal }; 