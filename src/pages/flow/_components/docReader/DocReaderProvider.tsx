import { cn } from '@/lib/utils';
import type { IAction } from '@/pages/process/ProcessTypes';
import { Button, Card, Label } from '@/ui';

import { useFlowStore } from '../../FlowStore';

const DocReaderProvider = ({ process }: { process: IAction }) => {
  const { code, description, required } = process;
  const { data, setDocReaderOpen, setPassportType } = useFlowStore();

  if (data[code]) {
    return (
      <div className="flex flex-col gap-3 max-w-[500px]">
        <Label
          className={cn(required && 'after:content-["*"] after:text-[#ff0000]')}
        >
          {description}
        </Label>
        <img
          className="rounded-2xl"
          src={`data:image/png;base64,${data[code]}`}
          alt={description}
        />
      </div>
    );
  }

  return (
    <Card className="py-2.5 px-3.5">
      <div className="flex flex-row justify-between items-center">
        <span
          className={cn(required && 'after:content-["*"] after:text-[#ff0000]')}
        >
          {description}
        </span>
        <Button
          onClick={() => {
            if (code.endsWith('front')) {
              setPassportType('front');
            } else {
              setPassportType('back');
            }

            setDocReaderOpen(true);
          }}
        >
          Начть
        </Button>
      </div>
    </Card>
  );
};

export default DocReaderProvider;
