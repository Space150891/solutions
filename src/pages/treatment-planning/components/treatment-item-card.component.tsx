import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Tooltip, 
  IconButton, 
  useTheme, 
  alpha,
  CardActionArea
} from '@mui/material';
import { 
  MedicalServices as MedicalServicesIcon,
  Medication as MedicationIcon,
  EventNote as EventNoteIcon,
  DragIndicator as DragIndicatorIcon,
  AccessTime as AccessTimeIcon,
  AttachMoney as AttachMoneyIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { TreatmentItem } from '../mock';

interface TreatmentItemCardProps {
  item: TreatmentItem;
  isDraggable?: boolean;
  onRemove?: () => void;
  isDragging?: boolean;
}

export const TreatmentItemCard: React.FC<TreatmentItemCardProps> = ({
  item,
  isDraggable = false,
  onRemove,
  isDragging = false
}) => {
  const theme = useTheme();
  
  // Get the appropriate icon based on category
  const getIcon = () => {
    switch (item.category) {
      case 'procedure':
        return <MedicalServicesIcon />;
      case 'medication':
        return <MedicationIcon />;
      case 'followUp':
        return <EventNoteIcon />;
      default:
        return null;
    }
  };
  
  // Get the appropriate color based on category
  const getColor = () => {
    return item.color || theme.palette.primary.main;
  };

  // Format duration display
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    } else if (minutes < 24 * 60) {
      return `${Math.floor(minutes / 60)} hr${minutes % 60 ? ` ${minutes % 60} min` : ''}`;
    } else {
      return `${Math.floor(minutes / (24 * 60))} days`;
    }
  };

  return (
    <Card 
      variant="outlined" 
      sx={{
        mb: 1,
        position: 'relative',
        borderLeft: `4px solid ${getColor()}`,
        cursor: isDraggable ? 'grab' : 'default',
        userSelect: 'none',
        // Smooth transitions for all transforms and properties
        transition: isDragging ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: isDragging ? 'rotate(3deg) scale(1.03)' : 'rotate(0deg) scale(1)',
        transformOrigin: 'center center',
        zIndex: isDragging ? 1000 : 1,
        opacity: isDragging ? 0.95 : 1,
        // Fix positioning for better drag behavior
        margin: isDragging ? 0 : undefined,
        top: isDragging ? 0 : undefined,
        left: isDragging ? 0 : undefined,
        // Enhanced shadows and hover effects
        boxShadow: isDragging 
          ? `0 10px 25px ${alpha(theme.palette.common.black, 0.15)}, 0 6px 12px ${alpha(getColor(), 0.2)}`
          : `0 2px 4px ${alpha(theme.palette.common.black, 0.05)}`,
        // Background changes during drag
        backgroundColor: isDragging 
          ? alpha(getColor(), 0.05)
          : theme.palette.background.paper,
        borderColor: isDragging 
          ? getColor()
          : theme.palette.divider,
        borderWidth: isDragging ? 2 : 1,
        // Smooth hover effects
        '&:hover': {
          transform: isDraggable && !isDragging ? 'translateY(-2px) scale(1.02)' : 'none',
          boxShadow: isDraggable && !isDragging 
            ? `0 6px 20px ${alpha(theme.palette.common.black, 0.12)}, 0 4px 8px ${alpha(getColor(), 0.1)}`
            : `0 2px 4px ${alpha(theme.palette.common.black, 0.05)}`,
          borderColor: isDraggable ? alpha(getColor(), 0.5) : theme.palette.divider,
        },
        '&:active': {
          cursor: isDraggable ? 'grabbing' : 'default',
          transform: isDraggable ? 'scale(0.98)' : 'none',
        },
        // Prevent text selection during drag
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
      }}
    >
      {isDraggable && (
        <Box
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: isDragging ? getColor() : 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            opacity: isDragging ? 1 : 0.6,
            transition: 'all 0.2s ease',
            transform: isDragging ? 'scale(1.2)' : 'scale(1)',
          }}
        >
          <DragIndicatorIcon fontSize="small" />
        </Box>
      )}
      
      <CardContent sx={{ 
        py: 1.5, 
        px: 2,
        '&:last-child': { pb: 1.5 } // Fix Material-UI padding issue
      }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Box 
            sx={{ 
              mr: 1.5,
              color: getColor(),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 0.75,
              borderRadius: 1.5,
              bgcolor: alpha(getColor(), isDragging ? 0.2 : 0.1),
              transition: 'all 0.2s ease',
              transform: isDragging ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {getIcon()}
          </Box>
          
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                fontWeight: 600, 
                mb: 0.5,
                color: isDragging ? getColor() : 'text.primary',
                transition: 'color 0.2s ease'
              }}
            >
              {item.title}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                mb: 1,
                lineHeight: 1.4
              }}
            >
              {item.description}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1
            }}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Tooltip title="Duration" arrow>
                  <Chip 
                    icon={<AccessTimeIcon fontSize="small" />}
                    label={formatDuration(item.duration)} 
                    size="small"
                    sx={{ 
                      bgcolor: isDragging 
                        ? alpha(getColor(), 0.15)
                        : alpha(theme.palette.text.primary, 0.08),
                      color: isDragging ? getColor() : 'text.secondary',
                      fontWeight: 500,
                      height: '26px',
                      fontSize: '0.75rem',
                      transition: 'all 0.2s ease',
                      '& .MuiChip-icon': {
                        color: 'inherit'
                      }
                    }}
                  />
                </Tooltip>
                <Tooltip title="Cost" arrow>
                  <Chip 
                    icon={<AttachMoneyIcon fontSize="small" />}
                    label={item.cost.toFixed(2)} 
                    size="small"
                    sx={{ 
                      bgcolor: isDragging 
                        ? alpha(theme.palette.success.main, 0.15)
                        : alpha(theme.palette.text.primary, 0.08),
                      color: isDragging ? theme.palette.success.main : 'text.secondary',
                      fontWeight: 500,
                      height: '26px',
                      fontSize: '0.75rem',
                      transition: 'all 0.2s ease',
                      '& .MuiChip-icon': {
                        color: 'inherit'
                      }
                    }}
                  />
                </Tooltip>
              </Box>
              
              {onRemove && (
                <IconButton 
                  size="small" 
                  color="error" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                  }}
                  sx={{
                    opacity: isDragging ? 0 : 0.7,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      opacity: 1,
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
