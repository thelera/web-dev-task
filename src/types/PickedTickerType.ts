import { TickerType } from "./TickerType";

export type PickedTickerType = Pick<
  TickerType,
  "last" | "highestBid" | "percentChange"
>;
