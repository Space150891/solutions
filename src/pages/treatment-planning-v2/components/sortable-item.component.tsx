import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { TreatmentItem } from '../../treatment-planning/mock';
import { TreatmentItemCard } from '../../treatment-planning/components/treatment-item-card.component';

interface Props {
  item: TreatmentItem;
  phaseId: string;
}

export const SortableItem: React.FC<Props> = ({ item, phaseId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: {
      type: 'phase-item',
      phaseId,
      item,
    },
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TreatmentItemCard item={item} isDraggable isDragging={isDragging} />
    </div>
  );
}; 