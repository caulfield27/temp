import { BadgeCheckIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { processes } from '@/data';
import { cn } from '@/lib/utils';

import { CreateProcess } from './_components/createProcess/CreateProcess';

const HomePage = () => {
  return (
    <div>
      <CreateProcess />
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
              processes.map((row, i) => (
                <TableRow role="button" className="cursor-pointer" key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    {row.link ? window.origin + row.link : ''}
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
                        row.status === 'published' && 'bg-[var(--primary)]'
                      )}
                    >
                      {row.status === 'published' && <BadgeCheckIcon />}
                      {row.status === 'published' ? 'опубликовано' : 'черновик'}
                    </Badge>
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
