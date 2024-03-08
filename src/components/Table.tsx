import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { v4 as uuidv4 } from 'uuid';

export interface ITableRow {
  cells: Record<string, string | ReactNode>;
  link: string;
}

export interface ITableHeader {
  key: string;
  title: string;
}

type Props = {
  tableClassName?: string;
  thClassName?: string;
  tdClassName?: string;
  trClassName?: string;
  headers: ITableHeader[];
  rows: ITableRow[] | null;
  noItemsText: string;
  isLoading: boolean;
  limit: number;
  skeletons: Record<string, ReactNode>;
};

const Table = ({
  tableClassName,
  thClassName,
  tdClassName,
  trClassName,
  headers,
  rows,
  noItemsText,
  isLoading,
  limit,
  skeletons,
}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={twMerge('hideScrollBar', 'overflow-x-auto')}>
      <table className={twMerge(tableClassName)}>
        <thead>
          <tr className={twMerge(trClassName)}>
            {headers.map(header => (
              <th key={header.key} className={twMerge(thClassName)}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.length === 0 && !isLoading ? (
            <tr className={twMerge(trClassName)}>
              <td
                className={tdClassName}
                colSpan={headers.length}
                style={{ textAlign: 'center' }}
              >
                {noItemsText}
              </td>
            </tr>
          ) : (
            <>
              {isLoading
                ? Array.from(Array(limit).keys()).map(() => (
                    <tr className={twMerge(trClassName)} key={uuidv4()}>
                      {headers.map(header => (
                        <td key={uuidv4()} className={twMerge(tdClassName)}>
                          {skeletons[header.key]}
                        </td>
                      ))}
                    </tr>
                  ))
                : rows?.map(item => (
                    <tr
                      className={twMerge(trClassName)}
                      onClick={() =>
                        navigate(item.link, { state: location })
                      }
                      key={uuidv4()}
                    >
                      {headers.map(header => (
                        <td key={uuidv4()} className={twMerge(tdClassName)}>
                          {item.cells[header.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
