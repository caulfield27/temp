import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { ElementCard } from '../elementCard/ElementCard';
import type { Props } from './DndContextWrapperTypes';

export const DNDContextWrapper = (props: Props) => {
  const {
    onDragAbort,
    onDragCancel,
    onDragEnd,
    onDragMove,
    onDragOver,
    onDragPending,
    onDragStart,
    draggedItem,
    children,
  } = props;
  const sensor = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  return (
    <DndContext
      sensors={sensor}
      onDragAbort={onDragAbort}
      onDragCancel={onDragCancel}
      onDragEnd={onDragEnd}
      onDragMove={onDragMove}
      onDragOver={onDragOver}
      onDragPending={onDragPending}
      onDragStart={onDragStart}
    >
      {children}
      <DragOverlay>
        {draggedItem && (
          <ElementCard isStatic action={draggedItem} position={1} />
        )}
      </DragOverlay>
    </DndContext>
  );
};
