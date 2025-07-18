import { FC, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { createFolder, Folder } from '../../../store/slices/rootDataManagementSlice';

interface NewFolderModalProps {
  open: boolean;
  onClose: () => void;
  currentFolderId: string | null;
}

const NewFolderModal: FC<NewFolderModalProps> = ({
  open,
  onClose,
  currentFolderId,
}) => {
  const dispatch = useAppDispatch();
  const allItems = useAppSelector(state => state.rootDataManagement.items);
  const [folderName, setFolderName] = useState('');
  const [parentFolderId, setParentFolderId] = useState<string | null>(currentFolderId);
  const [error, setError] = useState('');

  // Get all folders for parent selection
  const folders = Object.values(allItems).filter(item => item.type === 'folder') as Folder[];

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
    if (event.target.value.trim()) {
      setError('');
    }
  };

  const handleParentFolderChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setParentFolderId(value === 'null' ? null : value);
  };

  const handleSubmit = async () => {
    if (!folderName.trim()) {
      setError('Folder name is required');
      return;
    }

    const folderData: Partial<Folder> = {
      name: folderName.trim(),
      parentId: parentFolderId,
      accessLevel: 'local',
      createdBy: 'current-user',
    };

    try {
      await dispatch(createFolder(folderData)).unwrap();
      handleClose();
    } catch (error) {
      setError('Failed to create folder');
    }
  };

  const handleClose = () => {
    setFolderName('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight={600}>
          Create New Folder
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          fullWidth
          value={folderName}
          onChange={handleNameChange}
          error={!!error}
          helperText={error}
          sx={{ mb: 3 }}
        />

        <FormControl fullWidth>
          <InputLabel>Parent Folder</InputLabel>
          <Select
            value={parentFolderId || 'null'}
            label="Parent Folder"
            onChange={handleParentFolderChange}
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
            <MenuItem value="null">Root (No Parent)</MenuItem>
            {folders.map(folder => (
              <MenuItem key={folder.id} value={folder.id}>
                {folder.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create Folder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewFolderModal;
export { NewFolderModal }; 