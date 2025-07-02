import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PhaseColumn, Phase } from './phase-column.component';

interface Props {
  phase: Phase;
}

export const SortablePhase: React.FC<Props> = ({ phase }) => {
  const { setNodeRef, transform, transition, attributes, listeners } = useSortable({
    id: phase.id,
    data: { type: 'phase', phaseId: phase.id },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <PhaseColumn phase={phase} />
    </div>
  );
}; 