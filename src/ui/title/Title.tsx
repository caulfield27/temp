export const Title = ({ text }: { text: string }) => {
  return (
    <h1 className="text-neutral-700 mb-5 scroll-m-20 border-b border-neutral-200 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
      {text}
    </h1>
  );
};
