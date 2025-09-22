import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import { Droppable } from '../droppable/Droppable';
import { ElementCard } from '../elementCard/ElementCard';
import type { Props } from './DraggableTypes';

export const Draggable = (props: Props) => {
  const { action, position } = props;
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: action.id,
  });

  const style = transform
    ? {
        transform: CSS.Transform.toString(transform),
        visibility: 'hidden' as const,
      }
    : {
        userSelect: 'none' as const,
      };

  return (
    <div ref={setNodeRef} style={style}>
      <Droppable id={action.id}>
        <ElementCard
          action={action}
          position={position}
          attributes={attributes}
          listeners={listeners}
        />
      </Droppable>
    </div>
  );
};
