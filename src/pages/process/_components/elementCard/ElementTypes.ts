import type { DraggableAttributes } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

import type { IAction } from '../../ProcessTypes';

interface IComponentProps {
  action: IAction;
  position: number;
  listeners?: SyntheticListenerMap | undefined;
  attributes?: DraggableAttributes;
  isStatic?: boolean;
}

export type { IComponentProps };
