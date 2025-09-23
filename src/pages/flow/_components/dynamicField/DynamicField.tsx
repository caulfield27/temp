import { ChevronDownIcon } from 'lucide-react';
import { type ReactNode, useState } from 'react';

import type { IAction } from '@/pages/process/ProcessTypes';
import {
  Button,
  Calendar,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/ui';

import { useFlowStore } from '../../FlowStore';

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">{children}</div>
  );
};

export const DynamicField = ({ data }: { data: IAction }) => {
  const { code, description, required } = data;
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { data: inputData, setData } = useFlowStore();

  const type =
    code === 'file_upload'
      ? 'file'
      : code === 'info_number'
        ? 'number'
        : 'text';

  switch (code) {
    case 'info_date':
      return (
        <div className="flex flex-col gap-3">
          <Label htmlFor="date" className="px-1">
            Дата
          </Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="w-48 justify-between font-normal"
              >
                {inputData[code]
                  ? (inputData[code] as Date).toLocaleDateString()
                  : 'Выберите дату'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={inputData[code] as Date | undefined}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setData(code, date);
                  setCalendarOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      );
    default:
      return (
        <Container>
          <Label
            htmlFor={code}
            className={`${required ? 'after:content-["*"] after:text-[#ff0000]' : ''}`}
          >
            {description}
          </Label>
          <Input type={type} id={code} placeholder={description} />
        </Container>
      );
  }
};
