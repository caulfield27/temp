import { GripVertical, Pencil, Trash } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { toasterOptions } from '@/constants';
import { useProcessStore } from '@/store';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Checkbox,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/ui';

import type { IComponentProps } from './ElementTypes';

export const ElementCard = (props: IComponentProps) => {
  const { action, position, attributes, listeners, isStatic } = props;
  const { removeAction, updateAction } = useProcessStore();
  const [changableValues, setChangableValues] = useState({
    code: action.code,
    description: action.description,
    required: action.required,
  });

  return (
    <Card key={action.code} className="w-full py-3">
      <CardContent className="py-0 px-1.5 flex flex-row items-center justify-between">
        <div className="flex flex-row justify-start items-center gap-3.5">
          <Label>{`#${position}`}</Label>
          <div className="flex flex-col items-center justify-center gap-1">
            <span
              className={`${action.required ? 'after:content-["*"] after:text-[#ff0000]' : ''}`}
            >
              {action.description}
            </span>
            <Badge variant={'default'}>{action.code}</Badge>
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center justify-center">
          {isStatic ? (
            <Button variant={'outline'} size={'icon'}>
              <Pencil size={'16px'} />
            </Button>
          ) : (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={'outline'} size={'icon'}>
                  <Pencil size={'16px'} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Редактировать элемент</SheetTitle>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  {/* <div className="grid gap-3">
                    <Label htmlFor="key">Ключ</Label>
                    <Input
                      id="key"
                      defaultValue={changableValues.code}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setChangableValues((prev) => ({
                          ...prev,
                          code: event.target.value,
                        }))
                      }
                    />
                  </div> */}
                  <div className="grid gap-3">
                    <Label htmlFor="desc">Заголовок</Label>
                    <Input
                      id="desc"
                      defaultValue={changableValues.description}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setChangableValues((prev) => ({
                          ...prev,
                          description: event.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      onCheckedChange={(checked: boolean) =>
                        setChangableValues((prev) => ({
                          ...prev,
                          required: checked,
                        }))
                      }
                      className="cursor-pointer"
                      checked={changableValues.required}
                      id="required"
                    />
                    <Label htmlFor="required">Обязательный</Label>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button
                      type="submit"
                      onClick={() =>
                        updateAction(
                          action.id ?? -1,
                          {
                            ...action,
                            ...changableValues,
                          },
                          () => {
                            toast.success(
                              'Данные успешно обновлены',
                              toasterOptions['success']
                            );
                          }
                        )
                      }
                    >
                      Применить
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="outline">Отмена</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          )}
          <Button
            onClick={() => removeAction(action?.id ?? -1)}
            variant={'outline'}
            size={'icon'}
          >
            <Trash size={'16px'} />
          </Button>
          <div {...attributes} {...listeners} className="cursor-move ml-1.5">
            <GripVertical />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
