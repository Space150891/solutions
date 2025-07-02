import React, { useMemo, useState } from 'react';
import { Box, Button, Typography, Tooltip, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy, rectSortingStrategy } from '@dnd-kit/sortable';
import { restrictToParentElement, restrictToVerticalAxis, restrictToFirstScrollableAncestor, } from '@dnd-kit/modifiers';
import { nanoid } from 'nanoid';

import { availableProcedures, availableMedications, availableFollowUps, TreatmentItem } from '../treatment-planning/mock';
import { SortablePhase } from './components/sortable-phase.component';
import { PalettePanel } from './components/palette-panel.component';
import { TreatmentItemCard } from '../treatment-planning/components/treatment-item-card.component';

interface Phase {
  id: string;
  title: string;
  items: TreatmentItem[];
}

export default function TreatmentPlanningV2Page() {
  const theme = useTheme();
  /* ------------------------------------------------------------------ */
  /*                        Local state                                 */
  /* ------------------------------------------------------------------ */
  const [phases, setPhases] = useState<Phase[]>([
    { id: nanoid(), title: 'Initial Phase', items: [] },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
  );

  /* ------------------------------------------------------------------ */
  /*                        Drag events                                 */
  /* ------------------------------------------------------------------ */
  const [activeItem, setActiveItem] = useState<TreatmentItem | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active?.data?.current?.type === 'palette') {
      setActiveItem(active.data.current.item as TreatmentItem);
    } else if (active?.data?.current?.type === 'phase-item') {
      setActiveItem(active.data.current.item as TreatmentItem);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (!activeData || !overData) return;

    // ----------------- From palette to phase -----------------
    if (activeData.type === 'palette' && overData.type === 'phase') {
      const phaseId = overData.phaseId as string;
      setPhases(prev =>
        prev.map(p =>
          p.id === phaseId
            ? {
                ...p,
                items: [
                  ...p.items,
                  {
                    ...activeData.item,
                    id: nanoid(),
                  },
                ],
              }
            : p,
        ),
      );
      return;
    }

    // ----------------- Reorder phases -----------------
    if (activeData.type === 'phase' && overData.type === 'phase') {
      const oldIndex = phases.findIndex(p => p.id === active.id);
      const newIndex = phases.findIndex(p => p.id === over.id);
      if (oldIndex !== newIndex) {
        setPhases(prev => arrayMove(prev, oldIndex, newIndex));
      }
      return;
    }

    // ----------------- Move within / between phases -----------------
    if (activeData.type === 'phase-item' && overData.type === 'phase') {
      const fromPhaseId = activeData.phaseId as string;
      const toPhaseId = overData.phaseId as string;

      if (fromPhaseId === toPhaseId) return; // Same phase: handled by sortable inside column

      setPhases(prev => {
        const fromPhase = prev.find(p => p.id === fromPhaseId);
        const toPhase = prev.find(p => p.id === toPhaseId);
        if (!fromPhase || !toPhase) return prev;

        const item = fromPhase.items.find(i => i.id === active.id);
        if (!item) return prev;

        return prev.map(p => {
          if (p.id === fromPhaseId) {
            return { ...p, items: p.items.filter(i => i.id !== item.id) };
          }
          if (p.id === toPhaseId) {
            return { ...p, items: [...p.items, item] };
          }
          return p;
        });
      });
    }
  };

  /* ------------------------------------------------------------------ */
  /*                        Helpers                                     */
  /* ------------------------------------------------------------------ */
  const addPhase = () => {
    setPhases(prev => [
      ...prev,
      {
        id: nanoid(),
        title: `Phase ${prev.length + 1}`,
        items: [],
      },
    ]);
  };

  /* -------------------------- Render -------------------------------- */
  return (
    <Box sx={{ p: { xs: 2, md: 3 }, display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, gap: 2 }}>
      {/* Palette */}
      <Box sx={{ width: { xs: '100%', lg: 320 }, flexShrink: 0 }}>
        <PalettePanel
          procedures={availableProcedures}
          medications={availableMedications}
          followUps={availableFollowUps}
        />
      </Box>

      {/* Phases */}
      <Box sx={{ flexGrow: 1, overflowX: 'auto' }}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToFirstScrollableAncestor]}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={phases.map(p => p.id)} strategy={horizontalListSortingStrategy}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {phases.map(phase => (
                <SortablePhase key={phase.id} phase={phase} />
              ))}

              {/* Add phase */}
              <Box
                sx={{
                  minWidth: 280,
                  border: `2px dashed ${theme.palette.divider}`,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                data-phase-add
              >
                <Tooltip title="Add phase">
                  <Button startIcon={<AddIcon />} onClick={addPhase}>
                    Add Phase
                  </Button>
                </Tooltip>
              </Box>
            </Box>
          </SortableContext>

          {/* Drag overlay */}
          <DragOverlay>
            {activeItem && <TreatmentItemCard item={activeItem} isDraggable />}
          </DragOverlay>
        </DndContext>
      </Box>
    </Box>
  );
} 