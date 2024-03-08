import { ChevronIcon } from './icons';

import { IPageInfo } from '../types';

type Props = {
  pageInfo: IPageInfo;
  next: () => void;
  prev: () => void;
};

const TableNavigation = ({ pageInfo, next, prev }: Props) => {
  return (
    <div className="flex gap-[1rem]">
      <button
        disabled={!pageInfo.prev}
        onClick={prev}
        className="gradient rotate-[180deg] rounded-[1rem] bg-red-500 p-[0.5rem] transition-all disabled:opacity-50 [&>svg]:w-[2rem]"
      >
        <ChevronIcon />
      </button>

      <button
        disabled={!pageInfo.next}
        onClick={next}
        className="gradient rounded-[1rem] bg-red-500 p-[0.5rem] transition-all disabled:opacity-50 [&>svg]:w-[2rem]"
      >
        <ChevronIcon />
      </button>
    </div>
  );
};

export default TableNavigation;
