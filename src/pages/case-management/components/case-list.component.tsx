import { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  TextField, 
  InputAdornment, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  Chip, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  useTheme,
  ChipProps
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Add as AddIcon, 
  FilterList as FilterListIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { 
  setCurrentCase, 
  addCase, 
  setSearchQuery, 
  setFilter, 
  clearFilters 
} from '../../../store/slices/caseManagementSlice';
import { Case } from '../../../store/slices/types/caseManagementTypes';
import { v4 as uuidv4 } from 'uuid';
import { useThemeContext } from '../../../providers/theme-context.provider';

export default function CaseList() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [newCase, setNewCase] = useState<Partial<Case>>({
    title: '',
    description: '',
    patientId: '',
    patientName: '',
    caseNumber: `CASE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    status: 'active',
    insuranceId: null,
    insuranceInfo: null,
    assignedDoctorId: null,
    assignedDoctorName: null,
    notes: '',
    documents: [],
  });

  const { cases, searchQuery, filterBy, insurances } = useAppSelector(state => state.caseManagement);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isDarkMode = mode === 'dark';

  // Filter cases based on search query and filters
  const filteredCases = cases.filter(c => {
    const matchesSearch = 
      searchQuery === '' || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !filterBy.status || c.status === filterBy.status;
    const matchesPatient = !filterBy.patientId || c.patientId === filterBy.patientId;
    const matchesInsurance = !filterBy.insuranceId || c.insuranceId === filterBy.insuranceId;
    
    return matchesSearch && matchesStatus && matchesPatient && matchesInsurance;
  });

  const handleCaseClick = (selectedCase: Case) => {
    dispatch(setCurrentCase(selectedCase));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleAddCase = () => {
    if (newCase.title && newCase.patientName) {
      dispatch(addCase(newCase as Omit<Case, 'id' | 'createdAt' | 'updatedAt'>));
      setNewCase({
        title: '',
        description: '',
        patientId: '',
        patientName: '',
        caseNumber: `CASE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        status: 'active',
        insuranceId: null,
        insuranceInfo: null,
        assignedDoctorId: null,
        assignedDoctorName: null,
        notes: '',
        documents: [],
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleNewCaseChange = (field: keyof Case, value: string) => {
    setNewCase(prev => ({ ...prev, [field]: value }));
  };

  const handleInsuranceChange = (insuranceId: string | null) => {
    if (!insuranceId) {
      setNewCase(prev => ({ 
        ...prev, 
        insuranceId: null,
        insuranceInfo: null 
      }));
      return;
    }
    
    const selectedInsurance = insurances.find(i => i.id === insuranceId);
    setNewCase(prev => ({ 
      ...prev, 
      insuranceId,
      insuranceInfo: selectedInsurance || null
    }));
  };

  const getStatusColor = (status: string): ChipProps['color'] => {
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

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        bgcolor: 'background.paper',
        boxShadow: isDarkMode ? '0 4px 20px rgba(0, 0, 0, 0.4)' : theme.shadows[1],
        borderRadius: 2,
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <TextField
          placeholder="Search cases..."
          value={searchQuery}
          onChange={handleSearchChange}
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mr: 1 }}
        />
        <IconButton 
          onClick={() => setIsFilterDialogOpen(true)}
          color={Object.values(filterBy).some(v => v !== null) ? 'primary' : 'default'}
        >
          <FilterListIcon />
        </IconButton>
        <IconButton 
          color="primary" 
          onClick={() => setIsAddDialogOpen(true)}
          sx={{ ml: 1 }}
        >
          <AddIcon />
        </IconButton>
      </Box>
      
      <List sx={{ overflow: 'auto', flexGrow: 1 }}>
        {filteredCases.length > 0 ? (
          filteredCases.map((c) => (
            <ListItem 
              key={c.id} 
              button 
              onClick={() => handleCaseClick(c)}
              divider
              sx={{ 
                borderLeft: '4px solid',
                borderLeftColor: `${getStatusColor(c.status)}.main`,
                '&:hover': {
                  bgcolor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" noWrap sx={{ maxWidth: '70%' }}>
                      {c.title}
                    </Typography>
                    <Chip 
                      label={c.status} 
                      size="small" 
                      color={getStatusColor(c.status)}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {c.patientName} • {c.caseNumber}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" noWrap>
                      {new Date(c.updatedAt).toLocaleDateString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))
        ) : (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="text.secondary">No cases found</Typography>
          </Box>
        )}
      </List>
      
      {/* Add Case Dialog */}
      <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Case</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Title"
                fullWidth
                value={newCase.title}
                onChange={(e) => handleNewCaseChange('title', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Case Number"
                fullWidth
                value={newCase.caseNumber}
                onChange={(e) => handleNewCaseChange('caseNumber', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Patient Name"
                fullWidth
                value={newCase.patientName}
                onChange={(e) => handleNewCaseChange('patientName', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Patient ID"
                fullWidth
                value={newCase.patientId}
                onChange={(e) => handleNewCaseChange('patientId', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={newCase.status}
                  label="Status"
                  onChange={(e) => handleNewCaseChange('status', e.target.value as 'active' | 'pending' | 'closed' | 'archived')}
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Insurance</InputLabel>
                <Select
                  value={newCase.insuranceId || ''}
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={newCase.description}
                onChange={(e) => handleNewCaseChange('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Notes"
                fullWidth
                multiline
                rows={2}
                value={newCase.notes}
                onChange={(e) => handleNewCaseChange('notes', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleAddCase} 
            variant="contained" 
            disabled={!newCase.title || !newCase.patientName}
          >
            Add Case
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Filter Dialog */}
      <Dialog open={isFilterDialogOpen} onClose={() => setIsFilterDialogOpen(false)}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Filter Cases
            <IconButton onClick={() => setIsFilterDialogOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1, minWidth: '300px' }}>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filterBy.status || ''}
                  label="Status"
                  onChange={(e) => dispatch(setFilter({ status: e.target.value || null }))}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth size="small">
                <InputLabel>Insurance</InputLabel>
                <Select
                  value={filterBy.insuranceId || ''}
                  label="Insurance"
                  onChange={(e) => dispatch(setFilter({ insuranceId: e.target.value || null }))}
                >
                  <MenuItem value="">All</MenuItem>
                  {insurances.map(insurance => (
                    <MenuItem key={insurance.id} value={insurance.id}>
                      {insurance.provider}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dispatch(clearFilters())}>Clear Filters</Button>
          <Button onClick={() => setIsFilterDialogOpen(false)} variant="contained">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
} 