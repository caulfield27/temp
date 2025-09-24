import { cn } from '@/lib/utils';
import type { IAction } from '@/pages/process/ProcessTypes';
import { Button, Card, Label } from '@/ui';

import { useFlowStore } from '../../FlowStore';

const FaceScanProvider = ({ process }: { process: IAction }) => {
  const { code, required, description } = process;
  const { data, setLivenessOpen } = useFlowStore();

  return (
    <Card className="py-2.5 px-3.5">
      <div className="flex flex-row justify-between items-center">
        <span
          className={cn(required && 'after:content-["*"] after:text-[#ff0000]')}
        >
          {description}
        </span>
        {data[code] ? (
          <Label className="py-3">{`Совпадение - ${data[code] ?? 0}%`}</Label>
        ) : (
          <Button onClick={() => setLivenessOpen(true)}>Начть</Button>
        )}
      </div>
    </Card>
  );
};

export default FaceScanProvider;
