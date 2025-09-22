import {
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { Info } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { actionIcon } from '@/constants';
import { cn } from '@/lib/utils';
import { useProcessStore } from '@/store';
import { Badge, Button, Label, Title, Title2 } from '@/ui';

import { DNDContextWrapper, Draggable } from './_components';
import { ElementCard } from './_components/elementCard/ElementCard';
import { actions } from './ProcessContants';
import type { IAction } from './ProcessTypes';

const Process = () => {
  // zustand store states
  const {
    currentPage,
    pages,
    setCurrentPage,
    setPages,
    removePage,
    updatePageActions,
    swapActions,
  } = useProcessStore();

  // locale states
  const { name } = useParams();
  const [draggedItem, setDraggedItem] = useState<IAction | null>(null);
  const [overItem, setOverItem] = useState<IAction | null>(null);

  // event handlers
  function handleAddPage() {
    const page = {
      name: 'Новая страница',
      actions: [],
      id: Date.now(),
      isPublished: false,
    };
    setPages(page);
    setCurrentPage(page);
  }

  function handleDragStart(event: DragStartEvent) {
    const { id } = event.active;
    const dragged = currentPage.actions.find((action) => action.id === id);
    setDraggedItem(dragged ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const id = event.over?.id;
    if (id) {
      swapActions(draggedItem?.id ?? 0, id as number);
    }

    setDraggedItem(null);
    setOverItem(null);
  }

  function handleDragOver(event: DragOverEvent) {
    if (draggedItem?.id === event.over?.id) return;

    if (event.over?.id) {
      const overElem = currentPage.actions.find(
        (action) => action.id === event.over?.id
      );
      setOverItem(overElem ?? null);
    }
  }

  function handleDragMove(event: DragMoveEvent) {
    if (!event.over?.id) {
      setOverItem(null);
    }
  }

  return (
    <>
      <Title text={`Процесс - ${name}`} />
      <div className="w-full mb-3 flex justify-end items-center">
        <div className="flex items-center gap-3.5">
          <Button variant={'outline'}>Сохранить</Button>
          {currentPage.isPublished ? (
            <Badge>Опубликовано</Badge>
          ) : (
            <Button>Опубликовать</Button>
          )}
        </div>
      </div>
      <div className="flex flex-row items-stretch justify-start gap-5">
        <div className="min-w-[235px]">
          <div>
            <Title2 text="Страницы" />
            <ul className="flex flex-col gap-2">
              {pages.map((page) => {
                return (
                  <li
                    onClick={() => setCurrentPage(page)}
                    role="button"
                    key={page.id}
                    className={cn(
                      'flex items-center justify-between cursor-pointer list-none w-full p-2.5 bg-[#fff] rounded-[8px]',
                      currentPage?.id === page.id &&
                        'pointer-events-none border-[1px] border-[var(--primary)]'
                    )}
                  >
                    <span>{page.name}</span>
                    <span className="text-neutral-400">{`${page.actions.length} эл.`}</span>
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-row gap-1.5 w-full mt-3">
              <Button
                className={cn('w-full', pages.length > 1 && 'w-[50%]')}
                variant={'outline'}
                onClick={handleAddPage}
              >
                Добавить
              </Button>
              {pages.length > 1 && (
                <Button
                  className="w-[50%]"
                  variant={'outline'}
                  onClick={() => removePage(currentPage.id)}
                >
                  Удалить
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="min-w-[235px]">
          <Title2 text="Элементы" />
          <ul className="flex flex-col gap-2">
            {actions.map((action) => {
              return (
                <li
                  role="button"
                  onClick={() =>
                    updatePageActions({ ...action, id: Date.now() })
                  }
                  key={action.code}
                  className={cn(
                    'flex cursor-pointer items-center justify-between list-none w-full p-2.5 bg-[#fff] rounded-[8px] hover:scale-[1.02]'
                  )}
                >
                  <div className="flex justify-center items-center flex-row gap-3.5">
                    {actionIcon[action.code] ?? <Info />}
                    <span>{action.label}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-row items-center justify-between">
            <Title2 text="Элементы страницы" />
            <Label className="text-neutral-500 mb-4">{currentPage.name}</Label>
          </div>
          <div className="w-full border-2 rounded-[8px] border-dashed border-neutral-300 flex-1">
            <div className="flex flex-col gap-3.5 p-3">
              <DNDContextWrapper
                draggedItem={draggedItem}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragMove={handleDragMove}
              >
                {currentPage.actions.map((action, idx) => {
                  return overItem && draggedItem?.id === action.id ? (
                    <ElementCard
                      isStatic
                      key={action.id}
                      action={overItem}
                      position={idx + 1}
                    />
                  ) : (
                    <Draggable
                      key={action.code + idx}
                      action={action}
                      position={idx + 1}
                    />
                  );
                })}
              </DNDContextWrapper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Process;
