import { Label, Title } from '@/ui';

import { ProcessStep } from './_components';
import { useFlowStore } from './FlowStore';

const Flow = () => {
  const { step, process } = useFlowStore();

  return (
    <div className="max-w-[var(--container_mw)] m-auto py-8">
      <div className="w-full flex flex-row items-center justify-between border-b-[1px] border-neutral-300">
        <Title className="border-0 mb-0" text={process.name} />
        <Label className="text-neutral-500">{`Шаг ${step} из ${process.pages.length}`}</Label>
      </div>
      <ProcessStep />
    </div>
  );
};

export default Flow;
