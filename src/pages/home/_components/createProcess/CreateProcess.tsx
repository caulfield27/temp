import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useProcessStore } from '@/store';
import type { IProcess } from '@/store/process/processStoreTypes';
import { Button } from '@/ui/button/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/ui/card/Card';
import { Input } from '@/ui/input/Input';

export const CreateProcess = () => {
  const [processName, setProcessName] = useState<string>('');
  const addProcess = useProcessStore((state) => state.addProccess);
  const navigate = useNavigate();

  function handleAddProcess() {
    const defaultPage = {
      name: 'Шаг 1',
      actions: [],
      id: Date.now(),
    };
    const newProcess: IProcess = {
      name: processName,
      createdAt: new Date(),
      link: null,
      isPublished: false,
      id: Date.now(),
      pages: [defaultPage],
    };
    addProcess(newProcess);
    navigate(`process/${newProcess.id}`);
  }

  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle className="text-[20px] text-neutral-700 font-bold">
          Создать процесс
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full items-center gap-2">
          <Input
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key !== 'Enter' || !processName) return;
              handleAddProcess();
            }}
            value={processName}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
              setProcessName(ev.target.value)
            }
            type="text"
            placeholder="Название процесса"
          />
          <Button
            onClick={() => handleAddProcess()}
            variant="outline"
            disabled={!processName}
          >
            Создать
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
