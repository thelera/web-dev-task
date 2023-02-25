import {
  makeObservable,
  observable,
  action,
  computed,
  runInAction,
} from "mobx";
import { LoadingStateEnum } from "../types/LoadingStateEnum";
import { TickerType } from "../types/TickerType";

class TickerStore {
  ticker: Record<string, TickerType> | null = null;

  loadingState: LoadingStateEnum = LoadingStateEnum.initial;

  constructor() {
    makeObservable(this, {
      ticker: observable,
      loadingState: observable,
      loadTickers: action,
      middle: computed,
      quotesA: computed,
      quotesB: computed,
    });
  }

  async loadTickers() {
    try {
      runInAction(() => {
        this.loadingState = LoadingStateEnum.processing;
      });

      const response = await fetch("/api/public?command=returnTicker");

      const ticker = await response.json();

      runInAction(() => {
        this.ticker = ticker;
        this.loadingState = LoadingStateEnum.success;
      });
    } catch (err) {
      console.error(err);
      runInAction(() => {
        this.loadingState = LoadingStateEnum.fail;
      });
    }
  }

  get middle(): number | null {
    if (!this.ticker) return null;

    return Math.floor(Object.keys(this.ticker).length / 2);
  }

  get quotesA(): Record<string, TickerType> | null {
    return this.middle ? this.getQuotes(0, this.middle) : null;
  }

  get quotesB(): Record<string, TickerType> | null {
    return this.middle ? this.getQuotes(this.middle) : null;
  }

  getQuotes(start: number, end?: number): Record<string, TickerType> | null {
    if (!this.ticker) return null;

    return Object.keys(this.ticker)
      .slice(start, end)
      .reduce((acc, curr) => {
        acc[curr] = this.ticker?.[curr] as TickerType;

        return acc;
      }, {} as Record<string, TickerType>);
  }
}

const tickerStore = new TickerStore();

export { tickerStore };
