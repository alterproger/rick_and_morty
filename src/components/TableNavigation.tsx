import { IPageInfo } from '../types';

type Props = {
  pageInfo: IPageInfo;
  next: () => void;
  prev: () => void;
};

const TableNavigation = ({ pageInfo, next, prev }: Props) => {
  return (
    <div>
      <button disabled={!pageInfo.prev} onClick={prev}>
        Prev
      </button>

      <button disabled={!pageInfo.next} onClick={next}>
        Next
      </button>
    </div>
  );
};

export default TableNavigation;
