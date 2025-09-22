import { useDroppable } from '@dnd-kit/core';

import type { Props } from './DroppableTypes';

export function Droppable(props: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = isOver
    ? {
        visibility: 'hidden' as const,
      }
    : {};

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
