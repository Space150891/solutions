import { useEffect, useState } from 'react';
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
  Chip,
  Stack,
  CircularProgress,
} from '@mui/material';
import {
  CreateNewFolder as CreateNewFolderIcon,
  Search as SearchIcon,
  Upload as UploadIcon,
  Refresh as RefreshIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Sort as SortIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchItems,
  setCurrentFolder,
  setSearchQuery,
  deleteItem,
  selectFilteredItems,
  selectBreadcrumbPath,
  setSortBy,
  setSortDirection,
  Folder,
  Document,
  setFilters,
  clearFilters,
} from '../../store/slices/rootDataManagementSlice';
import { IPages } from '../../types/common.types';
import FolderItem from './components/folder-item.component';
import DocumentItem from './components/document-item.component';
import FileUploadModal from './components/file-upload-modal.component';
import NewFolderModal from './components/new-folder-modal.component';
import BreadcrumbNavigation from './components/breadcrumb-navigation.component';
import AdvancedFilter from './components/advanced-filter.component';

// Mock data for filters
const mockRegions = ['Northeast', 'Southeast', 'Midwest', 'Southwest', 'West'];
const mockFacilities = ['Hospital A', 'Clinic B', 'Research Center C', 'Medical Office D'];
const mockCategories = ['Policies', 'Guidelines', 'Reports', 'Forms', 'Templates', 'Research'];

