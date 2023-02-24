import { makeObservable, observable, action, computed } from "mobx";
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
      this.loadingState = LoadingStateEnum.processing;

      const response = await fetch(
        "/api/public?command=returnTicker"
      );

      const ticker = await response.json();

      this.ticker = ticker;

      this.loadingState = LoadingStateEnum.success;
    } catch (err) {
      console.error(err);
      this.loadingState = LoadingStateEnum.fail;
    }
  }

  get middle(): number | null {
    if (!this.ticker) return null;

    return Math.floor(Object.keys(this.ticker).length / 2);
  }

  get quotesA(): Record<string, TickerType> | null {
    if (!this.ticker || !this.middle) return null;

    return Object.keys(this.ticker)
      .slice(0, this.middle)
      .reduce((acc, curr) => {
        acc[curr] = this.ticker?.[curr] as TickerType;

        return acc;
      }, {} as Record<string, TickerType>);
  }

  get quotesB(): Record<string, TickerType> | null {
    if (!this.ticker || !this.middle) return null;

    return Object.keys(this.ticker)
      .slice(this.middle)
      .reduce((acc, curr) => {
        acc[curr] = this.ticker?.[curr]  as TickerType;

        return acc;
      }, {} as Record<string, TickerType>);
  }
}

const tickerStore = new TickerStore();

export { tickerStore };
