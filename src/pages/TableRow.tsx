import { memo } from "react";
import { TickerType } from "../types/TickerType";

type TableRowProps = { name: string } & Pick<
  TickerType,
  "last" | "highestBid" | "percentChange"
>;

const TableRow = memo(({ name, last, highestBid, percentChange }: TableRowProps) => {
  return (
    <tr key={name}>
      <td className="table__data">{name}</td>
      <td className="table__data">{last}</td>
      <td className="table__data">{highestBid}</td>
      <td className="table__data">{percentChange}</td>
    </tr>
  );
});

export { TableRow };
