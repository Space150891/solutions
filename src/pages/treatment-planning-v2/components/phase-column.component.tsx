import React from 'react';
import { Typography, Paper } from '@mui/material';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TreatmentItem } from '../../treatment-planning/mock';
import { TreatmentItemCard } from '../../treatment-planning/components/treatment-item-card.component';
import { SortableItem } from './sortable-item.component';

export interface Phase {
  id: string;
  title: string;
  items: TreatmentItem[];
}

interface Props {
  phase: Phase;
}

export const PhaseColumn: React.FC<Props> = ({ phase }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `${phase.id}-drop`,
    data: {
      type: 'phase',
      phaseId: phase.id,
    },
  });

  return (
    <Paper
      ref={setNodeRef}
      elevation={1}
      sx={{
        minWidth: 280,
        borderRadius: 2,
        p: 1,
        bgcolor: isOver ? 'primary.light' : 'background.paper',
        transition: 'background-color 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
        {phase.title}
      </Typography>

      <SortableContext items={phase.items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        {phase.items.map(item => (
          <SortableItem key={item.id} item={item} phaseId={phase.id} />
        ))}
      </SortableContext>
    </Paper>
  );
}; 