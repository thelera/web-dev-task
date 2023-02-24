import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { tickerStore } from "../store/TickerStore";
import { LoadingStateEnum } from "../types/LoadingStateEnum";
import { TickerType } from "../types/TickerType";
import { TableRow } from "./TableRow";

const ERROR_TEXT = 'Произошла ошибка. Повторите запрос познее.';

interface TableProps {
  data: Record<string, TickerType> | null;
  onRowClick: (name: string) => void;
}

const Table = observer(({ data, onRowClick }: TableProps) => {
  const handleClick = useCallback((name: string) => {
    onRowClick(name);
  }, []);

  return (
    <>
      <table className="table">
        <thead className="table__head">
          <tr>
            <th className="table__data">Name</th>
            <th className="table__data">Last</th>
            <th className="table__data">Highest Bid</th>
            <th className="table__data">Percent Change</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            Object.keys(data).map((key) => (
              <TableRow
                key={key}
                name={key}
                last={data[key].last}
                highestBid={data[key].highestBid}
                percentChange={data[key].percentChange}
                onClick={handleClick}
              />
            ))}

          {tickerStore.loadingState === LoadingStateEnum.processing && (
            <tr>
              <td className="loading" colSpan={4}>
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {tickerStore.loadingState === LoadingStateEnum.fail && (
        <div className="error">{ERROR_TEXT}</div>
      )}
    </>
  );
});

export { Table };
