import { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
  addInsurance,
  updateInsurance,
  deleteInsurance,
} from '../../../store/slices/caseManagementSlice';
import { InsuranceInfo } from '../../../store/slices/types/caseManagementTypes';
import { useThemeContext } from '../../../providers/theme-context.provider';

export default function InsuranceList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInsurance, setSelectedInsurance] = useState<InsuranceInfo | null>(null);
  const [newInsurance, setNewInsurance] = useState<Omit<InsuranceInfo, 'id'>>({
    provider: '',
    policyNumber: '',
    coverageType: 'Basic',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    contactPerson: '',
    contactPhone: '',
    coverageDetails: '',
    isActive: true,
  });

  const { insurances, cases } = useAppSelector(state => state.caseManagement);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const { mode } = useThemeContext();
  const isDarkMode = mode === 'dark';

  // Filter insurances based on search query
  const filteredInsurances = insurances.filter(insurance =>
    insurance.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insurance.policyNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insurance.coverageType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddInsurance = () => {
    if (newInsurance.provider && newInsurance.policyNumber) {
      dispatch(addInsurance(newInsurance));
      setNewInsurance({
        provider: '',
        policyNumber: '',
        coverageType: 'Basic',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        contactPerson: '',
        contactPhone: '',
        coverageDetails: '',
        isActive: true,
      });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditInsurance = () => {
    if (selectedInsurance) {
      dispatch(updateInsurance(selectedInsurance));
      setSelectedInsurance(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteInsurance = () => {
    if (selectedInsurance) {
      dispatch(deleteInsurance(selectedInsurance.id));
      setSelectedInsurance(null);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleEditClick = (insurance: InsuranceInfo) => {
    setSelectedInsurance(insurance);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (insurance: InsuranceInfo) => {
    setSelectedInsurance(insurance);
    setIsDeleteDialogOpen(false);
    
    // Check if insurance is associated with any cases
    const associatedCases = cases.filter(c => c.insuranceId === insurance.id);
    if (associatedCases.length > 0) {
      alert(`This insurance is associated with ${associatedCases.length} cases. Please remove the association before deleting.`);
    } else {
      setIsDeleteDialogOpen(true);
    }
  };

  const handleNewInsuranceChange = (field: keyof Omit<InsuranceInfo, 'id'>, value: string | boolean) => {
    setNewInsurance(prev => ({ ...prev, [field]: value }));
  };

  const handleSelectedInsuranceChange = (field: keyof InsuranceInfo, value: string | boolean) => {
    if (selectedInsurance) {
      setSelectedInsurance({ ...selectedInsurance, [field]: value });
    }
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Card
        sx={{
          p: 2,
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          bgcolor: 'background.paper',
          boxShadow: isDarkMode ? '0 4px 20px rgba(0, 0, 0, 0.4)' : theme.shadows[1],
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Insurance Policies</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            placeholder="Search insurances..."
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            sx={{ width: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
          >
            Add Insurance
          </Button>
        </Box>
      </Card>

      <TableContainer 
        component={Paper} 
        sx={{ 
          flexGrow: 1,
          boxShadow: isDarkMode ? '0 4px 20px rgba(0, 0, 0, 0.4)' : theme.shadows[1],
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Provider</TableCell>
              <TableCell>Policy Number</TableCell>
              <TableCell>Coverage Type</TableCell>
              <TableCell>Valid Period</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInsurances.length > 0 ? (
              filteredInsurances.map((insurance) => (
                <TableRow key={insurance.id}>
                  <TableCell>{insurance.provider}</TableCell>
                  <TableCell>{insurance.policyNumber}</TableCell>
                  <TableCell>{insurance.coverageType}</TableCell>
                  <TableCell>
                    {new Date(insurance.startDate).toLocaleDateString()} - {new Date(insurance.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={insurance.isActive ? 'Active' : 'Inactive'}
                      color={insurance.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{insurance.contactPerson}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleEditClick(insurance)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteClick(insurance)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No insurance policies found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Insurance Dialog */}
      <Dialog open={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Insurance</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Provider"
                fullWidth
                value={newInsurance.provider}
                onChange={(e) => handleNewInsuranceChange('provider', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Policy Number"
                fullWidth
                value={newInsurance.policyNumber}
                onChange={(e) => handleNewInsuranceChange('policyNumber', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Coverage Type</InputLabel>
                <Select
                  value={newInsurance.coverageType}
                  label="Coverage Type"
                  onChange={(e) => handleNewInsuranceChange('coverageType', e.target.value)}
                >
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Standard">Standard</MenuItem>
                  <MenuItem value="Comprehensive">Comprehensive</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Senior Care">Senior Care</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newInsurance.isActive}
                    onChange={(e) => handleNewInsuranceChange('isActive', e.target.checked)}
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Start Date"
                type="date"
                fullWidth
                value={newInsurance.startDate}
                onChange={(e) => handleNewInsuranceChange('startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="End Date"
                type="date"
                fullWidth
                value={newInsurance.endDate}
                onChange={(e) => handleNewInsuranceChange('endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Person"
                fullWidth
                value={newInsurance.contactPerson}
                onChange={(e) => handleNewInsuranceChange('contactPerson', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Phone"
                fullWidth
                value={newInsurance.contactPhone}
                onChange={(e) => handleNewInsuranceChange('contactPhone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Coverage Details"
                fullWidth
                multiline
                rows={3}
                value={newInsurance.coverageDetails}
                onChange={(e) => handleNewInsuranceChange('coverageDetails', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleAddInsurance}
            variant="contained"
            disabled={!newInsurance.provider || !newInsurance.policyNumber}
          >
            Add Insurance
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Insurance Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Insurance</DialogTitle>
        <DialogContent>
          {selectedInsurance && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Provider"
                  fullWidth
                  value={selectedInsurance.provider}
                  onChange={(e) => handleSelectedInsuranceChange('provider', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Policy Number"
                  fullWidth
                  value={selectedInsurance.policyNumber}
                  onChange={(e) => handleSelectedInsuranceChange('policyNumber', e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Coverage Type</InputLabel>
                  <Select
                    value={selectedInsurance.coverageType}
                    label="Coverage Type"
                    onChange={(e) => handleSelectedInsuranceChange('coverageType', e.target.value)}
                  >
                    <MenuItem value="Basic">Basic</MenuItem>
                    <MenuItem value="Standard">Standard</MenuItem>
                    <MenuItem value="Comprehensive">Comprehensive</MenuItem>
                    <MenuItem value="Premium">Premium</MenuItem>
                    <MenuItem value="Senior Care">Senior Care</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={selectedInsurance.isActive}
                      onChange={(e) => handleSelectedInsuranceChange('isActive', e.target.checked)}
                    />
                  }
                  label="Active"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Start Date"
                  type="date"
                  fullWidth
                  value={selectedInsurance.startDate.split('T')[0]}
                  onChange={(e) => handleSelectedInsuranceChange('startDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="End Date"
                  type="date"
                  fullWidth
                  value={selectedInsurance.endDate.split('T')[0]}
                  onChange={(e) => handleSelectedInsuranceChange('endDate', e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Contact Person"
                  fullWidth
                  value={selectedInsurance.contactPerson}
                  onChange={(e) => handleSelectedInsuranceChange('contactPerson', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Contact Phone"
                  fullWidth
                  value={selectedInsurance.contactPhone}
                  onChange={(e) => handleSelectedInsuranceChange('contactPhone', e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Coverage Details"
                  fullWidth
                  multiline
                  rows={3}
                  value={selectedInsurance.coverageDetails}
                  onChange={(e) => handleSelectedInsuranceChange('coverageDetails', e.target.value)}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleEditInsurance}
            variant="contained"
            disabled={!selectedInsurance?.provider || !selectedInsurance?.policyNumber}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the insurance policy "{selectedInsurance?.provider} - {selectedInsurance?.policyNumber}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteInsurance} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 