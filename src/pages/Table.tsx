import { TickerType } from "../types/TickerType";
import { TableRow } from "./TableRow";

interface TableProps {
  data: Record<string, TickerType> | null;
}

const Table = ({ data }: TableProps) => {
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
                name={key}
                last={data[key].last}
                highestBid={data[key].highestBid}
                percentChange={data[key].percentChange}
              />
            ))}
        </tbody>
      </table>
    </>
  );
};

export { Table };
