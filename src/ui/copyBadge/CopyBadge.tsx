import { Clipboard } from 'lucide-react';
import { toast } from 'sonner';

import { toasterOptions } from '@/constants';

export const BadgeCopy = ({ content }: { content: string }) => {
  function handleCopy() {
    navigator.clipboard
      .writeText(content)
      .then(() =>
        toast.success('Данные успешно скопированы', toasterOptions['success'])
      );
  }

  return (
    <div className="flex flex-row w-fit">
      <span className="p-1 border-b-[1px] border-l-[1px] border-t-[1px] bo border-neutral-400 rounded-tl-[6px] rounded-bl-[6px]">
        {content}
      </span>
      <div
        className="cursor-pointer flex items-center p-1 border-[1px]  border-neutral-400 rounded-tr-[6px] rounded-br-[6px]"
        role="button"
        onClick={handleCopy}
      >
        <Clipboard />
      </div>
    </div>
  );
};
