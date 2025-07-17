import { useState, useEffect, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
  useTheme,
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  CreateNewFolder as CreateNewFolderIcon,
  Search as SearchIcon,
  Upload as UploadIcon,
  Refresh as RefreshIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
} from '@mui/icons-material';
import { IPages } from '../../types/common.types';
import { DataItem, Document, Folder, getAllRootItems, getItemsByParentId, deleteFolder, deleteDocument } from './mock';
import FolderItem from './components/folder-item.component';
import DocumentItem from './components/document-item.component';
import FileUploadModal from './components/file-upload-modal.component';
import NewFolderModal from './components/new-folder-modal.component';
import BreadcrumbNavigation from './components/breadcrumb-navigation.component';

export default function RootDataManagementPage() {
  const theme = useTheme();
  const location = useLocation();
  const [items, setItems] = useState<DataItem[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Delete confirmation states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'folder' | 'document', name: string } | null>(null);

  // Check for openFolder parameter in location state
  useEffect(() => {
    if (location.state && location.state.openFolder) {
      setCurrentFolderId(location.state.openFolder);
    }
  }, [location.state]);

  // Load items based on current folder
  useEffect(() => {
    if (currentFolderId === null) {
      setItems(getAllRootItems());
    } else {
      setItems(getItemsByParentId(currentFolderId));
    }
  }, [currentFolderId]);

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group items by type
  const folders = filteredItems.filter(item => item.type === 'folder') as Folder[];
  const documents = filteredItems.filter(item => item.type === 'document') as Document[];

  // Handle folder navigation
  const handleFolderClick = (folderId: string) => {
    setCurrentFolderId(folderId);
  };

  // Handle document click
  const handleDocumentClick = (documentId: string) => {
    const document = documents.find(doc => doc.id === documentId);
    if (document) {
      // In a real application, this would open the document or show a preview
      console.log('Opening document:', document);
      window.open(document.url, '_blank');
    }
  };

  // Handle file upload
  const handleFilesUpload = (newDocuments: Document[]) => {
    setItems(prevItems => [...prevItems, ...newDocuments]);
  };

  // Handle new folder creation
  const handleCreateFolder = (newFolder: Folder) => {
    setItems(prevItems => [...prevItems, newFolder]);
  };

  // Handle breadcrumb navigation
  const handleBreadcrumbNavigation = (folderId: string | null) => {
    setCurrentFolderId(folderId);
  };

  // Handle refresh
  const handleRefresh = () => {
    if (currentFolderId === null) {
      setItems(getAllRootItems());
    } else {
      setItems(getItemsByParentId(currentFolderId));
    }
  };

  // Handle delete confirmation open
  const handleDeleteRequest = (id: string, type: 'folder' | 'document', name: string) => {
    setItemToDelete({ id, type, name });
    setDeleteDialogOpen(true);
  };

  // Handle folder delete request
  const handleFolderDeleteRequest = (folderId: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      handleDeleteRequest(folderId, 'folder', folder.name);
    }
  };

  // Handle document delete request
  const handleDocumentDeleteRequest = (documentId: string, e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const document = documents.find(d => d.id === documentId);
    if (document) {
      handleDeleteRequest(documentId, 'document', document.name);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;

    if (itemToDelete.type === 'folder') {
      deleteFolder(itemToDelete.id);
    } else {
      deleteDocument(itemToDelete.id);
    }

    // Refresh items list
    handleRefresh();
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // Handle delete cancellation
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  return (
    <Box component="section" padding={3}>
      <Typography variant="h5" mb={3}>
        {IPages.ROOT_DATA_MANAGEMENT.toUpperCase()}
      </Typography>

      <Card>
        <CardContent>
          {/* Breadcrumb Navigation */}
          <BreadcrumbNavigation
            currentFolderId={currentFolderId}
            onNavigate={handleBreadcrumbNavigation}
          />

          {/* Actions Toolbar */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              mb: 3,
              flexWrap: 'wrap',
              gap: 2
            }}
          >
            <TextField
              placeholder="Search files and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{ minWidth: 250, maxWidth: 400, flexGrow: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Toggle View">
                <IconButton 
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  color="primary"
                >
                  {viewMode === 'grid' ? <ViewListIcon /> : <ViewModuleIcon />}
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Refresh">
                <IconButton onClick={handleRefresh} color="primary">
                  <RefreshIcon />
                </IconButton>
              </Tooltip>

              <Button
                variant="outlined"
                startIcon={<CreateNewFolderIcon />}
                onClick={() => setIsNewFolderModalOpen(true)}
              >
                New Folder
              </Button>

              <Button
                variant="contained"
                startIcon={<UploadIcon />}
                onClick={() => setIsUploadModalOpen(true)}
              >
                Upload Files
              </Button>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Content */}
          {filteredItems.length === 0 ? (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                color: 'text.secondary'
              }}
            >
              <Typography variant="h6" gutterBottom>
                No items found
              </Typography>
              <Typography variant="body2">
                {searchQuery ? 'Try a different search term' : 'This folder is empty'}
              </Typography>
            </Box>
          ) : (
            <>
              {/* Folders Section */}
              {folders.length > 0 && (
                <>
                  <Typography variant="subtitle1" fontWeight={500} mb={2}>
                    Folders ({folders.length})
                  </Typography>
                  <Grid container spacing={2} mb={4}>
                    {folders.map(folder => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={folder.id}>
                        <FolderItem 
                          folder={folder} 
                          onClick={handleFolderClick} 
                          onDelete={handleFolderDeleteRequest}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}

              {/* Documents Section */}
              {documents.length > 0 && (
                <>
                  <Typography variant="subtitle1" fontWeight={500} mb={2}>
                    Documents ({documents.length})
                  </Typography>
                  <Grid container spacing={2}>
                    {documents.map(document => (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={document.id}>
                        <DocumentItem 
                          document={document} 
                          onClick={handleDocumentClick} 
                          onDelete={handleDocumentDeleteRequest}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <FileUploadModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onFilesUpload={handleFilesUpload}
        currentFolderId={currentFolderId}
      />

      <NewFolderModal
        open={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        onCreateFolder={handleCreateFolder}
        currentFolderId={currentFolderId}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {itemToDelete?.type === 'folder' ? (
              <>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  This will delete the folder and ALL contents inside it!
                </Alert>
                Are you sure you want to delete the folder <strong>{itemToDelete?.name}</strong> and all its contents? 
                This action cannot be undone.
              </>
            ) : (
              <>
                Are you sure you want to delete the document <strong>{itemToDelete?.name}</strong>? 
                This action cannot be undone.
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 