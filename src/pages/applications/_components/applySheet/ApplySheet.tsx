import { type ReactNode, useMemo, useState } from 'react';

import {
  Button,
  Card,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  Text,
} from '@/ui';

import type { IApplication, StatusType } from '../../ApplicationsTypes';
import { generateStatusData } from './ApplySheetUtils';

const Container = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-2.5 text-neutral-500">
      <Label className="text-neutral-500">{label}</Label>
      {children}
    </div>
  );
};

export const ApplySheet = ({
  apply,
  onChange,
}: {
  apply: IApplication;
  onChange: (newStatus: StatusType, id: number) => void;
}) => {
  // locale states
  const [status, setStatus] = useState<StatusType>(apply.status);
  const { data, files } = useMemo(
    () => generateStatusData(apply.data),
    [apply]
  );

  // event handlers
  const handleDownload = (blob: string, key: string) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${blob}`;
    link.download = key || 'image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>{`Заявка #${apply.id}`}</SheetTitle>
      </SheetHeader>
      <div className="px-3.5 flex flex-col gap-5 w-full h-[90vh] overflow-y-auto">
        <Container label="Статус">
          <Select
            onValueChange={(value: string) => setStatus(value as StatusType)}
            defaultValue={status}
            value={status}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="processing">В процессе</SelectItem>
                <SelectItem value="in_review">В обработке</SelectItem>
                <SelectItem value="approved">Подтверждено</SelectItem>
                <SelectItem value="rejected">Отклонено</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Container>
        <Container label="Данные заявки">
          <Card className="w-full p-2.5">
            <ul className="flex flex-col gap-3">
              {data.length ? (
                data.map((data) => {
                  return (
                    <li className="flex flex-col items-start justify-center gap-1">
                      <span className="text-[14px] text-neutral-500 font-light">
                        {data.key}
                      </span>
                      {typeof data.value === 'object' ? (
                        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
                          <code className="text-white">
                            {JSON.stringify(data.value, null, 2)}
                          </code>
                        </pre>
                      ) : (
                        <span>{data.value as string}</span>
                      )}
                    </li>
                  );
                })
              ) : (
                <Text content="Нет данных" />
              )}
            </ul>
          </Card>
        </Container>
        <Container label="Файлы">
          <div className="w-full py-4 flex flex-col gap-5">
            {files.length ? (
              files.map((file) => (
                <div className="flex flex-col gap-4">
                  <img
                    className="rounded-2xl"
                    src={`data:image/png;base64,${file.blobString}`}
                    alt={file.key}
                  />
                  <Button
                    onClick={() => handleDownload(file.blobString, file.key)}
                    className="w-full"
                    variant={'outline'}
                  >
                    Скачать
                  </Button>
                </div>
              ))
            ) : (
              <Text content="Нет файлов" />
            )}
          </div>
        </Container>
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button
            disabled={status === apply.status}
            type="submit"
            onClick={() => onChange(status, apply.id)}
          >
            Применить
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button variant="outline">Отмена</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
};
