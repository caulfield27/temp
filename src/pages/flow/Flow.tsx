import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import { toasterOptions } from '@/constants';
import { Button, Label, Title } from '@/ui';

import { FaceScan, Passport, ProcessStep } from './_components';
import { useFlowStore } from './FlowStore';

const Flow = () => {
  const { step, process, setStep, data, isDocReaderOpen, isLivenessOpen } =
    useFlowStore();
  const navigate = useNavigate();

  if (isLivenessOpen) return <FaceScan />;

  if (isDocReaderOpen) return <Passport />;

  return (
    <div className="max-w-[var(--container_mw)] m-auto py-8">
      <div className="w-full flex flex-row items-center justify-between border-b-[1px] border-neutral-300">
        <Title className="border-0 mb-0" text={process.name} />
        <Label className="text-neutral-500">{`Шаг ${step} из ${process.pages.length}`}</Label>
      </div>
      <ProcessStep />
      <div className="w-full flex justify-end mt-5">
        {step === process.pages.length - 1 ? (
          <Button
            onClick={() => {
              console.log(data);
              toast.success(
                'Данные успешно отправлены на рассмотрения',
                toasterOptions['success']
              );
              navigate('/');
            }}
          >
            Отправить
          </Button>
        ) : (
          <Button variant={'outline'} onClick={() => setStep(step + 1)}>
            Далее
          </Button>
        )}
      </div>
    </div>
  );
};

export default Flow;
