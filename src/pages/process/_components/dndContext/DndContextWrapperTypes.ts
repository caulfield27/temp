import type {
  DragAbortEvent,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragPendingEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import type { ReactNode } from 'react';

import type { IAction } from '@/data';

interface Props {
  onDragStart?: (event: DragStartEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragMove?: (event: DragMoveEvent) => void;
  onDragCancel?: (event: DragCancelEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragAbort?: (event: DragAbortEvent) => void;
  onDragPending?: (event: DragPendingEvent) => void;
  children: ReactNode;
  draggedItem: IAction | null;
}

export type { Props };
