import { GripVertical } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { actions } from '@/data';
import { cn } from '@/lib/utils';
import { Button, Label, Title, Title2 } from '@/ui';

import type { IPage } from './ProcessTypes';

const Process = () => {
  // locale states
  const { name } = useParams();
  const [pages, setPages] = useState<IPage[]>([
    {
      name: 'Шаг 1',
      actions: [],
      id: Date.now(),
    },
  ]);
  const [currentPage, setCurrentPage] = useState<IPage>(pages[0]);

  // event handlers
  function handleAddPage() {
    const page = {
      name: 'Новая страница',
      actions: [],
      id: Date.now(),
    };
    setPages((prev) => [...prev, page]);
    setCurrentPage(page);
  }

  function handleRemovePage() {
    const updatedPages = pages.filter((page) => page.id !== currentPage?.id);
    setPages(updatedPages);
    setCurrentPage(updatedPages[0]);
  }

  return (
    <>
      <Title text={`Процесс - ${name}`} />
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
                  onClick={handleRemovePage}
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
                  key={action.code}
                  className={cn(
                    'flex items-center justify-between list-none w-full p-2.5 bg-[#fff] rounded-[8px]'
                  )}
                >
                  <span>{action.label}</span>
                  <div className="cursor-move">
                    <GripVertical />
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
          <div className="w-full border-2 rounded-[8px] border-dashed border-neutral-400 flex-1"></div>
        </div>
      </div>
    </>
  );
};

export default Process;
