import { KeyboardEvent, memo, useEffect, useRef } from "react";
import { PickedTickerType } from "../types/PickedTickerType";

type TableRowProps = {
  name: string;
  onClick: (name: string) => void;
} & PickedTickerType;

const TableRow = memo(
  ({ name, last, highestBid, percentChange, onClick }: TableRowProps) => {
    const prevPropsRef = useRef<PickedTickerType>({
      last,
      highestBid,
      percentChange,
    });

    useEffect(() => {
      prevPropsRef.current = { last, highestBid, percentChange };
    }, [name]);

    function handleClick() {
      onClick(name);
    }

    function handleKeyUp(evt: KeyboardEvent<HTMLTableRowElement>) {
      if (evt.key === "Enter") onClick(name);
    }

    function getClass(name: keyof PickedTickerType, bid: string) {
      if (prevPropsRef.current[name] < bid) {
        return "table__data--up";
      } else if (prevPropsRef.current[name] > bid) {
        return "table__data--down";
      }

      return "";
    }

    return (
      <tr
        className="table__row"
        key={name}
        onClick={handleClick}
        onKeyUp={handleKeyUp}
        tabIndex={0}
      >
        <td className="table__data">{name}</td>
        <td className={`table__data ${getClass("last", last)}`}>
          {parseFloat(last)}
        </td>
        <td className={`table__data ${getClass("highestBid", highestBid)}`}>
          {parseFloat(highestBid)}
        </td>
        <td
          className={`table__data ${getClass("percentChange", percentChange)}`}
        >
          {parseFloat(percentChange)}
        </td>
      </tr>
    );
  }
);

export { TableRow };
