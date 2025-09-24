import {
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { CheckCircleIcon, Info } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';

import { actionIcon, toasterOptions } from '@/constants';
import { cn } from '@/lib/utils';
import { useProcessStore } from '@/store';
import type { IProcess } from '@/store/process/processStoreTypes';
import { BadgeCopy, Button, Input, Label, Title, Title2 } from '@/ui';

import { DNDContextWrapper, Draggable } from './_components';
import { ElementCard } from './_components/elementCard/ElementCard';
import { actions } from './ProcessContants';
import type { IAction } from './ProcessTypes';

const Process = () => {
  // zustand store states
  const {
    currentPage,
    setCurrentPage,
    setPages,
    removePage,
    swapActions,
    setCurrentProcess,
    processes,
    currentProcess,
    addAction,
    updateCurrentProcess,
    updateProcesses,
    updatePageName,
  } = useProcessStore();

  // locale states
  const { id } = useParams();
  const linkId = useId();
  const [draggedItem, setDraggedItem] = useState<IAction | null>(null);
  const [overItem, setOverItem] = useState<IAction | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // effect handlers
  useEffect(() => {
    if (id) {
      const currentProccess = processes.find(
        (proccess) => proccess.id === Number(id)
      );
      if (currentProccess) {
        setCurrentProcess(currentProccess);
        setCurrentPage(currentProccess.pages[0]);
      }
    }
  }, []);

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
    const dragged = currentPage?.actions.find((action) => action.id === id);
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
      const overElem = currentPage?.actions.find(
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

  function handlePublish() {
    if (currentProcess?.isPublished) return;
    if (currentProcess) {
      const generatedLink = `${window.origin}/flow/${linkId}`;
      const updatedProcess: IProcess = {
        ...currentProcess,
        link: generatedLink,
        isPublished: true,
      };
      updateCurrentProcess(updatedProcess, () =>
        toast.success('Процесс успешно опубликован!', toasterOptions['success'])
      );
      updateProcesses(Number(id) || -1);
    }
  }

  return (
    <>
      <Title text={`Процесс - ${currentProcess?.name}`} />
      <div className="w-full mb-3 flex justify-end items-center">
        <div className="flex items-center gap-3.5">
          <Button
            onClick={() =>
              updateProcesses(Number(id) || -1, () =>
                toast.success(
                  'Процесс успешно сохранён',
                  toasterOptions['success']
                )
              )
            }
            variant={'outline'}
          >
            Сохранить
          </Button>
          {currentProcess?.isPublished ? (
            <div className="w-fit p-2.5 flex flex-col items-start justify-start bg-[#fff] gap-1.5 rounded-[8px]">
              <div className="flex flex-row gap-1.5">
                <CheckCircleIcon size={'18px'} />
                <Label>Опубликовано!</Label>
              </div>
              <BadgeCopy content={currentProcess.link ?? ''} />
            </div>
          ) : (
            <Button onClick={handlePublish}>Опубликовать</Button>
          )}
        </div>
      </div>
      <div className="flex flex-row items-stretch justify-start gap-5">
        <div className="min-w-[235px]">
          <div>
            <Title2 text="Страницы" />
            <ul className="flex flex-col gap-2">
              {currentProcess?.pages.map((page) => {
                return (
                  <li
                    onClick={() => {
                      if (inputRef.current) {
                        inputRef.current.value = page.name;
                      }
                      setCurrentPage(page);
                    }}
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
                className={cn(
                  'w-full',
                  (currentProcess?.pages?.length ?? 0) > 1 && 'w-[50%]'
                )}
                variant={'outline'}
                onClick={handleAddPage}
              >
                Добавить
              </Button>
              {(currentProcess?.pages?.length ?? 0) > 1 && (
                <Button
                  className="w-[50%]"
                  variant={'outline'}
                  onClick={() => removePage(currentPage?.id ?? -1)}
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
                  onClick={() => addAction({ ...action, id: Date.now() })}
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
            <Input
              ref={inputRef}
              defaultValue={currentPage?.name}
              className="w-[170px] mb-4"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updatePageName(e.target.value)
              }
            />
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
                {currentPage?.actions.map((action, idx) => {
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
