export const Text = ({ content }: { content: string }) => {
  return (
    <p className="text-neutral-600 text-[14px] leading-7 [&:not(:first-child)]:mt-6">
      {content}
    </p>
  );
};
