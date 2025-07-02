import React, { useState } from 'react';
import { 
  Box,
  Paper,
  Typography,
  IconButton,
  TextField,
  Divider,
  useTheme,
  alpha,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import { 
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  DragIndicator as DragIndicatorIcon,
  MoveUp as MoveUpIcon,
  MoveDown as MoveDownIcon,
  MedicalServices as MedicalServicesIcon
} from '@mui/icons-material';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { TreatmentItemCard } from './treatment-item-card.component';
import { TreatmentPhase } from '../mock';

interface PhaseColumnProps {
  phase: TreatmentPhase;
  onRemove: () => void;
  onUpdate: (updates: Partial<TreatmentPhase>) => void;
  onRemoveItem: (itemId: string) => void;
}

interface EmptyPhaseMessageProps {
  isDraggingOver: boolean;
}

const EmptyPhaseMessage: React.FC<EmptyPhaseMessageProps> = ({ isDraggingOver }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        border: `2px dashed ${isDraggingOver ? theme.palette.primary.main : theme.palette.divider}`,
        borderRadius: 2,
        color: isDraggingOver ? theme.palette.primary.main : theme.palette.text.secondary,
        backgroundColor: isDraggingOver 
          ? alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.18 : 0.08)
          : alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.2 : 0.5),
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isDraggingOver ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isDraggingOver 
          ? `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}` 
          : 'none',
        borderStyle: isDraggingOver ? 'solid' : 'dashed',
        borderWidth: isDraggingOver ? 3 : 2,
      }}
      role="region"
      aria-label={isDraggingOver ? "Drop treatment item here" : "Empty treatment phase"}
    >
      <Box sx={{ 
        mb: 1.5,
        p: 1.5,
        borderRadius: '50%',
        backgroundColor: isDraggingOver 
          ? alpha(theme.palette.primary.main, 0.15)
          : 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isDraggingOver ? 'scale(1.2) rotateZ(5deg)' : 'scale(1)',
      }}>
        {isDraggingOver ? (
          <DragIndicatorIcon 
            color="primary" 
            sx={{ 
              fontSize: 40, 
              opacity: 0.9,
              filter: `drop-shadow(0 2px 4px ${alpha(theme.palette.primary.main, 0.3)})`
            }} 
          />
        ) : (
          <MedicalServicesIcon sx={{ fontSize: 32, opacity: 0.5 }} />
        )}
      </Box>
      <Typography 
        variant="body1" 
        align="center" 
        sx={{ 
          fontWeight: isDraggingOver ? 700 : 500,
          fontSize: isDraggingOver ? '1.1rem' : '1rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          textShadow: isDraggingOver ? `0 1px 2px ${alpha(theme.palette.primary.main, 0.3)}` : 'none'
        }}
      >
        {isDraggingOver ? 'Drop here!' : 'Drag treatment items here'}
      </Typography>
    </Box>
  );
};

