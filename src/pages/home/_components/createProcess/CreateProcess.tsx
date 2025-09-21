import { useState } from 'react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const CreateProcess = () => {
  const [processName, setProcessName] = useState<string>('');
  const navigate = useNavigate();

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
              navigate(`process/${processName}`);
            }}
            value={processName}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) =>
              setProcessName(ev.target.value)
            }
            type="text"
            placeholder="Название процесса"
          />
          <Button
            onClick={() => navigate(`process/${processName}`)}
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
