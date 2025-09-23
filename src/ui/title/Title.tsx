import { cn } from '@/lib/utils';

export const Title = ({
  text,
  ...props
}: { text: string } & React.ComponentProps<'h1'>) => {
  const className = props.className;
  return (
    <h1
      {...props}
      className={cn(
        'text-neutral-700 mb-5 scroll-m-20 border-b border-neutral-200 pb-2 text-2xl font-semibold tracking-tight first:mt-0',
        className && className
      )}
    >
      {text}
    </h1>
  );
};
