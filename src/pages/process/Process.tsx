import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { Title } from '@/components/ui/title';
import { Title2 } from '@/components/ui/title2';
import { cn } from '@/lib/utils';

import type { IPage } from './ProcessTypes';

const Process = () => {
  // locale states
  const { name } = useParams();
  const [pages, setPages] = useState<IPage[]>([]);
  const [pageName, setPageName] = useState('');
  const [currentPage, setCurrentPage] = useState<IPage | null>(null);

  // event handlers
  function handlePressKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' || !pageName) return;
    handleAddPage();
  }

  function handleAddPage() {
    const page = {
      name: pageName,
      actions: [],
    };
    setPages((prev) => [...prev, page]);
    setCurrentPage(page);
    setPageName('');
  }

  return (
    <>
      <Title text={`Процесс - ${name}`} />
      <div>
        <div className="max-w-[250px]">
          <div className="flex w-full items-start gap-2 mb-2.5">
            <Input
              value={pageName}
              className="bg-[#fff]"
              id="page-name"
              onKeyDown={handlePressKey}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPageName(e.target.value)
              }
              type="text"
              placeholder="Название страницы"
            />
            <Button
              onClick={handleAddPage}
              size={'icon'}
              variant="outline"
              disabled={!pageName}
            >
              <Plus />
            </Button>
          </div>
          <div>
            {pages.length ? (
              <div>
                <Title2 text="Страницы" />
                <ul className="flex flex-col gap-1">
                  {pages.map((page) => {
                    return (
                      <li
                        onClick={() => setCurrentPage(page)}
                        role="button"
                        key={page.name}
                        className={cn(
                          'cursor-pointer list-none w-full p-2 hover:bg-neutral-200',
                          currentPage?.name === page.name &&
                            'pointer-events-none bg-neutral-200'
                        )}
                      >
                        {page.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="mt-2 w-full text-center">
                <Text content="Нет активных страниц" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Process;
