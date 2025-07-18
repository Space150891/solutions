import { FC, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  FilterAlt as FilterIcon,
  Close as CloseIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFilters, clearFilters } from '../../../store/slices/rootDataManagementSlice';

interface AdvancedFilterProps {
  regions: string[];
  facilities: string[];
  categories: string[];
}

const AdvancedFilter: FC<AdvancedFilterProps> = ({
  regions,
  facilities,
  categories,
}) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.rootDataManagement.filters);
  
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);
  const [newTag, setNewTag] = useState('');
  
  const handleOpen = () => {
    setIsOpen(true);
    setLocalFilters(filters);
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleApplyFilters = () => {
    dispatch(setFilters(localFilters));
    handleClose();
  };
  
  const handleClearFilters = () => {
    dispatch(clearFilters());
    setLocalFilters({});
    handleClose();
  };
  
  const handleAddTag = () => {
    if (newTag.trim()) {
      setLocalFilters(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setLocalFilters(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove),
    }));
  };
  
  const handleDateRangeChange = (field: 'start' | 'end', value: Date | null) => {
    if (value) {
      setLocalFilters(prev => ({
        ...prev,
        dateRange: {
          ...(prev.dateRange || { start: '', end: '' }),
          [field]: value.toISOString(),
        },
      }));
    }
  };
  
  return (
    <>
      <IconButton
        color="primary"
        onClick={handleOpen}
        sx={{ 
          bgcolor: Object.keys(filters).length > 0 ? 'primary.light' : 'transparent',
          '&:hover': {
            bgcolor: Object.keys(filters).length > 0 ? 'primary.main' : undefined,
          }
        }}
      >
        <FilterIcon />
      </IconButton>
      
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={handleClose}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 400 }, p: 3 },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">Advanced Filters</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Stack spacing={3}>
          {/* Access Level Filter */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Access Level</FormLabel>
            <RadioGroup
              value={localFilters.accessLevel || ''}
              onChange={(e) => setLocalFilters(prev => ({ ...prev, accessLevel: e.target.value as 'national' | 'regional' | 'local' | undefined }))}
            >
              <FormControlLabel value="national" control={<Radio />} label="National" />
              <FormControlLabel value="regional" control={<Radio />} label="Regional" />
              <FormControlLabel value="local" control={<Radio />} label="Local" />
            </RadioGroup>
          </FormControl>
          
          {/* Region Filter */}
          <FormControl fullWidth>
            <InputLabel id="region-label">Region</InputLabel>
            <Select
              labelId="region-label"
              value={localFilters.region || ''}
              label="Region"
              onChange={(e) => setLocalFilters(prev => ({ ...prev, region: e.target.value }))}
              sx={{
                '& .MuiSelect-select': {
                  minHeight: '1.4375em',
                },
              }}
            >
              <MenuItem value="">
                <em>All Regions</em>
              </MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Facility Filter */}
          <FormControl fullWidth>
            <InputLabel id="facility-label">Facility</InputLabel>
            <Select
              labelId="facility-label"
              value={localFilters.facility || ''}
              label="Facility"
              onChange={(e) => setLocalFilters(prev => ({ ...prev, facility: e.target.value }))}
              sx={{
                '& .MuiSelect-select': {
                  minHeight: '1.4375em',
                },
              }}
            >
              <MenuItem value="">
                <em>All Facilities</em>
              </MenuItem>
              {facilities.map((facility) => (
                <MenuItem key={facility} value={facility}>
                  {facility}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Category Filter */}
          <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={localFilters.category || ''}
              label="Category"
              onChange={(e) => setLocalFilters(prev => ({ ...prev, category: e.target.value }))}
              sx={{
                '& .MuiSelect-select': {
                  minHeight: '1.4375em',
                },
              }}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Tags Filter */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Tags
            </Typography>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <TextField
                size="small"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag"
                fullWidth
              />
              <IconButton onClick={handleAddTag} disabled={!newTag.trim()}>
                <AddIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {localFilters.tags?.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  size="small"
                />
              ))}
            </Box>
          </Box>
          
          {/* Date Range Filter */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Date Range
            </Typography>
            <Stack direction="row" spacing={2}>
              <DatePicker
                label="From"
                value={localFilters.dateRange?.start ? new Date(localFilters.dateRange.start) : null}
                onChange={(newValue: Date | null) => handleDateRangeChange('start', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    fullWidth
                  />
                )}
              />
              <DatePicker
                label="To"
                value={localFilters.dateRange?.end ? new Date(localFilters.dateRange.end) : null}
                onChange={(newValue: Date | null) => handleDateRangeChange('end', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    fullWidth
                  />
                )}
              />
            </Stack>
          </Box>
        </Stack>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={handleClearFilters}>
            Clear All
          </Button>
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default AdvancedFilter; 