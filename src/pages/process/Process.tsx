import { useParams } from 'react-router';

const Process = () => {
  const { name } = useParams();

  return (
    <h2 className="text-neutral-700 scroll-m-20 border-b border-neutral-200 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
      Процесс - {name}
    </h2>
  );
};

export default Process;