export const PhaseColumn: React.FC<PhaseColumnProps> = ({
  phase,
  onRemove,
  onUpdate,
  onRemoveItem
}) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(phase.title);
  const [description, setDescription] = useState(phase.description);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  
  // Calculate total cost and duration for this phase
  const totalCost = phase.items.reduce((sum, item) => sum + item.cost, 0);
  const totalDuration = phase.items.reduce((sum, item) => sum + item.duration, 0);
  
  // Format duration display
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else if (minutes < 24 * 60) {
      return `${Math.floor(minutes / 60)}h${minutes % 60 ? ` ${minutes % 60}m` : ''}`;
    } else {
      return `${Math.floor(minutes / (24 * 60))} days`;
    }
  };
  
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };
  
  const handleStartEdit = () => {
    setIsEditing(true);
    handleCloseMenu();
  };
  
  const handleSaveEdit = () => {
    onUpdate({ title, description });
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setTitle(phase.title);
    setDescription(phase.description);
    setIsEditing(false);
  };
  
  const handleDeletePhase = () => {
    handleCloseMenu();
    onRemove();
  };
  
  // Generate a color based on phase order
  const getPhaseColor = (order: number) => {
    const colors = [
      theme.palette.primary.main,    // Blue
      theme.palette.success.main,    // Green
      theme.palette.error.main,      // Red
      theme.palette.warning.main,    // Orange
      theme.palette.info.main,       // Light Blue
      '#9c27b0',                     // Purple
      '#795548',                     // Brown
      '#607d8b'                      // Grey
    ];
    
    return colors[(order - 1) % colors.length];
  };
  return (
    <Paper
      variant="outlined"
      sx={{
        width: 450,
        minWidth: 450,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 'fit-content',
        bgcolor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.04),
        borderLeft: `4px solid ${getPhaseColor(phase.order)}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      {/* Phase header */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {isEditing ? (
          <Box sx={{ width: '100%' }}>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              label="Phase Title"
              sx={{ mb: 1 }}
            />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
              label="Description"
              multiline
              rows={2}
              sx={{ mb: 1 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
              <IconButton size="small" onClick={handleCancelEdit} color="default">
                <CloseIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" onClick={handleSaveEdit} color="primary">
                <SaveIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <>
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <DragIndicatorIcon 
                  fontSize="small" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    opacity: 0.5
                  }} 
                />
                {phase.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {phase.description}
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleOpenMenu}>
              <MoreVertIcon fontSize="small" />
            </IconButton>
            
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleCloseMenu}
              PaperProps={{
                elevation: 1,
                sx: { minWidth: 180 }
              }}
            >
              <MenuItem onClick={handleStartEdit}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit Phase</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeletePhase}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText primary="Delete Phase" primaryTypographyProps={{ color: 'error' }} />
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
      
      <Divider />
      
      {/* Phase items container */}
      <Droppable droppableId={`phase-${phase.id}`}>
        {(provided, snapshot) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              flexGrow: 1,
              minHeight: 200,
              p: 1,
              backgroundColor: snapshot.isDraggingOver 
                ? alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.15 : 0.08)
                : 'transparent',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: 2,
              border: snapshot.isDraggingOver 
                ? `2px solid ${alpha(theme.palette.primary.main, 0.5)}` 
                : '2px solid transparent',
              boxShadow: snapshot.isDraggingOver 
                ? `inset 0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.1)}`
                : 'none',
              backfaceVisibility: 'hidden',
              perspective: 1000,
            }}
          >
            {phase.items.length === 0 ? (
              <EmptyPhaseMessage isDraggingOver={snapshot.isDraggingOver} />
            ) : (
              phase.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      sx={{
                        mb: 1,
                        transition: snapshot.isDragging 
                          ? 'none' 
                          : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'translateZ(0)',
                        willChange: snapshot.isDragging ? 'transform' : 'auto',
                        position: 'relative',
                        zIndex: snapshot.isDragging ? 1001 : 1,
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        backfaceVisibility: 'hidden',
                        perspective: 1000,
                        // Fix positioning to reduce drag offset
                        top: 0,
                        left: 0,
                      }}
                    >
                      <TreatmentItemCard 
                        item={item} 
                        isDraggable
                        isDragging={snapshot.isDragging}
                        onRemove={() => onRemoveItem(item.id)}
                      />
                    </Box>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      
      {/* Phase footer - statistics */}
      {phase.items.length > 0 && (
        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.divider}`,
            p: 1.5,
            backgroundColor: theme.palette.mode === 'dark' 
              ? alpha(theme.palette.background.paper, 0.5)
              : alpha(theme.palette.background.paper, 0.8)
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              {phase.items.length} item{phase.items.length !== 1 ? 's' : ''}
            </Typography>
            <Typography variant="caption" fontWeight="medium" color="text.secondary">
              {formatDuration(totalDuration)} · ${totalCost.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};
