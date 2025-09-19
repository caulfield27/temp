import { BadgeCheckIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

const HomePage = () => {
  return (
    <div>
      <Card className="w-full mb-4">
        <CardHeader>
          <CardTitle className="text-[20px] text-neutral-700 font-bold">
            Создать процесс
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center gap-2">
            <Input type="text" placeholder="Название процесса" />
            <Button variant="outline">Создать</Button>
          </div>
        </CardContent>
      </Card>

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
                <TableRow key={i}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{window.origin + row.link}</TableCell>
                  <TableCell>
                    {row.createdAt.toLocaleTimeString() +
                      ' ' +
                      row.createdAt.toLocaleDateString()}
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
