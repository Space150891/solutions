import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  Chip,
  Divider,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Description as DocumentIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Add as AddIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { updateCase, deleteCase, setCurrentCase } from '../../../store/slices/caseManagementSlice';
import { Case } from '../../../store/slices/types/caseManagementTypes';
import { v4 as uuidv4 } from 'uuid';
import { useThemeContext } from '../../../providers/theme-context.provider';

export default function CaseDetail() {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDocumentDialogOpen, setIsAddDocumentDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: 'pdf',
    url: '',
  });
  
  const { currentCase, insurances } = useAppSelector(state => state.caseManagement);
  const [editedCase, setEditedCase] = useState<Case | null>(currentCase);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isDarkMode = mode === 'dark';

  if (!currentCase || !editedCase) return null;

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditedCase(currentCase);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    if (editedCase) {
      dispatch(updateCase(editedCase));
      setIsEditing(false);
    }
  };

  const handleDeleteCase = () => {
    if (currentCase) {
      dispatch(deleteCase(currentCase.id));
      setIsDeleteDialogOpen(false);
    }
  };

  const handleChange = (field: keyof Case, value: string | 'active' | 'pending' | 'closed' | 'archived') => {
    if (editedCase) {
      setEditedCase({
        ...editedCase,
        [field]: value,
      });
    }
  };

  const handleInsuranceChange = (insuranceId: string | null) => {
    if (!editedCase) return;
    
    if (!insuranceId) {
      setEditedCase({
        ...editedCase,
        insuranceId: null,
        insuranceInfo: null,
      });
      return;
    }
    
    const selectedInsurance = insurances.find(i => i.id === insuranceId);
    setEditedCase({
      ...editedCase,
      insuranceId,
      insuranceInfo: selectedInsurance || null,
    });
  };

  const handleAddDocument = () => {
    if (!editedCase || !newDocument.name || !newDocument.url) return;
    
    const newDocumentWithId = {
      ...newDocument,
      id: uuidv4(),
      uploadDate: new Date().toISOString(),
    };
    
    setEditedCase({
      ...editedCase,
      documents: [...editedCase.documents, newDocumentWithId],
    });
    
    setNewDocument({
      name: '',
      type: 'pdf',
      url: '',
    });
    
    setIsAddDocumentDialogOpen(false);
  };

  const handleRemoveDocument = (documentId: string) => {
    if (!editedCase) return;
    
    setEditedCase({
      ...editedCase,
      documents: editedCase.documents.filter(doc => doc.id !== documentId),
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'closed':
        return 'error';
      case 'archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileIcon color="error" />;
      case 'jpg':
      case 'png':
      case 'jpeg':
        return <FileIcon color="primary" />;
      case 'docx':
      case 'doc':
        return <FileIcon color="info" />;
      default:
        return <DocumentIcon />;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
        boxShadow: isDarkMode ? '0 4px 20px rgba(0, 0, 0, 0.4)' : theme.shadows[1],
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="h2">
            {isEditing ? 'Edit Case' : 'Case Details'}
          </Typography>
          <Chip
            label={currentCase.status}
            size="small"
            color={getStatusColor(currentCase.status) as "success" | "warning" | "error" | "default"}
            sx={{ ml: 2, textTransform: 'capitalize' }}
          />
        </Box>
        <Box>
          {isEditing ? (
            <>
              <IconButton onClick={handleEditToggle} size="small" sx={{ mr: 1 }}>
                <CancelIcon />
              </IconButton>
              <IconButton onClick={handleSaveChanges} color="primary" size="small">
                <SaveIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={handleEditToggle} color="primary" size="small" sx={{ mr: 1 }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => setIsDeleteDialogOpen(true)} color="error" size="small">
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
        <Grid container spacing={3}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Basic Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                {isEditing ? (
                  <TextField
                    label="Title"
                    fullWidth
                    value={editedCase.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    margin="dense"
                    size="small"
                  />
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Title
                    </Typography>
                    <Typography variant="body1">{currentCase.title}</Typography>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                {isEditing ? (
                  <TextField
                    label="Case Number"
                    fullWidth
                    value={editedCase.caseNumber}
                    onChange={(e) => handleChange('caseNumber', e.target.value)}
                    margin="dense"
                    size="small"
                  />
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Case Number
                    </Typography>
                    <Typography variant="body1">{currentCase.caseNumber}</Typography>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                {isEditing ? (
                  <TextField
                    label="Patient Name"
                    fullWidth
                    value={editedCase.patientName}
                    onChange={(e) => handleChange('patientName', e.target.value)}
                    margin="dense"
                    size="small"
                  />
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Patient Name
                    </Typography>
                    <Typography variant="body1">{currentCase.patientName}</Typography>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                {isEditing ? (
                  <TextField
                    label="Patient ID"
                    fullWidth
                    value={editedCase.patientId}
                    onChange={(e) => handleChange('patientId', e.target.value)}
                    margin="dense"
                    size="small"
                  />
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Patient ID
                    </Typography>
                    <Typography variant="body1">{currentCase.patientId}</Typography>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                {isEditing ? (
                  <FormControl fullWidth margin="dense" size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={editedCase.status}
                      label="Status"
                      onChange={(e) => handleChange('status', e.target.value as 'active' | 'pending' | 'closed' | 'archived')}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Status
                    </Typography>
                    <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                      {currentCase.status}
                    </Typography>
                  </Box>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                {isEditing ? (
                  <FormControl fullWidth margin="dense" size="small">
                    <InputLabel>Insurance</InputLabel>
                    <Select
                      value={editedCase.insuranceId || ''}
                      label="Insurance"
                      onChange={(e) => handleInsuranceChange(e.target.value || null)}
                    >
                      <MenuItem value="">None</MenuItem>
                      {insurances.map(insurance => (
                        <MenuItem key={insurance.id} value={insurance.id}>
                          {insurance.provider} - {insurance.policyNumber}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Insurance
                    </Typography>
                    <Typography variant="body1">
                      {currentCase.insuranceInfo 
                        ? `${currentCase.insuranceInfo.provider} - ${currentCase.insuranceInfo.policyNumber}` 
                        : 'None'}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Description
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {isEditing ? (
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={editedCase.description}
                onChange={(e) => handleChange('description', e.target.value)}
                margin="dense"
              />
            ) : (
              <Typography variant="body1" paragraph>
                {currentCase.description || 'No description provided.'}
              </Typography>
            )}
          </Grid>

          {/* Notes */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Notes
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {isEditing ? (
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={3}
                value={editedCase.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                margin="dense"
              />
            ) : (
              <Typography variant="body1" paragraph>
                {currentCase.notes || 'No notes provided.'}
              </Typography>
            )}
          </Grid>

          {/* Documents */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Documents
              </Typography>
              {isEditing && (
                <Button
                  startIcon={<AddIcon />}
                  size="small"
                  onClick={() => setIsAddDocumentDialogOpen(true)}
                >
                  Add Document
                </Button>
              )}
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {editedCase.documents.length > 0 ? (
              <List>
                {editedCase.documents.map((doc) => (
                  <ListItem key={doc.id} divider>
                    <ListItemIcon>{getDocumentIcon(doc.type)}</ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={`Uploaded on ${new Date(doc.uploadDate).toLocaleDateString()}`}
                    />
                    {isEditing && (
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleRemoveDocument(doc.id)} size="small">
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No documents attached to this case.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the case "{currentCase.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteCase} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Document Dialog */}
      <Dialog open={isAddDocumentDialogOpen} onClose={() => setIsAddDocumentDialogOpen(false)}>
        <DialogTitle>Add Document</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Document Name"
                fullWidth
                value={newDocument.name}
                onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Document Type</InputLabel>
                <Select
                  value={newDocument.type}
                  label="Document Type"
                  onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                >
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="jpg">JPG</MenuItem>
                  <MenuItem value="docx">DOCX</MenuItem>
                  <MenuItem value="xlsx">XLSX</MenuItem>
                  <MenuItem value="txt">TXT</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Document URL"
                fullWidth
                value={newDocument.url}
                onChange={(e) => setNewDocument({ ...newDocument, url: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDocumentDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddDocument} 
            variant="contained" 
            disabled={!newDocument.name || !newDocument.url}
          >
            Add Document
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
} 