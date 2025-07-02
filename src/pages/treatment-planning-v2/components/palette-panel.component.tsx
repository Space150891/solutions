import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { TreatmentItem } from '../../treatment-planning/mock';
import { TreatmentItemCard } from '../../treatment-planning/components/treatment-item-card.component';

interface Props {
  procedures: TreatmentItem[];
  medications: TreatmentItem[];
  followUps: TreatmentItem[];
}

export const PalettePanel: React.FC<Props> = ({ procedures, medications, followUps }) => {
  const [tab, setTab] = useState(0);

  const lists = [procedures, medications, followUps];

  return (
    <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Tabs
        value={tab}
        onChange={(_e, v) => setTab(v)}
        variant="fullWidth"
        sx={{ mb: 1 }}
      >
        <Tab label="Procedures" />
        <Tab label="Medications" />
        <Tab label="Follow-ups" />
      </Tabs>

      <Box sx={{ overflowY: 'auto', maxHeight: 'calc(100vh - 200px)', pr: 1 }}>
        {lists[tab].map((item) => (
          <DraggablePaletteItem key={item.id} item={item} />
        ))}
      </Box>
    </Box>
  );
};

const DraggablePaletteItem: React.FC<{ item: TreatmentItem }> = ({ item }) => {
  const { setNodeRef, listeners, attributes, transform, isDragging } = useDraggable({
    id: `palette-${item.id}`,
    data: { type: 'palette', item },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: 'transform 0.2s',
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TreatmentItemCard item={item} isDraggable={false} />
    </div>
  );
}; 