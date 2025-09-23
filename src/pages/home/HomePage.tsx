import { BadgeCheckIcon, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';

import { cn } from '@/lib/utils';
import { useProcessStore } from '@/store';
import {
  Badge,
  BadgeCopy,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Title,
  Title2,
} from '@/ui';

import { CreateProcess } from './_components';

const HomePage = () => {
  const navigate = useNavigate();
  const processes = useProcessStore((state) => state.processes);
  return (
    <div>
      <Title text="Кабинет" />
      <CreateProcess />
      <Title2 text="Процессы" />
      <div className="overflow-hidden rounded-md border">
        <Table className="bg-white">
          <TableHeader>
            <TableRow>
              <TableHead>Наименование</TableHead>
              <TableHead>Ссылка</TableHead>
              <TableHead>Дата создания</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {processes.length ? (
              processes.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {row.link ? <BadgeCopy content={row.link} /> : ''}
                  </TableCell>
                  <TableCell>
                    {row.createdAt.toLocaleDateString() +
                      '/' +
                      row.createdAt.toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        'bg-neutral-700',
                        row.isPublished && 'bg-green-600'
                      )}
                    >
                      {row.isPublished && <BadgeCheckIcon />}
                      {row.isPublished ? 'опубликовано' : 'черновик'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate(`process/${row.id}`)}
                      size={'icon'}
                      variant={'outline'}
                    >
                      <Eye />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  Нет данных
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HomePage;