export default function EnhancedRootDataManagementPage() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  
  // Redux state
  const items = useAppSelector(selectFilteredItems);
  const breadcrumbPath = useAppSelector(selectBreadcrumbPath);
  const currentFolderId = useAppSelector(state => state.rootDataManagement.currentFolderId);
  const searchQuery = useAppSelector(state => state.rootDataManagement.searchQuery);
  const isLoading = useAppSelector(state => state.rootDataManagement.isLoading);
  const error = useAppSelector(state => state.rootDataManagement.error);
  const sortBy = useAppSelector(state => state.rootDataManagement.sortBy);
  const sortDirection = useAppSelector(state => state.rootDataManagement.sortDirection);
  const filters = useAppSelector(state => state.rootDataManagement.filters);
  
  // Local state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  
  // Delete confirmation states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, type: 'folder' | 'document', name: string } | null>(null);

  // Fetch items on component mount
  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  // Group items by type
  const folders = items.filter((item): item is Folder => item.type === 'folder');
  const documents = items.filter((item): item is Document => item.type === 'document');

  // Handle folder navigation
  const handleFolderClick = (folderId: string) => {
    dispatch(setCurrentFolder(folderId));
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

  // Handle search
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  // Handle refresh
  const handleRefresh = () => {
    dispatch(fetchItems());
  };

  // Handle delete confirmation open
  const handleDeleteRequest = (id: string, type: 'folder' | 'document', name: string) => {
    setItemToDelete({ id, type, name });
    setDeleteDialogOpen(true);
  };

  // Handle folder delete request
  const handleFolderDeleteRequest = (folderId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const folder = folders.find(f => f.id === folderId);
    if (folder) {
      handleDeleteRequest(folderId, 'folder', folder.name);
    }
  };

  // Handle document delete request
  const handleDocumentDeleteRequest = (documentId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const document = documents.find(d => d.id === documentId);
    if (document) {
      handleDeleteRequest(documentId, 'document', document.name);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (!itemToDelete) return;
    
    dispatch(deleteItem(itemToDelete.id));
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // Handle delete cancellation
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  // Handle sort change
  const handleSortChange = (newSortBy: 'name' | 'createdAt' | 'updatedAt' | 'size') => {
    if (sortBy === newSortBy) {
      // Toggle direction if same field
      dispatch(setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      // Set new field and default to ascending
      dispatch(setSortBy(newSortBy));
      dispatch(setSortDirection('asc'));
    }
    setIsSortMenuOpen(false);
  };

  // Render active filters
  const renderActiveFilters = () => {
    const activeFilters = [];
    
    if (filters.accessLevel) {
      activeFilters.push(
        <Chip 
          key="accessLevel" 
          label={`Access: ${filters.accessLevel}`} 
          size="small" 
          onDelete={() => dispatch(setFilters({ ...filters, accessLevel: undefined }))} 
        />
      );
    }
    
    if (filters.region) {
      activeFilters.push(
        <Chip 
          key="region" 
          label={`Region: ${filters.region}`} 
          size="small" 
          onDelete={() => dispatch(setFilters({ ...filters, region: undefined }))} 
        />
      );
    }
    
    if (filters.facility) {
      activeFilters.push(
        <Chip 
          key="facility" 
          label={`Facility: ${filters.facility}`} 
          size="small" 
          onDelete={() => dispatch(setFilters({ ...filters, facility: undefined }))} 
        />
      );
    }
    
    if (filters.category) {
      activeFilters.push(
        <Chip 
          key="category" 
          label={`Category: ${filters.category}`} 
          size="small" 
          onDelete={() => dispatch(setFilters({ ...filters, category: undefined }))} 
        />
      );
    }
    
    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => {
        activeFilters.push(
          <Chip 
            key={`tag-${tag}`} 
            label={`Tag: ${tag}`} 
            size="small" 
            onDelete={() => dispatch(setFilters({ 
              ...filters, 
              tags: filters.tags?.filter(t => t !== tag) 
            }))} 
          />
        );
      });
    }
    
    if (filters.dateRange) {
      activeFilters.push(
        <Chip 
          key="dateRange" 
          label={`Date: ${new Date(filters.dateRange.start).toLocaleDateString()} - ${new Date(filters.dateRange.end).toLocaleDateString()}`} 
          size="small" 
          onDelete={() => dispatch(setFilters({ ...filters, dateRange: undefined }))} 
        />
      );
    }
    
    return activeFilters.length > 0 ? (
      <Box sx={{ mt: 2, mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {activeFilters}
        <Chip 
          label="Clear All" 
          size="small" 
          variant="outlined" 
          color="secondary"
          onDelete={() => dispatch(clearFilters())}
          deleteIcon={<CloseIcon />}
        />
      </Box>
    ) : null;
  };

  return (
    <Box component="section" padding={3}>
      <Typography variant="h5" mb={3}>
        {IPages.ROOT_DATA_MANAGEMENT.toUpperCase()} - NATIONWIDE DATA SYSTEM
      </Typography>

      <Card>
        <CardContent>
          {/* Breadcrumb Navigation */}
          <BreadcrumbNavigation
            currentFolderId={currentFolderId}
            breadcrumbPath={breadcrumbPath}
            onNavigate={(folderId) => dispatch(setCurrentFolder(folderId))}
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
              onChange={handleSearchChange}
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
              <AdvancedFilter 
                regions={mockRegions}
                facilities={mockFacilities}
                categories={mockCategories}
              />
              
              <Tooltip title={`Sort by: ${sortBy} (${sortDirection})`}>
                <IconButton 
                  onClick={() => setIsSortMenuOpen(true)}
                  color="primary"
                >
                  <SortIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Toggle View">
                <IconButton 
                  onClick={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
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

          {/* Active Filters */}
          {renderActiveFilters()}

          <Divider sx={{ mb: 3 }} />

          {/* Loading State */}
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error State */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Content */}
          {!isLoading && !error && items.length === 0 ? (
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
                {searchQuery || Object.keys(filters).length > 0 ? 'Try different search terms or filters' : 'This folder is empty'}
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
                      <Grid item xs={12} sm={viewMode === 'list' ? 12 : 6} md={viewMode === 'list' ? 12 : 4} lg={viewMode === 'list' ? 12 : 3} key={folder.id}>
                        <FolderItem 
                          folder={folder} 
                          onClick={handleFolderClick} 
                          onDelete={handleFolderDeleteRequest}
                          viewMode={viewMode}
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
                      <Grid item xs={12} sm={viewMode === 'list' ? 12 : 6} md={viewMode === 'list' ? 12 : 4} lg={viewMode === 'list' ? 12 : 3} key={document.id}>
                        <DocumentItem 
                          document={document} 
                          onClick={handleDocumentClick} 
                          onDelete={handleDocumentDeleteRequest}
                          viewMode={viewMode}
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
        currentFolderId={currentFolderId}
      />

      <NewFolderModal
        open={isNewFolderModalOpen}
        onClose={() => setIsNewFolderModalOpen(false)}
        currentFolderId={currentFolderId}
      />

      {/* Sort Menu */}
      <Dialog open={isSortMenuOpen} onClose={() => setIsSortMenuOpen(false)}>
        <DialogTitle>Sort By</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <Button 
              variant={sortBy === 'name' ? 'contained' : 'outlined'}
              onClick={() => handleSortChange('name')}
              fullWidth
            >
              Name {sortBy === 'name' && (sortDirection === 'asc' ? '(A-Z)' : '(Z-A)')}
            </Button>
            <Button 
              variant={sortBy === 'createdAt' ? 'contained' : 'outlined'}
              onClick={() => handleSortChange('createdAt')}
              fullWidth
            >
              Created Date {sortBy === 'createdAt' && (sortDirection === 'asc' ? '(Oldest)' : '(Newest)')}
            </Button>
            <Button 
              variant={sortBy === 'updatedAt' ? 'contained' : 'outlined'}
              onClick={() => handleSortChange('updatedAt')}
              fullWidth
            >
              Modified Date {sortBy === 'updatedAt' && (sortDirection === 'asc' ? '(Oldest)' : '(Newest)')}
            </Button>
            <Button 
              variant={sortBy === 'size' ? 'contained' : 'outlined'}
              onClick={() => handleSortChange('size')}
              fullWidth
            >
              Size {sortBy === 'size' && (sortDirection === 'asc' ? '(Smallest)' : '(Largest)')}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>

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