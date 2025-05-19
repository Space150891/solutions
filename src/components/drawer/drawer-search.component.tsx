import { Search } from '@mui/icons-material';
import { 
  Box, 
  TextField, 
  InputAdornment, 
  alpha, 
  useTheme 
} from '@mui/material';

interface DrawerSearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  isDarkMode: boolean;
}

export const DrawerSearch = ({ searchTerm, setSearchTerm, isDarkMode }: DrawerSearchProps) => {
  const { palette } = useTheme();

  return (
    <Box sx={{ px: 2, pt: 2, pb: 1 }}>
      <TextField
        size="small"
        fullWidth
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search menu items"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search fontSize="small" sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          sx: {
            bgcolor: isDarkMode ? alpha(palette.common.white, 0.05) : alpha(palette.common.black, 0.04),
            borderRadius: 1,
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              border: 'none'
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${palette.primary.main}`,
            },
          }
        }}
      />
    </Box>
  );
};
